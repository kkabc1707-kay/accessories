import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, HeartHandshake } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  onViewProduct: (product: Product) => void;
  onOpenCustomOrder: () => void;
  initialCategoryId?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onViewProduct,
  onOpenCustomOrder,
  initialCategoryId,
}) => {
  const { products, categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.status === 'active')
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category_id !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.short_description.toLowerCase().includes(q);
          const matchFull = p.full_description.toLowerCase().includes(q);
          return matchName || matchDesc || matchFull;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        }
        if (sortBy === 'price-asc') {
          return (a.price || 0) - (b.price || 0);
        }
        if (sortBy === 'price-desc') {
          return (b.price || 0) - (a.price || 0);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full bg-[#FFF8EF] min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header / Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#B8324A] uppercase tracking-wider">
            Artisanal Collection
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#6B4A3A]">
            The Crochet Shop 🧶
          </h1>
          <p className="text-sm text-[#6B4A3A]/80 leading-relaxed">
            Every creation is individually crocheted by hand in Mumbai. Click any piece to inspect details, request custom colorways, or order directly via WhatsApp.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FFFDF8] p-4 sm:p-6 rounded-3xl border border-[#F3B6B6]/40 shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B4A3A]/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bouquets, bags, charger covers, airpods cases..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/50 rounded-xl text-sm text-[#6B4A3A] placeholder-[#6B4A3A]/45 focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs font-semibold text-[#6B4A3A]/70">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/50 rounded-xl text-xs font-medium text-[#6B4A3A] focus:outline-none focus:ring-2 focus:ring-[#B8324A]/30"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Tabs (Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#B8324A] text-white shadow-2xs'
                  : 'bg-[#FFF8EF] text-[#6B4A3A]/80 hover:bg-[#F3B6B6]/30'
              }`}
            >
              All Creations ({products.filter((p) => p.status === 'active').length})
            </button>

            {categories.map((cat) => {
              const count = products.filter(
                (p) => p.status === 'active' && p.category_id === cat.id
              ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#B8324A] text-white shadow-2xs'
                      : 'bg-[#FFF8EF] text-[#6B4A3A]/80 hover:bg-[#F3B6B6]/30'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFDF8] rounded-3xl p-12 text-center border border-[#F3B6B6]/40 max-w-lg mx-auto space-y-4">
            <p className="font-serif text-xl font-bold text-[#6B4A3A]">
              No creations found
            </p>
            <p className="text-xs text-[#6B4A3A]/70">
              We couldn't find items matching your search. Would you like us to custom crochet it for you?
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#FFF8EF] text-[#6B4A3A] rounded-xl border border-[#F3B6B6]"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenCustomOrder}
                className="px-4 py-2 text-xs font-semibold bg-[#B8324A] text-white rounded-xl shadow-xs"
              >
                Start Custom Order
              </button>
            </div>
          </div>
        )}

        {/* Custom Order Callout in Shop */}
        <div className="bg-gradient-to-r from-[#FFFDF8] via-[#FFF8EF] to-[#FFFDF8] rounded-3xl p-8 border border-[#F3B6B6]/50 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-[#B8324A] uppercase tracking-wider">
              Looking for something different?
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#6B4A3A]">
              We take custom commissions year-round!
            </h3>
            <p className="text-xs text-[#6B4A3A]/80 max-w-lg">
              Send us any photo or color preference — bags, character covers, graduation bouquets, or special anniversary gifts.
            </p>
          </div>

          <button
            onClick={onOpenCustomOrder}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-full shadow-sm shrink-0 cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Commission a Custom Piece</span>
          </button>
        </div>

      </div>
    </div>
  );
};
