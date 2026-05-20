"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapFloat(distance = 16, duration = 3) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.to(ref.current, {
      y: distance,
      rotate: 2,
      duration,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    return () => tween.kill();
  }, [distance, duration]);

  return ref;
}
