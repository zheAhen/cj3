import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import remarkGfm from 'remark-gfm';
import { Typography, Button, Space, Card, Input, Rate, Spin } from 'antd';
import { ArrowLeftOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { documents, loadDocumentContent } from '../data/documentLoader';

const { Title, Paragraph } = Typography;

const DocumentViewer = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [document, setDocument] = useState<any>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>('');

  useEffect(() => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      setDocument(doc);
      // Load markdown content from file
      loadDocumentContent(id!).then(content => {
        setContent(content);
      });
    }
  }, [id]);

  if (!document) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <Title level={2}>404</Title>
        <Paragraph>未找到该课程评价</Paragraph>
        <Link to="/documents">
          <Button type="primary">返回课程列表</Button>
        </Link>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <Spin size="large" />
        <Paragraph>正在加载文档内容...</Paragraph>
      </div>
    );
  }

  const processWikiLinks = (text: string) => {
    return text.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
      return `[${p1}](/documents?search=${encodeURIComponent(p1)})`;
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <Link to="/documents">
          <Button type="text" icon={<ArrowLeftOutlined />}>返回列表</Button>
        </Link>
      </div>

      <Title level={2}>{document.title}</Title>
      <div className="mb-6">
        <Paragraph type="secondary">
          {document.university} · {document.course} · {document.author} · {document.date}
        </Paragraph>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 font-medium text-lg">{document.rating}</span>
            <span className="text-gray-500">/5</span>
          </div>
          <div className="text-gray-500">难度: {document.difficulty}/5</div>
          <div className="text-gray-500">作业量: {document.workload}/5</div>
        </div>
      </div>

      <Space className="mb-8">
        <Button type="primary" icon={<EditOutlined />}>编辑评价</Button>
        <Button icon={<ShareAltOutlined />}>分享</Button>
      </Space>

      <Card className="mb-8">
        <ReactMarkdown 
          // @ts-ignore
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({node, ...props}) => (
              <Link to={props.href || '#'} className="text-blue-500 hover:underline">
                {props.children}
              </Link>
            )
          }}
        >
          {processWikiLinks(content)}
        </ReactMarkdown>
      </Card>

      <div className="bg-gray-50 p-6 rounded-lg">
        <Title level={4} className="mb-4">相关课程</Title>
        <Paragraph>
          {document.relatedCourses.map((course: string) => (
            <Link 
              key={course} 
              to={`/documents?search=${encodeURIComponent(course)}`} 
              className="inline-block mr-4 mb-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
            >
              {course}
            </Link>
          ))}
        </Paragraph>
      </div>

      <div className="mt-8">
        <Title level={3}>课程评价</Title>
        <div className="mt-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-lg">{document.author.charAt(0)}</span>
            </div>
            <div>
              <div className="font-medium">{document.author}</div>
              <div className="text-gray-500 text-sm">{document.date}</div>
            </div>
          </div>
          <div className="prose max-w-none">
            {/* @ts-ignore */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {processWikiLinks(content)}
            </ReactMarkdown>
          </div>
        </div>

        <div className="mt-8">
          <Title level={4}>发表评价</Title>
          <div className="mt-4 p-4 border rounded-lg">
            <div className="mb-4">
              <div className="mb-2">评分</div>
              <Rate 
                allowHalf 
                value={userRating} 
                onChange={setUserRating} 
              />
            </div>
            <Input.TextArea 
              rows={4} 
              placeholder="写下你的课程评价..."
              className="mb-4"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <Button 
              type="primary" 
              disabled={!userRating || !userComment}
              onClick={() => {
                alert('评价提交成功！');
                setUserRating(0);
                setUserComment('');
              }}
            >
              提交评价
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;