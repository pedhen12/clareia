"use client";

import { useState, useEffect, useRef } from "react";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load sessions from localStorage
    const savedSessions = localStorage.getItem("pomodoro_sessions");
    if (savedSessions) {
      setSessions(parseInt(savedSessions));
    }
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setIsRunning(false);
      
      if (!isBreak) {
        // Study session completed
        const newSessions = sessions + 1;
        setSessions(newSessions);
        localStorage.setItem("pomodoro_sessions", newSessions.toString());
        showNotification("Hora de descansar! ☕");
        setIsBreak(true);
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        // Break completed
        showNotification("Volte a estudar! 📚");
        setIsBreak(false);
        setTimeLeft(25 * 60); // 25 minute study
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, isBreak, sessions]);

  const showNotification = (message: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Clareia Pomodoro", { body: message });
    } else {
      alert(message);
    }
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const handleStart = () => {
    requestNotificationPermission();
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        🍅 Timer Pomodoro
      </h3>
      
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-white mb-2">
          {formatTime(timeLeft)}
        </div>
        <div className="text-sm text-slate-400">
          {isBreak ? "Tempo de Descanso" : "Tempo de Estudo"}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors text-sm"
          >
            Iniciar
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 rounded-lg transition-colors text-sm"
          >
            Pausar
          </button>
        )}
        <button
          onClick={handleReset}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition-colors text-sm"
        >
          Resetar
        </button>
      </div>

      <div className="text-center text-sm text-slate-400">
        <p>Sessões completas: <span className="text-white font-bold">{sessions}</span></p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          25 min de estudo + 5 min de descanso
        </p>
      </div>
    </div>
  );
}
