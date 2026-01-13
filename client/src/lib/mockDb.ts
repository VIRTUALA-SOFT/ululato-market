/**
 * ULULATO Mock Database
 * Simulates the Prisma schema with typed data for the marketplace
 * Design: "Neon Ancestral" - Cyberpunk Indígena
 */

// ============ ENUMS ============

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';
export type StoreLevel = 'Nuevo' | 'Emprendedor' | 'TejedorLider' | 'Platinum' | 'Gold';
export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type ProductCategory = 'Artesanías' | 'Agrícola' | 'Medicinal' | 'Textiles' | 'Joyería';

// ============ TYPES ============

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: UserRole;
  createdAt: Date;
  storeId?: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  banner: string;
  level: StoreLevel;
  reputation: number;
  totalSales: number;
  ownerId: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: ProductCategory;
  tags: string[];
  storeId: string;
  storeName: string;
  storeLevel: StoreLevel;
  rating: number;
  reviewCount: number;
  stock: number;
  sold: number;
  featured: boolean;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    productTitle: string;
    productImage: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// ============ MOCK DATA ============

export const users: User[] = [
  {
    id: 'user-1',
    email: 'wayuuprince@ululato.com',
    name: 'WayuuPrince',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    role: 'BUYER',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-2',
    email: 'tejidos@ululato.com',
    name: 'TejidosAncestrales',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    role: 'SELLER',
    createdAt: new Date('2023-06-20'),
    storeId: 'store-1',
  },
  {
    id: 'user-3',
    email: 'cafeorigenes@ululato.com',
    name: 'CaféOrígenes',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    role: 'SELLER',
    createdAt: new Date('2023-08-10'),
    storeId: 'store-2',
  },
];

export const stores: Store[] = [
  {
    id: 'store-1',
    name: 'Tejidos Ancestrales',
    slug: 'tejidos-ancestrales',
    description: 'Artesanías wayuu tejidas a mano por mujeres de la comunidad. Cada pieza cuenta una historia de generaciones.',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    banner: '/images/artisan-texture.png',
    level: 'TejedorLider',
    reputation: 4.9,
    totalSales: 1247,
    ownerId: 'user-2',
    createdAt: new Date('2023-06-20'),
  },
  {
    id: 'store-2',
    name: 'Café Orígenes',
    slug: 'cafe-origenes',
    description: 'Café orgánico de altura cultivado por familias campesinas del Huila. Comercio justo y sostenible.',
    logo: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop',
    banner: '/images/artisan-texture.png',
    level: 'Platinum',
    reputation: 4.8,
    totalSales: 3892,
    ownerId: 'user-3',
    createdAt: new Date('2023-08-10'),
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'mochila-wayuu-unicolor',
    title: 'Mochila Wayuu Unicolor',
    description: 'Mochila wayuu tejida a mano en un solo color vibrante. Cada mochila tarda aproximadamente 20 días en ser tejida por artesanas de La Guajira. El diseño geométrico representa la cosmovisión wayuu y su conexión con la naturaleza. Incluye correa ajustable tejida con la misma técnica ancestral.',
    price: 185000,
    compareAtPrice: 220000,
    images: [
      '/images/mochila-wayuu-multicolor.png',
      '/images/mochila-wayuu-angle1.png',
      '/images/mochila-wayuu-angle2.jpg',
      '/images/mochila-wayuu-angle3.png'
    ],
    category: 'Artesanías',
    tags: ['wayuu', 'mochila', 'artesanal', 'colombia', 'tejido'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.9,
    reviewCount: 127,
    stock: 15,
    sold: 342,
    featured: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    id: 'prod-2',
    slug: 'chinchorro-guajiro',
    title: 'Chinchorro Guajiro Tradicional',
    description: 'Chinchorro tradicional de la cultura wayuu, tejido con técnicas ancestrales transmitidas de generación en generación. Los patrones en rojo y azul representan elementos de la naturaleza guajira. Ideal para descanso y decoración. Incluye cuerdas de amarre artesanales.',
    price: 450000,
    compareAtPrice: 520000,
    images: ['/images/chinchorro-wayuu.jpg'],
    category: 'Textiles',
    tags: ['chinchorro', 'hamaca', 'wayuu', 'guajira', 'descanso'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.8,
    reviewCount: 89,
    stock: 8,
    sold: 156,
    featured: true,
    createdAt: new Date('2024-02-05'),
  },
  {
    id: 'prod-3',
    slug: 'cafe-organico-origen',
    title: 'Café Orgánico Origen Colombia',
    description: 'Café de especialidad cultivado a 1800 metros de altura en las montañas del Huila. Notas de chocolate, caramelo y frutos rojos. Tostado artesanal en pequeños lotes para garantizar frescura. Certificación orgánica y comercio justo. Presentación de 500g en grano o molido.',
    price: 45000,
    images: ['/images/cafe-huila.jpg'],
    category: 'Agrícola',
    tags: ['café', 'orgánico', 'huila', 'especialidad', 'colombia'],
    storeId: 'store-2',
    storeName: 'Café Orígenes',
    storeLevel: 'Platinum',
    rating: 4.9,
    reviewCount: 312,
    stock: 50,
    sold: 1893,
    featured: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'prod-4',
    slug: 'collar-chaquiras-embera',
    title: 'Collar de Chaquiras Emberá',
    description: 'Collar tradicional emberá elaborado con chaquiras de vidrio. Los colores vibrantes representan la flora y fauna del Chocó. Cada pieza es única y tarda varios días en ser elaborada. Cierre ajustable.',
    price: 75000,
    compareAtPrice: 95000,
    images: ['/images/collar-chaquiras.jpg'],
    category: 'Joyería',
    tags: ['collar', 'chaquiras', 'embera', 'choco', 'joyería'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.7,
    reviewCount: 56,
    stock: 20,
    sold: 89,
    featured: false,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 'prod-5',
    slug: 'panela-organica-santander',
    title: 'Panela Orgánica de Santander',
    description: 'Panela artesanal producida en trapiches tradicionales de Santander. Sin químicos ni aditivos. Rico sabor a caña fresca. Ideal para bebidas calientes y repostería. Presentación de 1kg.',
    price: 12000,
    images: ['/images/panela-santander.jpg'],
    category: 'Agrícola',
    tags: ['panela', 'orgánico', 'santander', 'dulce', 'natural'],
    storeId: 'store-2',
    storeName: 'Café Orígenes',
    storeLevel: 'Platinum',
    rating: 4.6,
    reviewCount: 78,
    stock: 100,
    sold: 567,
    featured: false,
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'prod-6',
    slug: 'sombrero-vueltiao-original',
    title: 'Sombrero Vueltiao Original',
    description: 'El icónico sombrero vueltiao, símbolo de Colombia. Tejido en caña flecha por artesanos zenúes de Córdoba. 21 vueltas de tejido fino. Certificado de autenticidad incluido.',
    price: 280000,
    compareAtPrice: 350000,
    images: [
      '/images/sombrero-vueltiao.jpg',
      '/images/sombrero-vueltiao-angle1.jpg',
      '/images/sombrero-vueltiao-angle2.jpg',
      '/images/sombrero-vueltiao-angle4.jpg'
    ],
    category: 'Artesanías',
    tags: ['sombrero', 'vueltiao', 'zenu', 'cordoba', 'tradicional'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.9,
    reviewCount: 203,
    stock: 12,
    sold: 445,
    featured: true,
    createdAt: new Date('2024-01-25'),
  },
  // ========== NUEVOS PRODUCTOS ==========
  {
    id: 'prod-7',
    slug: 'mochila-wayuu-multicolor',
    title: 'Mochila Wayuu Multicolor Kanaas',
    description: 'Mochila wayuu con diseño kanaas (figuras geométricas tradicionales) en múltiples colores. Cada diseño cuenta una historia de la cosmovisión wayuu. Tejida 100% a mano con hilos de algodón. Incluye gasa decorativa.',
    price: 245000,
    compareAtPrice: 290000,
    images: [
      '/images/mochila-wayuu-yellow.png',
      '/images/mochila-wayuu-angle4.png',
      '/images/mochila-wayuu-angle1.png',
      '/images/mochila-wayuu-angle2.jpg'
    ],
    category: 'Artesanías',
    tags: ['wayuu', 'mochila', 'kanaas', 'multicolor', 'artesanal'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.9,
    reviewCount: 234,
    stock: 10,
    sold: 567,
    featured: true,
    createdAt: new Date('2024-03-05'),
  },
  {
    id: 'prod-8',
    slug: 'cacao-organico-tumaco',
    title: 'Cacao Orgánico de Tumaco',
    description: 'Cacao fino de aroma cultivado en Tumaco, Nariño. Notas florales y frutales únicas del Pacífico colombiano. Ideal para preparar chocolate caliente artesanal o repostería gourmet. Presentación de 500g.',
    price: 38000,
    images: ['/images/cacao-tumaco.png'],
    category: 'Agrícola',
    tags: ['cacao', 'orgánico', 'tumaco', 'chocolate', 'pacifico'],
    storeId: 'store-2',
    storeName: 'Café Orígenes',
    storeLevel: 'Platinum',
    rating: 4.8,
    reviewCount: 145,
    stock: 35,
    sold: 423,
    featured: false,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'prod-9',
    slug: 'manilla-chaquiras-arcoiris',
    title: 'Manilla de Chaquiras Arcoíris',
    description: 'Manilla artesanal emberá con diseño de arcoíris. Elaborada con chaquiras checas de alta calidad. Cierre ajustable con nudos tradicionales. Cada pieza es única.',
    price: 35000,
    compareAtPrice: 45000,
    images: ['/images/manilla-chaquiras.jpg'],
    category: 'Joyería',
    tags: ['manilla', 'chaquiras', 'embera', 'arcoiris', 'pulsera'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.7,
    reviewCount: 89,
    stock: 45,
    sold: 234,
    featured: false,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'prod-10',
    slug: 'miel-abejas-sierra-nevada',
    title: 'Miel de Abejas Sierra Nevada',
    description: 'Miel pura de abejas recolectada en la Sierra Nevada de Santa Marta. Producida por comunidades kogui con métodos ancestrales sostenibles. Sabor floral único. Presentación de 500ml.',
    price: 42000,
    images: ['/images/miel-abejas.jpg'],
    category: 'Agrícola',
    tags: ['miel', 'abejas', 'kogui', 'sierra nevada', 'natural'],
    storeId: 'store-2',
    storeName: 'Café Orígenes',
    storeLevel: 'Platinum',
    rating: 4.9,
    reviewCount: 178,
    stock: 25,
    sold: 612,
    featured: true,
    createdAt: new Date('2024-02-28'),
  },
  {
    id: 'prod-11',
    slug: 'ruana-boyacense-lana',
    title: 'Ruana Boyacense de Lana Virgen',
    description: 'Ruana tradicional de Boyacá tejida en telar manual con lana virgen de oveja. Diseño clásico en tonos tierra. Perfecta para el frío de las montañas. Tamaño único.',
    price: 320000,
    compareAtPrice: 380000,
    images: ['/images/ruana-boyaca.jpg'],
    category: 'Textiles',
    tags: ['ruana', 'boyaca', 'lana', 'telar', 'tradicional'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.8,
    reviewCount: 67,
    stock: 6,
    sold: 123,
    featured: false,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'prod-12',
    slug: 'pomada-calendula-natural',
    title: 'Pomada de Caléndula Natural',
    description: 'Pomada artesanal elaborada con caléndula orgánica cultivada en Cundinamarca. Ideal para piel irritada, quemaduras leves y cicatrización. Sin químicos ni conservantes artificiales. Presentación de 50g.',
    price: 25000,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop'],
    category: 'Medicinal',
    tags: ['calendula', 'pomada', 'natural', 'piel', 'organico'],
    storeId: 'store-2',
    storeName: 'Café Orígenes',
    storeLevel: 'Platinum',
    rating: 4.6,
    reviewCount: 92,
    stock: 60,
    sold: 345,
    featured: false,
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 'prod-13',
    slug: 'aretes-filigrana-mompox',
    title: 'Aretes Filigrana de Mompox',
    description: 'Aretes elaborados con la técnica ancestral de filigrana momposina. Oro laminado de 24 quilates sobre plata. Diseño de mariposa tradicional. Incluye estuche artesanal.',
    price: 185000,
    compareAtPrice: 220000,
    images: ['/images/aretes-filigrana.jpg'],
    category: 'Joyería',
    tags: ['aretes', 'filigrana', 'mompox', 'oro', 'plata'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.9,
    reviewCount: 156,
    stock: 8,
    sold: 289,
    featured: true,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: 'prod-14',
    slug: 'aceite-esencial-eucalipto',
    title: 'Aceite Esencial de Eucalipto',
    description: 'Aceite esencial 100% puro de eucalipto de los Andes colombianos. Ideal para aromaterapia, masajes y descongestión respiratoria. Extraído por destilación al vapor. Frasco de 30ml con gotero.',
    price: 32000,
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop'],
    category: 'Medicinal',
    tags: ['aceite', 'eucalipto', 'aromaterapia', 'natural', 'andes'],
    storeId: 'store-2',
    storeName: 'Café Orígenes',
    storeLevel: 'Platinum',
    rating: 4.7,
    reviewCount: 134,
    stock: 40,
    sold: 478,
    featured: false,
    createdAt: new Date('2024-02-25'),
  },
  {
    id: 'prod-15',
    slug: 'tapete-wayuu-decorativo',
    title: 'Tapete Wayuu Decorativo',
    description: 'Tapete tejido a mano por artesanas wayuu con diseños geométricos tradicionales. Perfecto para decoración del hogar. Colores vibrantes que no destiñen. Medidas: 60x90cm.',
    price: 180000,
    images: ['/images/tapete-wayuu.jpg'],
    category: 'Textiles',
    tags: ['tapete', 'wayuu', 'decoracion', 'hogar', 'tejido'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.8,
    reviewCount: 78,
    stock: 12,
    sold: 167,
    featured: false,
    createdAt: new Date('2024-03-08'),
  },
  {
    id: 'prod-16',
    slug: 'ceramica-raquira-florero',
    title: 'Florero Cerámica de Ráquira',
    description: 'Florero artesanal de cerámica elaborado en Ráquira, Boyacá. Pintado a mano con motivos tradicionales. Cada pieza es única. Altura: 25cm.',
    price: 85000,
    compareAtPrice: 100000,
    images: ['/images/ceramica-raquira.jpg'],
    category: 'Artesanías',
    tags: ['ceramica', 'raquira', 'florero', 'decoracion', 'boyaca'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 4.6,
    reviewCount: 45,
    stock: 18,
    sold: 89,
    featured: false,
    createdAt: new Date('2024-03-12'),
  },
  {
    id: 'prod-17',
    slug: 'aguardiente-artesanal-antioquia',
    title: 'Aguardiente Artesanal Antioqueño',
    description: 'Aguardiente premium destilado artesanalmente en Antioquia. Sabor suave con notas de anís estrellado. Edición limitada de pequeños lotes. Botella de 750ml.',
    price: 65000,
    images: ['https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&h=600&fit=crop'],
    category: 'Agrícola',
    tags: ['aguardiente', 'antioquia', 'artesanal', 'anis', 'premium'],
    storeId: 'store-2',
    storeName: 'Café Orígenes',
    storeLevel: 'Platinum',
    rating: 4.8,
    reviewCount: 201,
    stock: 30,
    sold: 534,
    featured: false,
    createdAt: new Date('2024-02-18'),
  },
  {
    id: 'prod-18',
    slug: 'canasto-werregue-wounaan',
    title: 'Canasto Werregue Wounaan',
    description: 'Canasto tejido con fibra de werregue por artesanas wounaan del Chocó. Técnica ancestral que puede tardar hasta 3 meses por pieza. Diseño único con tintes naturales. Diámetro: 30cm.',
    price: 450000,
    compareAtPrice: 520000,
    images: ['/images/canasto-werregue.png'],
    category: 'Artesanías',
    tags: ['canasto', 'werregue', 'wounaan', 'choco', 'fibra'],
    storeId: 'store-1',
    storeName: 'Tejidos Ancestrales',
    storeLevel: 'TejedorLider',
    rating: 5.0,
    reviewCount: 34,
    stock: 3,
    sold: 45,
    featured: true,
    createdAt: new Date('2024-01-30'),
  },
];

export const reviews: Review[] = [
  {
    id: 'review-1',
    productId: 'prod-1',
    userId: 'user-1',
    userName: 'WayuuPrince',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Increíble calidad y los colores son exactamente como en las fotos. Se nota el trabajo artesanal.',
    createdAt: new Date('2024-03-15'),
  },
  {
    id: 'review-2',
    productId: 'prod-1',
    userId: 'user-3',
    userName: 'María García',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    comment: 'Hermosa mochila, llegó muy bien empacada. La compré como regalo y quedaron encantados.',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'review-3',
    productId: 'prod-3',
    userId: 'user-1',
    userName: 'Carlos Mendez',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    comment: 'El mejor café que he probado. Las notas de chocolate son increíbles. Ya hice mi segundo pedido.',
    createdAt: new Date('2024-03-18'),
  },
];

export const orders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Mochila Wayuu Unicolor',
        productImage: '/images/mochila-wayuu-yellow.png',
        quantity: 1,
        price: 185000,
      },
    ],
    subtotal: 185000,
    shipping: 15000,
    total: 200000,
    status: 'Delivered',
    shippingAddress: {
      name: 'WayuuPrince',
      address: 'Calle 123 #45-67',
      city: 'Bogotá',
      state: 'Cundinamarca',
      zipCode: '110111',
      country: 'Colombia',
    },
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-28'),
  },
  {
    id: 'order-2',
    userId: 'user-1',
    items: [
      {
        productId: 'prod-3',
        productTitle: 'Café Orgánico Origen Colombia',
        productImage: '/images/cafe-organico.png',
        quantity: 2,
        price: 45000,
      },
    ],
    subtotal: 90000,
    shipping: 10000,
    total: 100000,
    status: 'Shipped',
    shippingAddress: {
      name: 'WayuuPrince',
      address: 'Calle 123 #45-67',
      city: 'Bogotá',
      state: 'Cundinamarca',
      zipCode: '110111',
      country: 'Colombia',
    },
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-17'),
  },
];

// ============ HELPER FUNCTIONS ============

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getStoreBySlug = (slug: string): Store | undefined => {
  return stores.find(s => s.slug === slug);
};

export const getProductsByStore = (storeId: string): Product[] => {
  return products.filter(p => p.storeId === storeId);
};

export const getReviewsByProduct = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};

export const getOrdersByUser = (userId: string): Order[] => {
  return orders.filter(o => o.userId === userId);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const categories: { name: ProductCategory; icon: string; color: string }[] = [
  { name: 'Artesanías', icon: '🎨', color: 'from-yellow-500/20 to-yellow-600/10' },
  { name: 'Agrícola', icon: '🌱', color: 'from-green-500/20 to-green-600/10' },
  { name: 'Medicinal', icon: '🌿', color: 'from-emerald-500/20 to-emerald-600/10' },
  { name: 'Textiles', icon: '🧵', color: 'from-blue-500/20 to-blue-600/10' },
  { name: 'Joyería', icon: '💎', color: 'from-purple-500/20 to-purple-600/10' },
];
