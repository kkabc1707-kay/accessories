import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import { GalleryImage } from '../types';
import { useStore } from '../context/StoreContext';

interface ImageLightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
  onCustomOrder?: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  image,
  onClose,
  onCustomOrder,
}) => {
  const { getWhatsAppLink } = useStore();

  if (!image) return null;

  const handleInquire = () => {
    const url = getWhatsAppLink('custom', { details: image.caption });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6B4A3A]/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-3xl w-full bg-[#FFFDF8] rounded-2xl overflow-hidden shadow-2xl border border-[#F3B6B6]/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FFF8EF] border border-[#F3B6B6]/50 text-[#6B4A3A] hover:text-[#B8324A] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative aspect-4/3 max-h-[70vh] bg-[#FFF8EF]">
          <img
            src={image.image_url}
            alt={image.caption}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6 bg-[#FFFDF8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#F3B6B6]/30">
          <div>
            <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
              {image.category}
            </span>
            <p className="font-serif text-lg text-[#6B4A3A] font-semibold mt-0.5">
              {image.caption}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleInquire}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-xl transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire Like This</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
