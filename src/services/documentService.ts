// documentService.ts
// 用于处理文档相关的服务

import documents from '../data/documentLoader';

// 保存新的课程评价文档
export const saveReviewDocument = async (
  title: string,
  teacher: string,
  university: string,
  major: string,
  rating: number,
  difficulty: number,
  workload: number,
  courseOverview: string,
  courseEvaluation: string,
  relatedCourses: string[],
  author: string,
  date: string
): Promise<{ success: boolean; message: string; documentId?: string }> => {
  try {
    // 生成文件名
    const fileName = `${teacher}-${title}.md`;
    const filePath = fileName;
    
    // 构建Markdown内容
    const markdownContent = `# ${teacher}-${title}

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
- **发布日期**: ${date}
- **作者**: ${author}

## 相关课程
${relatedCourses.map(course => `- ${course}`).join('\n')}`;

    // 调用后端API保存文档
    const response = await fetch('http://localhost:3001/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        teacher,
        university,
        major,
        rating,
        difficulty,
        workload,
        courseOverview,
        courseEvaluation,
        relatedCourses,
        author,
        date
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // 如果后端成功保存，我们也在前端内存中更新documents数组
      // 这样用户可以立即看到新添加的文档，而不需要刷新页面
      const newDocument = {
        id: result.documentId,
        title: `${teacher}-${title}`,
        university,
        course: major,
        author,
        date,
        description: courseOverview,
        rating,
        difficulty,
        workload,
        content: '',
        relatedCourses,
        filePath: `${teacher}-${title}.md`
      };
      
      documents.push(newDocument);
    }
    
    return result;
  } catch (error) {
    console.error('保存文档时出错:', error);
    return {
      success: false,
      message: '保存文档时出错，请稍后再试。'
    };
  }
};

// 在实际应用中，这里应该有一个函数来将Markdown文件写入服务器文件系统
// 但由于浏览器环境的限制，我们无法直接写入文件系统
// 这个函数在实际应用中应该在服务器端实现
const saveMarkdownFile = async (filePath: string, content: string): Promise<boolean> => {
  try {
    // 这里应该是服务器端的文件写入逻辑
    // 例如使用Node.js的fs模块
    // fs.writeFileSync(filePath, content);
    
    // 模拟成功
    return true;
  } catch (error) {
    console.error('写入文件时出错:', error);
    return false;
  }
};