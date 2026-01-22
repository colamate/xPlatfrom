import React, { useState, useEffect } from 'react';
import { Card, Switch, Radio, Button, message, Form } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { api } from '@widget/api/api';

const ThemeSetting: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'compact' | 'standard' | 'large'>('standard');
  const [loading, setLoading] = useState(false);

  // 初始化主题设置
  useEffect(() => {
    // 先从后端API获取最新的主题设置
    const fetchThemeSettings = async () => {
      try {
        const response = await api.getUserInfo();
        if (response.code === 200) {
          const { theme, font_size } = response.data;
          
          // 使用后端返回的设置，如果没有则使用默认值
          const newTheme = (theme as 'light' | 'dark') || 'light';
          const newFontSize = (font_size as 'compact' | 'standard' | 'large') || 'standard';
          
          setTheme(newTheme);
          setFontSize(newFontSize);
          
          // 保存到localStorage
          localStorage.setItem('theme', newTheme);
          localStorage.setItem('fontSize', newFontSize);
          
          // 应用主题
          applyTheme(newTheme);
          applyFontSize(newFontSize);
        }
      } catch (error) {
        // 如果API请求失败，从localStorage获取设置
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
        const savedFontSize = localStorage.getItem('fontSize') as 'compact' | 'standard' | 'large' || 'standard';
        
        setTheme(savedTheme);
        setFontSize(savedFontSize);
        
        // 应用主题
        applyTheme(savedTheme);
        applyFontSize(savedFontSize);
      }
    };
    
    fetchThemeSettings();
  }, []);

  // 应用主题
  const applyTheme = (theme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  // 应用字体大小
  const applyFontSize = (size: 'compact' | 'standard' | 'large') => {
    document.documentElement.setAttribute('data-font-size', size);
  };

  // 切换主题
  const handleThemeChange = async (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 保存到服务器
    await saveThemeSettings(newTheme, fontSize);
  };

  // 切换字体大小
  const handleFontSizeChange = async (e: any) => {
    const newFontSize = e.target.value;
    setFontSize(newFontSize);
    applyFontSize(newFontSize);
    localStorage.setItem('fontSize', newFontSize);
    
    // 保存到服务器
    await saveThemeSettings(theme, newFontSize);
  };

  // 保存主题设置到服务器
  const saveThemeSettings = async (theme: 'light' | 'dark', fontSize: 'compact' | 'standard' | 'large') => {
    setLoading(true);
    try {
      const response = await api.saveThemeSettings({ theme, fontSize });
      if (response.code === 200) {
        message.success('主题设置保存成功');
      }
    } catch (error) {
      message.error('主题设置保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="主题设置">
      <Form layout="vertical">
        <Form.Item label="页面主题">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Switch
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              checked={theme === 'dark'}
              onChange={handleThemeChange}
            />
            <span>{theme === 'light' ? '浅色主题' : '深色主题'}</span>
          </div>
        </Form.Item>

        <Form.Item label="字体大小">
          <Radio.Group value={fontSize} onChange={handleFontSizeChange}>
            <Radio.Button value="compact">紧凑模式</Radio.Button>
            <Radio.Button value="standard">标准模式</Radio.Button>
            <Radio.Button value="large">大字体模式</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={() => saveThemeSettings(theme, fontSize)} loading={loading}>
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ThemeSetting;
