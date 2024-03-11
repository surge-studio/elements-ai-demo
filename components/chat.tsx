'use client';

import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';
import {
  EllipsisIcon,
  MicIcon,
  SendHorizonalIcon,
  Volume2Icon,
  VolumeXIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSpeech } from '@/lib/useSpeech';
import { useMicrophone } from '@/lib/useMicrophone';
import { AIVisual } from './ai-visual';
import { ChatMessage } from './chat-message';
import type { FC } from 'react';
import { Logo } from './logo';
import { SocialLinks } from './social-links';

export const Chat: FC = () => {
  const [isAsleep, setIsAsleep] = useState(false);

  // Speaking
  const {
    isSpeaking,
    isSpeechEnabled,
    setIsSpeechEnabled,
    handleFirstInteraction,
    handleSpeech,
    stopSpeaking,
  } = useSpeech();

  // Chat
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    onFinish: (message) => {
      handleSpeech({ message: message.content });
    },
  });

  // Listening
  const { isListening, handleListen } = useMicrophone({
    setInput,
    onListen: () => {
      stopSpeaking();
    },
    onSubmit: handleSubmit,
  });

  // Interaction
  const handleWindowClick = () => {
    setIsAsleep(false);
    handleFirstInteraction();
  };

  useEffect(() => {
    setIsAsleep(false);
    const timeout = setTimeout(
      () => {
        if (!isSpeaking && !isListening && !isLoading) {
          setIsAsleep(true);
        }
      },
      // 5 minutes
      1000 * 60 * 5
    );

    return () => clearTimeout(timeout);
  }, [input, messages, isSpeaking, isListening, isLoading]);

  return (
    <div
      onClick={handleWindowClick}
      className="h-full w-full px-4 md:p-8 lg:p-16"
    >
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between w-full py-6 shrink-0">
          <div className="w-full">
            <Logo />
          </div>
          <AIVisual
            isThinking={isLoading}
            isSpeaking={isSpeaking}
            isListening={isListening}
            isAsleep={isAsleep}
          />
          <div className="w-full">
            <SocialLinks />
          </div>
        </div>
        <div className="flex flex-col flex-1 w-full">
          <div className="flex flex-1 min-h-[256px] flex-col gap-4 overflow-y-auto">
            <AnimatePresence>
              {messages.slice(-2).map((message) => (
                <motion.div
                  key={message.id}
                  className="w-full"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <ChatMessage message={message} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="py-4 md:py-6">
            <div className="relative flex items-center w-full gap-2">
              <form onSubmit={handleSubmit} className="w-full ">
                <input
                  value={input}
                  placeholder={isListening ? 'Listening...' : 'Ask me anything'}
                  onChange={handleInputChange}
                  className="rounded-full h-12 w-full bg-white/5 px-6 outline-none text-white transition placeholder-white/50"
                  disabled={isListening}
                />
              </form>
              <button
                type="button"
                className="h-12 shrink-0 w-12 bg-white/5 flex justify-center items-center transition rounded-full select-none hover:bg-white/10"
                onClick={handleListen}
              >
                {isListening ? (
                  {
                    ...(input ? <SendHorizonalIcon /> : <EllipsisIcon />),
                  }
                ) : (
                  <MicIcon />
                )}
              </button>
              <button
                type="button"
                className="h-12 shrink-0 w-12 bg-white/5 flex justify-center items-center transition rounded-full select-none hover:bg-white/10"
                onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
              >
                {isSpeechEnabled ? <Volume2Icon /> : <VolumeXIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
