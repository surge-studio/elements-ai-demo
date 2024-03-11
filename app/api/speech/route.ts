if (!process.env.SPEECH_KEY || !process.env.SPEECH_REGION) {
  throw new Error('SPEECH_KEY / SPEECH_REGION not set.');
}

type HandlerProps = {
  message?: string;
};

export const POST = async (req: Request): Promise<Response> => {
  const { message } = (await req.json()) as HandlerProps;

  if (!message) {
    return new Response('No message in the request', { status: 400 });
  }

  const voice = 'en-US-AndrewNeural';
  const rate = 8;
  const pitch = -4;
  const style = 'default';

  const response = await fetch(
    `https://${process.env.SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.SPEECH_KEY ?? '',
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'Elements AI Demo',
      },
      method: 'POST',
      body: `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US"><voice name="${voice}"><mstts:express-as style="${style}"><prosody rate="${rate}%" pitch="${pitch}%">${message}</prosody></mstts:express-as></voice></speak>`,
    }
  );

  if (!response.ok) {
    return new Response(`Error generating speech ${response.status}`, {
      status: 500,
    });
  }

  const blob = await response.blob();
  return new Response(blob);
};
