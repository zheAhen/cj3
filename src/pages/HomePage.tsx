import React from 'react';
import { Typography, Card, Row, Col, Statistic, Button, Space, Input } from 'antd';
import { 
  BookOutlined, 
  StarOutlined, 
  TeamOutlined, 
  FileTextOutlined,
  SearchOutlined,
  EditOutlined,
  ShareAltOutlined,
  RobotOutlined,
  SendOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl font-bold text-primary mb-4">全国高校课程锐评智能体</Title>
        <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
          探索、分享和评价全国高校的优质课程，助力学生选择最适合自己的学习路径
        </Paragraph>
        <Button type="primary" size="large" className="mt-4" icon={<RobotOutlined />}>
          <Link to="/ai-chat">开始探索</Link>
        </Button>
      </div>

      <Row gutter={[24, 24]} className="mb-12">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center h-full hover:shadow-lg transition-shadow">
            <BookOutlined className="text-5xl text-primary mb-4" />
            <Title level={4}>丰富的课程资源</Title>
            <Paragraph className="text-gray-500">
              覆盖全国各大高校的优质课程评价和资源
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center h-full hover:shadow-lg transition-shadow">
            <StarOutlined className="text-5xl text-primary mb-4" />
            <Title level={4}>真实的评价体系</Title>
            <Paragraph className="text-gray-500">
              来自学生的真实评价，帮助你做出明智选择
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center h-full hover:shadow-lg transition-shadow">
            <TeamOutlined className="text-5xl text-primary mb-4" />
            <Title level={4}>活跃的学习社区</Title>
            <Paragraph className="text-gray-500">
              与志同道合的同学交流，分享学习经验
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center h-full hover:shadow-lg transition-shadow">
            <FileTextOutlined className="text-5xl text-primary mb-4" />
            <Title level={4}>智能推荐系统</Title>
            <Paragraph className="text-gray-500">
              基于你的兴趣和学习风格推荐最适合的课程
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <Title level={2} className="text-center mb-8">平台数据</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="hover:shadow-md transition-shadow">
              <Statistic 
                title="收录课程" 
                value={1000} 
                prefix={<BookOutlined />} 
                valueStyle={{ color: '#3b82f6' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="hover:shadow-md transition-shadow">
              <Statistic 
                title="覆盖高校" 
                value={120} 
                prefix={<TeamOutlined />} 
                valueStyle={{ color: '#10b981' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="hover:shadow-md transition-shadow">
              <Statistic 
                title="用户评价" 
                value={5600} 
                prefix={<StarOutlined />} 
                valueStyle={{ color: '#f59e0b' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="hover:shadow-md transition-shadow">
              <Statistic 
                title="文档资源" 
                value={3200} 
                prefix={<FileTextOutlined />} 
                valueStyle={{ color: '#8b5cf6' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mb-12">
        <Title level={2} className="text-center mb-8">特色功能</Title>
        <Row gutter={[24, 24]} className="items-center">
          <Col xs={24} lg={12} className="order-2 lg:order-1">
            <Title level={3}>双链接知识网络</Title>
            <Paragraph className="text-gray-600 mb-4">
              通过[[双链接]]功能，轻松关联相关课程和知识点，构建你的个性化知识网络。
            </Paragraph>
            <Button type="primary" icon={<SearchOutlined />}>
              <Link to="/search">体验搜索功能</Link>
            </Button>
          </Col>
          <Col xs={24} lg={12} className="order-1 lg:order-2">
            <Card className="p-6 shadow-sm">
              <div className="mockup-code bg-gray-800 text-gray-100">
                <pre data-prefix="1"><code># 数据结构与算法分析</code></pre>
                <pre data-prefix="2"><code>## 相关课程</code></pre>
                <pre data-prefix="3"><code>- [[高级算法设计与分析]]</code></pre>
                <pre data-prefix="4"><code>- [[计算机程序设计基础]]</code></pre>
                <pre data-prefix="5"><code>- [[离散数学]]</code></pre>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="mb-12">
        <Row gutter={[24, 24]} className="items-center">
          <Col xs={24} lg={12}>
            <Card className="p-6 shadow-sm">
              <div className="mockup-window border bg-gray-800">
                <div className="flex justify-center px-4 py-16 bg-gray-900">
                  <div className="text-center">
                    <SearchOutlined className="text-4xl text-blue-500 mb-4" />
                    <p className="text-white">搜索全国高校课程评价</p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Title level={3}>丰富的课程评价</Title>
            <Paragraph className="text-gray-600 mb-4">
              查看来自全国各大高校的真实课程评价，包括教学质量、课程难度、作业量等详细信息。
            </Paragraph>
            <Space>
              <Button type="primary" icon={<EditOutlined />}>
                <Link to="/documents">查看评价</Link>
              </Button>
              <Button icon={<ShareAltOutlined />}>
                <Link to="/share-review">分享评价</Link>
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      <div className="mb-12 bg-blue-50 rounded-xl p-8">
        <Title level={2} className="text-center mb-8">AI 智能助手</Title>
        <Row gutter={[24, 24]} className="items-center">
          <Col xs={24} lg={12}>
            <Title level={3}>强大的大模型 API 接入</Title>
            <Paragraph className="text-gray-600 mb-4">
              通过简单配置，连接各种大型语言模型 API，获取智能问答、内容生成、知识查询等功能。支持自定义 API 端点和参数设置。
            </Paragraph>
            <Paragraph className="text-blue-600 font-medium">
              点击上方"开始探索"按钮，立即体验AI助手功能！
            </Paragraph>
          </Col>
          <Col xs={24} lg={12}>
            <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="bg-gray-800 text-white p-3 flex items-center">
                  <RobotOutlined className="mr-2" />
                  <span>AI 助手</span>
                </div>
                <div className="p-4 bg-gray-100">
                  <div className="flex justify-end mb-3">
                    <div className="bg-blue-500 text-white rounded-lg p-2 max-w-[80%]">
                      请推荐一些计算机科学的入门课程
                    </div>
                  </div>
                  <div className="flex mb-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-2 max-w-[80%] shadow-sm">
                      作为入门课程，我推荐以下几门：
                      <br />1. 计算机科学导论
                      <br />2. Python 编程基础
                      <br />3. 数据结构与算法入门
                      <br />4. 数据库基础
                      <br />这些课程将为您打下坚实的基础。
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 flex">
                  <Input placeholder="输入您的问题..." className="mr-2" />
                  <Button type="primary" icon={<SendOutlined />} />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;