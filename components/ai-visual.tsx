'use client';

// Note: for visuals that use less Rive features, you can alternatively use '@rive-app/react-canvas-lite'
import { useRive, useStateMachineInput } from '@rive-app/react-webgl2';
import { useEffect } from 'react';
import type { FC } from 'react';

const COLOR = {
  BLACK: 0,
  WHITE: 1,
  RED: 2,
  ORANGE: 3,
  YELLOW: 4,
  GREEN: 5,
  CYAN: 6,
  BLUE: 7,
  PURPLE: 8,
  PINK: 9,
} as const;

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
  // Note: if you dont get the state machine name correct it will not work
  const stateMachine = 'default';
  const { rive, RiveComponent } = useRive({
    // Note: swap in your file here
    src: '/command-1.0.0.riv',
    stateMachines: stateMachine,
    autoplay: true,
    onLoad,
  });

  const listeningInput = useStateMachineInput(rive, stateMachine, 'listening');
  const thinkingInput = useStateMachineInput(rive, stateMachine, 'thinking');
  const speakingInput = useStateMachineInput(rive, stateMachine, 'speaking');
  const asleepInput = useStateMachineInput(rive, stateMachine, 'asleep');
  // Note: not all Elements support color input
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

  return <RiveComponent className="h-[64px] w-[64px] shrink-0" />;
};
