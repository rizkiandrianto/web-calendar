import { COVER_IMAGES } from '../../utils/coverImages';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Cover() {
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
          <ImageWithFallback
            src={COVER_IMAGES[0]}
            alt="Family Photo"
            className="object-cover object-[0_-550px]"
          />
          {/* Gradient fade to match the bottom white section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Text Content */}
        <div className="bg-white px-8 pb-8 pt-2 flex flex-col items-center text-[#555b5e] text-center">
          <h1 className="text-7xl md:text-[280px] font-dancing -mt-[240px] ml-[10px] relative z-20 lowercase tracking-tight dancing-script-bold">calendar</h1>

          <div className="mt-4 flex flex-col gap-1">
            <p className="text-3xl md:text-4xl font-light tracking-[0.2em]">2026</p>
            <p className="text-xs font-medium tracking-[0.3em] uppercase mt-1">Keluarga RAN</p>
          </div>
        </div>
      </div>
    </div>
  );
}
