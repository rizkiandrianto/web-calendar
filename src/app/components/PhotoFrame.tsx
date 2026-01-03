import { ImageWithFallback } from './figma/ImageWithFallback';

interface PhotoFrameProps {
  src: string;
  alt: string;
  isPhotoLeft: boolean;
}

export function PhotoFrame({ src, alt, isPhotoLeft }: PhotoFrameProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden border-white
      ${isPhotoLeft ?
        'rounded-tr-[290px] rounded-br-[340px] border-r-8 shadow-[-6px_0px_25px_#70707b]' :
        'rounded-tl-[290px] rounded-bl-[340px] border-l-8 shadow-[6px_0px_25px_#70707b]'
      }
    `}>
      {/* Main photo with rounded corners */}
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}