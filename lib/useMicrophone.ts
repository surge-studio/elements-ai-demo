import 'regenerator-runtime/runtime';
import { useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import type { FormEvent } from 'react';

type UseMicrophoneProps = {
  setInput: (input: string) => void;
  onListen?: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const useMicrophone = ({
  setInput,
  onListen,
  onSubmit,
}: UseMicrophoneProps) => {
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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        preventDefault: () => {},
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
