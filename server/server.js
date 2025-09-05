const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 文档保存API
app.post('/api/documents', (req, res) => {
  let filePath = '';
  let newId = '';
  
  try {
    const { 
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
    } = req.body;
    
    // 生成文件名
    const fileName = `${teacher}-${title}.md`;
    filePath = path.join(__dirname, '../public/data/documents', fileName);
    
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

    // 保存文件
    fs.writeFileSync(filePath, markdownContent);
    
    // 读取documentLoader.ts文件
    const documentLoaderPath = path.join(__dirname, '../src/data/documentLoader.ts');
    let documentLoaderContent = fs.readFileSync(documentLoaderPath, 'utf8');
    
    // 解析当前最大ID
    const idMatch = documentLoaderContent.match(/id: ['"](\d+)['"]/g);
    const ids = idMatch ? idMatch.map(match => parseInt(match.match(/\d+/)[0])) : [0];
    const maxId = Math.max(...ids);
    newId = (maxId + 1).toString();
    
    // 创建新文档对象
    const newDocumentEntry = `  {
    id: '${newId}',
    title: '${teacher}-${title}',
    university: '${university}',
    course: '${major}',
    author: '${author}',
    date: '${date}',
    description: '${courseOverview.replace(/'/g, "\\'")}',
    rating: ${rating},
    difficulty: ${difficulty},
    workload: ${workload},
    content: '',
    relatedCourses: [${relatedCourses.map(course => `'${course.replace(/'/g, "\\'")}'`).join(', ')}],
    filePath: '${fileName}'
  }`;

    // 更精确地定位和修改documents数组
    const documentsArrayRegex = /export\s+const\s+documents:\s+Document\[\]\s*=\s*\[([\s\S]*?)\];/;
    const match = documentLoaderContent.match(documentsArrayRegex);
    
    if (match) {
      const fullArrayMatch = match[0]; // 整个数组定义
      const arrayContent = match[1];   // 数组内容
      
      // 找到最后一个文档的结束位置
      const lastDocumentEnd = arrayContent.lastIndexOf('}');
      
      if (lastDocumentEnd !== -1) {
        // 在最后一个文档后添加新文档
        const newArrayContent = arrayContent.substring(0, lastDocumentEnd + 1) + 
                               ',\n' + newDocumentEntry + 
                               arrayContent.substring(lastDocumentEnd + 1);
        
        // 替换整个数组内容
        const newDocumentLoaderContent = documentLoaderContent.replace(
          fullArrayMatch,
          fullArrayMatch.replace(arrayContent, newArrayContent)
        );
        
        // 写回文件
        fs.writeFileSync(documentLoaderPath, newDocumentLoaderContent);
      } else {
        // 如果数组为空，直接添加新文档
        const newDocumentLoaderContent = documentLoaderContent.replace(
          fullArrayMatch,
          fullArrayMatch.replace('[', '[\n' + newDocumentEntry)
        );
        fs.writeFileSync(documentLoaderPath, newDocumentLoaderContent);
      }

      // 强制清除require缓存
      if (require.cache[require.resolve('../src/data/documentLoader')]) {
        delete require.cache[require.resolve('../src/data/documentLoader')];
      }
      
      res.status(200).json({ 
        success: true, 
        message: '课程评价已成功保存！', 
        documentId: newId,
        reloadRequired: true
      });
    } else {
      throw new Error('无法在documentLoader.ts中找到documents数组');
    }
  } catch (error) {
    console.error('保存文档时出错:', error);
    // 检查文件是否已保存但只是响应失败
    if (fs.existsSync(filePath)) {
      res.status(200).json({ 
        success: true, 
        message: '文档已保存。',
        documentId: newId
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: '保存文档时出错，请稍后再试。' 
      });
    }
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});