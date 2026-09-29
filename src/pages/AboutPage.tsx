import React from 'react';
import { Heart, Sparkles, Truck, ShieldCheck, MapPin, MessageCircle, Instagram } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { useStore } from '../context/StoreContext';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenCustomOrder: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenCustomOrder,
}) => {
  const { siteSettings, getWhatsAppLink } = useStore();

  return (
    <div className="w-full bg-[#FFF8EF] min-h-screen py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Section of About */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center mb-2">
            <BrandLogo iconSize={100} variant="mark" />
          </div>
          <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
            Our Story & Craft
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#6B4A3A]">
            Welcome to Leisure Loopz
          </h1>
          <p className="font-serif text-xl sm:text-2xl italic text-[#B8324A]">
            "{siteSettings.tagline}"
          </p>
          <p className="text-sm sm:text-base text-[#6B4A3A]/80 leading-relaxed pt-2">
            A boutique crochet studio founded in Mumbai with a simple belief: in a world of hurried mass production, hand-woven loops of soft yarn hold enduring tenderness.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#FFFDF8] p-8 sm:p-12 rounded-3xl border border-[#F3B6B6]/40 shadow-xs">
          <div className="space-y-4 text-sm text-[#6B4A3A]/85 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
              Born From a Passion for Yarn
            </h2>
            <p>
              Leisure Loopz began at a cozy kitchen table in Mumbai. What started as handcrafted gifts for close friends quickly blossomed into an artisan brand loved by customers across India.
            </p>
            <p>
              Crochet is unlike machine knitting — there is no machine on Earth that can replicate the intricate loops and knots of true handmade crochet. Every single petal of our rose bouquets, every bubble-stitch on our ocean totes, and every stitch on our custom charger covers is shaped with human hands, careful tension, and gentle intention.
            </p>
            <p>
              Our creations are designed not to be discarded next season, but to sit on your desk, travel on your shoulder, and be kept on nightstands as lasting tokens of affection.
            </p>
          </div>

          <div className="bg-[#FFF8EF] p-8 rounded-2xl border border-[#F3B6B6]/30 space-y-5">
            <h3 className="font-serif text-xl font-bold text-[#6B4A3A]">
              The Leisure Loopz Promise
            </h3>
            <ul className="space-y-3.5 text-xs text-[#6B4A3A]/85">
              <li className="flex items-start gap-3">
                <Heart className="w-4 h-4 text-[#B8324A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#6B4A3A]">Pure Cotton & Soft Fibres:</strong>
                  We source premium milk cotton and durable yarns that don't pill or lose their shape easily.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#718B68] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#6B4A3A]">Infinite Customization:</strong>
                  Your memories are unique. We personalize flower colors, stem counts, bag dimensions, and custom initial charms.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#718B68] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#6B4A3A]">Protected Packaging:</strong>
                  Bouquets and bags are wrapped in reinforced boxes so they reach you in immaculate, gift-ready condition.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Studio Details */}
        <div className="bg-[#FFFDF8] rounded-3xl p-8 border border-[#F3B6B6]/40 text-center space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#6B4A3A]">
            Handmade in Mumbai, Shipped Everywhere
          </h3>
          <p className="text-sm text-[#6B4A3A]/80 max-w-md mx-auto">
            We are always happy to chat about your gift ideas or special events. Reach out via WhatsApp or Instagram.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={getWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-full shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +91 {siteSettings.phone}</span>
            </a>

            <a
              href={siteSettings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-full shadow-xs transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram: {siteSettings.instagram_handle}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
