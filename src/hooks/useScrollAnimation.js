import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(ref, animationOptions = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: animationOptions.y ?? 50,
          scale: animationOptions.scale ?? 0.98,
          ...animationOptions.from
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: animationOptions.duration ?? 1,
          ease: animationOptions.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: animationOptions.start ?? 'top 85%',
            toggleActions: animationOptions.toggleActions ?? 'play none none reverse',
            ...animationOptions.scrollTrigger
          },
          ...animationOptions.to
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, animationOptions]);
}
