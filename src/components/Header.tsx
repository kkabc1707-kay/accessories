import React, { useState } from 'react';
import { Menu, X, Instagram, MessageCircle, HeartHandshake } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, meta?: any) => void;
  onOpenCustomOrder?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenCustomOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { siteSettings, getWhatsAppLink } = useStore();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'custom-orders', label: 'Custom Orders' },
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#F3B6B6]/30 shadow-[0_2px_12px_rgba(107,74,58,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8324A] rounded-lg p-1 transition-transform active:scale-95"
            aria-label="Leisure Loopz Home"
          >
            <BrandLogo iconSize={48} />
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-medium transition-all relative py-1 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#B8324A] font-semibold'
                      : 'text-[#6B4A3A]/80 hover:text-[#B8324A]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B8324A] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Social & Main Conversion CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteSettings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#6B4A3A] hover:text-[#B8324A] hover:bg-[#FFF8EF] rounded-full transition-colors"
              title="Visit Instagram @leisure_loopz"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href={getWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#718B68] bg-[#718B68]/10 hover:bg-[#718B68]/20 rounded-full transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#718B68]" />
              <span className="font-semibold">WhatsApp</span>
            </a>

            <button
              onClick={() => {
                if (onOpenCustomOrder) onOpenCustomOrder();
                else handleNavClick('custom-orders');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] active:scale-98 rounded-full shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={getWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#718B68] bg-[#718B68]/10 rounded-full"
              aria-label="WhatsApp quick contact"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#6B4A3A] hover:text-[#B8324A] hover:bg-[#FFF8EF] rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF8] border-b border-[#F3B6B6]/30 px-6 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2.5 px-3 rounded-lg text-base font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#FFF8EF] text-[#B8324A] font-semibold'
                    : 'text-[#6B4A3A] hover:bg-[#FFF8EF]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 border-t border-[#F3B6B6]/30 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCustomOrder) onOpenCustomOrder();
                  else handleNavClick('custom-orders');
                }}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-full shadow transition-colors flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Start a Custom Order</span>
              </button>

              <div className="flex items-center justify-center gap-4 pt-2">
                <a
                  href={siteSettings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#6B4A3A] hover:text-[#B8324A]"
                >
                  <Instagram className="w-4 h-4 text-[#B8324A]" />
                  <span>@leisure_loopz</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
