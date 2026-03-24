"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { data } from "@/lib/data";
import { useState } from "react";
import { useQuizAttempts } from "@/hooks/useQuizAttempts";

const subjectInfo = {
  matematica: { name: "Matemática", icon: "📐" },
  portugues: { name: "Português", icon: "📖" },
  historia: { name: "História", icon: "🏛️" },
  geografia: { name: "Geografia", icon: "🌍" },
  ingles: { name: "Inglês", icon: "🌐" },
};

interface AnswerFeedback {
  show: boolean;
  isCorrect: boolean;
  questionIndex: number;
}

export default function QuizPage() {
  const params = useParams();
  const subject = params.subject as string;
  const grade = decodeURIComponent(params.grade as string);
  const lessonId = params.lesson as string;
  const info = subjectInfo[subject as keyof typeof subjectInfo];

  const { saveQuizAttempt } = useQuizAttempts();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<AnswerFeedback>({ show: false, isCorrect: false, questionIndex: -1 });
  const [confirmedAnswers, setConfirmedAnswers] = useState<Set<number>>(new Set());

  const subjectData = data.find((d) => d.subject === subject && d.grade === grade);
  const quizzes = subjectData?.quizzes.filter((q) => q.lessonId === lessonId) || [];
  const currentQuestion = quizzes[currentQuestionIndex];

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showResults && !confirmedAnswers.has(currentQuestionIndex)) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestionIndex] = optionIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleConfirmAnswer = () => {
    const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion?.correctAnswer;
    setFeedback({
      show: true,
      isCorrect,
      questionIndex: currentQuestionIndex,
    });
    
    const newConfirmedAnswers = new Set(confirmedAnswers);
    newConfirmedAnswers.add(currentQuestionIndex);
    setConfirmedAnswers(newConfirmedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback({ show: false, isCorrect: false, questionIndex: -1 });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setFeedback({ show: false, isCorrect: false, questionIndex: -1 });
    }
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    quizzes.forEach((quiz, index) => {
      if (selectedAnswers[index] === quiz.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / quizzes.length) * 100);
    setScore(percentage);
    setShowResults(true);

    // Save quiz attempt to Supabase
    await saveQuizAttempt(lessonId, correctCount, quizzes.length);
  };

  if (quizzes.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-slate-400">Quiz não encontrado</p>
      </div>
    );
  }

  const correctAnswersCount = selectedAnswers.reduce((count, answer, index) => {
    return count + (answer === quizzes[index]?.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href={`/subjects/${subject}/${grade}/${lessonId}`}
          className="text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block"
        >
          ← Voltar
        </Link>
        <h1 className="text-4xl font-bold text-white mb-2">
          {info?.icon} Quiz
        </h1>
        <p className="text-slate-400">
          {quizzes.length} pergunta{quizzes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {!showResults ? (
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold">
                Pergunta {currentQuestionIndex + 1} de {quizzes.length}
              </span>
              <span className="text-slate-400">
                {Math.round(((currentQuestionIndex + 1) / quizzes.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${((currentQuestionIndex + 1) / quizzes.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? "border-blue-500 bg-blue-500/10 text-white"
                      : "border-slate-700 bg-slate-700/30 text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? "border-blue-500 bg-blue-500"
                          : "border-slate-500"
                      }`}
                    >
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback Animation */}
            {feedback.show && feedback.questionIndex === currentQuestionIndex && (
              <div className={`mb-6 p-4 rounded-lg text-center font-bold transition-all animate-bounce-in ${
                feedback.isCorrect
                  ? "bg-green-500/20 border border-green-500 text-green-400"
                  : "bg-red-500/20 border border-red-500 text-red-400"
              }`}>
                <div className="text-2xl mb-2">
                  {feedback.isCorrect ? "✓" : "✕"}
                </div>
                <div>
                  {feedback.isCorrect ? "Correto! +10 pontos" : "Incorreto! Tente novamente"}
                </div>
              </div>
            )}

            {/* Confirm Answer Button */}
            {selectedAnswers[currentQuestionIndex] !== undefined && !confirmedAnswers.has(currentQuestionIndex) && (
              <button
                onClick={handleConfirmAnswer}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mb-4"
              >
                Confirmar Resposta
              </button>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mb-4">
              {confirmedAnswers.has(currentQuestionIndex) ? (
                <>
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === quizzes.length - 1}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    Próxima Pergunta
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0 || confirmedAnswers.size === 0}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === quizzes.length - 1}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    Próximo →
                  </button>
                </>
              )}
            </div>

            {currentQuestionIndex === quizzes.length - 1 && confirmedAnswers.has(currentQuestionIndex) && (
              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Enviar Quiz
              </button>
            )}
          </div>

          {/* Question Indicators */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <p className="text-sm text-slate-400 mb-3">Navegação rápida</p>
            <div className="flex flex-wrap gap-2">
              {quizzes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-lg font-bold transition-all ${
                    index === currentQuestionIndex
                      ? "bg-blue-600 text-white"
                      : selectedAnswers[index] !== undefined
                      ? "bg-slate-700 text-white hover:bg-slate-600"
                      : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">
              {score >= 70 ? "🎉" : score >= 50 ? "👍" : "📚"}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Seu Score: {score}%
            </h2>
            <p className="text-slate-400 mb-6">
              {score >= 70
                ? "Excelente! Você domina este conteúdo!"
                : score >= 50
                ? "Bom desempenho! Continue praticando."
                : "Continue estudando para melhorar seu resultado."}
            </p>

            <div className="bg-slate-700/50 rounded-lg p-4 mb-6 text-left">
              <p className="text-white mb-2">
                <strong>Resultado:</strong> {correctAnswersCount} de{" "}
                {quizzes.length} acertos
              </p>
              <p className="text-slate-400">
                Você ganhou <strong className="text-yellow-400">
                  {score >= 70 ? 100 : score >= 50 ? 50 : 0}
                </strong> pontos!
              </p>
            </div>
          </div>

          {/* Review Answers */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Revisar Respostas</h3>
            {quizzes.map((quiz, index) => {
              const isCorrect = selectedAnswers[index] === quiz.correctAnswer;
              return (
                <div
                  key={quiz.id}
                  className={`border-l-4 rounded-lg p-4 ${
                    isCorrect
                      ? "bg-green-900/20 border-green-600"
                      : "bg-red-900/20 border-red-600"
                  }`}
                >
                  <p className="text-white font-bold mb-2">
                    Pergunta {index + 1}: {quiz.question}
                  </p>
                  <p
                    className={`mb-2 ${
                      isCorrect ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isCorrect ? "✓ Correto" : "✗ Incorreto"}
                  </p>
                  <p className="text-slate-300 mb-2">
                    Sua resposta: {quiz.options[selectedAnswers[index]]}
                  </p>
                  {!isCorrect && (
                    <p className="text-slate-300 mb-2">
                      Resposta correta: {quiz.options[quiz.correctAnswer]}
                    </p>
                  )}
                  <p className="text-slate-400 text-sm">{quiz.explanation}</p>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href={`/subjects/${subject}/${grade}`}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors text-center"
            >
              ← Voltar às Aulas
            </Link>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswers([]);
                setShowResults(false);
                setScore(0);
                setConfirmedAnswers(new Set());
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Refazer Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
