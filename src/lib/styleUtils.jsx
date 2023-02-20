export const INPUT_STYLE_CLASSES = 'appearance-none default-input';

export const getInputStyleClasses = (isError) => {
  return `${INPUT_STYLE_CLASSES} ${
    isError ? 'border-red-500' : 'border-primary/20'
  }`;
};
