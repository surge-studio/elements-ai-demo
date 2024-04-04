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
import { Logo } from './logo';
import { SocialLinks } from './social-links';
import type { FC } from 'react';

export const Chat: FC = () => {
  const [isAsleep, setIsAsleep] = useState(false);

  // Speaking
  const {
    isLoadingSpeech,
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
    onFinish: async (message) => {
      await handleSpeech({ message: message.content });
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={handleWindowClick}
      className="w-full h-full px-4 md:p-8 lg:p-16"
    >
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        <div className="flex items-center justify-between w-full py-6 shrink-0">
          <div className="w-full">
            <Logo />
          </div>
          <AIVisual
            isThinking={isLoading || isLoadingSpeech}
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
                  initial={{ opacity: 0, height: 'auto' }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  layout="position"
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
                  className="w-full h-12 px-6 text-white transition rounded-full outline-none bg-white/5 placeholder-white/50 focus-visible:ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-600"
                  disabled={isListening}
                  aria-label="Ask me anything"
                />
              </form>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 transition rounded-full outline-none select-none shrink-0 bg-white/5 hover:bg-white/10 focus-visible:ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-600"
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
                className="flex items-center justify-center w-12 h-12 transition rounded-full outline-none select-none shrink-0 bg-white/5 hover:bg-white/10 focus-visible:ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-600"
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
