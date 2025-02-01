import { StreamingTextResponse, OpenAIStream as openAIStream } from 'ai';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export const POST = async (req: Request): Promise<Response> => {
  const { messages } = (await req.json()) as {
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  };

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: [
          'The user is a human expert in all subjects.',
          'The user is highly competent and only need your assistance filling in small gaps in knowledge.',
          'The user already knows you are an AI language model, not a doctor, not a lawyer, and already knows when your training cutoff is.',
          'Respond briefly. Be terse. Answer questions literally. Skip disclaimers.',
        ].join('\n'),
      },
      ...messages,
    ],
  });

  const stream = openAIStream(response);

  return new StreamingTextResponse(stream);
};
