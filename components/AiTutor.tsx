"use client";

import { useState, useRef, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AiTutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou seu assistente educacional. Sinta-se à vontade para fazer perguntas sobre matemática, português, história, geografia ou inglês. Estou aqui para ajudá-lo! 📚",
    },
  ]);
  const [input, setInput] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiConfigured, setApiConfigured] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setLastUserMessage(input);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (response.status === 503) {
        setApiConfigured(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Desculpe, o assistente de IA não está configurado no momento. Por favor, adicione a chave da API Groq para usar este recurso.",
          },
        ]);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ops! O tutor está indisponível. Tente novamente em alguns segundos.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-100"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-slate-100 rounded-lg p-3">
              <LoadingSpinner />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {apiConfigured ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Enviar
          </button>
        </form>
      ) : (
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 text-yellow-400 text-sm">
          O assistente de IA não está disponível. Configure a chave API Groq
          para usar este recurso.
        </div>
      )}
      {messages[messages.length - 1]?.content.includes("Ops!") && (
        <button onClick={() => { setInput(lastUserMessage); }} className="mt-2 text-blue-400 hover:text-blue-300 text-sm underline">
          🔄 Tentar novamente
        </button>
      )}
    </div>
  );
}
