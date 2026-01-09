'use client';

import { useMicrophone } from '@/lib/microphone';
import { useSpeech } from '@/lib/speech';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import {
  EllipsisIcon,
  MicIcon,
  SendHorizonalIcon,
  Volume2Icon,
  VolumeXIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FC, FormEvent } from 'react';
import { AIVisual } from './ai-visual';
import { ChatMessage } from './chat-message';
import { Logo } from './logo';
import { SocialLinks } from './social-links';

export const Chat: FC = () => {
  const [isAsleep, setIsAsleep] = useState(false);
  const [input, setInput] = useState('');

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
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    onFinish: async (options) => {
      const textContent = options.message.parts
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join('');
      await handleSpeech({ message: textContent });
    },
    onError: (error) => {
      // biome-ignore lint/suspicious/noConsole: error logging
      console.error('Chat error:', error);
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (!input.trim()) {
      return;
    }

    sendMessage({ text: input });
    setInput('');
  };

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: simple idle detection
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
    // biome-ignore lint/nursery/noStaticElementInteractions: first interaction capture
    // biome-ignore lint/a11y/useKeyWithClickEvents: first interaction capture
    <div
      onClick={handleWindowClick}
      className="h-full w-full px-4 md:p-8 lg:p-16"
    >
      <div className="mx-auto flex h-full max-w-4xl flex-col">
        <div className="flex w-full shrink-0 items-center justify-between py-6">
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
        <div className="flex w-full flex-1 flex-col">
          <div className="flex min-h-64 flex-1 flex-col gap-4 overflow-y-auto">
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
            <div className="relative flex w-full items-center gap-2">
              <form onSubmit={handleSubmit} className="w-full ">
                <input
                  value={input}
                  placeholder={isListening ? 'Listening...' : 'Ask me anything'}
                  onChange={(event) => setInput(event.target.value)}
                  className="h-12 w-full rounded-full bg-white/5 px-6 text-white placeholder-white/50 outline-hidden ring-purple-600 ring-offset-2 ring-offset-gray-900 transition focus-visible:ring-2"
                  disabled={isListening}
                  aria-label="Ask me anything"
                />
              </form>
              <button
                type="button"
                className="flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-full bg-white/5 outline-hidden ring-purple-600 ring-offset-2 ring-offset-gray-900 transition hover:bg-white/10 focus-visible:ring-2"
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
                className="flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-full bg-white/5 outline-hidden ring-purple-600 ring-offset-2 ring-offset-gray-900 transition hover:bg-white/10 focus-visible:ring-2"
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
