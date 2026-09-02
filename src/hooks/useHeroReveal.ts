import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHeroReveal(rootRef: RefObject<HTMLElement | null>, animationKey?: string | number) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-hero-kicker]", { opacity: 0, y: 14, duration: 0.45, ease: "power3.out" });
      gsap.from("[data-hero-title] span", {
        opacity: 0,
        y: 44,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.04,
      });
      gsap.from("[data-hero-copy], [data-hero-actions]", {
        opacity: 0,
        y: 18,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 85%", once: true },
          },
        );
      });
    }, root);

    return () => context.revert();
  }, [rootRef, animationKey]);
}
