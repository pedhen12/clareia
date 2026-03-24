import { z } from 'zod';

// Profile validation schema
export const profileSchema = z.object({
  name: z.string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  grade: z.enum(['6º ano', '7º ano', '8º ano', '9º ano']),
  avatar: z.string().optional(),
  school: z.string().max(100, "Nome da escola muito longo").optional(),
});

export type ProfileData = z.infer<typeof profileSchema>;

// Quiz attempt validation schema
export const quizAttemptSchema = z.object({
  lessonId: z.string()
    .min(1, "ID da aula é obrigatório")
    .max(200, "ID da aula inválido"),
  score: z.number()
    .int("Pontuação deve ser um número inteiro")
    .min(0, "Pontuação não pode ser negativa")
    .max(100, "Pontuação não pode ser maior que 100"),
  totalQuestions: z.number()
    .int("Total de questões deve ser um número inteiro")
    .min(1, "Deve ter pelo menos 1 questão")
    .max(50, "Máximo de 50 questões por quiz"),
  correctAnswers: z.number()
    .int("Respostas corretas deve ser um número inteiro")
    .min(0, "Respostas corretas não pode ser negativo")
    .max(50, "Máximo de 50 respostas corretas"),
});

export type QuizAttemptData = z.infer<typeof quizAttemptSchema>;

// Completed lesson validation schema
export const completedLessonSchema = z.object({
  lessonId: z.string()
    .min(1, "ID da aula é obrigatório")
    .max(200, "ID da aula inválido"),
  subjectSlug: z.string()
    .min(1, "Slug da matéria é obrigatório")
    .max(50, "Slug da matéria inválido"),
});

export type CompletedLessonData = z.infer<typeof completedLessonSchema>;

// Tutor message validation schema
export const tutorMessageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string()
        .min(1, "Mensagem não pode estar vazia")
        .max(2000, "Mensagem muito longa (máximo 2000 caracteres)"),
    })
  ).min(1, "Deve ter pelo menos 1 mensagem")
    .max(20, "Máximo de 20 mensagens por conversa"),
});

export type TutorMessageData = z.infer<typeof tutorMessageSchema>;

// Helper function to format Zod errors
export function formatZodError(error: z.ZodError<unknown>): string {
  return error.issues.map(err => err.message).join(', ');
}
