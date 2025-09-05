import React, { useState, useEffect } from 'react';
import { fetchCourses } from '../services/courseService';
import { Table, Card, Typography } from 'antd';

const { Title } = Typography;

interface Course {
  id: string;
  title: string;
  university: string;
  course: string;
  score: number;
  difficulty: number;
  workload: number;
  review: string;
  date: string;
}

const columns = [
  {
    title: '课程名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '大学',
    dataIndex: 'university',
    key: 'university',
  },
  {
    title: '专业',
    dataIndex: 'course',
    key: 'course',
  },
  {
    title: '评分',
    dataIndex: 'score',
    key: 'score',
    render: (score: number) => `${score.toFixed(1)}/5.0`,
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    key: 'difficulty',
    render: (difficulty: number) => `${difficulty.toFixed(1)}/5.0`,
  },
];

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>课程评价数据集</Title>
        <Table 
          dataSource={courses} 
          columns={columns} 
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default CoursesPage;