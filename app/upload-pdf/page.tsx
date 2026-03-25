"use client";

import { useState } from "react";

type ExtractedTopic = {
  title: string;
  chapter: string;
};

export default function UploadPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<ExtractedTopic[]>([]);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState("matematica");
  const [grade, setGrade] = useState("6");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Por favor, selecione um arquivo PDF válido");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Selecione um arquivo PDF");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Read file as text (simplified - in production use pdf.js)
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const pdfData = e.target?.result as ArrayBuffer;
          const text = new TextDecoder().decode(pdfData).substring(0, 5000);
          
          // Send to AI to extract topics
          const response = await fetch("/api/extract-topics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, subject, grade }),
          });

          if (!response.ok) throw new Error("Erro ao processar");

          const { topics: extractedTopics } = await response.json();
          setTopics(extractedTopics);
        } catch (extractError) {
          console.error(extractError);
          setError("Erro ao processar o arquivo. Tente novamente.");
        } finally {
          setLoading(false);
        }
      };
      
      reader.onerror = (readerError) => {
        console.error(readerError);
        setError("Erro ao ler arquivo");
        setLoading(false);
      };
      
      reader.readAsArrayBuffer(file);
    } catch (uploadError) {
      console.error(uploadError);
      setError("Erro ao processar o arquivo");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          📚 Upload de PDF - Aulas Personalizadas
        </h1>
        <p className="text-slate-400">
          Envie o PDF do seu livro e a IA vai sugerir tópicos para você buscar vídeos
        </p>
      </div>

      {!topics.length ? (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Matéria
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="matematica">Matemática</option>
                <option value="portugues">Português</option>
                <option value="historia">História</option>
                <option value="geografia">Geografia</option>
                <option value="ingles">Inglês</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Série
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="6">6º ano</option>
                <option value="7">7º ano</option>
                <option value="8">8º ano</option>
                <option value="9">9º ano</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Arquivo PDF do Livro
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-900/70 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="text-6xl mb-3">📄</div>
                    <p className="mb-2 text-sm text-slate-400">
                      <span className="font-semibold">Clique para fazer upload</span>
                    </p>
                    <p className="text-xs text-slate-500">Apenas arquivos PDF</p>
                    {file && (
                      <p className="mt-2 text-sm text-blue-400 font-medium">
                        ✓ {file.name}
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-4 rounded-lg transition-all disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processando PDF...
                </span>
              ) : (
                "🚀 Processar PDF"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
            <p className="text-green-400 font-medium">
              ✓ Encontramos {topics.length} tópicos no seu PDF!
            </p>
            <p className="text-green-300 text-sm mt-1">
              Copie os títulos e busque vídeos no YouTube
            </p>
          </div>

          <div className="space-y-4">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {topic.title}
                    </h3>
                    {topic.chapter && (
                      <p className="text-sm text-slate-400">
                        Capítulo: {topic.chapter}
                      </p>
                    )}
                  </div>
                  <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                    #{index + 1}
                  </span>
                </div>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${topic.title} ${subject} ${grade}º ano`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  📺 Buscar no YouTube
                </a>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setTopics([]);
              setFile(null);
            }}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors"
          >
            ← Fazer Novo Upload
          </button>
        </div>
      )}
    </div>
  );
}
