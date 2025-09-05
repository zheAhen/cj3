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

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch('http://localhost:8000/courses');
  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }
  return await response.json();
};

export const fetchCourseById = async (id: string): Promise<Course> => {
  const response = await fetch(`http://localhost:8000/courses/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }
  return await response.json();
};