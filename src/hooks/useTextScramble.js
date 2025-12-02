import { useState, useEffect, useCallback } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export const useTextScramble = (text) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 3; // Adjust for duration

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }

      iteration += 1;
    }, 30); // Speed of scramble

    return () => clearInterval(interval);
  }, [text, isScrambling]);

  return { displayText, scramble };
};
