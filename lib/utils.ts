export const processSystemSpeech = (input: string): string => {
  if (!input) return '';
  let output = input;

  // dont include code blocks, removing anything starting with ``` and starting again with the next ```
  const codeBlockRegex = /```[\s\S]*?```/gu;
  output = output.replace(codeBlockRegex, '');

  return output;
};
