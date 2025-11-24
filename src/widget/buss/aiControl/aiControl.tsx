/**
 * @name: aiControl.tsx
 * @author: AI
 * @date: 2024-01-01
 * @description: AI Agent控制组件，支持配置OpenAI、DeepSeek等多种AI模型，支持文本和图片输入，显示响应数据
 **/


import React, { useState, useRef } from 'react';
import { 
  Card, 
  Input, 
  Button, 
  Select, 
  message, 
  Spin, 
  Modal, 
  Form, 
  Tooltip,
  Flex
} from 'antd';
import { 
  SendOutlined, 
  SettingOutlined, 
  LoadingOutlined, 
  CloseOutlined
} from '@ant-design/icons';
import type { UploadProps } from 'antd';

// AI模型配置接口
interface AIModelConfig {
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
}

// 消息接口
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  images?: string[];
  timestamp: number;
  isStreaming?: boolean; // 是否是流式响应
}

// 支持的AI模型列表
const SUPPORTED_MODELS = [
  { label: 'OpenAI (GPT-4o)', value: 'openai', defaultModel: 'gpt-4o' },
  { label: 'DeepSeek (MoE)', value: 'deepseek', defaultModel: 'deepseek-chat' },
  { label: 'Llama (Local)', value: 'llama', defaultModel: 'deepseek-r1:8b' },
];

export const AIControl: React.FC = () => {
  // 状态管理
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [currentModel, setCurrentModel] = useState<string>('openai');
  const [modelConfigs, setModelConfigs] = useState<Record<string, AIModelConfig>>({
    openai: {
      name: 'OpenAI',
      baseUrl: 'https://api.openai.com/v1',
      apiKey: '',
      model: 'gpt-4o',
    },
    deepseek: {
      name: 'DeepSeek',
      baseUrl: 'https://api.deepseek.com/v1',
      apiKey: '',
      model: 'deepseek-chat',
    },
    llama: {
      name: 'Llama',
      baseUrl: 'http://localhost:11434/api',
      apiKey: '',
      model: 'deepseek-r1:8b',
    },
  });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentStreamingMessageId, setCurrentStreamingMessageId] = useState<string | null>(null); // 当前流式响应的消息ID
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 当消息更新时（特别是流式响应更新），自动滚动到底部
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 渲染加载指示器
  const renderLoadingIndicator = () => {
    if (!currentStreamingMessageId) return null;
    
    return (
      <div className="typing-indicator">
        <div className="typing-indicator-dot"></div>
        <div className="typing-indicator-dot"></div>
        <div className="typing-indicator-dot"></div>
      </div>
    );
  };

  // 处理模型配置
  const handleConfigSubmit = (values: any) => {
    const updatedConfigs = { ...modelConfigs };
    updatedConfigs[currentModel] = {
      ...updatedConfigs[currentModel],
      apiKey: values.apiKey,
      model: values.model,
      baseUrl: values.baseUrl,
    };
    setModelConfigs(updatedConfigs);
    setShowConfigModal(false);
    message.success('配置保存成功');
  };

  // 处理模型切换
  const handleModelChange = (value: string) => {
    setCurrentModel(value);
  };

  // 移除图片
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // 处理流式响应
  const handleStreamResponse = async (response: Response, messageId: string) => {
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('无法获取响应流');
    }

    const decoder = new TextDecoder();
    let accumulatedText = '';
    let buffer = '';

    const processStream = async () => {
      const { done, value } = await reader.read();
      if (done) {
        // 确保消息最终状态是非流式的
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, isStreaming: false } : msg
        ));
        return;
      }

      // 解码当前块
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      // 按行处理数据
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // 保留不完整的最后一行到缓冲区
      
      for (const line of lines) {
        // 处理SSE格式的流式数据
        if (line.startsWith('data:')) {
          const data = line.substring(5).trim();
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            
            // 处理不同模型的响应格式
            if (parsed.choices && parsed.choices.length > 0) {
              // OpenAI/DeepSeek格式
              if (parsed.choices[0].delta?.content) {
                accumulatedText += parsed.choices[0].delta.content;
              }
              // 某些模型可能直接在choices[0].message.content中返回
              else if (parsed.choices[0].message?.content) {
                accumulatedText = parsed.choices[0].message.content;
              }
            } 
            // Llama格式可能略有不同
            else if (parsed.response) {
              accumulatedText += parsed.response;
            }
            
            // 更新消息内容
            if (accumulatedText.length > 0) {
              setMessages(prev => prev.map(msg => 
                msg.id === messageId ? { ...msg, content: accumulatedText } : msg
              ));
            }
          } catch (error) {
            console.error('解析流式数据失败:', error);
          }
        }
      }
      
      // 继续处理下一个数据块
      await processStream();
    };

    await processStream();
  };

  // 发送消息给AI模型
  const sendMessage = async () => {
    if (!inputValue.trim() && selectedImages.length === 0) {
      message.warning('请输入内容');
      return;
    }

    const config = modelConfigs[currentModel];
    if (!config.apiKey && currentModel !== 'llama') {
      message.error('请先配置API密钥');
      return;
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: inputValue,
      images: selectedImages.length > 0 ? [...selectedImages] : undefined,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setSelectedImages([]);
    setLoading(true);

    // 创建AI响应消息
    const aiMessage: Message = {
      id: `msg-ai-${Date.now()}`,
      type: 'ai',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setCurrentStreamingMessageId(aiMessage.id);

    try {
      let response: Response;
      
      // 根据不同的模型构建请求
      switch (currentModel) {
        case 'openai':
          response = await fetch(`${config.baseUrl}/generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
              model: config.model,
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: inputValue },
                    ...(selectedImages.map(base64 => ({
                      type: 'image_url',
                      image_url: { url: base64 }
                    })))
                  ].filter(item => item.type === 'text' || selectedImages.length > 0)
                }
              ],
              max_tokens: 1500,
              temperature: 0.7,
              stream: true, // 启用流式响应
            }),
          });
          
          await handleStreamResponse(response, aiMessage.id);
          break;
          
        case 'deepseek':
          response = await fetch(`${config.baseUrl}/generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
              model: config.model,
              messages: [
                {
                  role: 'user',
                  content: [
                    { type: 'text', text: inputValue },
                    ...(selectedImages.map(base64 => ({
                      type: 'image_url',
                      image_url: { url: base64 }
                    })))
                  ].filter(item => item.type === 'text' || selectedImages.length > 0)
                }
              ],
              max_tokens: 1500,
              temperature: 0.7,
              stream: true, // 启用流式响应
            }),
          });
          
          await handleStreamResponse(response, aiMessage.id);
          break;
        case 'llama':
          // 对于Llama，我们需要调整端点和参数以支持流式响应
          response = await fetch(`${config.baseUrl}/generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: config.model,
              messages: [
                {
                  role: 'user',
                  content: inputValue
                }
              ],
              stream: true, // 启用流式响应
              temperature: 0.7,
            }),
          });
          
          await handleStreamResponse(response, aiMessage.id);
          break;
          
        default:
          message.error('不支持的模型');
      }
    } catch (error) {
      console.error('发送请求失败:', error);
      message.error('发送请求失败，请检查配置和网络连接');
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessage.id 
          ? { ...msg, content: '抱歉，处理您的请求时出错了。请稍后再试。', isStreaming: false }
          : msg
      ));
    } finally {
      setLoading(false);
      setCurrentStreamingMessageId(null);
    }
  };

  // 添加AI回复消息
  const addAIMessage = (content: string) => {
    const aiMessage: Message = {
      id: `msg-ai-${Date.now()}`,
      type: 'ai',
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  // 处理输入框回车
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 图片上传前校验
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('请上传图片文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须小于 2MB!');
    }
    return isImage && isLt2M;
  };

  // 清空对话历史
  const clearMessages = () => {
    Modal.confirm({
      title: '确定要清空对话历史吗？',
      onOk: () => setMessages([]),
    });
  };

  // 获取默认配置值
  const getDefaultConfig = () => {
    const config = modelConfigs[currentModel];
    return {
      baseUrl: config.baseUrl,
      apiKey: config.apiKey,
      model: config.model,
    };
  };

  return (
    <Card 
      title={
        <Flex justify="space-between" align="center">
          <span>AI Agent 控制中心</span>
          <Flex gap="middle">
            <Tooltip title="清空对话">
              <Button 
                type="text" 
                danger 
                onClick={clearMessages}
                disabled={messages.length === 0}
              >
                清空
              </Button>
            </Tooltip>
            <Button 
              type="text" 
              icon={<SettingOutlined />} 
              onClick={() => {
                form.setFieldsValue(getDefaultConfig());
                setShowConfigModal(true);
              }}
            />
          </Flex>
        </Flex>
      }
      className="ai-control-container"
      size="default"
    >
      <Select 
        value={currentModel} 
        onChange={handleModelChange} 
        style={{ width: 200, marginBottom: 16 }}
        options={SUPPORTED_MODELS}
      />
      
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message-wrapper ${message.type} ${message.isStreaming ? 'streaming' : ''}`}>
            <div className="message-avatar">
              {message.type === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              {message.images && message.images.length > 0 && (
                <div className="message-images">
                  {message.images.map((image, index) => (
                    <div key={index} className="message-image-wrapper">
                      <img src={image} alt={`Uploaded ${index}`} className="message-image" />
                    </div>
                  ))}
                </div>
              )}
              <div className="message-text">
                {message.content}
                {message.isStreaming && renderLoadingIndicator()}
              </div>
            </div>
          </div>
        ))}
        {loading && !currentStreamingMessageId && (
          <div className="message-wrapper ai">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <Spin indicator={<LoadingOutlined />} tip="AI正在思考..." />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-container">
        {selectedImages.length > 0 && (
          <div className="selected-images">
            {selectedImages.map((image, index) => (
              <div key={index} className="selected-image-wrapper">
                <img src={image} alt={`Selected ${index}`} className="selected-image" />
                <Button 
                  type="text" 
                  danger 
                  icon={<CloseOutlined />} 
                  size="small"
                  onClick={() => removeImage(index)}
                  className="remove-image-btn"
                />
              </div>
            ))}
          </div>
        )}
        
        <Flex gap="small">
          <Input.TextArea
            rows={3}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`输入问题发送给${modelConfigs[currentModel].name}...`}
            disabled={loading}
          />
          
          <Button 
            type="primary" 
            icon={<SendOutlined />} 
            onClick={sendMessage}
            loading={loading}
            disabled={(!inputValue.trim() && selectedImages.length === 0) || loading}
          >
            发送
          </Button>
        </Flex>
      </div>
      
      {/* 配置弹窗 */}
      <Modal
        title={`配置 ${modelConfigs[currentModel].name}`}
        open={showConfigModal}
        onCancel={() => setShowConfigModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleConfigSubmit}
          initialValues={getDefaultConfig()}
        >
          <Form.Item
            name="baseUrl"
            label="API Base URL"
            rules={[{ required: true, message: '请输入API基础URL' }]}
          >
            <Input placeholder={`请输入${modelConfigs[currentModel].name}的API基础URL`} />
          </Form.Item>
          
          {currentModel !== 'llama' && (
            <Form.Item
              name="apiKey"
              label="API Key"
              rules={[{ required: true, message: '请输入API密钥' }]}
            >
              <Input.Password placeholder={`请输入${modelConfigs[currentModel].name}的API密钥`} />
            </Form.Item>
          )}
          
          <Form.Item
            name="model"
            label="模型选择"
            rules={[{ required: true, message: '请选择模型' }]}
          >
            <Input 
              placeholder={`请输入${modelConfigs[currentModel].name}的模型名称`}
              value={SUPPORTED_MODELS.find(m => m.value === currentModel)?.defaultModel}
            />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              保存配置
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};
