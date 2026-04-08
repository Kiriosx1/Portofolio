import { useEffect } from 'react';
import { toast } from 'sonner';

export default function KonamiCode({ onFlagFound }) {
  useEffect(() => {
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentSequence = [];

    const handleKeyDown = (e) => {
      currentSequence.push(e.key);
      currentSequence.splice(-secretCode.length - 1, currentSequence.length - secretCode.length);

      if (currentSequence.join('').includes(secretCode.join(''))) {
        onFlagFound('konami');
        
        // Glitch effect
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        
        setTimeout(() => {
          document.body.style.filter = 'none';
        }, 5000);

        currentSequence = [];
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onFlagFound]);

  return null;
}