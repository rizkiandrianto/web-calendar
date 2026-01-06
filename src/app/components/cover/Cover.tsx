import { useState, useEffect, useRef } from 'react';
import { COVER_IMAGES, DEFAULT_COVER_POSITIONS } from '../../../utils/coverImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CoverProps {
  coverIndex: number; // 0, 1, or 2
}

export function Cover({ coverIndex }: CoverProps) {
  const [imagePosition, setImagePosition] = useState<number>(DEFAULT_COVER_POSITIONS[coverIndex] || 0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef<number>(0);
  const dragStartPosition = useRef<number>(0);

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem(`cover-image-position-${coverIndex}`);
    if (savedPosition !== null) {
      setImagePosition(parseFloat(savedPosition));
    } else {
      setImagePosition(DEFAULT_COVER_POSITIONS[coverIndex] || 0);
    }
  }, [coverIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartPosition.current = imagePosition;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY.current;
    const newPosition = dragStartPosition.current + deltaY;
    setImagePosition(newPosition);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Save to localStorage
      localStorage.setItem(`cover-image-position-${coverIndex}`, imagePosition.toString());
    }
  };

  // Add global mouse event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, imagePosition]);

  // Touch event handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartY.current = e.touches[0].clientY;
    dragStartPosition.current = imagePosition;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - dragStartY.current;
    const newPosition = dragStartPosition.current + deltaY;
    setImagePosition(newPosition);
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem(`cover-image-position-${coverIndex}`, imagePosition.toString());
    }
  };

  // Add global touch event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, imagePosition]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-[21cm] h-[14.8cm] aspect-[21/15] bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col">
        {/* Spiral Binding Effect */}
        <div className="absolute top-0 left-0 w-full h-8 justify-around px-4 z-10 pointer-events-none hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="w-1 h-5 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 rounded-full border border-neutral-400 shadow-sm -mt-2"
            />
          ))}
        </div>

        {/* Main Image Container */}
        <div className="relative flex-grow overflow-hidden">
          <div
            className={`absolute inset-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <ImageWithFallback
              src={COVER_IMAGES[coverIndex]}
              alt="Family Photo"
              className="w-full h-full object-cover pointer-events-none"
              style={{
                objectPosition: `0 ${imagePosition}px`,
              }}
            />
          </div>
          {/* Gradient fade to match the bottom white section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        {/* Text Content */}
        <div className="bg-white px-8 pb-8 pt-2 flex flex-col items-center text-[#555b5e] text-center">
          <h1 className="text-7xl md:text-[280px] font-dancing -mt-[240px] ml-[10px] relative z-20 lowercase tracking-tight dancing-script-bold pointer-events-none">calendar</h1>

          <div className="mt-4 flex flex-col gap-1">
            <p className="text-3xl md:text-4xl font-light tracking-[0.2em]">2026</p>
            <p className="text-xs font-medium tracking-[0.3em] uppercase mt-1">{import.meta.env.VITE_COVER_TEXT || 'John Doe Family'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
