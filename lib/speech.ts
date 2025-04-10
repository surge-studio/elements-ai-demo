import { useCallback, useEffect, useState } from 'react';
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
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
  const [ready, setReady] = useState<boolean>(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState<boolean>(true);

  const handleFirstInteraction = () => {
    if (!ready) {
      const audio = new Audio();
      setAudioElement(audio);
      setReady(true);
    }
  };

  const playSpeech = useCallback(
    async (blob: Blob) => {
      if (audioElement) {
        const src = URL.createObjectURL(blob);
        audioElement.src = src;
        audioElement.muted = false;
        setIsSpeaking(true);
        await audioElement.play();
      }
    },
    [audioElement]
  );

  const handleSpeech = useCallback(
    async ({ message }: { message?: string }) => {
      if (!isSpeechEnabled || !message) {
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
    if (audioElement) {
      audioElement.src = '';
    }
  }, [audioElement]);

  useEffect(() => {
    if (!audioElement) {
      return undefined;
    }
    const handlePause = () => {
      stopSpeaking();
    };
    const handleEnded = () => {
      stopSpeaking();
    };
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);
    return () => {
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioElement, stopSpeaking]);

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
