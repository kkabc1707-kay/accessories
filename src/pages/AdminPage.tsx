import React, { useState } from 'react';
import {
  Package,
  Layers,
  ShoppingBag,
  Mail,
  Image as ImageIcon,
  Star,
  Sliders,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  X,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  Sparkles,
  Eye,
  ShieldAlert
} from 'lucide-react';
import { Product, Category, CustomOrder, ContactMessage, GalleryImage, Review } from '../types';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from '../components/BrandLogo';

export const AdminPage: React.FC<{ onLogout: () => void; onGoHome: () => void }> = ({
  onLogout,
  onGoHome,
}) => {
  const {
    siteSettings,
    categories,
    products,
    gallery,
    reviews,
    heroSlides,
    customOrders,
    messages,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    updateOrderNotes,
    deleteCustomOrder,
    toggleMessageRead,
    deleteMessage,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    addReview,
    updateReview,
    deleteReview,
    updateHeroSlide,
    updateSiteSettings,
    resetAllData,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'categories' | 'orders' | 'messages' | 'gallery' | 'reviews' | 'hero' | 'settings'
  >('dashboard');

  // Modal states for Product editing/adding
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    image_url: '',
    short_description: '',
    full_description: '',
    category_id: categories[0]?.id || '',
    price: 999,
    featured: false,
    customizable: true,
    availability: 'in_stock' as Product['availability'],
    status: 'active' as Product['status'],
    dimensions: '',
    materials: 'Milk Cotton Yarn',
  });

  // Modal states for Category
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    image_url: '',
    description: '',
    status: 'active' as Category['status'],
    display_order: 1,
  });

  // Modal states for Gallery
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    image_url: '',
    caption: '',
    category: 'Bouquets',
    status: 'active' as GalleryImage['status'],
    display_order: 1,
  });

  // Modal states for Review
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    customer_name: '',
    review: '',
    rating: 5,
    status: 'active' as Review['status'],
    date: 'March 2026',
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(siteSettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Hero form state
  const currentHero = heroSlides[0] || {};
  const [heroForm, setHeroForm] = useState({
    title: currentHero.title || '',
    description: currentHero.description || '',
    image_url: currentHero.image_url || '',
    primary_cta_text: currentHero.primary_cta_text || 'Shop Crochet Creations',
    primary_cta_url: currentHero.primary_cta_url || '/shop',
    secondary_cta_text: currentHero.secondary_cta_text || 'Custom Order →',
    secondary_cta_url: currentHero.secondary_cta_url || '/custom-orders',
  });
  const [heroSaved, setHeroSaved] = useState(false);

  // Open Product Modal
  const handleOpenProductModal = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm({
        name: prod.name,
        slug: prod.slug,
        image_url: prod.image_url,
        short_description: prod.short_description,
        full_description: prod.full_description,
        category_id: prod.category_id,
        price: prod.price || 0,
        featured: prod.featured,
        customizable: prod.customizable,
        availability: prod.availability,
        status: prod.status,
        dimensions: prod.dimensions || '',
        materials: prod.materials?.join(', ') || '',
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        slug: '',
        image_url: products[0]?.image_url || '',
        short_description: '',
        full_description: '',
        category_id: categories[0]?.id || '',
        price: 1299,
        featured: false,
        customizable: true,
        availability: 'made_to_order',
        status: 'active',
        dimensions: '',
        materials: '100% Milk Cotton Yarn',
      });
    }
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = productForm.slug.trim() || productForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const materialsArray = productForm.materials.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        slug,
        materials: materialsArray,
      });
    } else {
      addProduct({
        ...productForm,
        slug,
        materials: materialsArray,
      });
    }
    setProductModalOpen(false);
  };

  // Open Category Modal
  const handleOpenCategoryModal = (cat?: Category) => {
    if (cat) {
      setEditingCategory(cat);
      setCategoryForm({
        name: cat.name,
        slug: cat.slug,
        image_url: cat.image_url,
        description: cat.description,
        status: cat.status,
        display_order: cat.display_order,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({
        name: '',
        slug: '',
        image_url: categories[0]?.image_url || '',
        description: '',
        status: 'active',
        display_order: categories.length + 1,
      });
    }
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = categoryForm.slug.trim() || categoryForm.name.toLowerCase().replace(/\s+/g, '-');
    if (editingCategory) {
      updateCategory(editingCategory.id, { ...categoryForm, slug });
    } else {
      addCategory({ ...categoryForm, slug });
    }
    setCategoryModalOpen(false);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Save Hero
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSlides[0]) {
      updateHeroSlide(heroSlides[0].id, heroForm);
      setHeroSaved(true);
      setTimeout(() => setHeroSaved(false), 2500);
    }
  };

  // Open WhatsApp direct chat with customer
  const handleContactCustomerWhatsApp = (order: CustomOrder) => {
    const rawPhone = order.phone.replace(/\D/g, '');
    const phone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const msg = `Hi ${order.name}! This is Leisure Loopz contacting you regarding your custom crochet order for ${order.product_type}. We're excited to make it!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] text-[#6B4A3A]">
      
      {/* Admin Top Bar */}
      <header className="bg-[#FFFDF8] border-b border-[#F3B6B6]/50 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo iconSize={36} />
            <span className="hidden sm:inline-block text-xs bg-[#B8324A]/10 text-[#B8324A] font-semibold px-2.5 py-0.5 rounded-full">
              Admin Control Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B4A3A] bg-[#FFF8EF] hover:bg-[#F3B6B6]/30 border border-[#F3B6B6] rounded-lg transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content & Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 border-b border-[#F3B6B6]/30 no-scrollbar">
          {[
            { id: 'dashboard', label: 'Overview', icon: Sliders },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Custom Orders (${customOrders.length})`, icon: ShoppingBag },
            { id: 'messages', label: `Messages (${messages.filter((m) => !m.is_read).length} new)`, icon: Mail },
            { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
            { id: 'hero', label: 'Hero Banner', icon: Sparkles },
            { id: 'settings', label: 'Store Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#B8324A] text-white shadow-2xs'
                    : 'bg-[#FFFDF8] text-[#6B4A3A]/80 hover:bg-[#F3B6B6]/30 border border-[#F3B6B6]/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            TAB: DASHBOARD OVERVIEW
            ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F3B6B6]/40 shadow-2xs">
                <span className="text-xs text-[#6B4A3A]/70 font-medium">Total Products</span>
                <p className="font-serif text-3xl font-bold text-[#6B4A3A] mt-1 tabular-nums">
                  {products.length}
                </p>
                <span className="text-[11px] text-[#718B68] font-medium mt-1 block">
                  {products.filter((p) => p.status === 'active').length} Active for Sale
                </span>
              </div>

              <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F3B6B6]/40 shadow-2xs">
                <span className="text-xs text-[#6B4A3A]/70 font-medium">Custom Inquiries</span>
                <p className="font-serif text-3xl font-bold text-[#B8324A] mt-1 tabular-nums">
                  {customOrders.length}
                </p>
                <span className="text-[11px] text-[#B8324A] font-medium mt-1 block">
                  {customOrders.filter((o) => o.status === 'new').length} New Unprocessed
                </span>
              </div>

              <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F3B6B6]/40 shadow-2xs">
                <span className="text-xs text-[#6B4A3A]/70 font-medium">Contact Messages</span>
                <p className="font-serif text-3xl font-bold text-[#718B68] mt-1 tabular-nums">
                  {messages.length}
                </p>
                <span className="text-[11px] text-[#718B68] font-medium mt-1 block">
                  {messages.filter((m) => !m.is_read).length} Unread
                </span>
              </div>

              <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F3B6B6]/40 shadow-2xs">
                <span className="text-xs text-[#6B4A3A]/70 font-medium">Gallery Photos</span>
                <p className="font-serif text-3xl font-bold text-[#6B4A3A] mt-1 tabular-nums">
                  {gallery.length}
                </p>
                <span className="text-[11px] text-[#6B4A3A]/70 font-medium mt-1 block">
                  {categories.length} Categories
                </span>
              </div>
            </div>

            {/* Recent Custom Orders & Messages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Recent Orders Box */}
              <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#F3B6B6]/40 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#6B4A3A]">
                    Recent Custom Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-semibold text-[#B8324A] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {customOrders.slice(0, 4).map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3.5 bg-[#FFF8EF] rounded-xl border border-[#F3B6B6]/30 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#6B4A3A]">
                            {ord.name}
                          </span>
                          <span className="text-[10px] text-[#6B4A3A]/60">
                            ({ord.product_type})
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6B4A3A]/75 line-clamp-1 mt-0.5">
                          {ord.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#B8324A]/10 text-[#B8324A]">
                          {ord.status}
                        </span>
                        <button
                          onClick={() => handleContactCustomerWhatsApp(ord)}
                          className="p-1.5 text-[#718B68] hover:bg-[#718B68]/15 rounded-lg"
                          title="WhatsApp Customer"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions & Store Settings summary */}
              <div className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#F3B6B6]/40 shadow-xs space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#6B4A3A]">
                  Store Management Shortcuts
                </h3>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleOpenProductModal()}
                    className="p-4 bg-[#FFF8EF] hover:bg-[#F3B6B6]/20 border border-[#F3B6B6]/40 rounded-2xl text-left transition-colors cursor-pointer"
                  >
                    <Plus className="w-5 h-5 text-[#B8324A] mb-2" />
                    <span className="font-semibold text-xs block text-[#6B4A3A]">
                      Add New Product
                    </span>
                    <span className="text-[10px] text-[#6B4A3A]/70">
                      Upload photo, price, details
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setGalleryModalOpen(true);
                      setGalleryForm({
                        image_url: products[0]?.image_url || '',
                        caption: '',
                        category: 'Bouquets',
                        status: 'active',
                        display_order: gallery.length + 1,
                      });
                    }}
                    className="p-4 bg-[#FFF8EF] hover:bg-[#F3B6B6]/20 border border-[#F3B6B6]/40 rounded-2xl text-left transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-5 h-5 text-[#718B68] mb-2" />
                    <span className="font-semibold text-xs block text-[#6B4A3A]">
                      Add Gallery Photo
                    </span>
                    <span className="text-[10px] text-[#6B4A3A]/70">
                      Showcase new finished creation
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="p-4 bg-[#FFF8EF] hover:bg-[#F3B6B6]/20 border border-[#F3B6B6]/40 rounded-2xl text-left transition-colors cursor-pointer"
                  >
                    <Settings className="w-5 h-5 text-[#6B4A3A] mb-2" />
                    <span className="font-semibold text-xs block text-[#6B4A3A]">
                      Edit Contact & WhatsApp
                    </span>
                    <span className="text-[10px] text-[#6B4A3A]/70">
                      Update phone number or handles
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Reset all catalog data, gallery, and settings back to original defaults?')) {
                        resetAllData();
                        alert('All demo data has been restored!');
                      }
                    }}
                    className="p-4 bg-[#FFF8EF] hover:bg-rose-50 border border-rose-200 rounded-2xl text-left transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5 text-[#B8324A] mb-2" />
                    <span className="font-semibold text-xs block text-[#B8324A]">
                      Restore Initial Demo Data
                    </span>
                    <span className="text-[10px] text-[#6B4A3A]/70">
                      Re-seed default crochet items
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB: PRODUCT MANAGEMENT
            ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                  Product Catalog
                </h2>
                <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                  Manage all crochet pieces, prices, photos, and descriptions.
                </p>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creation</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-[#FFFDF8] rounded-3xl border border-[#F3B6B6]/40 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF8EF] border-b border-[#F3B6B6]/30 text-[#6B4A3A]/70 uppercase font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Creation</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Availability</th>
                      <th className="py-3.5 px-4">Featured</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3B6B6]/20">
                    {products.map((p) => {
                      const cat = categories.find((c) => c.id === p.category_id);
                      return (
                        <tr key={p.id} className="hover:bg-[#FFF8EF]/50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image_url}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl object-cover border border-[#F3B6B6]/40 shrink-0"
                              />
                              <div>
                                <span className="font-semibold text-[#6B4A3A] block text-sm">
                                  {p.name}
                                </span>
                                <span className="text-[11px] text-[#6B4A3A]/60">
                                  /{p.slug}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-[#6B4A3A]">
                            {cat?.name || 'Unassigned'}
                          </td>

                          <td className="py-3 px-4 font-semibold text-[#B8324A] tabular-nums">
                            {p.price ? `₹${p.price.toLocaleString('en-IN')}` : 'Inquire'}
                          </td>

                          <td className="py-3 px-4 capitalize text-[#6B4A3A]/80">
                            {p.availability.replace('_', ' ')}
                          </td>

                          <td className="py-3 px-4">
                            <button
                              onClick={() => updateProduct(p.id, { featured: !p.featured })}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                                p.featured
                                  ? 'bg-[#B8324A]/15 text-[#B8324A]'
                                  : 'bg-[#6B4A3A]/10 text-[#6B4A3A]/60'
                              }`}
                            >
                              {p.featured ? '★ Featured' : 'Standard'}
                            </button>
                          </td>

                          <td className="py-3 px-4">
                            <button
                              onClick={() =>
                                updateProduct(p.id, {
                                  status: p.status === 'active' ? 'inactive' : 'active',
                                })
                              }
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                                p.status === 'active'
                                  ? 'bg-[#718B68]/15 text-[#718B68]'
                                  : 'bg-stone-200 text-stone-600'
                              }`}
                            >
                              {p.status === 'active' ? 'Active' : 'Hidden'}
                            </button>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenProductModal(p)}
                                className="p-1.5 text-[#6B4A3A] hover:text-[#B8324A] hover:bg-[#FFF8EF] rounded-lg transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => duplicateProduct(p.id)}
                                className="p-1.5 text-[#6B4A3A] hover:text-[#718B68] hover:bg-[#FFF8EF] rounded-lg transition-colors cursor-pointer"
                                title="Duplicate"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                                }}
                                className="p-1.5 text-[#6B4A3A] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: CUSTOM ORDERS
            ======================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                Custom Orders & Commissions
              </h2>
              <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                Manage inquiries submitted via the customer-facing custom order form.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {customOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-[#FFFDF8] p-6 rounded-3xl border border-[#F3B6B6]/40 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F3B6B6]/20 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-[#6B4A3A]">
                          #{ord.id} — {ord.name}
                        </span>
                        <span className="text-xs text-[#B8324A] font-semibold">
                          {ord.product_type}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B4A3A]/70 mt-0.5">
                        Received on {new Date(ord.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="px-3 py-1.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-xs font-semibold text-[#6B4A3A] focus:outline-none"
                      >
                        <option value="new">Status: New</option>
                        <option value="contacted">Status: Contacted</option>
                        <option value="confirmed">Status: Confirmed</option>
                        <option value="in_progress">Status: In Progress</option>
                        <option value="completed">Status: Completed</option>
                        <option value="cancelled">Status: Cancelled</option>
                      </select>

                      <button
                        onClick={() => handleContactCustomerWhatsApp(ord)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#718B68] hover:bg-[#5D7355] rounded-xl shadow-2xs transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Delete this custom order inquiry?')) deleteCustomOrder(ord.id);
                        }}
                        className="p-1.5 text-[#6B4A3A]/60 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6B4A3A]/85">
                    <div>
                      <span className="font-bold block text-[#6B4A3A]">Contact:</span>
                      <span>Phone: {ord.phone}</span>
                      {ord.email && <span className="block">Email: {ord.email}</span>}
                    </div>

                    <div>
                      <span className="font-bold block text-[#6B4A3A]">Custom Details:</span>
                      <span>Colors: {ord.color || 'Not specified'}</span>
                      <span className="block">Size: {ord.size || 'Standard'}</span>
                      <span className="block">Quantity: {ord.quantity}</span>
                    </div>

                    <div>
                      <span className="font-bold block text-[#6B4A3A]">Budget & Deadline:</span>
                      <span>Budget: {ord.budget || 'Flexible'}</span>
                      <span className="block">Required Date: {ord.required_date || 'Flexible'}</span>
                    </div>
                  </div>

                  <div className="bg-[#FFF8EF] p-3.5 rounded-2xl border border-[#F3B6B6]/30 text-xs">
                    <span className="font-semibold block text-[#6B4A3A] mb-1">
                      Customer Description:
                    </span>
                    <p className="text-[#6B4A3A]/85 leading-relaxed">{ord.description}</p>
                  </div>

                  {ord.inspiration_image_url && (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#6B4A3A]">Inspiration Photo:</span>
                      <img
                        src={ord.inspiration_image_url}
                        alt="Inspiration"
                        className="w-16 h-16 rounded-xl object-cover border border-[#F3B6B6]"
                      />
                    </div>
                  )}

                  {/* Internal Admin Notes */}
                  <div className="pt-2 flex items-center gap-3">
                    <input
                      type="text"
                      defaultValue={ord.admin_notes || ''}
                      placeholder="Add internal workshop note (e.g. Yarn dispatched, courier tracking #)..."
                      onBlur={(e) => updateOrderNotes(ord.id, e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-[#FFF8EF] border border-[#F3B6B6]/50 rounded-xl text-xs text-[#6B4A3A] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: CONTACT MESSAGES
            ======================================================== */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                Customer Messages & Inquiries
              </h2>
              <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                Direct messages submitted through the contact page form.
              </p>
            </div>

            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    msg.is_read
                      ? 'bg-[#FFFDF8] border-[#F3B6B6]/30'
                      : 'bg-[#FFF8EF] border-[#B8324A]/40 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3B6B6]/20 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#6B4A3A]">{msg.name}</span>
                        {!msg.is_read && (
                          <span className="text-[10px] bg-[#B8324A] text-white px-2 py-0.5 rounded-full font-bold">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#6B4A3A]/70">
                        Phone: {msg.phone} {msg.email && `· Email: ${msg.email}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleMessageRead(msg.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-[#FFFDF8] border border-[#F3B6B6] rounded-lg hover:bg-[#F3B6B6]/30 cursor-pointer"
                      >
                        {msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                      </button>

                      <a
                        href={`https://wa.me/91${msg.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Hi ${msg.name}, thank you for contacting Leisure Loopz!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-[#718B68] hover:bg-[#718B68]/15 rounded-lg"
                        title="Reply on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => {
                          if (confirm('Delete this message?')) deleteMessage(msg.id);
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B4A3A]/90 mt-3 whitespace-pre-line leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: CATEGORIES
            ======================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                  Product Categories
                </h2>
                <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                  Organize your crochet catalog into clean browsable collections.
                </p>
              </div>

              <button
                onClick={() => handleOpenCategoryModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-[#FFFDF8] rounded-2xl border border-[#F3B6B6]/40 p-4 space-y-3"
                >
                  <div className="aspect-16/9 rounded-xl overflow-hidden bg-[#FFF8EF]">
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#6B4A3A]">{cat.name}</h3>
                    <p className="text-xs text-[#6B4A3A]/75 mt-1">{cat.description}</p>
                  </div>
                  <div className="pt-2 border-t border-[#F3B6B6]/20 flex items-center justify-between">
                    <span className="text-[11px] text-[#718B68] font-semibold uppercase">
                      {cat.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCategoryModal(cat)}
                        className="p-1 text-[#6B4A3A] hover:text-[#B8324A]"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete category ${cat.name}?`)) deleteCategory(cat.id);
                        }}
                        className="p-1 text-stone-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: GALLERY MANAGEMENT
            ======================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                  Gallery Photos
                </h2>
                <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                  Photos showcased on the homepage and the public gallery grid.
                </p>
              </div>

              <button
                onClick={() => {
                  setGalleryModalOpen(true);
                  setGalleryForm({
                    image_url: products[0]?.image_url || '',
                    caption: '',
                    category: 'Bouquets',
                    status: 'active',
                    display_order: gallery.length + 1,
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div
                  key={img.id}
                  className="bg-[#FFFDF8] rounded-2xl border border-[#F3B6B6]/40 p-3 space-y-2"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF8EF]">
                    <img
                      src={img.image_url}
                      alt={img.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#B8324A] uppercase">
                      {img.category}
                    </span>
                    <p className="text-xs font-medium text-[#6B4A3A] truncate mt-0.5">
                      {img.caption}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#F3B6B6]/20 flex items-center justify-between">
                    <span className="text-[10px] text-[#718B68] font-bold uppercase">
                      {img.status}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm('Delete this gallery photo?')) deleteGalleryImage(img.id);
                      }}
                      className="p-1 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: REVIEWS MANAGEMENT
            ======================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                  Customer Reviews
                </h2>
                <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                  Only authentic customer reviews entered by the store owner appear here.
                </p>
              </div>

              <button
                onClick={() => {
                  setReviewModalOpen(true);
                  setReviewForm({
                    customer_name: '',
                    review: '',
                    rating: 5,
                    status: 'active',
                    date: 'March 2026',
                  });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Customer Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#FFFDF8] rounded-2xl border border-[#F3B6B6]/40 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#B8324A]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#B8324A]" />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Delete review?')) deleteReview(rev.id);
                      }}
                      className="text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-[#6B4A3A]/85 italic leading-relaxed">
                    "{rev.review}"
                  </p>

                  <div className="pt-2 border-t border-[#F3B6B6]/20 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#6B4A3A]">{rev.customer_name}</span>
                    <span className="text-[#6B4A3A]/60">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: HERO BANNER MANAGEMENT
            ======================================================== */}
        {activeTab === 'hero' && (
          <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                Homepage Hero Banner
              </h2>
              <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                Customize the visual spotlight, main headline, and primary buttons.
              </p>
            </div>

            <form
              onSubmit={handleSaveHero}
              className="bg-[#FFFDF8] p-6 sm:p-8 rounded-3xl border border-[#F3B6B6]/40 shadow-xs space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Hero Title / Headline
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Hero Subtitle Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Hero Image URL
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.image_url}
                  onChange={(e) => setHeroForm({ ...heroForm, image_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Primary CTA Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.primary_cta_text}
                    onChange={(e) => setHeroForm({ ...heroForm, primary_cta_text: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Secondary CTA Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.secondary_cta_text}
                    onChange={(e) => setHeroForm({ ...heroForm, secondary_cta_text: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl transition-colors cursor-pointer"
                >
                  Save Hero Slide
                </button>
                {heroSaved && (
                  <span className="text-xs text-[#718B68] font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Hero updated!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            TAB: SITE SETTINGS
            ======================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#6B4A3A]">
                Brand & Contact Settings
              </h2>
              <p className="text-xs text-[#6B4A3A]/75 mt-0.5">
                Manage your official WhatsApp phone, Instagram handles, and delivery information.
              </p>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="bg-[#FFFDF8] p-6 sm:p-8 rounded-3xl border border-[#F3B6B6]/40 shadow-xs space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.brand_name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, brand_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    WhatsApp Phone Number <span className="text-[#B8324A]">*</span>
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp_number}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        whatsapp_number: e.target.value,
                        phone: e.target.value,
                      })
                    }
                    placeholder="9869462859"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                  />
                  <span className="text-[10px] text-[#6B4A3A]/60 mt-0.5 block">
                    All 'Order Now' and custom requests link to this WhatsApp number.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={settingsForm.instagram_handle}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        instagram_handle: e.target.value,
                        instagram_url: `https://instagram.com/${e.target.value.replace('@', '')}`,
                      })
                    }
                    placeholder="@leisure_loopz"
                    className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={settingsForm.location}
                  onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Shipping Information Text
                </label>
                <input
                  type="text"
                  value={settingsForm.shipping_information}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, shipping_information: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Footer Copyright Note
                </label>
                <input
                  type="text"
                  value={settingsForm.footer_text}
                  onChange={(e) => setSettingsForm({ ...settingsForm, footer_text: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm text-[#6B4A3A]"
                />
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl transition-colors cursor-pointer"
                >
                  Save Store Settings
                </button>
                {settingsSaved && (
                  <span className="text-xs text-[#718B68] font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Settings updated!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

      </div>

      {/* ========================================================
          MODAL: PRODUCT ADD / EDIT
          ======================================================== */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6B4A3A]/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#F3B6B6]/50 shadow-2xl my-auto">
            <button
              onClick={() => setProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#6B4A3A] hover:text-[#B8324A] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#6B4A3A] mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Crochet Creation'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Product Name <span className="text-[#B8324A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Main Image URL <span className="text-[#B8324A]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  placeholder="Paste image path or URL"
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Price (INR)
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Availability
                  </label>
                  <select
                    value={productForm.availability}
                    onChange={(e) => setProductForm({ ...productForm, availability: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="made_to_order">Made to Order</option>
                    <option value="limited">Limited</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Status
                  </label>
                  <select
                    value={productForm.status}
                    onChange={(e) => setProductForm({ ...productForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  value={productForm.short_description}
                  onChange={(e) => setProductForm({ ...productForm, short_description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Full Story & Description
                </label>
                <textarea
                  rows={3}
                  value={productForm.full_description}
                  onChange={(e) => setProductForm({ ...productForm, full_description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Materials (comma separated)
                  </label>
                  <input
                    type="text"
                    value={productForm.materials}
                    onChange={(e) => setProductForm({ ...productForm, materials: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Dimensions / Size
                  </label>
                  <input
                    type="text"
                    value={productForm.dimensions}
                    onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="rounded text-[#B8324A]"
                  />
                  <span>Mark as Featured Product</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.customizable}
                    onChange={(e) => setProductForm({ ...productForm, customizable: e.target.checked })}
                    className="rounded text-[#B8324A]"
                  />
                  <span>Allow Custom Colorways</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F3B6B6]/30">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B4A3A] bg-[#FFF8EF] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold text-white bg-[#B8324A] hover:bg-[#A0283E] rounded-xl"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: CATEGORY ADD / EDIT
          ======================================================== */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6B4A3A]/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FFFDF8] rounded-3xl p-6 border border-[#F3B6B6]/50 shadow-2xl">
            <button
              onClick={() => setCategoryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#6B4A3A] hover:text-[#B8324A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#6B4A3A] mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.image_url}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold bg-[#FFF8EF] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold text-white bg-[#B8324A] rounded-xl"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: GALLERY IMAGE ADD
          ======================================================== */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6B4A3A]/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FFFDF8] rounded-3xl p-6 border border-[#F3B6B6]/50 shadow-2xl">
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#6B4A3A] hover:text-[#B8324A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#6B4A3A] mb-4">
              Add Gallery Image
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addGalleryImage(galleryForm);
                setGalleryModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.image_url}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Caption / Description
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.caption}
                  onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Category Tag
                </label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                >
                  <option value="Bouquets">Bouquets</option>
                  <option value="Bags">Bags</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Cases">Cases</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold bg-[#FFF8EF] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold text-white bg-[#B8324A] rounded-xl"
                >
                  Upload to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: REVIEW ADD
          ======================================================== */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#6B4A3A]/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FFFDF8] rounded-3xl p-6 border border-[#F3B6B6]/50 shadow-2xl">
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#6B4A3A] hover:text-[#B8324A]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#6B4A3A] mb-4">
              Add Customer Review
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addReview(reviewForm);
                setReviewModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={reviewForm.customer_name}
                  onChange={(e) => setReviewForm({ ...reviewForm, customer_name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                  Review Text
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewForm.review}
                  onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Rating (1-5)
                  </label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6B4A3A] mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={reviewForm.date}
                    onChange={(e) => setReviewForm({ ...reviewForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFF8EF] border border-[#F3B6B6]/60 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold bg-[#FFF8EF] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold text-white bg-[#B8324A] rounded-xl"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
