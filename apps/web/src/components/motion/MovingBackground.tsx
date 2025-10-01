import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@repo/ui/lib/utils";

const MovingDotsBackground = ({
  numDots = 50,
  minSize = 1,
  maxSize = 2,
  className,
}: {
  numDots?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // prevents hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const dots = useMemo(() => {
    return Array.from({ length: numDots }).map(() => ({
      id: crypto.randomUUID(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: 5 + Math.random() * 10,
      opacityRange: [Math.random() * 0.04 + 0.1, Math.random() * 0.05 + 0.3],
    }));
  }, [numDots, minSize, maxSize]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn("absolute inset-0 -z-50 overflow-hidden", className)}
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="bg-foreground/70 absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            x: [-20, 20, 0, -20],
            y: [-40, 0, 40, -40],
            opacity: [
              dot.opacityRange[0],
              dot.opacityRange[1],
              dot.opacityRange[0],
            ],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default MovingDotsBackground;
