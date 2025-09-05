import os
import random
from faker import Faker

fake = Faker('zh_CN')

# 创建输出目录
os.makedirs('public/data/documents', exist_ok=True)

# 课程主题列表
subjects = ['管理学', '经济学', '市场营销', '金融学', '会计学', 
            '统计学', '计算机科学', '人工智能', '数据科学', '心理学']

# 生成50个markdown文件
for i in range(1, 51):
    # 生成随机教师姓名(1-3位教师)
    num_teachers = random.randint(1, 3)
    teachers = '-'.join([fake.last_name() for _ in range(num_teachers)])
    
    # 课程名称
    subject = random.choice(subjects)
    filename = f"public/data/documents/{teachers}-{subject}.md"
    
    # 生成课程数据
    rating = round(random.uniform(3.5, 5.0), 1)
    difficulty = random.randint(2, 5)
    workload = random.randint(2, 5)
    university = random.choice(['清华大学', '北京大学', '复旦大学', '上海交通大学', '浙江大学'])
    major = random.choice(['工商管理', '经济学', '计算机科学', '心理学', '数据科学'])
    date = f"2023-{random.randint(1,12):02d}-{random.randint(1,28):02d}"
    author = fake.name()
    
    # 生成markdown内容
    content = f"""# {teachers}-{subject}

## 课程概述
本课程是{major}专业的{'核心' if random.random() > 0.3 else '选修'}课程，主要讲解{subject}基本原理和实践应用。

## 课程特色
1. **互动性强**：每周安排小组讨论和案例分析
2. **实践导向**：包含{'企业实地考察' if random.random() > 0.5 else '实验项目'}
3. **资源丰富**：提供大量经典案例库
4. **考核多元**：小组报告({random.randint(30,50)}%)+期中考试({random.randint(20,40)}%)+期末{'论文' if random.random() > 0.5 else '考试'}({random.randint(20,40)}%)

## 课程评价
课程内容丰富实用，老师讲解生动有趣(interesting:{round(random.uniform(90, 100), 2)})。课程难度适中(difficult:{round(random.uniform(50, 80), 2)})，学习收获大(thoughtful:{round(random.uniform(80, 95), 2)})。作业量{'合理' if workload < 4 else '较大'}(busy:{round(random.uniform(40, 70), 2)})。整体评分{rating}/5。

## 课程信息
- **大学**: {university}
- **专业**: {major}
- **教师**: {teachers}
- **评分**: {rating}/5
- **难度**: {difficulty}/5
- **工作量**: {workload}/5
- **发布日期**: {date}
- **作者**: {author}

## 相关课程
- {random.choice(subjects)} (评分{round(random.uniform(3.5, 5.0), 1)})
- {random.choice(subjects)} (评分{round(random.uniform(3.5, 5.0), 1)})
"""

    # 写入文件
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("已生成50个markdown文档到public/data/documents目录")