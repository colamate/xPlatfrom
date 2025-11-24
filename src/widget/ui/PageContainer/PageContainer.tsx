import React from 'react';
import { Card } from 'antd';
import './PageContainer.css';

/**
 * @name PageContainer
 * @author AI
 * @date 2024-08-23
 * @description 页面容器组件，提供统一的页面布局和标题展示功能
 * @warning 请确保传入的header对象格式正确
 */

interface PageHeader {
  /**
   * 页面标题
   */
  title: string;
  /**
   * 额外的头部操作区域
   */
  extra?: React.ReactNode;
  /**
   * 副标题
   */
  subTitle?: string;
}

interface PageContainerProps {
  /**
   * 页面头部配置
   */
  header?: PageHeader;
  /**
   * 页面内容区域的子元素
   */
  children: React.ReactNode;
  /**
   * 自定义样式类名
   */
  className?: string;
  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean;
  /**
   * 内容区域的内边距
   * @default 24
   */
  padding?: number;
}

/**
 * 页面容器组件
 * @param {PageContainerProps} props 组件属性
 * @returns {React.ReactElement} React元素
 * @example
 * ```tsx
 * <PageContainer header={{ title: '首页' }}>
 *   <div>页面内容</div>
 * </PageContainer>
 * ```
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  header,
  children,
  className = '',
}) => {
  return (
    <Card
      className={`page-container ${className}`}
      style={{ margin: 0, borderTop: 0, borderRadius: 0, padding: '8px 16px' }}
    >
      {header && (
        <div className="page-header">
          <div className="page-header-title">
            {header.title && <h1>{header.title}</h1>}
            {header.subTitle && <p className="page-header-subtitle">{header.subTitle}</p>}
          </div>
          {header.extra && <div className="page-header-extra">{header.extra}</div>}
        </div>
      )}
      <div className="page-content">{children}</div>
      <div style={{ clear: 'both' }}></div>
    </Card>
  );
};

export default PageContainer;