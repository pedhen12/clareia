"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase-client";
import { Send, Users, Smile } from "lucide-react";

interface Message {
  id: string;
  user_name: string;
  message: string;
  created_at: string;
  likes: number;
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100);

    if (data && !error) {
      setMessages(data);
    }
  }, [supabase]);

  useEffect(() => {
    const savedName = localStorage.getItem("chat_username");
    if (savedName) {
      setUserName(savedName);
      setIsNameSet(true);
    }

    loadMessages();

    const channel = supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((current) => [...current, newMsg]);
          scrollToBottom();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          setMessages((current) =>
            current.filter((msg) => msg.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    setOnlineUsers(Math.floor(Math.random() * 50) + 10);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, loadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !userName.trim()) return;

    const { error } = await supabase.from("chat_messages").insert({
      user_name: userName,
      message: newMessage.trim(),
    });

    if (!error) {
      setNewMessage("");
    }
  }

  function setName(e: React.FormEvent) {
    e.preventDefault();
    if (!userName.trim()) return;
    localStorage.setItem("chat_username", userName);
    setIsNameSet(true);
  }

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (!isNameSet) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Bem-vindo ao Chat!
            </h2>
            <p className="text-gray-600 mt-2">
              Conecte-se com outros estudantes
            </p>
          </div>

          <form onSubmit={setName}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Digite seu nome ou apelido"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none mb-4"
              maxLength={30}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Entrar no Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6" />
            <div>
              <h2 className="font-bold text-lg">Chat da Comunidade</h2>
              <p className="text-sm text-purple-100">
                Conectado como <strong>{userName}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">{onlineUsers} online</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 h-[500px] overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Smile className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Nenhuma mensagem ainda.</p>
            <p className="text-sm">Seja o primeiro a dizer olá!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.user_name === userName;
            return (
              <div
                key={msg.id}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isOwnMessage
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-white text-gray-800 shadow"
                  }`}
                >
                  {!isOwnMessage && (
                    <p className="text-xs font-semibold text-purple-600 mb-1">
                      {msg.user_name}
                    </p>
                  )}
                  <p className="break-words">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? "text-purple-100" : "text-gray-500"
                    }`}
                  >
                    {formatTime(msg.created_at)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="bg-white border-t-2 border-gray-200 p-4 rounded-b-lg"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Dica: Use o chat para tirar dúvidas, compartilhar materiais e se
          conectar com outros estudantes!
        </p>
      </form>
    </div>
  );
}
