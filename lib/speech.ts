import { useCallback, useRef, useState } from 'react';
import { processSystemSpeech } from './utils';

type UseSpeechResponse = {
  isLoadingSpeech: boolean;
  isSpeaking: boolean;
  isSpeechEnabled: boolean;
  setIsSpeechEnabled: (enabled: boolean) => void;
  handleFirstInteraction: () => void;
  handleSpeech: (props: { message?: string }) => Promise<void>;
  stopSpeaking: () => void;
};

export const useSpeech = (): UseSpeechResponse => {
  const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | undefined>(undefined);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState<boolean>(true);

  const handleFirstInteraction = () => {
    if (!audioElementRef.current) {
      const audio = new Audio();
      audio.addEventListener('pause', () => {
        setIsSpeaking(false);
      });
      audio.addEventListener('ended', () => {
        setIsSpeaking(false);
      });

      audioElementRef.current = audio;
    }
  };

  const playSpeech = useCallback(async (blob: Blob) => {
    if (audioElementRef.current) {
      const src = URL.createObjectURL(blob);
      audioElementRef.current.src = src;
      audioElementRef.current.muted = false;
      setIsSpeaking(true);
      await audioElementRef.current.play();
    }
  }, []);

  const handleSpeech = useCallback(
    async ({ message }: { message?: string }) => {
      if (!isSpeechEnabled || !message || !audioElementRef.current) {
        return;
      }

      const processedContent = processSystemSpeech(message);
      setIsLoadingSpeech(true);

      const speechResponse = await fetch('/api/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: processedContent,
        }),
      });

      if (speechResponse.ok) {
        const blob = await speechResponse.blob();
        setIsLoadingSpeech(false);
        await playSpeech(blob);
      } else {
        setIsLoadingSpeech(false);
      }
    },
    [isSpeechEnabled, playSpeech]
  );

  const stopSpeaking = useCallback(() => {
    setIsSpeaking(false);
    if (audioElementRef.current) {
      audioElementRef.current.src = '';
    }
  }, []);

  return {
    isLoadingSpeech,
    isSpeaking,
    isSpeechEnabled,
    setIsSpeechEnabled,
    handleFirstInteraction,
    handleSpeech,
    stopSpeaking,
  };
};
