import { Groq } from "groq-sdk";

let groq: Groq | null = null;

if (process.env.GROQ_API_KEY) {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

const systemPrompt = `Você é um tutor educacional chamado Clareia, especializado em ajudar estudantes brasileiros do 6º ao 9º ano. Responda sempre em português, de forma clara, simples e direta. Não use asteriscos, markdown, negrito ou qualquer formatação especial. Não se apresente a cada mensagem. Responda apenas o que foi perguntado de forma objetiva e didática. Se o aluno errar, corrija com gentileza. Responda qualquer pergunta do aluno, mas sempre priorize explicações sobre matemática, português, história, geografia e inglês do ensino fundamental.`;

export async function POST(request: Request) {
  try {
    if (!groq) {
      return Response.json(
        { error: "GROQ_API_KEY not configured" },
        { status: 503 }
      );
    }

    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      return Response.json(
        { error: "No response from API" },
        { status: 500 }
      );
    }

    return Response.json({
      role: "assistant",
      content: assistantMessage,
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return Response.json(
      { error: "Failed to get response from Groq API" },
      { status: 500 }
    );
  }
}
