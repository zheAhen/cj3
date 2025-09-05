import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Layout, Input, Button, List, Avatar, Typography, Divider, Drawer, message, Form, Modal } from 'antd';
import { 
  SendOutlined, 
  SettingOutlined, 
  PlusOutlined,
  MenuOutlined,
  UserOutlined,
  RobotOutlined,
  DeleteOutlined,
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const AIChat: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState<boolean>(false);
  const [apiSettingsVisible, setApiSettingsVisible] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [apiEndpoint, setApiEndpoint] = useState<string>('https://api.example.com/v1/chat/completions');
  const [apiModel, setApiModel] = useState<string>('gpt-3.5-turbo');
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 创建新对话
  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: `新对话 ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date()
    };
    
    setConversations(prevConversations => [newConversation, ...prevConversations]);
    setCurrentConversation(newConversation);
  }, [conversations.length]);

  // 初始化
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    }
  }, [conversations.length, createNewConversation]);

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  // 发送消息
  const sendMessage = async () => {
    if (!messageInput.trim() || !currentConversation) return;
    
    // 创建用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      role: 'user',
      timestamp: new Date()
    };
    
    // 更新对话
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage]
    };
    
    setCurrentConversation(updatedConversation);
    setConversations(conversations.map(conv => 
      conv.id === currentConversation.id ? updatedConversation : conv
    ));
    
    setMessageInput('');
    setLoading(true);
    
    try {
      // 调用API
      if (!apiKey) {
        message.warning('请先设置API密钥');
        setApiSettingsVisible(true);
        setLoading(false);
        return;
      }
      
      // 构建API请求
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: apiModel,
          messages: updatedConversation.messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });
      
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 创建AI回复消息
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date()
      };
      
      // 更新对话
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage]
      };
      
      setCurrentConversation(finalConversation);
      setConversations(conversations.map(conv => 
        conv.id === currentConversation.id ? finalConversation : conv
      ));
      
    } catch (error) {
      console.error('API调用错误:', error);
      message.error('API调用失败，请检查设置和网络连接');
      
      // 添加错误消息
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: '抱歉，API调用失败，请检查设置和网络连接。',
        role: 'assistant',
        timestamp: new Date()
      };
      
      const errorConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, errorMessage]
      };
      
      setCurrentConversation(errorConversation);
      setConversations(conversations.map(conv => 
        conv.id === currentConversation.id ? errorConversation : conv
      ));
    } finally {
      setLoading(false);
    }
  };

  // 删除对话
  const deleteConversation = (id: string) => {
    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);
    
    if (currentConversation?.id === id) {
      setCurrentConversation(updatedConversations[0] || null);
      if (updatedConversations.length === 0) {
        createNewConversation();
      }
    }
  };

  // 重命名对话
  const renameConversation = (id: string, newTitle: string) => {
    const updatedConversations = conversations.map(conv => 
      conv.id === id ? { ...conv, title: newTitle } : conv
    );
    
    setConversations(updatedConversations);
    
    if (currentConversation?.id === id) {
      setCurrentConversation({ ...currentConversation, title: newTitle });
    }
  };

  // 格式化消息内容（支持简单的Markdown）
  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => (
      <div key={i}>{line || <br />}</div>
    ));
  };

  // 侧边栏内容
  const sidebarContent = (
    <>
      <div className="flex justify-between items-center p-4">
        <Title level={4} className="m-0 flex items-center">
          <MessageOutlined className="mr-2" />
          {!siderCollapsed && "对话历史"}
        </Title>
        {!siderCollapsed && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={createNewConversation}
            className="flex items-center"
          >
            新对话
          </Button>
        )}
        {siderCollapsed && (
          <Button 
            type="primary" 
            shape="circle"
            icon={<PlusOutlined />} 
            onClick={createNewConversation}
            size="small"
          />
        )}
      </div>
      <Divider className="my-2" />
      <List
        className="conversation-list"
        dataSource={conversations}
        renderItem={item => (
          <List.Item 
            className={`cursor-pointer hover:bg-gray-100 px-4 py-2 transition-all duration-300 ${currentConversation?.id === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
            onClick={() => {
              setCurrentConversation(item);
              setMobileDrawerVisible(false);
            }}
          >
            <div className="w-full">
              <div className="flex justify-between items-center">
                {siderCollapsed ? (
                  <div className="w-full flex justify-center">
                    <Avatar 
                      icon={<MessageOutlined />} 
                      className={currentConversation?.id === item.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}
                    />
                  </div>
                ) : (
                  <>
                    <Text ellipsis className="font-medium">{item.title}</Text>
                    <div className="flex space-x-1">
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<EditOutlined />} 
                        className="opacity-50 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          Modal.confirm({
                            title: '重命名对话',
                            content: (
                              <Input 
                                defaultValue={item.title} 
                                onChange={(e) => e.target.value}
                                onPressEnter={(e) => {
                                  renameConversation(item.id, e.currentTarget.value);
                                  Modal.destroyAll();
                                }}
                              />
                            ),
                            onOk: (close) => {
                              const input = document.querySelector('.ant-modal-content input') as HTMLInputElement;
                              renameConversation(item.id, input.value);
                              close();
                            }
                          });
                        }}
                      />
                      <Button 
                        type="text" 
                        size="small" 
                        danger 
                        icon={<DeleteOutlined />} 
                        className="opacity-50 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          Modal.confirm({
                            title: '确认删除',
                            content: '确定要删除这个对话吗？此操作不可撤销。',
                            okText: '删除',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk: () => deleteConversation(item.id)
                          });
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
              {!siderCollapsed && (
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <ClockCircleOutlined className="mr-1" />
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
    </>
  );

  return (
    <Layout className="min-h-screen">
      {/* 移动端抽屉 */}
      <Drawer
        title="对话历史"
        placement="left"
        onClose={() => setMobileDrawerVisible(false)}
        open={mobileDrawerVisible}
        width={300}
      >
        {sidebarContent}
      </Drawer>
      
      {/* API设置模态框 */}
      <Modal
        title="API设置"
        open={apiSettingsVisible}
        onCancel={() => setApiSettingsVisible(false)}
        onOk={() => setApiSettingsVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="API密钥" required>
            <Input.Password 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} 
              placeholder="输入您的API密钥"
            />
          </Form.Item>
          <Form.Item label="API端点">
            <Input 
              value={apiEndpoint} 
              onChange={(e) => setApiEndpoint(e.target.value)} 
              placeholder="API端点URL"
            />
          </Form.Item>
          <Form.Item label="模型">
            <Input 
              value={apiModel} 
              onChange={(e) => setApiModel(e.target.value)} 
              placeholder="模型名称"
            />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* 桌面端侧边栏 */}
      <Sider
        width={300}
        collapsible
        collapsed={siderCollapsed}
        collapsedWidth={80}
        theme="light"
        breakpoint="lg"
        trigger={null}
        className="border-r border-gray-200 hidden md:block shadow-sm transition-all duration-300"
        style={{ 
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0
        }}
      >
        {sidebarContent}
      </Sider>
      
      {/* 主内容区 */}
      <Layout>
        <Header className="bg-white px-4 border-b border-gray-200 flex justify-between items-center shadow-sm">
          <div className="flex items-center">
            <Button 
              type="text" 
              icon={<MenuOutlined />} 
              onClick={() => setMobileDrawerVisible(true)}
              className="md:hidden mr-2"
            />
            <Button
              type="text"
              icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setSiderCollapsed(!siderCollapsed)}
              className="hidden md:flex mr-2 hover:bg-gray-100"
            />
            <Title level={3} className="m-0 flex items-center">
              <RobotOutlined className="mr-2 text-blue-500" />
              AI助手
            </Title>
          </div>
          <Button 
            type="text" 
            icon={<SettingOutlined />} 
            onClick={() => setApiSettingsVisible(true)}
            className="hover:bg-gray-100"
          />
        </Header>
        
        <Content className="bg-gray-50">
          <div className="chat-container flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto bg-white shadow-sm">
            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
              {currentConversation?.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="bg-blue-50 p-8 rounded-full mb-4">
                    <RobotOutlined className="text-5xl text-blue-500" />
                  </div>
                  <Title level={3}>欢迎使用AI助手</Title>
                  <Paragraph className="text-gray-500 max-w-md">
                    这是一个连接大模型API的聊天界面，您可以在下方输入问题并发送。
                    请先在设置中配置您的API密钥。
                  </Paragraph>
                  <Button 
                    type="primary" 
                    icon={<SettingOutlined />}
                    onClick={() => setApiSettingsVisible(true)}
                    className="mt-4"
                  >
                    配置API设置
                  </Button>
                </div>
              ) : (
                currentConversation?.messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <Avatar 
                          size="small" 
                          icon={msg.role === 'user' ? <UserOutlined /> : <RobotOutlined />} 
                          className={msg.role === 'user' ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}
                        />
                        <Text 
                          className={`ml-2 text-xs ${msg.role === 'user' ? 'text-gray-100' : 'text-gray-500'}`}
                        >
                          {msg.role === 'user' ? '你' : 'AI助手'}
                        </Text>
                      </div>
                      <div className="message-content">
                        {formatMessage(msg.content)}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* 输入区域 */}
            <div className="p-4 border-t border-gray-200 bg-white shadow-sm">
              <div className="flex">
                <TextArea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="输入消息..."
                  autoSize={{ minRows: 1, maxRows: 6 }}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="flex-1 mr-2 rounded-lg border-gray-300 focus:border-blue-500 focus:shadow-sm"
                />
                <Button 
                  type="primary" 
                  icon={<SendOutlined />} 
                  onClick={sendMessage}
                  loading={loading}
                  className="flex items-center rounded-lg shadow-sm hover:shadow"
                >
                  发送
                </Button>
              </div>
              <Text type="secondary" className="text-xs mt-1">
                按Enter发送，Shift+Enter换行
              </Text>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AIChat;