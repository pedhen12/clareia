export type Subject = "matematica" | "portugues" | "historia" | "geografia" | "ingles";
export type Grade = "6º ano" | "7º ano" | "8º ano" | "9º ano";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SubjectGrade {
  subject: Subject;
  grade: Grade;
  lessons: Lesson[];
  quizzes: Quiz[];
}

export interface UserProgress {
  completedLessons: string[];
  completedQuizzes: string[];
  points: number;
  totalPoints: number;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}
