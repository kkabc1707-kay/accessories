import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Instagram,
  Heart,
  Truck,
  Palette,
  ShieldCheck,
  Star,
  Send,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Product, GalleryImage } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { BrandLogo } from '../components/BrandLogo';

interface HomePageProps {
  onNavigate: (page: string, meta?: any) => void;
  onViewProduct: (product: Product) => void;
  onOpenCustomOrder: (prefilledProduct?: string) => void;
  onOpenLightbox: (image: GalleryImage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onViewProduct,
  onOpenCustomOrder,
  onOpenLightbox,
}) => {
  const {
    siteSettings,
    categories,
    products,
    gallery,
    reviews,
    heroSlides,
    submitMessage,
    getWhatsAppLink,
  } = useStore();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessageText, setContactMessageText] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const activeHero = heroSlides.find((s) => s.status === 'active') || heroSlides[0];
  const featuredProducts = products.filter((p) => p.status === 'active' && p.featured).slice(0, 6);
  const activeReviews = reviews.filter((r) => r.status === 'active');
  const activeGallery = gallery.filter((g) => g.status === 'active').slice(0, 8);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactMessageText.trim()) return;

    submitMessage({
      name: contactName,
      phone: contactPhone,
      email: contactEmail,
      message: contactMessageText,
    });

    setContactSubmitted(true);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactMessageText('');
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#FFFDF8] via-[#FFF8EF] to-[#FFF8EF] border-b border-[#F3B6B6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8324A] bg-[#FFFDF8] px-3.5 py-1.5 rounded-full border border-[#F3B6B6]/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B8324A]" />
                <span>✨ Handmade • 🎨 Custom Designs • 🚚 Shipping Across India</span>
              </div>

              {/* Heading */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#6B4A3A] tracking-tight leading-[1.15] text-balance">
                Handmade With Love,<br />
                <span className="italic font-normal text-[#B8324A]">One Loop at a Time.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#6B4A3A]/85 max-w-xl leading-relaxed">
                {activeHero?.description ||
                  "Unique crochet creations, thoughtfully handmade for you, your loved ones, and every special moment."}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] active:scale-98 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Shop Crochet Creations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenCustomOrder()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#6B4A3A] bg-[#FFFDF8] hover:bg-[#F3B6B6]/30 border border-[#F3B6B6] rounded-full transition-all cursor-pointer"
                >
                  <span>Custom Order →</span>
                </button>
              </div>

              {/* Direct WhatsApp Prompt */}
              <div className="pt-2 flex items-center gap-2 text-xs text-[#6B4A3A]/70">
                <span className="w-2 h-2 rounded-full bg-[#718B68] animate-pulse" />
                <span>Custom order slots open for Mumbai & Pan-India delivery</span>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background shape */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#F3B6B6]/40 to-[#FFFDF8] rounded-3xl transform -rotate-2 -z-10 blur-xs" />
                
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FFFDF8] aspect-4/3 sm:aspect-square bg-[#FFF8EF]">
                  <img
                    src={activeHero?.image_url}
                    alt="Handmade Crochet Creations Leisure Loopz"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                  />
                  {/* Floating caption badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FFFDF8]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#F3B6B6]/40 shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-xs font-serif font-bold text-[#6B4A3A]">
                        Artisanal Rose Bouquet
                      </p>
                      <p className="text-[11px] text-[#718B68] font-medium">
                        Everlasting flowers that never fade
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('shop')}
                      className="text-xs font-semibold text-[#B8324A] hover:underline"
                    >
                      View →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          2. FEATURED COLLECTIONS
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFF8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
              Handcrafted Categories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A]">
              Made by Hand. Made With Love. ❤️
            </h2>
            <p className="text-sm text-[#6B4A3A]/75">
              Explore our lovingly curated collections of durable, beautiful yarn creations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('shop', { categoryId: cat.id })}
                className="group relative bg-[#FFFDF8] rounded-2xl overflow-hidden border border-[#F3B6B6]/30 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                <div className="aspect-4/3 overflow-hidden bg-[#FFF8EF] relative">
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                  <span className="absolute bottom-3 left-4 text-xs font-semibold text-white tracking-wide drop-shadow-xs">
                    View Collection →
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#6B4A3A] group-hover:text-[#B8324A] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#6B4A3A]/75 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F3B6B6]/20">
                    <span className="text-xs font-semibold text-[#B8324A] group-hover:underline">
                      Explore {cat.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          3. BEST SELLERS
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFDF8] border-y border-[#F3B6B6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
                Most Cherished Loops
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A] mt-1">
                Customer Favorites 💕
              </h2>
              <p className="text-sm text-[#6B4A3A]/75 mt-1">
                Our most-requested pieces, handcrafted on order and delivered across India.
              </p>
            </div>

            <button
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8324A] hover:text-[#A0283E] transition-colors group cursor-pointer"
            >
              <span>View All Creations</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          4. CUSTOM ORDERS SECTION
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFF8EF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 border border-[#F3B6B6]/40 shadow-sm relative overflow-hidden">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5" />
                <span>Bespoke Handcrafted Creations</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#6B4A3A]">
                Imagine It. We'll Crochet It. 🧶
              </h2>

              <p className="text-sm sm:text-base text-[#6B4A3A]/85 leading-relaxed">
                Have something special in mind? Tell us your idea, colors, character, flower, bag design, or gift concept — and we'll create a handmade piece just for you.
              </p>
            </div>

            {/* 4-Step Process */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[#F3B6B6]/30">
              <div className="bg-[#FFF8EF]/70 p-6 rounded-2xl border border-[#F3B6B6]/20">
                <span className="font-serif text-2xl font-bold text-[#B8324A] block mb-2">
                  01
                </span>
                <h3 className="font-serif text-base font-bold text-[#6B4A3A] mb-1">
                  Tell Us Your Idea
                </h3>
                <p className="text-xs text-[#6B4A3A]/75 leading-relaxed">
                  Send us your design, inspiration photo, or simple sketch.
                </p>
              </div>

              <div className="bg-[#FFF8EF]/70 p-6 rounded-2xl border border-[#F3B6B6]/20">
                <span className="font-serif text-2xl font-bold text-[#718B68] block mb-2">
                  02
                </span>
                <h3 className="font-serif text-base font-bold text-[#6B4A3A] mb-1">
                  Choose Your Details
                </h3>
                <p className="text-xs text-[#6B4A3A]/75 leading-relaxed">
                  Choose yarn shades, size, personalized initials, and style.
                </p>
              </div>

              <div className="bg-[#FFF8EF]/70 p-6 rounded-2xl border border-[#F3B6B6]/20">
                <span className="font-serif text-2xl font-bold text-[#B8324A] block mb-2">
                  03
                </span>
                <h3 className="font-serif text-base font-bold text-[#6B4A3A] mb-1">
                  We Crochet It
                </h3>
                <p className="text-xs text-[#6B4A3A]/75 leading-relaxed">
                  Your piece is carefully handmade with love in our Mumbai studio.
                </p>
              </div>

              <div className="bg-[#FFF8EF]/70 p-6 rounded-2xl border border-[#F3B6B6]/20">
                <span className="font-serif text-2xl font-bold text-[#718B68] block mb-2">
                  04
                </span>
                <h3 className="font-serif text-base font-bold text-[#6B4A3A] mb-1">
                  Delivered to You
                </h3>
                <p className="text-xs text-[#6B4A3A]/75 leading-relaxed">
                  We securely package and ship your creation across India.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenCustomOrder()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-full shadow transition-all cursor-pointer"
              >
                <span>Start a Custom Order →</span>
              </button>

              <a
                href={getWhatsAppLink('custom')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#718B68] bg-[#718B68]/15 hover:bg-[#718B68]/25 rounded-full transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          5. HOW IT WORKS
          ======================================================== */}
      <section className="py-16 md:py-20 bg-[#FFFDF8] border-b border-[#F3B6B6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#718B68] uppercase tracking-wider">
              Seamless Ordering
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A] mt-1">
              From Your Idea to Your Handmade Creation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF8EF] border border-[#F3B6B6] flex items-center justify-center text-[#B8324A] font-serif font-bold text-lg">
                1
              </div>
              <h3 className="font-serif text-base font-semibold text-[#6B4A3A]">
                Choose or Imagine
              </h3>
              <p className="text-xs text-[#6B4A3A]/75">
                Browse our catalog or bring your dream design idea.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF8EF] border border-[#F3B6B6] flex items-center justify-center text-[#718B68] font-serif font-bold text-lg">
                2
              </div>
              <h3 className="font-serif text-base font-semibold text-[#6B4A3A]">
                Send Requirements
              </h3>
              <p className="text-xs text-[#6B4A3A]/75">
                Tell us your preferred colors, sizes, and special dates.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF8EF] border border-[#F3B6B6] flex items-center justify-center text-[#B8324A] font-serif font-bold text-lg">
                3
              </div>
              <h3 className="font-serif text-base font-semibold text-[#6B4A3A]">
                We Handcraft It
              </h3>
              <p className="text-xs text-[#6B4A3A]/75">
                We loop every stitch with patience, love, and fine cotton yarn.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF8EF] border border-[#F3B6B6] flex items-center justify-center text-[#718B68] font-serif font-bold text-lg">
                4
              </div>
              <h3 className="font-serif text-base font-semibold text-[#6B4A3A]">
                We Deliver It
              </h3>
              <p className="text-xs text-[#6B4A3A]/75">
                Delivered in protected gift-ready packaging right to your doorstep.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          6. GALLERY
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFF8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
                Visual Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A] mt-1">
                A Little Look at Our Loops 📸
              </h2>
              <p className="text-sm text-[#6B4A3A]/75 mt-1">
                Snapshots of completed orders, custom creations, and stitch details.
              </p>
            </div>

            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8324A] hover:underline cursor-pointer"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Responsive Grid: 4 col desktop, 3 col tablet, 2 col mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {activeGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FFFDF8] border border-[#F3B6B6]/30 shadow-2xs cursor-pointer"
              >
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                  loading="lazy"
                />
                
                {/* Overlay with caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-[#F3B6B6] tracking-wider">
                    {item.category}
                  </span>
                  <p className="text-xs font-medium line-clamp-2 mt-0.5">
                    {item.caption}
                  </p>
                  <span className="text-[11px] text-white/80 mt-1 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Click to expand
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          7. WHY LEISURE LOOPZ
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFDF8] border-y border-[#F3B6B6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#718B68] uppercase tracking-wider">
              Artisanal Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A] mt-1">
              Why Choose Handmade?
            </h2>
            <p className="text-sm text-[#6B4A3A]/75 mt-1">
              Every loop has a purpose, every stitch carries affection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#FFF8EF] rounded-2xl border border-[#F3B6B6]/30 text-left space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFFDF8] border border-[#F3B6B6] flex items-center justify-center text-[#B8324A]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#6B4A3A]">
                100% Handmade
              </h3>
              <p className="text-xs text-[#6B4A3A]/75 leading-relaxed">
                Every piece is carefully crocheted by hand without automated machinery.
              </p>
            </div>

            <div className="p-6 bg-[#FFF8EF] rounded-2xl border border-[#F3B6B6]/30 text-left space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFFDF8] border border-[#F3B6B6] flex items-center justify-center text-[#718B68]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#6B4A3A]">
                Made With Love
              </h3>
              <p className="text-xs text-[#6B4A3A]/75 leading-relaxed">
                Created with genuine care and attention to every tiny detail and seam.
              </p>
            </div>

            <div className="p-6 bg-[#FFF8EF] rounded-2xl border border-[#F3B6B6]/30 text-left space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFFDF8] border border-[#F3B6B6] flex items-center justify-center text-[#B8324A]">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#6B4A3A]">
                Custom Designs
              </h3>
              <p className="text-xs text-[#6B4A3A]/75 leading-relaxed">
                Create something uniquely yours with customized yarn shades and initials.
              </p>
            </div>

            <div className="p-6 bg-[#FFF8EF] rounded-2xl border border-[#F3B6B6]/30 text-left space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFFDF8] border border-[#F3B6B6] flex items-center justify-center text-[#718B68]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#6B4A3A]">
                Shipping Across India
              </h3>
              <p className="text-xs text-[#6B4A3A]/75 leading-relaxed">
                Securely packaged and safely delivered to your doorstep nationwide.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          8. ABOUT THE BRAND
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFF8EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border-4 border-[#FFFDF8] shadow-lg aspect-square bg-[#FFFDF8] p-6 flex flex-col items-center justify-center text-center space-y-4">
                <BrandLogo iconSize={130} variant="mark" />
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                    Leisure Loopz
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#B8324A] font-semibold">
                    The Crochet Corner · Mumbai
                  </p>
                </div>
                <p className="text-xs text-[#6B4A3A]/75 max-w-xs leading-relaxed italic">
                  "Loops of love — for the love of crochet."
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
                Behind the Loops
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A]">
                Welcome to Leisure Loopz
              </h2>

              <p className="font-serif text-lg italic text-[#B8324A]">
                "{siteSettings.tagline}"
              </p>

              <div className="space-y-3 text-sm text-[#6B4A3A]/85 leading-relaxed">
                <p>
                  {siteSettings.website_description}
                </p>
                <p>
                  Born out of a genuine passion for yarn crafts, Leisure Loopz turns simple loops into cherished keepsakes. Whether it is an everlasting bouquet of hand-crocheted roses for an anniversary, a whimsical Spider-Man charger cover that sparks joy on your desk, or a breezy ocean-toned tote for your weekend errands, each item is crafted with patience and precision.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#B8324A] hover:text-[#A0283E] cursor-pointer"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================
          9. HANDMADE GIFTS
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFDF8] border-y border-[#F3B6B6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-[#FFF8EF] via-[#FFFDF8] to-[#FFF8EF] rounded-3xl p-8 sm:p-14 border border-[#F3B6B6]/40 text-center space-y-6">
            <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
              Everlasting Gifts
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#6B4A3A]">
              Give Something That Lasts 🎁
            </h2>

            <p className="font-serif text-xl sm:text-2xl text-[#B8324A] italic max-w-xl mx-auto">
              "Flowers fade. Handmade memories don't."
            </p>

            <p className="text-sm text-[#6B4A3A]/80 max-w-2xl mx-auto leading-relaxed">
              Surprise your favorite people with crochet roses, sunflower bouquets, customized bags, and one-of-a-kind accessories made to be kept forever.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-[#6B4A3A]">
              <span className="px-3.5 py-1.5 bg-[#FFFDF8] rounded-full border border-[#F3B6B6]/40">Crochet Roses</span>
              <span className="px-3.5 py-1.5 bg-[#FFFDF8] rounded-full border border-[#F3B6B6]/40">Sunflower Bouquets</span>
              <span className="px-3.5 py-1.5 bg-[#FFFDF8] rounded-full border border-[#F3B6B6]/40">Personalized Charms</span>
              <span className="px-3.5 py-1.5 bg-[#FFFDF8] rounded-full border border-[#F3B6B6]/40">Handmade Bags</span>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-full shadow transition-colors cursor-pointer"
              >
                <span>Find a Handmade Gift →</span>
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================
          10. CUSTOMER REVIEWS
          ======================================================== */}
      {activeReviews.length > 0 && (
        <section className="py-16 md:py-24 bg-[#FFF8EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
                Words of Appreciation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A] mt-1">
                Loved by Our Customers ❤️
              </h2>
              <p className="text-sm text-[#6B4A3A]/75 mt-1">
                Real feedback from happy recipients across India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#FFFDF8] p-6 rounded-2xl border border-[#F3B6B6]/40 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 text-[#B8324A]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#B8324A]" />
                      ))}
                    </div>

                    <p className="text-sm text-[#6B4A3A]/85 italic leading-relaxed">
                      "{rev.review}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F3B6B6]/20 flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#6B4A3A]">
                      {rev.customer_name}
                    </span>
                    {rev.date && (
                      <span className="text-xs text-[#6B4A3A]/60">
                        {rev.date}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}


      {/* ========================================================
          11. INSTAGRAM SECTION
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFDF8] border-b border-[#F3B6B6]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Instagram className="w-3.5 h-3.5" />
              <span>{siteSettings.instagram_handle}</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A]">
              Follow Our Crochet Journey 💕
            </h2>
            <p className="text-sm text-[#6B4A3A]/75">
              New creations, custom orders, behind-the-scenes crochet and more.
            </p>
            <div className="pt-2">
              <a
                href={siteSettings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#B8324A] bg-[#FFF8EF] hover:bg-[#F3B6B6]/30 border border-[#F3B6B6] rounded-full transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram →</span>
              </a>
            </div>
          </div>

          {/* Social image previews */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {activeGallery.slice(0, 4).map((item) => (
              <a
                key={item.id}
                href={siteSettings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FFF8EF] border border-[#F3B6B6]/30 block"
              >
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Instagram className="w-6 h-6" />
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================
          12. FINAL ORDER CTA
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFF8EF] border-b border-[#F3B6B6]/30">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
            Ready to Begin?
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#6B4A3A] leading-tight">
            Ready to Order Your Own Crochet Creation? 🧶
          </h2>

          <p className="text-base text-[#6B4A3A]/85 max-w-xl mx-auto leading-relaxed">
            Whether you're looking for a gift, something cute for yourself, or a completely custom creation — we'd love to make it for you.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-full shadow transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>💬 Order on WhatsApp</span>
            </a>

            <a
              href={siteSettings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-full shadow transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>📸 DM on Instagram</span>
            </a>
          </div>
        </div>
      </section>


      {/* ========================================================
          13. CONTACT SECTION
          ======================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#718B68] uppercase tracking-wider">
              Direct Inquiries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#6B4A3A] mt-1">
              Let's Create Something Together
            </h2>
            <p className="text-sm text-[#6B4A3A]/75 mt-1">
              Have questions regarding prices, custom colors, or shipping timelines? Reach out directly!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact Details */}
            <div className="lg:col-span-5 bg-[#FFF8EF] p-8 rounded-3xl border border-[#F3B6B6]/30 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                Studio Details
              </h3>

              <div className="space-y-4 text-sm text-[#6B4A3A]/85">
                <div>
                  <span className="text-xs font-semibold text-[#6B4A3A]/60 uppercase tracking-wider block">
                    Phone & WhatsApp
                  </span>
                  <a
                    href={getWhatsAppLink('general')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-base text-[#718B68] hover:underline"
                  >
                    +91 {siteSettings.phone}
                  </a>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#6B4A3A]/60 uppercase tracking-wider block">
                    Instagram Direct Message
                  </span>
                  <a
                    href={siteSettings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-base text-[#B8324A] hover:underline"
                  >
                    {siteSettings.instagram_handle}
                  </a>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#6B4A3A]/60 uppercase tracking-wider block">
                    Base Location
                  </span>
                  <p className="font-medium text-[#6B4A3A]">{siteSettings.location}</p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#6B4A3A]/60 uppercase tracking-wider block">
                    Shipping Coverage
                  </span>
                  <p className="text-xs text-[#6B4A3A]/80 leading-relaxed">
                    {siteSettings.shipping_information}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F3B6B6]/30">
                <a
                  href={getWhatsAppLink('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start a Quick WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-[#FFF8EF]/50 p-8 rounded-3xl border border-[#F3B6B6]/30">
              {contactSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#718B68]/15 text-[#718B68] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-[#6B4A3A]/80 max-w-sm">
                    Thank you for writing to us. Leisure Loopz will get back to you promptly on WhatsApp or email!
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="text-xs font-semibold text-[#B8324A] underline mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                        Name <span className="text-[#B8324A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                        Phone / WhatsApp <span className="text-[#B8324A]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. 9869462859"
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                      Email Address <span className="text-[#6B4A3A]/50 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                      Your Message <span className="text-[#B8324A]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessageText}
                      onChange={(e) => setContactMessageText(e.target.value)}
                      placeholder="Tell us what you're looking for, asking about prices, customized bouquets, or bulk gifting..."
                      className="w-full px-3.5 py-2.5 bg-[#FFFDF8] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
