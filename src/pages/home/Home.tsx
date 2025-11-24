/**
 * @name 首页
 * @description 追光平台首页，展示平台核心功能和AI标准化流程
 * @author AI
 * @date 2025-11-24
 */

import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import { PageContainer } from '@widget/ui/PageContainer/PageContainer';
import { 
  RocketOutlined, 
  CodeOutlined, 
  DeploymentUnitOutlined, 
  DatabaseOutlined,
  LayoutOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Home: React.FC = () => {
  // 核心优势数据
  const advantages = [
    {
      title: "AI自主开发",
      description: "标准化AI自主完成代码生成、优化和单元测试，大幅提升开发效率",
      icon: <CodeOutlined style={{ fontSize: 32, color: '#1890ff' }} />
    },
    {
      title: "流程自动化",
      description: "从需求分析到代码发布的全流程AI自动化，减少人工干预",
      icon: <LayoutOutlined style={{ fontSize: 32, color: '#52c41a' }} />
    },
    {
      title: "标准化上线",
      description: "AI驱动的标准化部署流程，确保代码质量和上线一致性",
      icon: <DeploymentUnitOutlined style={{ fontSize: 32, color: '#722ed1' }} />
    },
    {
      title: "智能管理",
      description: "AI辅助的项目管理和监控，提供数据支持和决策建议",
      icon: <DatabaseOutlined style={{ fontSize: 32, color: '#fa8c16' }} />
    }
  ];

  return (
    <PageContainer header={{ title: '追光 - AI标准化开发平台' }}>
      {/* 英雄区 */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <RocketOutlined style={{ fontSize: 72, color: '#1890ff', marginBottom: 24 }} />
        <Title level={1}>追光平台</Title>
        <Paragraph style={{ fontSize: 18, color: '#666', maxWidth: 800, margin: '20px auto' }}>
          追光是一个<span style={{ color: '#1890ff', fontWeight: 'bold' }}>标准化AI自主开发、编辑、上线和发布的平台</span>，
          致力于使用AI完成标准化流程，重点建设从需求到上线的全链路AI标准化解决方案。
        </Paragraph>
      </div>

      <Divider orientation="horizontal">
        <Text strong>平台核心优势</Text>
      </Divider>

      {/* 核心优势 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 48 }}>
        {advantages.map((advantage, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card hoverable style={{ height: '100%' }}>
              <div style={{ textAlign: 'center', padding: 16 }}>
                {advantage.icon}
                <h3 style={{ marginTop: 16, marginBottom: 8 }}>{advantage.title}</h3>
                <p style={{ color: '#666', fontSize: 14 }}>{advantage.description}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* AI标准化流程 */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <Paragraph>
            追光平台实现了从需求到上线的全流程AI标准化，大幅提升开发效率和质量
          </Paragraph>
        </div>
      </div>

      <Divider orientation="horizontal">
        <Text strong>平台价值</Text>
      </Divider>

      {/* 平台价值 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24, marginRight: 12 }} />
              <h3>提高效率</h3>
            </div>
            <p>AI自动化开发流程，将传统开发周期缩短80%，让团队专注于创新而非重复工作</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24, marginRight: 12 }} />
              <h3>降低成本</h3>
            </div>
            <p>标准化AI开发大幅降低人力成本和维护成本，提高资源利用效率</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24, marginRight: 12 }} />
              <h3>保证质量</h3>
            </div>
            <p>AI驱动的标准化流程确保代码质量和一致性，减少人为错误和技术债务</p>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Home;