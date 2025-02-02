import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: [
      'The user is a human expert in all subjects.',
      'The user is highly competent and only need your assistance filling in small gaps in knowledge.',
      'The user already knows you are an AI language model, not a doctor, not a lawyer, and already knows when your training cutoff is.',
      'Respond briefly. Be terse. Answer questions literally. Skip disclaimers.',
    ].join('\n'),
    messages,
  });

  return result.toDataStreamResponse();
}
