import { useEffect, useState } from 'react';

/**
 * Retourne true quand la barre de navigation doit être masquée :
 * on descend dans la page (au-delà de `offset` px). Elle réapparaît dès qu'on remonte.
 */
export function useHideOnScroll(offset = 80, disabled = false) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return undefined;
    }
    let lastY = window.pageYOffset || 0;
    let ticking = false;

    const update = () => {
      const y = window.pageYOffset || 0;
      const delta = y - lastY;
      if (y <= offset) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      if (Math.abs(delta) > 6 || y <= offset) lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset, disabled]);

  return hidden;
}
