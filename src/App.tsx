/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomOrderModal } from './components/CustomOrderModal';
import { ImageLightbox } from './components/ImageLightbox';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CustomOrdersPage } from './pages/CustomOrdersPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

import { Product, GalleryImage } from './types';

function MainApp() {
  const { isAdminAuthenticated, logoutAdmin, getProductBySlug } = useStore();

  // Page state
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageMeta, setPageMeta] = useState<any>(null);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customOrderOpen, setCustomOrderOpen] = useState(false);
  const [customOrderPrefill, setCustomOrderPrefill] = useState('');
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<GalleryImage | null>(null);

  // Synchronize with URL hash on load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '');
        const found = getProductBySlug(slug);
        if (found) setSelectedProduct(found);
      } else if (hash === 'admin' || hash === 'admin/login') {
        setCurrentPage('admin');
      } else if (['shop', 'custom-orders', 'about', 'gallery', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, meta?: any) => {
    setCurrentPage(page);
    setPageMeta(meta);
    window.location.hash = page === 'home' ? '' : `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCustomOrder = (productName?: string) => {
    setCustomOrderPrefill(productName || '');
    setCustomOrderOpen(true);
  };

  // If viewing admin
  if (currentPage === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLoginPage
          onLoginSuccess={() => setCurrentPage('admin')}
          onGoHome={() => navigateTo('home')}
        />
      );
    }
    return (
      <AdminPage
        onLogout={() => {
          logoutAdmin();
          navigateTo('home');
        }}
        onGoHome={() => navigateTo('home')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8EF] text-[#6B4A3A] selection:bg-[#F3B6B6] selection:text-[#6B4A3A]">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenCustomOrder={() => handleOpenCustomOrder()}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onViewProduct={(prod) => setSelectedProduct(prod)}
            onOpenCustomOrder={handleOpenCustomOrder}
            onOpenLightbox={(img) => setSelectedLightboxImage(img)}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            onViewProduct={(prod) => setSelectedProduct(prod)}
            onOpenCustomOrder={() => handleOpenCustomOrder()}
            initialCategoryId={pageMeta?.categoryId}
          />
        )}

        {currentPage === 'custom-orders' && <CustomOrdersPage />}

        {currentPage === 'gallery' && (
          <GalleryPage
            onOpenLightbox={(img) => setSelectedLightboxImage(img)}
            onOpenCustomOrder={() => handleOpenCustomOrder()}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onOpenCustomOrder={() => handleOpenCustomOrder()}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Global Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenCustomOrder={(name) => {
            setSelectedProduct(null);
            handleOpenCustomOrder(name);
          }}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      <CustomOrderModal
        isOpen={customOrderOpen}
        onClose={() => setCustomOrderOpen(false)}
        prefilledProduct={customOrderPrefill}
      />

      {selectedLightboxImage && (
        <ImageLightbox
          image={selectedLightboxImage}
          onClose={() => setSelectedLightboxImage(null)}
          onCustomOrder={() => {
            setSelectedLightboxImage(null);
            handleOpenCustomOrder(selectedLightboxImage.caption);
          }}
        />
      )}

      {/* Mobile Sticky Bar for quick WhatsApp and Instagram conversion */}
      <MobileStickyBar />

      {/* Brand Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
