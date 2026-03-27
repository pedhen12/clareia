"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatRoom from "@/components/chat/ChatRoom";
import { MessageCircle, Users, Sparkles, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase-client";

export default function ChatPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuth();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Acesso Restrito
          </h2>
          <p className="text-gray-600 mb-6">
            O chat é exclusivo para estudantes cadastrados. Faça login para
            conectar-se com a comunidade!
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            Fazer Login
          </button>
          <button
            onClick={() => router.push("/cadastro")}
            className="w-full mt-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors"
          >
            Criar Conta Grátis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">
              Chat em Tempo Real
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💬 Comunidade Clareia
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conecte-se com outros estudantes, tire dúvidas, compartilhe
            materiais e estude junto!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Tempo Real</h3>
                <p className="text-sm text-gray-600">
                  Mensagens instantâneas
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Comunidade</h3>
                <p className="text-sm text-gray-600">
                  Centenas de estudantes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Colaboração</h3>
                <p className="text-sm text-gray-600">Ajude e seja ajudado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <ChatRoom />
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            📜 Regras da Comunidade
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Seja respeitoso com todos os colegas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>
                Compartilhe dúvidas e materiais de estudo relacionados aos
                concursos
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Ajude outros estudantes quando possível</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>
                Não compartilhe spam, links suspeitos ou conteúdo ofensivo
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-0.5">✗</span>
              <span>Não divulgue informações pessoais sensíveis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
