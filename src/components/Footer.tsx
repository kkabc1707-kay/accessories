import React from 'react';
import { Instagram, MessageCircle, MapPin, Heart, ShieldCheck, Truck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteSettings, getWhatsAppLink } = useStore();

  const handleLink = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFDF8] border-t border-[#F3B6B6]/40 text-[#6B4A3A] pt-16 pb-20 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#F3B6B6]/30">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <BrandLogo iconSize={40} />
            <p className="text-sm italic text-[#6B4A3A]/80 font-serif leading-relaxed">
              "{siteSettings.tagline}"
            </p>
            <p className="text-xs text-[#6B4A3A]/70 leading-relaxed">
              Handmade crochet studio based in Mumbai, weaving warmth, memories, and modern floral craftsmanship into every loop.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteSettings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFF8EF] border border-[#F3B6B6]/50 flex items-center justify-center text-[#B8324A] hover:bg-[#B8324A] hover:text-white transition-all shadow-2xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFF8EF] border border-[#F3B6B6]/50 flex items-center justify-center text-[#718B68] hover:bg-[#718B68] hover:text-white transition-all shadow-2xs"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#6B4A3A]">
              Quick Discover
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="text-[#6B4A3A]/80 hover:text-[#B8324A] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('shop')}
                  className="text-[#6B4A3A]/80 hover:text-[#B8324A] transition-colors cursor-pointer"
                >
                  Shop Creations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('custom-orders')}
                  className="text-[#6B4A3A]/80 hover:text-[#B8324A] transition-colors cursor-pointer"
                >
                  Custom Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('gallery')}
                  className="text-[#6B4A3A]/80 hover:text-[#B8324A] transition-colors cursor-pointer"
                >
                  Handmade Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="text-[#6B4A3A]/80 hover:text-[#B8324A] transition-colors cursor-pointer"
                >
                  About the Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="text-[#6B4A3A]/80 hover:text-[#B8324A] transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Shipping */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#6B4A3A]">
              Handmade Promise
            </h4>
            <div className="space-y-2.5 text-xs text-[#6B4A3A]/85">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#718B68] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#6B4A3A]">All India Delivery</span>
                  <span>Safely packaged and shipped across India with trusted courier partners.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-[#B8324A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#6B4A3A]">100% Handcrafted</span>
                  <span>Zero machine knitting. Every piece is woven with care, stitch by stitch.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#718B68] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#6B4A3A]">Personalized Service</span>
                  <span>Direct contact with the artisan for colors, dimensions, and updates.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Inquiries */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#6B4A3A]">
              Get in Touch
            </h4>
            <div className="space-y-2 text-sm text-[#6B4A3A]/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B8324A] shrink-0" />
                <span>{siteSettings.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#718B68] shrink-0" />
                <a
                  href={getWhatsAppLink('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8324A] font-medium"
                >
                  +91 {siteSettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#B8324A] shrink-0" />
                <a
                  href={siteSettings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B8324A]"
                >
                  {siteSettings.instagram_handle}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-full shadow-2xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B4A3A]/70">
          <p>{siteSettings.footer_text}</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLink('contact')}
              className="hover:text-[#B8324A] transition-colors"
            >
              Order Inquiry
            </button>
            <span>·</span>
            <button
              onClick={() => handleLink('custom-orders')}
              className="hover:text-[#B8324A] transition-colors"
            >
              Custom Requests
            </button>
            <span>·</span>
            <button
              onClick={() => handleLink('admin')}
              className="hover:text-[#B8324A] transition-colors underline decoration-dotted text-[#6B4A3A]/50 hover:text-[#6B4A3A]"
            >
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
