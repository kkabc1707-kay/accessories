import React from 'react';
import officialLogoImg from '../assets/images/leisure_loopz_official_logo_1790431932849.jpg';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'mark';
  iconSize?: number;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  iconSize = 44,
  showSubtitle = true,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Real circular logo badge with soft pink heart and loops of love */}
      <div 
        className="relative shrink-0 rounded-full overflow-hidden shadow-xs border border-[#F3B6B6]/60 bg-[#FFFDF8] transition-transform duration-200 hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <img
          src={officialLogoImg}
          alt="Loops of love - Leisure Loopz"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {variant === 'full' && (
        <div className="flex flex-col text-left">
          <span className="font-serif font-bold text-lg sm:text-xl leading-tight tracking-tight text-[#6B4A3A]">
            Leisure Loopz
          </span>
          {showSubtitle && (
            <span className="text-[10px] tracking-wider text-[#B8324A] font-semibold uppercase">
              Loops of love
            </span>
          )}
        </div>
      )}
    </div>
  );
};
