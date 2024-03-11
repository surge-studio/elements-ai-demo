import { useState, useEffect, useCallback } from 'react';
import { processSystemSpeech } from './utils';

export const useSpeech = () => {
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
      if (!isSpeechEnabled || !message) return;
      const processedContent = processSystemSpeech(message);

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
        await playSpeech(blob);
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
    if (audioElement) {
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
    }
    return () => {
      //
    };
  }, [audioElement, stopSpeaking]);

  return {
    isSpeaking,
    isSpeechEnabled,
    setIsSpeechEnabled,
    handleFirstInteraction,
    handleSpeech,
    stopSpeaking,
  };
};
