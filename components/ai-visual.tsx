'use client';

import { useRive, useStateMachineInput } from '@rive-app/react-canvas-lite';
import { useEffect } from 'react';
import type { FC } from 'react';

enum COLOR {
  BLACK = 0,
  WHITE = 1,
  RED = 2,
  ORANGE = 3,
  YELLOW = 4,
  GREEN = 5,
  CYAN = 6,
  BLUE = 7,
  PURPLE = 8,
  PINK = 9,
}

type AIVisualProps = {
  readonly isListening?: boolean;
  readonly isThinking?: boolean;
  readonly isSpeaking?: boolean;
  readonly isAsleep?: boolean;
  readonly onLoad?: () => void;
};

export const AIVisual: FC<AIVisualProps> = ({
  isListening = false,
  isThinking = false,
  isSpeaking = false,
  isAsleep = false,
  onLoad,
}) => {
  const stateMachine = 'default';
  const { rive, RiveComponent } = useRive({
    src: '/command-1.0.0.riv',
    stateMachines: stateMachine,
    autoplay: true,
    onLoad,
  });

  const listeningInput = useStateMachineInput(rive, stateMachine, 'listening');
  const thinkingInput = useStateMachineInput(rive, stateMachine, 'thinking');
  const speakingInput = useStateMachineInput(rive, stateMachine, 'speaking');
  const asleepInput = useStateMachineInput(rive, stateMachine, 'asleep');
  const colorInput = useStateMachineInput(rive, stateMachine, 'color');

  useEffect(() => {
    if (listeningInput) {
      listeningInput.value = isListening;
    }
    if (thinkingInput) {
      thinkingInput.value = isThinking;
    }
    if (speakingInput) {
      speakingInput.value = isSpeaking;
    }
    if (asleepInput) {
      asleepInput.value = isAsleep;
    }
    if (colorInput) {
      colorInput.value = isListening ? COLOR.RED : COLOR.WHITE;
    }
  }, [
    isListening,
    isThinking,
    isSpeaking,
    isAsleep,
    listeningInput,
    thinkingInput,
    speakingInput,
    asleepInput,
    colorInput,
  ]);

  return <RiveComponent className="w-[64px] h-[64px] shrink-0" />;
};
