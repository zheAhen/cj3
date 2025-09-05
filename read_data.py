import pandas as pd

df = pd.read_csv("hf://datasets/vincenttttt/course_score/score_rag.csv")
df.to_csv('data.csv', index=False, encoding='utf_8_sig')
