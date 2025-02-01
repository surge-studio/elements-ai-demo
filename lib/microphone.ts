import 'regenerator-runtime/runtime';
import { useEffect } from 'react';
import type { FormEvent } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

type UseMicrophoneProps = {
  setInput: (input: string) => void;
  onListen?: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type UseMicrophoneResponse = {
  transcript: string;
  isListening: boolean;
  handleListen: () => Promise<void>;
};

export const useMicrophone = ({
  setInput,
  onListen,
  onSubmit,
}: UseMicrophoneProps): UseMicrophoneResponse => {
  const {
    transcript,
    listening: isListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleListen = async () => {
    if (!browserSupportsSpeechRecognition) {
      return;
    }

    if (isListening) {
      await SpeechRecognition.stopListening();
      onSubmit({
        preventDefault: () => {
          // No default action needed
        },
      } as FormEvent<HTMLFormElement>);
      resetTranscript();
      setInput('');
    } else {
      onListen?.();
      await SpeechRecognition.startListening({
        continuous: true,
      });
    }
  };

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [setInput, transcript]);

  return { transcript, isListening, handleListen };
};
