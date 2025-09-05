import React, { useState } from 'react';
import { Typography, Form, Input, Button, Rate, InputNumber, Select, message, Card, Row, Col, Divider } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { saveReviewDocument } from '../services/documentService';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface FormValues {
  title: string;
  teacher: string;
  university: string;
  major: string;
  rating: number;
  difficulty: number;
  workload: number;
  courseOverview: string;
  courseEvaluation: string;
  relatedCourses: string[];
  author: string;
  date: string;
}

const ShareReviewPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 预设的相关课程选项
  const courseOptions = [
    '消费者行为学', '品牌管理', '市场调研', '数字营销', 
    '广告学', '市场分析', '国际营销', '服务营销',
    '零售管理', '产品管理', '定价策略', '营销渠道管理'
  ];

  // 生成当前日期
  const currentDate = new Date().toISOString().split('T')[0];

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    
    try {
      // 调用服务保存文档
      const result = await saveReviewDocument(
        values.title,
        values.teacher,
        values.university,
        values.major,
        values.rating,
        values.difficulty,
        values.workload,
        values.courseOverview,
        values.courseEvaluation,
        values.relatedCourses,
        values.author,
        values.date
      );
      
      if (result.success) {
        message.success(result.message);
        // 提交成功后跳转到文档列表页
        navigate('/documents');
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.error('提交表单时出错:', error);
      message.error('提交表单时出错，请稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  const generateMarkdownContent = (values: FormValues): string => {
    const { 
      title, teacher, university, major, rating, difficulty, workload,
      courseOverview, courseEvaluation, relatedCourses, author
    } = values;
    
    // 构建Markdown内容
    return `# ${teacher}-${title}

## 课程概述
${courseOverview}

## 课程评价
${courseEvaluation}

## 课程信息
- **大学**: ${university}
- **专业**: ${major}
- **教师**: ${teacher}
- **评分**: ${rating}/5
- **难度**: ${difficulty}/5
- **工作量**: ${workload}/5
- **发布日期**: ${currentDate}
- **作者**: ${author}

## 相关课程
${relatedCourses.map(course => `- ${course}`).join('\n')}`;
  };

  // 表单验证规则
  const validateMessages = {
    required: '${label}不能为空',
    types: {
      number: '${label}必须是数字',
    },
    number: {
      range: '${label}必须在${min}和${max}之间',
    },
  };

  return (
    <div className="share-review-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Card>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/">
            <Button icon={<ArrowLeftOutlined />}>返回首页</Button>
          </Link>
        </div>
        
        <Title level={2} style={{ textAlign: 'center' }}>分享课程评价</Title>
        <Paragraph style={{ textAlign: 'center', marginBottom: '30px' }}>
          分享您的课程体验，帮助其他学生做出更好的选择
        </Paragraph>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={{
            rating: 4.5,
            difficulty: 3,
            workload: 3,
            date: currentDate,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="课程名称"
                rules={[{ required: true }]}
              >
                <Input placeholder="例如：行销管理" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="teacher"
                label="教师姓名"
                rules={[{ required: true }]}
              >
                <Input placeholder="例如：白佩玉" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="university"
                label="大学"
                rules={[{ required: true }]}
              >
                <Input placeholder="例如：中山大学" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="major"
                label="专业"
                rules={[{ required: true }]}
              >
                <Input placeholder="例如：市场营销" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">评分信息</Divider>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="rating"
                label="总体评分"
                rules={[{ required: true, type: 'number', min: 1, max: 5 }]}
              >
                <Rate allowHalf />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="difficulty"
                label="课程难度"
                rules={[{ required: true, type: 'number', min: 1, max: 5 }]}
              >
                <InputNumber min={1} max={5} step={0.5} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="workload"
                label="工作量"
                rules={[{ required: true, type: 'number', min: 1, max: 5 }]}
              >
                <InputNumber min={1} max={5} step={0.5} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">课程内容</Divider>

          <Form.Item
            name="courseOverview"
            label="课程概述"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="简要描述课程内容和目标"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>

          <Form.Item
            name="courseEvaluation"
            label="课程评价"
            rules={[{ required: true }]}
          >
            <TextArea
              placeholder="详细评价课程的优缺点、教学质量、收获等"
              autoSize={{ minRows: 4, maxRows: 8 }}
            />
          </Form.Item>

          <Form.Item
            name="relatedCourses"
            label="相关课程"
            rules={[{ required: true, message: '请至少选择一门相关课程' }]}
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="选择或输入相关课程"
              tokenSeparators={[',']}
            >
              {courseOptions.map(course => (
                <Option key={course} value={course}>{course}</Option>
              ))}
            </Select>
          </Form.Item>

          <Divider orientation="left">个人信息</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="author"
                label="作者"
                rules={[{ required: true }]}
              >
                <Input placeholder="您的姓名或昵称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="发布日期"
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
              size="large"
            >
              提交评价
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ShareReviewPage;