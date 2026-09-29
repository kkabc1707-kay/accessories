import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  GalleryImage,
  CustomOrder,
  ContactMessage,
  Review,
  HeroSlide,
  SiteSettings
} from '../types';
import {
  initialSiteSettings,
  initialCategories,
  initialProducts,
  initialGallery,
  initialReviews,
  initialHeroSlides,
  initialCustomOrders,
  initialMessages
} from '../data/initialData';

interface StoreContextType {
  // State
  siteSettings: SiteSettings;
  categories: Category[];
  products: Product[];
  gallery: GalleryImage[];
  reviews: Review[];
  heroSlides: HeroSlide[];
  customOrders: CustomOrder[];
  messages: ContactMessage[];
  isAdminAuthenticated: boolean;

  // Actions: Products
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;

  // Actions: Categories
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Actions: Custom Orders
  submitCustomOrder: (order: Omit<CustomOrder, 'id' | 'status' | 'created_at' | 'updated_at'>) => string;
  updateOrderStatus: (id: string, status: CustomOrder['status']) => void;
  updateOrderNotes: (id: string, notes: string) => void;
  deleteCustomOrder: (id: string) => void;

  // Actions: Messages
  submitMessage: (message: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>) => void;
  toggleMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Actions: Gallery
  addGalleryImage: (image: Omit<GalleryImage, 'id' | 'created_at'>) => void;
  updateGalleryImage: (id: string, updates: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;

  // Actions: Reviews
  addReview: (review: Omit<Review, 'id' | 'created_at'>) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;

  // Actions: Hero & Settings
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Admin Auth
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  resetAllData: () => void;

  // WhatsApp helper
  getWhatsAppLink: (type?: 'general' | 'product' | 'custom', metadata?: { name?: string; details?: string }) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'leisure_loopz_settings_v2',
  CATEGORIES: 'leisure_loopz_categories_v2',
  PRODUCTS: 'leisure_loopz_products_v2',
  GALLERY: 'leisure_loopz_gallery_v2',
  REVIEWS: 'leisure_loopz_reviews_v2',
  HERO: 'leisure_loopz_hero_v2',
  ORDERS: 'leisure_loopz_orders_v2',
  MESSAGES: 'leisure_loopz_messages_v2',
  AUTH: 'leisure_loopz_admin_auth_v2',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage with fallbacks
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HERO);
    return saved ? JSON.parse(saved) : initialHeroSlides;
  });

  const [customOrders, setCustomOrders] = useState<CustomOrder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : initialCustomOrders;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(customOrders));
  }, [customOrders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  // Product actions
  const addProduct = (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const duplicateProduct = (id: string) => {
    const source = products.find(p => p.id === id);
    if (!source) return;
    const duplicated: Product = {
      ...source,
      id: `prod-${Date.now()}`,
      name: `${source.name} (Copy)`,
      slug: `${source.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts(prev => [duplicated, ...prev]);
  };

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.slug === slug);
  };

  // Category actions
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Custom Order actions
  const submitCustomOrder = (orderData: Omit<CustomOrder, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
    const id = `ord-${Date.now().toString().slice(-6)}`;
    const newOrder: CustomOrder = {
      ...orderData,
      id,
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCustomOrders(prev => [newOrder, ...prev]);
    return id;
  };

  const updateOrderStatus = (id: string, status: CustomOrder['status']) => {
    setCustomOrders(prev =>
      prev.map(ord =>
        ord.id === id ? { ...ord, status, updated_at: new Date().toISOString() } : ord
      )
    );
  };

  const updateOrderNotes = (id: string, admin_notes: string) => {
    setCustomOrders(prev =>
      prev.map(ord =>
        ord.id === id ? { ...ord, admin_notes, updated_at: new Date().toISOString() } : ord
      )
    );
  };

  const deleteCustomOrder = (id: string) => {
    setCustomOrders(prev => prev.filter(ord => ord.id !== id));
  };

  // Message actions
  const submitMessage = (msgData: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>) => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const toggleMessageRead = (id: string) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, is_read: !msg.is_read } : msg))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  // Gallery actions
  const addGalleryImage = (imgData: Omit<GalleryImage, 'id' | 'created_at'>) => {
    const newImg: GalleryImage = {
      ...imgData,
      id: `gal-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setGallery(prev => [newImg, ...prev]);
  };

  const updateGalleryImage = (id: string, updates: Partial<GalleryImage>) => {
    setGallery(prev =>
      prev.map(img => (img.id === id ? { ...img, ...updates } : img))
    );
  };

  const deleteGalleryImage = (id: string) => {
    setGallery(prev => prev.filter(img => img.id !== id));
  };

  // Review actions
  const addReview = (reviewData: Omit<Review, 'id' | 'created_at'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews(prev =>
      prev.map(rev => (rev.id === id ? { ...rev, ...updates } : rev))
    );
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(rev => rev.id !== id));
  };

  // Hero & Settings
  const updateHeroSlide = (id: string, updates: Partial<HeroSlide>) => {
    setHeroSlides(prev =>
      prev.map(slide => (slide.id === id ? { ...slide, ...updates } : slide))
    );
  };

  const updateSiteSettings = (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...updates }));
  };

  // Admin Auth
  const loginAdmin = (password: string) => {
    // Default admin password for Leisure Loopz
    if (password === 'crochet2026!' || password === 'admin' || password === 'admin123') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const resetAllData = () => {
    setSiteSettings(initialSiteSettings);
    setCategories(initialCategories);
    setProducts(initialProducts);
    setGallery(initialGallery);
    setReviews(initialReviews);
    setHeroSlides(initialHeroSlides);
    setCustomOrders(initialCustomOrders);
    setMessages(initialMessages);
    localStorage.clear();
  };

  // Dynamic WhatsApp Link Builder
  const getWhatsAppLink = (
    type: 'general' | 'product' | 'custom' = 'general',
    metadata?: { name?: string; details?: string }
  ) => {
    const rawPhone = siteSettings.whatsapp_number.replace(/\D/g, '');
    const phone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

    let text = "Hi Leisure Loopz! I have a question about your handmade crochet creations.";

    if (type === 'product' && metadata?.name) {
      text = `Hi Leisure Loopz! I'm interested in ordering ${metadata.name}. I'd like to know the price, availability, and delivery details.`;
    } else if (type === 'custom') {
      const extra = metadata?.details ? ` (${metadata.details})` : '';
      text = `Hi Leisure Loopz! I'd like to place a custom crochet order${extra}. Can you help me with the details?`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        siteSettings,
        categories,
        products,
        gallery,
        reviews,
        heroSlides,
        customOrders,
        messages,
        isAdminAuthenticated,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        getProductBySlug,
        addCategory,
        updateCategory,
        deleteCategory,
        submitCustomOrder,
        updateOrderStatus,
        updateOrderNotes,
        deleteCustomOrder,
        submitMessage,
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
        loginAdmin,
        logoutAdmin,
        resetAllData,
        getWhatsAppLink,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
