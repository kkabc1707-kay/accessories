import { Category, Product, GalleryImage, CustomOrder, ContactMessage, Review, HeroSlide, SiteSettings } from '../types';

// Import real authentic product image assets
import realRoseMonogramBouquetImg from '../assets/images/real_rose_monogram_bouquet_1790432552982.jpg';
import realOceanToteImg from '../assets/images/real_ocean_tote_bag_1790432574107.jpg';
import realSpidermanChargerImg from '../assets/images/real_spiderman_charger_1790432593161.jpg';
import realPenguinAirpodsImg from '../assets/images/real_penguin_airpods_1790432613858.jpg';
import realWhiteRoseChargerImg from '../assets/images/real_white_rose_charger_1790432654160.jpg';
import realRoseFlowerBagImg from '../assets/images/real_rose_flower_bag_1790432674064.jpg';
import realSunflowerBouquetImg from '../assets/images/real_sunflower_bouquet_1790432695850.jpg';
import realSunflowerBubbleBagImg from '../assets/images/real_sunflower_bubble_bag_1790432719521.jpg';
import realLiliesRosesBouquetImg from '../assets/images/real_lilies_roses_bouquet_1790432742276.jpg';
import realDaisyGrannyBagImg from '../assets/images/real_daisy_granny_bag_1790432758704.jpg';

export const initialSiteSettings: SiteSettings = {
  brand_name: "Leisure Loopz",
  logo_text: "Loops of love",
  tagline: "Loops of love — for the love of crochet.",
  website_description: "Leisure Loopz is a handmade crochet brand based in Mumbai, creating unique yarn creations ranging from beautiful bouquets and stylish bags to fun accessories and personalized gifts.",
  phone: "9869462859",
  whatsapp_number: "9869462859",
  instagram_handle: "@leisure_loopz",
  instagram_url: "https://instagram.com/leisure_loopz",
  location: "Mumbai, India",
  shipping_information: "Handmade with love in Mumbai, shipped safely across all states in India.",
  footer_text: "© 2026 Leisure Loopz. Handmade with ❤️ in Mumbai.",
  seo_title: "Leisure Loopz | Handmade Crochet Gifts & Custom Creations",
  seo_description: "Discover handmade crochet bouquets, bags, accessories and custom creations from Leisure Loopz. Handmade with love in Mumbai and shipped across India."
};

export const initialCategories: Category[] = [
  {
    id: "cat-bouquets",
    name: "Crochet Bouquets",
    slug: "crochet-bouquets",
    image_url: realRoseMonogramBouquetImg,
    description: "Handcrafted flowers that last beyond the moment.",
    status: "active",
    display_order: 1
  },
  {
    id: "cat-bags",
    name: "Crochet Bags",
    slug: "crochet-bags",
    image_url: realOceanToteImg,
    description: "Unique handmade bags for everyday style.",
    status: "active",
    display_order: 2
  },
  {
    id: "cat-accessories",
    name: "Crochet Accessories",
    slug: "crochet-accessories",
    image_url: realSpidermanChargerImg,
    description: "Cute handmade accessories made to stand out.",
    status: "active",
    display_order: 3
  },
  {
    id: "cat-cases",
    name: "Crochet Cases",
    slug: "crochet-cases",
    image_url: realPenguinAirpodsImg,
    description: "Cozy protective covers for AirPods, phones, and chargers.",
    status: "active",
    display_order: 4
  },
  {
    id: "cat-gifts",
    name: "Handmade Gifts",
    slug: "handmade-gifts",
    image_url: realSunflowerBouquetImg,
    description: "Thoughtful crochet gifts for special people.",
    status: "active",
    display_order: 5
  },
  {
    id: "cat-custom",
    name: "Custom Creations",
    slug: "custom-creations",
    image_url: realRoseFlowerBagImg,
    description: "Customized pieces crafted to your exact imagination and colors.",
    status: "active",
    display_order: 6
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-rose-bouquet",
    name: "Rose Crochet Bouquet with Monogram",
    slug: "rose-crochet-bouquet",
    image_url: realRoseMonogramBouquetImg,
    additional_images: [realRoseMonogramBouquetImg, realLiliesRosesBouquetImg, realSunflowerBouquetImg],
    short_description: "Everlasting crimson red roses with personalized monogram initial charm in vintage kraft paper.",
    full_description: "Our signature Rose Crochet Bouquet features intricately crocheted deep crimson red roses and fresh green leaves, accented with a bespoke personalized initial monogram charm. Each petal is individually looped with premium milk cotton yarn to preserve its shape forever. A timeless, romantic gift that never wilts.",
    category_id: "cat-bouquets",
    price: 1499,
    featured: true,
    customizable: true,
    availability: "made_to_order",
    status: "active",
    materials: ["100% Milk Cotton Yarn", "Floral Wire Stems", "Custom Wooden/Yarn Monogram Initial", "Kraft Wrapping Paper", "Satin Ribbon"],
    dimensions: "Approx. 35cm height, 22cm bouquet spread",
    created_at: "2026-01-10T10:00:00Z",
    updated_at: "2026-03-01T12:00:00Z"
  },
  {
    id: "prod-sunflower-bouquet",
    name: "Sunflower Crochet Bouquet",
    slug: "sunflower-crochet-bouquet",
    image_url: realSunflowerBouquetImg,
    additional_images: [realSunflowerBouquetImg, realRoseMonogramBouquetImg],
    short_description: "Warm and cheerful trio of hand-crocheted sunflowers with textured chocolate seed centers.",
    full_description: "Brighten any space with this radiant trio of hand-crocheted sunflowers. Crafted with vibrant golden yellow yarn, textured chocolate brown seed discs, and ribbed foliage, tied neatly in rustic kraft wrapping with a pastel yellow ribbon. Built to bring sunshine into someone's everyday life.",
    category_id: "cat-bouquets",
    price: 1299,
    featured: true,
    customizable: true,
    availability: "made_to_order",
    status: "active",
    materials: ["Soft Cotton Yarn", "Flexible Internal Stems", "Kraft Paper", "Yellow Satin Ribbon"],
    dimensions: "Approx. 32cm height",
    created_at: "2026-01-12T10:00:00Z",
    updated_at: "2026-03-05T14:30:00Z"
  },
  {
    id: "prod-lilies-roses-bouquet",
    name: "Calla Lilies & Roses Artisan Bouquet",
    slug: "lilies-roses-artisan-bouquet",
    image_url: realLiliesRosesBouquetImg,
    additional_images: [realLiliesRosesBouquetImg, realRoseMonogramBouquetImg],
    short_description: "Graceful arrangement combining sculpted white calla lilies and deep velvet red roses.",
    full_description: "A breathtaking marriage of classic elegance and artisan warmth. Handcrafted with sculpted snow-white calla lilies, velvet crimson roses, and eucalyptus greenery. Wrapped in modern matte paper with a subtle ribbon tie. Ideal for anniversaries, engagements, or home styling.",
    category_id: "cat-bouquets",
    price: 1799,
    featured: true,
    customizable: true,
    availability: "made_to_order",
    status: "active",
    materials: ["Fine Milk Cotton Yarn", "Supportive Floral Stems", "Artisan Matte Wrap", "Silk Ribbon"],
    dimensions: "Approx. 38cm height, 25cm spread",
    created_at: "2026-01-14T10:00:00Z",
    updated_at: "2026-03-08T12:00:00Z"
  },
  {
    id: "prod-ocean-tote",
    name: "Ocean Gradient Crochet Tote Bag",
    slug: "ocean-crochet-tote",
    image_url: realOceanToteImg,
    additional_images: [realOceanToteImg, realSunflowerBubbleBagImg],
    short_description: "Three-tone gradient wave textured tote bag featuring a cute handmade jellyfish charm.",
    full_description: "Inspired by the calming rhythms of the sea, the Ocean Crochet Tote combines three gentle gradient shades of pure cream, sky blue, and deep marine turquoise. Crafted with thick durable stitches that hold shape while feeling soft to the touch. Includes a complimentary handmade mini amigurumi jellyfish bag charm!",
    category_id: "cat-bags",
    price: 1899,
    featured: true,
    customizable: true,
    availability: "in_stock",
    status: "active",
    materials: ["Reinforced Cotton Blend Yarn", "Double Crochet Handle", "Amigurumi Jellyfish Charm"],
    dimensions: "36cm wide × 30cm height (strap drop 28cm)",
    created_at: "2026-01-15T11:00:00Z",
    updated_at: "2026-03-10T09:15:00Z"
  },
  {
    id: "prod-flower-bag",
    name: "Crochet Rose Crown Shoulder Bag",
    slug: "crochet-flower-bag",
    image_url: realRoseFlowerBagImg,
    additional_images: [realRoseFlowerBagImg, realOceanToteImg],
    short_description: "Elegant ivory shoulder bag crowned with a garland of miniature red roses.",
    full_description: "A bouquet she can carry anywhere! This delicate ivory shoulder bag features vertical ribbed knit texture and a gathered crown of vibrant hand-crocheted red roses. Finished with adjustable drawstring cords and leaf tassels. Perfect for brunch, romantic dinners, or memorable outings.",
    category_id: "cat-bags",
    price: 2199,
    featured: true,
    customizable: true,
    availability: "made_to_order",
    status: "active",
    materials: ["Premium Ivory Cotton", "Micro Rose Detailing", "Matching Shoulder Strap", "Leaf Drawstrings"],
    dimensions: "26cm wide × 24cm height",
    created_at: "2026-01-20T14:00:00Z",
    updated_at: "2026-03-12T16:00:00Z"
  },
  {
    id: "prod-sunflower-bubble-bag",
    name: "Chunky Bubble-Stitch Bag with Sunflower Charm",
    slug: "chunky-bubble-sunflower-bag",
    image_url: realSunflowerBubbleBagImg,
    additional_images: [realSunflowerBubbleBagImg, realOceanToteImg],
    short_description: "Chunky textured cream bubble-stitch shoulder bag with a dangling crochet sunflower charm.",
    full_description: "Handcrafted using thick, tactile bubble-stitch yarn work for a pillowy, luxurious feel. Staged in rustic outdoor style with comfortable shoulder straps, secure interior room for your wallet, book, and makeup pouch, and a cheerful hanging crochet sunflower charm with green leaf tag.",
    category_id: "cat-bags",
    price: 1999,
    featured: true,
    customizable: true,
    availability: "made_to_order",
    status: "active",
    materials: ["Chunky Cotton Tube Yarn", "Reinforced Shoulder Strap", "Detachable Sunflower Charm"],
    dimensions: "34cm wide × 28cm height",
    created_at: "2026-02-01T10:00:00Z",
    updated_at: "2026-03-14T11:00:00Z"
  },
  {
    id: "prod-daisy-granny-bag",
    name: "Vintage Daisy Granny Square Shoulder Bag",
    slug: "vintage-daisy-granny-bag",
    image_url: realDaisyGrannyBagImg,
    additional_images: [realDaisyGrannyBagImg, realRoseFlowerBagImg],
    short_description: "Cottagecore granny square pouch featuring white daisies, yellow centers, and wooden button.",
    full_description: "Classic cottagecore nostalgia reimagined. Traditional granny squares with raised white daisies, bright yellow centers, and soft sage green borders. Features a natural wooden toggle button closure and a comfortable twisted yarn crossbody strap.",
    category_id: "cat-bags",
    price: 1399,
    featured: false,
    customizable: true,
    availability: "in_stock",
    status: "active",
    materials: ["Natural Cotton Yarn", "Wooden Toggle Button", "Reinforced Granny Square Seams"],
    dimensions: "22cm wide × 20cm height (strap drop 50cm)",
    created_at: "2026-02-03T10:00:00Z",
    updated_at: "2026-03-14T15:00:00Z"
  },
  {
    id: "prod-spiderman-charger",
    name: "Spider-Man Crochet Charger Cover",
    slug: "spiderman-crochet-charger-cover",
    image_url: realSpidermanChargerImg,
    additional_images: [realSpidermanChargerImg],
    short_description: "Handcrafted superhero mask charger block cover with snug red yarn and eye trim.",
    full_description: "Protect your phone charger block in superhero style! Made with snug, soft red yarn and signature white eye patches outlined in black. Keeps your adapter safe from scratches while making it instantly identifiable among friends and family. Compatible with Apple 20W/30W and standard Type-C fast chargers.",
    category_id: "cat-accessories",
    price: 499,
    featured: true,
    customizable: true,
    availability: "in_stock",
    status: "active",
    materials: ["Durable Acrylic & Cotton Yarn", "Snug Stretch Fit"],
    dimensions: "Fits standard 20W/30W USB-C power bricks",
    created_at: "2026-02-05T12:00:00Z",
    updated_at: "2026-03-15T18:00:00Z"
  },
  {
    id: "prod-white-rose-charger",
    name: "White Rose Vine Charger Cover & Cable Wrap",
    slug: "white-rose-vine-charger-cover",
    image_url: realWhiteRoseChargerImg,
    additional_images: [realWhiteRoseChargerImg],
    short_description: "White rose blooming adapter cover with winding green leafy vine cable spiral.",
    full_description: "Transform your mundane charging cable into an enchanting floral garden. Features a delicate white rose that hugs your charging adapter block, continuing along the cable with an entwined green vine dotted with fresh crochet leaves. Prevents cable bending and fraying with handmade charm.",
    category_id: "cat-accessories",
    price: 549,
    featured: false,
    customizable: true,
    availability: "in_stock",
    status: "active",
    materials: ["Soft Milk Cotton", "Spiral Cord Wrap with Leaves"],
    dimensions: "Covers standard power brick + 1m cable",
    created_at: "2026-02-10T09:00:00Z",
    updated_at: "2026-03-16T12:00:00Z"
  },
  {
    id: "prod-penguin-case",
    name: "Chubby Penguin Crochet AirPods Case",
    slug: "chubby-penguin-airpods-case",
    image_url: realPenguinAirpodsImg,
    additional_images: [realPenguinAirpodsImg],
    short_description: "Chubby navy blue penguin protective case with tiny wings, orange beak, and blush cheeks.",
    full_description: "Give your AirPods an adorable companion! Carefully hand-crocheted into a chubby navy blue penguin featuring a white belly, orange beak, blush pink cheeks, and flapping side wings. Precision crafted with a secure snug interior and a bottom cutout for convenient lightning / USB-C charging.",
    category_id: "cat-cases",
    price: 599,
    featured: true,
    customizable: true,
    availability: "in_stock",
    status: "active",
    materials: ["Tight Gauge Cotton Yarn", "Silicone Gripper Band Inside"],
    dimensions: "Available for AirPods 1/2, Pro 1/2, and AirPods 3/4",
    created_at: "2026-02-14T10:00:00Z",
    updated_at: "2026-03-18T10:00:00Z"
  }
];

export const initialGallery: GalleryImage[] = [
  {
    id: "gal-1",
    image_url: realRoseMonogramBouquetImg,
    caption: "Custom Crimson Rose Bouquet with Personalized Initial Charm",
    category: "Bouquets",
    display_order: 1,
    status: "active",
    created_at: "2026-02-01T10:00:00Z"
  },
  {
    id: "gal-2",
    image_url: realOceanToteImg,
    caption: "The Ocean Tote — three gradient waves with handmade jellyfish charm",
    category: "Bags",
    display_order: 2,
    status: "active",
    created_at: "2026-02-05T10:00:00Z"
  },
  {
    id: "gal-3",
    image_url: realRoseFlowerBagImg,
    caption: "Ivory shoulder bag crowned with blooming red roses",
    category: "Bags",
    display_order: 3,
    status: "active",
    created_at: "2026-02-10T10:00:00Z"
  },
  {
    id: "gal-4",
    image_url: realSpidermanChargerImg,
    caption: "Spider-Man themed charger cover — superhero yarn protection",
    category: "Accessories",
    display_order: 4,
    status: "active",
    created_at: "2026-02-15T10:00:00Z"
  },
  {
    id: "gal-5",
    image_url: realSunflowerBouquetImg,
    caption: "Golden sunflower bouquet tied in pastel yellow ribbon",
    category: "Bouquets",
    display_order: 5,
    status: "active",
    created_at: "2026-02-20T10:00:00Z"
  },
  {
    id: "gal-6",
    image_url: realPenguinAirpodsImg,
    caption: "Chubby penguin earbud protector with peach blush cheeks",
    category: "Cases",
    display_order: 6,
    status: "active",
    created_at: "2026-02-25T10:00:00Z"
  },
  {
    id: "gal-7",
    image_url: realWhiteRoseChargerImg,
    caption: "White rose blooming cable cover with climbing leafy vine",
    category: "Accessories",
    display_order: 7,
    status: "active",
    created_at: "2026-03-01T10:00:00Z"
  },
  {
    id: "gal-8",
    image_url: realSunflowerBubbleBagImg,
    caption: "Chunky bubble-stitch shoulder bag with sunflower charm",
    category: "Bags",
    display_order: 8,
    status: "active",
    created_at: "2026-03-05T10:00:00Z"
  },
  {
    id: "gal-9",
    image_url: realLiliesRosesBouquetImg,
    caption: "White calla lilies & crimson roses everlasting bouquet",
    category: "Bouquets",
    display_order: 9,
    status: "active",
    created_at: "2026-03-08T10:00:00Z"
  },
  {
    id: "gal-10",
    image_url: realDaisyGrannyBagImg,
    caption: "Vintage daisy granny square pouch with natural wood button",
    category: "Bags",
    display_order: 10,
    status: "active",
    created_at: "2026-03-10T10:00:00Z"
  }
];

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    customer_name: "Ananya Sharma",
    review: "Ordered the rose bouquet for my best friend's birthday and she literally cried! It looks so neat and realistic, and the best part is that it won't ever wilt. The packaging was also so pretty.",
    rating: 5,
    status: "active",
    date: "February 2026",
    created_at: "2026-02-18T10:00:00Z"
  },
  {
    id: "rev-2",
    customer_name: "Pooja Mehta",
    review: "The Ocean Tote bag is even more stunning in person! Sturdy stitches, soft yarn, and the little jellyfish keychain made everyone ask me where I got it from. 10/10 craftsmanship.",
    rating: 5,
    status: "active",
    date: "March 2026",
    created_at: "2026-03-04T12:00:00Z"
  },
  {
    id: "rev-3",
    customer_name: "Rhea Fernandes",
    review: "Requested a custom anniversary bouquet with specific pastel colors and our initials. The Leisure Loopz team communicated so patiently on WhatsApp and delivered right on time in Mumbai!",
    rating: 5,
    status: "active",
    date: "March 2026",
    created_at: "2026-03-15T15:30:00Z"
  }
];

export const initialHeroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    image_url: realRoseMonogramBouquetImg,
    title: "Handmade With Love, One Loop at a Time.",
    description: "Unique crochet creations, thoughtfully handmade for you, your loved ones, and every special moment.",
    primary_cta_text: "Shop Crochet Creations",
    primary_cta_url: "/shop",
    secondary_cta_text: "Custom Order →",
    secondary_cta_url: "/custom-orders",
    display_order: 1,
    status: "active"
  }
];

export const initialCustomOrders: CustomOrder[] = [
  {
    id: "ord-101",
    name: "Sneha Kulkarni",
    phone: "9820123456",
    email: "sneha.k@example.com",
    product_type: "Bouquet",
    color: "Lavender & Ivory",
    size: "Medium (5 stems)",
    quantity: 1,
    budget: "₹1,500 - ₹2,000",
    required_date: "2026-04-10",
    description: "I want a mixed lavender and daisy crochet bouquet with a personalized letter 'S' charm for my sister's graduation.",
    status: "in_progress",
    admin_notes: "Customer confirmed colors on WhatsApp. Yarn dispatched to production.",
    created_at: "2026-03-20T11:20:00Z",
    updated_at: "2026-03-21T09:00:00Z"
  },
  {
    id: "ord-102",
    name: "Vikram Nair",
    phone: "9819988776",
    email: "vikram.nair@example.com",
    product_type: "Crochet Bag",
    color: "Forest green and beige",
    size: "Large Tote",
    quantity: 1,
    budget: "₹2,200",
    required_date: "2026-04-05",
    description: "Looking for an everyday shoulder tote bag with floral accents for a gift.",
    status: "contacted",
    admin_notes: "Sent sample color swatches via WhatsApp.",
    created_at: "2026-03-24T14:15:00Z",
    updated_at: "2026-03-25T10:00:00Z"
  }
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Tanvi Patel",
    email: "tanvi.p@example.com",
    phone: "9876543210",
    message: "Hi! Do you do express shipping to Bangalore? I need a crochet flower bag within 4 days for a friend's wedding.",
    is_read: false,
    created_at: "2026-03-25T16:45:00Z"
  },
  {
    id: "msg-2",
    name: "Aditya Shah",
    email: "aditya.shah@example.com",
    phone: "9988776655",
    message: "Hello Leisure Loopz team! Loved the Spider-Man charger cover. Can you also make a Batman or Captain America version?",
    is_read: true,
    created_at: "2026-03-22T08:30:00Z"
  }
];
