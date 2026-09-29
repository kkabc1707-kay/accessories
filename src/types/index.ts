export interface Product {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  additional_images?: string[];
  short_description: string;
  full_description: string;
  category_id: string;
  price?: number;
  featured: boolean;
  customizable: boolean;
  availability: 'in_stock' | 'made_to_order' | 'limited';
  status: 'active' | 'inactive';
  materials?: string[];
  dimensions?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  status: 'active' | 'inactive';
  display_order: number;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  display_order: number;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface CustomOrder {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product_type: string;
  color?: string;
  size?: string;
  quantity: number;
  budget?: string;
  required_date?: string;
  description: string;
  inspiration_image_url?: string;
  status: 'new' | 'contacted' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  review: string;
  rating: number;
  image_url?: string;
  status: 'active' | 'inactive';
  date?: string;
  created_at: string;
}

export interface HeroSlide {
  id: string;
  image_url: string;
  title: string;
  description: string;
  primary_cta_text: string;
  primary_cta_url: string;
  secondary_cta_text: string;
  secondary_cta_url: string;
  display_order: number;
  status: 'active' | 'inactive';
}

export interface SiteSettings {
  brand_name: string;
  logo_text: string;
  tagline: string;
  website_description: string;
  phone: string;
  whatsapp_number: string;
  instagram_handle: string;
  instagram_url: string;
  location: string;
  shipping_information: string;
  footer_text: string;
  seo_title: string;
  seo_description: string;
}
