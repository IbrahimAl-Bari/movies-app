'use client'

import { useEffect, useRef, FC, ReactNode } from 'react';
import { gsap } from 'gsap';

interface GridMotionProps {
  items?: (string | ReactNode)[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(0);

  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

  }, []);

  return (
      <div ref={gridRef} className="h-full w-full absolute opacity-40 z-[-1] overflow-hidden">
        <section
            className="w-full h-screen overflow-hidden relative flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
            }}
        >
          <div className="absolute inset-0 pointer-events-none z-[4]" />
          <div className="gap-4 flex-none relative w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
            {Array.from({ length: 4 }, (_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid gap-4 grid-cols-7"
                    style={{ willChange: 'transform, filter' }}
                    ref={el => {
                      if (el) rowRefs.current[rowIndex] = el;
                    }}
                >
                  {Array.from({ length: 7 }, (_, itemIndex) => {
                    const content = combinedItems[rowIndex * 7 + itemIndex];
                    return (
                        <div key={itemIndex} className="relative">
                          <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] flex items-center justify-center text-white text-[1.5rem]">
                            {typeof content === 'string' && content.startsWith('http') ? (
                                <div
                                    className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                                    style={{ backgroundImage: `url(${content})` }}
                                />
                            ) : (
                                <div className="p-4 text-center z-[1]">{content}</div>
                            )}
                          </div>
                        </div>
                    );
                  })}
                </div>
            ))}
          </div>
          <div className="relative w-full h-full top-0 left-0 pointer-events-none" />
        </section>
      </div>
  );
};

export default GridMotion;