"use client";

import { useEffect, useState } from "react";

interface AchievementToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function AchievementToast({ message, show, onClose }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !isVisible) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-white/20 max-w-sm">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎉</div>
          <div>
            <p className="font-bold text-lg">Conquista Desbloqueada!</p>
            <p className="text-sm text-white/90">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
