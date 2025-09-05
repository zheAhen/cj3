interface Document {
  id: string;
  title: string;
  university: string;
  course: string;
  author: string;
  date: string;
  description: string;
  rating: number;
  difficulty: number;
  workload: number;
  content: string;
  relatedCourses: string[];
  filePath: string;
}

// 文档元数据
export const documents: Document[] = [
  {
    id: '1',
    title: '数据结构与算法分析',
    university: '清华大学',
    course: '计算机科学与技术',
    author: '张三',
    date: '2023-09-15',
    description: '全面介绍数据结构与算法的基础知识，包括线性表、树、图等数据结构，以及排序、查找等算法。',
    rating: 4.5,
    difficulty: 3,
    workload: 2,
    content: '',
    relatedCourses: ['高级算法设计与分析', '计算机程序设计基础', '离散数学'],
    filePath: 'data-structure.md'
  },
  {
    id: '4',
    title: '蔡维奇-罗明琇-管理学',
    university: '清华大学',
    course: '工商管理',
    author: '李四',
    date: '2023-09-01',
    description: '管理学基本原理和实践应用，涵盖管理思想发展史、计划与决策理论、组织设计与变革等内容。',
    rating: 4.6,
    difficulty: 3,
    workload: 2.5,
    content: '',
    relatedCourses: ['组织行为学', '战略管理', '人力资源管理'],
    filePath: '蔡维奇-罗明琇-管理学.md'
  },
  {
    id: '5',
    title: '胡昌亚-经济学',
    university: '北京大学',
    course: '经济学',
    author: '王五',
    date: '2023-09-01',
    description: '系统讲解微观经济学和宏观经济学基本原理，结合当前经济热点分析。',
    rating: 4.9,
    difficulty: 3.5,
    workload: 3,
    content: '',
    relatedCourses: ['中级微观经济学', '中级宏观经济学', '计量经济学'],
    filePath: '胡昌亚-经济学.md'
  },
  {
    id: '6',
    title: '薛慧敏-统计学',
    university: '中国人民大学',
    course: '统计学',
    author: '赵六',
    date: '2023-09-01',
    description: '统计学基本概念、原理和方法，培养数据处理和分析能力。',
    rating: 4.7,
    difficulty: 4.5,
    workload: 4,
    content: '',
    relatedCourses: ['概率论', '数理统计', '回归分析'],
    filePath: '薛慧敏-统计学.md'
  },
  {
    id: '7',
    title: '郭炳伸-经济学',
    university: '复旦大学',
    course: '经济学',
    author: '钱七',
    date: '2023-09-01',
    description: '高级经济学课程，深入讲解微观和宏观经济理论。',
    rating: 5,
    difficulty: 5,
    workload: 5,
    content: '',
    relatedCourses: ['高级微观经济学', '高级宏观经济学', '博弈论'],
    filePath: '郭炳伸-经济学.md'
  },
  {
    id: '8',
    title: '白佩玉-行销管理',
    university: '中山大学',
    course: '市场营销',
    author: '孙八',
    date: '2023-09-01',
    description: '现代市场营销理论与实务，培养市场分析和营销策划能力。',
    rating: 4.8,
    difficulty: 4,
    workload: 4,
    content: '',
    relatedCourses: ['消费者行为学', '品牌管理', '市场调研'],
    filePath: '白佩玉-行销管理.md'
  },
  {
    id: '9',
    title: '林靖庭-投资学',
    university: '上海财经大学',
    course: '金融学',
    author: '周九',
    date: '2023-09-01',
    description: '证券投资分析理论与实务，涵盖股票、债券、衍生品等投资工具。',
    rating: 4.7,
    difficulty: 4.5,
    workload: 4.5,
    content: '',
    relatedCourses: ['公司金融', '金融市场学', '金融工程'],
    filePath: '林靖庭-投资学.md'
  },
  {
    id: '10',
    title: '马藹萱-社会学',
    university: '南京大学',
    course: '社会学',
    author: '吴十',
    date: '2023-09-01',
    description: '社会学基本理论和方法，分析社会结构、社会变迁和社会问题。',
    rating: 4.8,
    difficulty: 4,
    workload: 4,
    content: '',
    relatedCourses: ['社会心理学', '社会调查研究方法', '社会统计学'],
    filePath: '马藹萱-社会学.md'
  },
  {
    id: '11',
    title: '蔡中民-政治学',
    university: '武汉大学',
    course: '政治学',
    author: '郑十一',
    date: '2023-09-01',
    description: '政治学基本理论和分析方法，涵盖政治制度、政治行为和政治文化。',
    rating: 4.8,
    difficulty: 4.5,
    workload: 4.5,
    content: '',
    relatedCourses: ['比较政治学', '国际政治学', '政治哲学'],
    filePath: '蔡中民-政治学.md'
  },
  {
    id: '12',
    title: '陈立榜-统计学',
    university: '浙江大学',
    course: '统计学',
    author: '王十二',
    date: '2023-09-01',
    description: '统计学基础课程，培养数据处理和分析的基本能力。',
    rating: 3.8,
    difficulty: 3.5,
    workload: 3.5,
    content: '',
    relatedCourses: ['概率论基础', '统计软件应用', '数据分析'],
    filePath: '陈立榜-统计学.md'
  },
  {
    id: '13',
    title: '黄东益-行政学',
    university: '厦门大学',
    course: '公共管理',
    author: '李十三',
    date: '2023-09-01',
    description: '公共行政理论和实务，培养公共管理能力。',
    rating: 4.6,
    difficulty: 4,
    workload: 4,
    content: '',
    relatedCourses: ['公共政策分析', '政府经济学', '公共部门人力资源管理'],
    filePath: '黄东益-行政学.md'
  }
];

// 异步加载文档内容
export const loadDocumentContent = async (id: string): Promise<string> => {
  const document = documents.find(doc => doc.id === id);
  if (!document) {
    throw new Error(`Document with id ${id} not found`);
  }

  try {
    // 尝试多种可能的路径
    const pathsToTry = [
      `/data/documents/${document.filePath}`,
      `./data/documents/${document.filePath}`
    ];
    
    let lastError = null;
    
    for (const path of pathsToTry) {
      try {
        console.log(`尝试加载文档: ${path}`);
        const response = await fetch(path);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const content = await response.text();
        console.log(`成功从 ${path} 加载文档`);
        return content;
      } catch (error) {
        console.error(`从 ${path} 加载失败:`, error);
        lastError = error;
      }
    }
    
    throw lastError || new Error('所有路径尝试均失败');
  } catch (error) {
    console.error('Error loading document:', error);
    return '# 文档加载失败\n\n无法加载请求的文档内容。请稍后再试。';
  }
};

export default documents;