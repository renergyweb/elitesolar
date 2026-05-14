import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { messages, systemInstruction } = await request.json();

    const rawApiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    const apiKey = rawApiKey.trim().replace(/["']/g, '');
    
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
      console.error('CRITICAL ERROR: Gemini API Key is missing or is a placeholder in environment variables.');
      return NextResponse.json({ 
        error: 'Configuración incompleta', 
        details: 'La clave de API de Gemini no está configurada o es inválida en Vercel.' 
      }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: messages,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    // Create a ReadableStream to stream the response back to the client
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    console.error('Error in chat route:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
