import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Cover } from './Cover';
import { COVER_IMAGES } from '../../../utils/coverImages';

export function CoverWithSlider() {
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);

  const handlePrevCover = () => {
    if (currentCoverIndex > 0) {
      setCurrentCoverIndex(currentCoverIndex - 1);
    }
  };

  const handleNextCover = () => {
    if (currentCoverIndex < 2) {
      setCurrentCoverIndex(currentCoverIndex + 1);
    }
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-4 z-10 print:hidden">
        <button
          onClick={handlePrevCover}
          disabled={currentCoverIndex === 0}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Previous cover design"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextCover}
          disabled={currentCoverIndex === COVER_IMAGES.length - 1}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Next cover design"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Cover display */}
      <Cover coverIndex={currentCoverIndex} />
    </div>
  );
}
