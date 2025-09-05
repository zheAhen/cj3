import React, { useState, useEffect } from 'react';
import { Card, List, Typography, Input, Button, Space } from 'antd';
import { SearchOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { documents } from '../data/documentLoader';

const { Title } = Typography;
const { Search } = Input;

const DocumentsPage = () => {
  const [documentsList, setDocumentsList] = useState(documents);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText) {
        const filtered = documents.filter(doc => 
          doc.title.toLowerCase().includes(searchText.toLowerCase()) || 
          doc.description.toLowerCase().includes(searchText.toLowerCase())
        );
        setDocumentsList(filtered);
      } else {
        setDocumentsList(documents);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  return (
    <div className="p-6">
      <Title level={2} className="text-center mb-8">课程评价文档</Title>
      
      <div className="mb-8">
        <Search
          placeholder="搜索课程评价"
          allowClear
          enterButton={<Button type="primary" icon={<SearchOutlined />}>搜索</Button>}
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-2xl mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentsList.map((doc) => (
          <Link key={doc.id} to={`/documents/${doc.id}`}>
            <Card
              hoverable
              className="h-full flex flex-col"
              cover={
                <div className="bg-blue-50 p-8 flex justify-center">
                  <FileTextOutlined className="text-4xl text-blue-500" />
                </div>
              }
            >
              <Card.Meta
                title={<div className="text-lg font-medium">{doc.title}</div>}
                description={
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="text-gray-600">{doc.university} · {doc.course}</div>
                    <div className="flex items-center gap-4">
                      <span className="text-yellow-500 font-medium">{doc.rating}</span>
                      <span className="text-gray-400">难度: {doc.difficulty}/5</span>
                      <span className="text-gray-400">作业量: {doc.workload}/5</span>
                    </div>
                    <div className="text-gray-500 line-clamp-3 mt-2">
                      {doc.description}
                    </div>
                  </div>
                }
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;