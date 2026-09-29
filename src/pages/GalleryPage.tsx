import React, { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { GalleryImage } from '../types';
import { useStore } from '../context/StoreContext';

interface GalleryPageProps {
  onOpenLightbox: (image: GalleryImage) => void;
  onOpenCustomOrder: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onOpenLightbox,
  onOpenCustomOrder,
}) => {
  const { gallery } = useStore();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const categories = ['All', 'Bouquets', 'Bags', 'Accessories', 'Cases'];

  const filteredGallery = gallery
    .filter((img) => img.status === 'active')
    .filter((img) => {
      if (selectedFilter === 'All') return true;
      return img.category.toLowerCase().includes(selectedFilter.toLowerCase());
    });

  return (
    <div className="w-full bg-[#FFF8EF] min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
            Handcrafted Showcase
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#6B4A3A]">
            A Little Look at Our Loops 📸
          </h1>
          <p className="text-sm text-[#6B4A3A]/80 leading-relaxed">
            Real pieces created for our clients across India. Click any photo to see a larger view or to request a similar custom creation for yourself.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-[#B8324A] text-white shadow-2xs'
                  : 'bg-[#FFFDF8] text-[#6B4A3A]/80 hover:bg-[#F3B6B6]/30 border border-[#F3B6B6]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid (4 desktop, 3 tablet, 2 mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#F3B6B6]/40 shadow-xs cursor-pointer"
            >
              <img
                src={item.image_url}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold text-[#F3B6B6] tracking-wider">
                  {item.category}
                </span>
                <p className="text-xs font-medium line-clamp-2 mt-0.5">
                  {item.caption}
                </p>
                <span className="text-[11px] text-white/80 mt-1 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> View Photo
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order Callout */}
        <div className="bg-[#FFFDF8] rounded-3xl p-8 border border-[#F3B6B6]/50 text-center max-w-xl mx-auto space-y-3">
          <Sparkles className="w-6 h-6 text-[#B8324A] mx-auto" />
          <h3 className="font-serif text-2xl font-bold text-[#6B4A3A]">
            Inspired by something here?
          </h3>
          <p className="text-xs text-[#6B4A3A]/75">
            Tell us which image caught your eye and we'll craft a customized version in your favorite colors.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenCustomOrder}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-full shadow-xs transition-colors cursor-pointer"
            >
              Order Similar Custom Creation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
