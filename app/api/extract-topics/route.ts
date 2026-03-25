import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text, subject, grade } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Texto do PDF não fornecido' },
        { status: 400 }
      );
    }

    // Ask AI to extract topics from the PDF text
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Você é um assistente educacional que extrai tópicos de livros didáticos. 
Analise o texto do PDF fornecido e extraia os principais tópicos/capítulos do índice.
Retorne APENAS um JSON válido no formato:
{"topics": [{"title": "Nome do Tópico", "chapter": "Número do Capítulo"}]}

Matéria: ${subject}
Série: ${grade}º ano

Foque em extrair tópicos relevantes para essa série e matéria. Se não conseguir identificar o índice, sugira tópicos comuns dessa matéria.`,
        },
        {
          role: 'user',
          content: `Extraia os tópicos principais deste texto de PDF:\n\n${text}`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    
    // Try to parse JSON from response
    let topics = [];
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        topics = parsed.topics || [];
      }
    } catch {
      // If parsing fails, create generic topics
      const subjectTopics: Record<string, string[]> = {
        matematica: ['Frações', 'Números Decimais', 'Geometria', 'Álgebra', 'Equações'],
        portugues: ['Substantivos', 'Verbos', 'Análise Sintática', 'Literatura', 'Redação'],
        historia: ['Brasil Colônia', 'Império', 'República', 'Primeira Guerra', 'Segunda Guerra'],
        geografia: ['Relevo', 'Clima', 'População', 'Economia', 'Cartografia'],
        ingles: ['Verb to Be', 'Present Simple', 'Past Simple', 'Vocabulary', 'Reading'],
      };
      
      const defaultTopics = subjectTopics[subject] || ['Tópico 1', 'Tópico 2', 'Tópico 3'];
      topics = defaultTopics.map((title, i) => ({
        title,
        chapter: `Capítulo ${i + 1}`,
      }));
    }

    return NextResponse.json({ topics });
  } catch (error) {
    console.error('Error extracting topics:', error);
    return NextResponse.json(
      { error: 'Erro ao processar PDF' },
      { status: 500 }
    );
  }
}
