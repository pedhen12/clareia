import { Groq } from "groq-sdk";
import { rateLimit, getClientIP } from "@/lib/rate-limit";
import { tutorMessageSchema, formatZodError } from "@/lib/validations";

let groq: Groq | null = null;

if (process.env.GROQ_API_KEY) {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

const systemPrompt = `Você é um tutor educacional chamado Clareia, especializado em ajudar estudantes brasileiros do 6º ao 9º ano. Responda sempre em português, de forma clara, simples e direta. Não use asteriscos, markdown, negrito ou qualquer formatação especial. Não se apresente a cada mensagem. Responda apenas o que foi perguntado de forma objetiva e didática. Se o aluno errar, corrija com gentileza. Responda qualquer pergunta do aluno, mas sempre priorize explicações sobre matemática, português, história, geografia e inglês do ensino fundamental.`;

// Rate limit: 10 requests per hour per IP
const RATE_LIMIT_CONFIG = {
  maxRequests: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
};

export async function POST(request: Request) {
  const startTime = Date.now();
  const clientIP = getClientIP(request);
  
  try {
    // Check rate limit
    const rateLimitResult = rateLimit(clientIP, RATE_LIMIT_CONFIG);
    
    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      console.warn(`[AI] Rate limit exceeded for IP: ${clientIP}`);
      
      return Response.json(
        { 
          error: "Você atingiu o limite de perguntas. Tente novamente mais tarde.",
          resetAt: resetDate.toISOString(),
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetDate.toISOString(),
          }
        }
      );
    }

    if (!groq) {
      return Response.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

    const body = await request.json();
    
    // Validate request data
    const validation = tutorMessageSchema.safeParse(body);
    
    if (!validation.success) {
      console.warn(`[AI] Validation error from IP ${clientIP}:`, validation.error);
      return Response.json(
        { error: formatZodError(validation.error) },
        { status: 400 }
      );
    }

    const { messages } = validation.data;

    console.log(`[AI] Request from IP: ${clientIP}, messages: ${messages.length}`);

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
        { error: "Não foi possível obter resposta" },
        { status: 500 }
      );
    }

    const duration = Date.now() - startTime;
    console.log(`[AI] Success in ${duration}ms, IP: ${clientIP}, remaining: ${rateLimitResult.remaining}`);

    return Response.json(
      {
        role: "assistant",
        content: assistantMessage,
      },
      {
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
        }
      }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[AI] Error after ${duration}ms, IP: ${clientIP}:`, error);
    
    return Response.json(
      { error: "Erro ao processar sua pergunta. Tente novamente." },
      { status: 500 }
    );
  }
}
