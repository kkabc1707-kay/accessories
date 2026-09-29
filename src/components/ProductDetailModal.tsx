import React, { useState } from 'react';
import { X, MessageCircle, HeartHandshake, CheckCircle2, Sparkles, Ruler, Layers } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCustomOrder?: (productName?: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCustomOrder,
  onSelectProduct,
}) => {
  const { categories, products, getWhatsAppLink } = useStore();
  const [selectedImage, setSelectedImage] = useState<string>('');

  if (!product) return null;

  const currentImage = selectedImage || product.image_url;
  const category = categories.find((c) => c.id === product.category_id);
  const allImages = [
    product.image_url,
    ...(product.additional_images || []).filter((img) => img !== product.image_url),
  ];

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category_id === product.category_id || p.featured))
    .slice(0, 3);

  const handleOrderWhatsApp = () => {
    const url = getWhatsAppLink('product', { name: product.name });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomInquiry = () => {
    if (onOpenCustomOrder) {
      onOpenCustomOrder(product.name);
    } else {
      const url = getWhatsAppLink('custom', { details: `Regarding ${product.name}` });
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#6B4A3A]/40 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FFFDF8] rounded-3xl shadow-2xl border border-[#F3B6B6]/50 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FFF8EF] border border-[#F3B6B6]/50 text-[#6B4A3A] hover:text-[#B8324A] hover:bg-[#F3B6B6]/30 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 sm:p-8 bg-[#FFF8EF]/60 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#F3B6B6]/30">
            <div>
              <div className="relative aspect-4/5 sm:aspect-square rounded-2xl overflow-hidden bg-[#FFF8EF] border border-[#F3B6B6]/30 shadow-xs mb-4">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnail Strip if multiple images */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        currentImage === img
                          ? 'border-[#B8324A] ring-2 ring-[#B8324A]/20 scale-95'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick craft promise */}
            <div className="mt-6 pt-4 border-t border-[#F3B6B6]/30 text-xs text-[#6B4A3A]/75 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-[#718B68]">
                <CheckCircle2 className="w-4 h-4" /> 100% Handcrafted in Mumbai
              </span>
              <span>Ships across India 🚚</span>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs font-medium text-[#6B4A3A]/70">
                <span>{category?.name || 'Crochet Creation'}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">
                  {product.availability.replace('_', ' ')}
                </span>
                {product.customizable && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#718B68] font-semibold">Customizable</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6B4A3A] leading-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                {product.price ? (
                  <>
                    <span className="text-2xl font-bold text-[#B8324A] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#6B4A3A]/60">
                      (Taxes included · Standard craft time 3-5 days)
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-[#718B68]">
                    Price on Request based on customization
                  </span>
                )}
              </div>

              {/* Descriptions */}
              <div className="space-y-2 text-sm text-[#6B4A3A]/85 leading-relaxed pt-2">
                <p className="font-medium text-[#6B4A3A]">{product.short_description}</p>
                <p className="text-xs sm:text-sm text-[#6B4A3A]/80 leading-relaxed whitespace-pre-line">
                  {product.full_description}
                </p>
              </div>

              {/* Materials & Specs */}
              <div className="space-y-2 pt-3 border-t border-[#F3B6B6]/30 text-xs">
                {product.materials && product.materials.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Layers className="w-4 h-4 text-[#718B68] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#6B4A3A]">Materials: </span>
                      <span className="text-[#6B4A3A]/80">
                        {product.materials.join(', ')}
                      </span>
                    </div>
                  </div>
                )}

                {product.dimensions && (
                  <div className="flex items-start gap-2">
                    <Ruler className="w-4 h-4 text-[#B8324A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#6B4A3A]">Dimensions: </span>
                      <span className="text-[#6B4A3A]/80">{product.dimensions}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#F3B6B6]/30 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleOrderWhatsApp}
                  className="flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCustomInquiry}
                  className="flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-[#6B4A3A] bg-[#FFF8EF] hover:bg-[#F3B6B6]/40 border border-[#F3B6B6] rounded-xl transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#B8324A]" />
                  <span>Custom Request</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#6B4A3A]/70">
                💬 We confirm colors, sizes, and shipping dates directly via WhatsApp before beginning your piece.
              </p>
            </div>

          </div>

        </div>

        {/* Related Products Bar inside Modal */}
        {relatedProducts.length > 0 && (
          <div className="bg-[#FFF8EF]/50 p-6 border-t border-[#F3B6B6]/30">
            <h4 className="font-serif text-sm font-semibold text-[#6B4A3A] mb-3">
              You Might Also Love
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    if (onSelectProduct) onSelectProduct(rel);
                    setSelectedImage('');
                  }}
                  className="flex items-center gap-3 p-2 bg-[#FFFDF8] rounded-xl border border-[#F3B6B6]/30 hover:border-[#B8324A] cursor-pointer transition-colors"
                >
                  <img
                    src={rel.image_url}
                    alt={rel.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#6B4A3A] truncate">
                      {rel.name}
                    </p>
                    <p className="text-[11px] text-[#B8324A] font-medium tabular-nums">
                      {rel.price ? `₹${rel.price}` : 'Inquire'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
