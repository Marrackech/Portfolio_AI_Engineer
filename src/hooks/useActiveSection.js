import { useEffect, useState } from 'react';

/** Renvoie l'id de la section actuellement visible au centre de l'écran. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      // Repli pour les très anciens navigateurs
      const onScroll = () => {
        let current = ids[0];
        const mid = window.innerHeight * 0.4;
        elements.forEach((el) => {
          if (el.getBoundingClientRect().top <= mid) current = el.id;
        });
        setActive(current);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
