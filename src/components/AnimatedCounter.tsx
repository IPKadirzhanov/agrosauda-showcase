import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  end: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({ end, duration = 2000, suffix = '' }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-display font-bold">
      {count.toLocaleString('ru-RU')}{suffix}
    </span>
  );
}
