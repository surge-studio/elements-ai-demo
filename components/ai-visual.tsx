'use client';

import {
  useRive,
  useStateMachineInput,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceColor,
} from '@rive-app/react-webgl2';
import { useEffect } from 'react';
import type { FC } from 'react';

type RGB = {
  r: number;
  g: number;
  b: number;
};

const COLORS: Record<string, RGB> = {
  default: { r: 152, g: 16, b: 250 },
  listening: { r: 255, g: 0, b: 0 },
};

type AIVisualProps = {
  isListening?: boolean;
  isThinking?: boolean;
  isSpeaking?: boolean;
  isAsleep?: boolean;
};

export const AIVisual: FC<AIVisualProps> = ({
  isListening = false,
  isThinking = false,
  isSpeaking = false,
  isAsleep = false,
}) => {
  const stateMachine = 'default'; // must match the one defined in the Rive file

  const { rive, RiveComponent } = useRive({
    src: '/command-2.0.riv', // path to your Rive file
    stateMachines: stateMachine,
    autoplay: true,
  });

  // State machine inputs

  const listeningInput = useStateMachineInput(rive, stateMachine, 'listening');
  const thinkingInput = useStateMachineInput(rive, stateMachine, 'thinking');
  const speakingInput = useStateMachineInput(rive, stateMachine, 'speaking');
  const asleepInput = useStateMachineInput(rive, stateMachine, 'asleep');
  // Legacy v1.0 products support color input (can be set to a value from 0-9)
  // const colorInput = useStateMachineInput(rive, stateMachine, 'color');

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
  }, [
    isListening,
    isThinking,
    isSpeaking,
    isAsleep,
    listeningInput,
    thinkingInput,
    speakingInput,
    asleepInput,
  ]);

  // View model and custom color handling

  const viewModel = useViewModel(rive, { useDefault: true });
  const viewModelInstance = useViewModelInstance(viewModel, {
    rive,
    useDefault: true,
  });
  const viewModelInstanceColor = useViewModelInstanceColor(
    'color',
    viewModelInstance
  );

  useEffect(() => {
    if (viewModelInstanceColor) {
      if (isListening) {
        viewModelInstanceColor.setRgb(
          COLORS.listening.r,
          COLORS.listening.g,
          COLORS.listening.b
        );
      } else {
        viewModelInstanceColor.setRgb(
          COLORS.default.r,
          COLORS.default.g,
          COLORS.default.b
        );
      }
    }
  }, [viewModelInstanceColor, isListening]);

  return <RiveComponent className="h-16 w-16 shrink-0" />;
};
