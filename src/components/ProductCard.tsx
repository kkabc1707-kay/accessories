import React from 'react';
import { MessageCircle, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const { categories, getWhatsAppLink } = useStore();
  const category = categories.find((c) => c.id === product.category_id);

  const handleOrderWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getWhatsAppLink('product', { name: product.name });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group relative bg-[#FFFDF8] rounded-2xl overflow-hidden border border-[#F3B6B6]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#FFF8EF]">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle availability marker */}
        {product.availability === 'made_to_order' && (
          <div className="absolute top-3 left-3 bg-[#FFFDF8]/90 backdrop-blur-xs text-[#6B4A3A] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#F3B6B6]/40 flex items-center gap-1 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#B8324A]" />
            <span>Made to Order</span>
          </div>
        )}

        {/* Quick view overlay icon on desktop */}
        <div className="absolute inset-0 bg-[#6B4A3A]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-[#FFFDF8]/95 text-[#6B4A3A] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category text separator (Zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-[#6B4A3A]/70 mb-1.5 font-medium">
            <span>{category?.name || 'Crochet Creation'}</span>
            {product.customizable && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#718B68]">Customizable</span>
              </>
            )}
          </div>

          <h3 className="font-serif text-lg font-semibold text-[#6B4A3A] group-hover:text-[#B8324A] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#6B4A3A]/75 mt-1.5 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-5 pt-3.5 border-t border-[#F3B6B6]/20 flex items-center justify-between gap-3">
          <div>
            {product.price ? (
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#6B4A3A]/60 font-medium">
                  Price
                </span>
                <span className="font-semibold text-base text-[#B8324A] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>
            ) : (
              <span className="text-xs font-medium text-[#718B68]">
                Price on Request
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
              className="px-3 py-1.5 text-xs font-medium text-[#6B4A3A] bg-[#FFF8EF] hover:bg-[#F3B6B6]/30 rounded-lg transition-colors cursor-pointer"
            >
              Details
            </button>
            <button
              type="button"
              onClick={handleOrderWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-lg shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
