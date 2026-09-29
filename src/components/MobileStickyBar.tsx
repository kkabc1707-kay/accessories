import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileStickyBar: React.FC = () => {
  const { siteSettings, getWhatsAppLink } = useStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFFDF8]/95 backdrop-blur-md border-t border-[#F3B6B6]/50 px-4 py-2.5 shadow-[0_-4px_16px_rgba(107,74,58,0.08)]">
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
        <a
          href={getWhatsAppLink('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#718B68] text-white rounded-xl text-xs font-semibold shadow-xs active:scale-98 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Us</span>
        </a>

        <a
          href={siteSettings.instagram_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#B8324A] text-white rounded-xl text-xs font-semibold shadow-xs active:scale-98 transition-transform"
        >
          <Instagram className="w-4 h-4" />
          <span>DM on Instagram</span>
        </a>
      </div>
    </div>
  );
};
