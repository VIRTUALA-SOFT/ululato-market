/**
 * ULULATO Global Store - Zustand
 * Manages: Cart, User Auth, UI State, Favorites, Notifications
 * Design: "Neon Ancestral" - Cyberpunk Indígena
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, User, Order, CartItem, users, orders as mockOrders } from './mockDb';

// ============ CART STORE ============

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  totalItems: () => number;
  subtotal: () => number;
  shipping: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.productId === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { productId: product.id, quantity, product }],
          };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId),
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      
      subtotal: () => get().items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
      
      shipping: () => {
        const subtotal = get().subtotal();
        if (subtotal === 0) return 0;
        if (subtotal >= 200000) return 0; // Free shipping over 200k
        return 15000;
      },
      
      total: () => get().subtotal() + get().shipping(),
    }),
    {
      name: 'ululato-cart',
    }
  )
);

// ============ FAVORITES STORE ============

interface FavoritesState {
  favoriteIds: string[];
  
  // Actions
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  
  // Computed
  totalFavorites: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      
      addFavorite: (productId) => {
        set((state) => {
          if (state.favoriteIds.includes(productId)) return state;
          return { favoriteIds: [...state.favoriteIds, productId] };
        });
      },
      
      removeFavorite: (productId) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter(id => id !== productId),
        }));
      },
      
      toggleFavorite: (productId) => {
        const isFav = get().favoriteIds.includes(productId);
        if (isFav) {
          get().removeFavorite(productId);
          return false;
        } else {
          get().addFavorite(productId);
          return true;
        }
      },
      
      isFavorite: (productId) => get().favoriteIds.includes(productId),
      
      clearFavorites: () => set({ favoriteIds: [] }),
      
      totalFavorites: () => get().favoriteIds.length,
    }),
    {
      name: 'ululato-favorites',
    }
  )
);

// ============ NOTIFICATIONS STORE ============

export type NotificationType = 'info' | 'success' | 'warning' | 'promo' | 'stock' | 'order';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
  productId?: string;
  imageUrl?: string;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
  
  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearNotifications: () => void;
  toggleNotifications: () => void;
  openNotifications: () => void;
  closeNotifications: () => void;
}

// Generate initial notifications for demo
const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'promo',
    title: '¡Oferta especial!',
    message: '20% de descuento en artesanías wayuu este fin de semana',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    read: false,
    actionUrl: '/market?category=Artesanías',
    actionLabel: 'Ver ofertas',
    imageUrl: '/images/mochila-wayuu-yellow.png',
  },
  {
    id: 'notif-2',
    type: 'stock',
    title: 'Stock bajo',
    message: 'El Chinchorro Guajiro tiene pocas unidades disponibles',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    productId: 'prod-2',
    actionUrl: '/product/chinchorro-guajiro',
    actionLabel: 'Ver producto',
    imageUrl: '/images/chinchorro-guajiro.png',
  },
  {
    id: 'notif-3',
    type: 'info',
    title: 'Nuevos productos',
    message: '5 nuevos productos de artesanos del Chocó',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    actionUrl: '/market',
    actionLabel: 'Explorar',
  },
];

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: initialNotifications,
      unreadCount: initialNotifications.filter(n => !n.read).length,
      isOpen: false,
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `notif-${Date.now()}`,
          timestamp: new Date(),
          read: false,
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep max 50
          unreadCount: state.unreadCount + 1,
        }));
      },
      
      markAsRead: (notificationId) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === notificationId);
          if (!notification || notification.read) return state;
          
          return {
            notifications: state.notifications.map(n =>
              n.id === notificationId ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
          };
        });
      },
      
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },
      
      removeNotification: (notificationId) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === notificationId);
          return {
            notifications: state.notifications.filter(n => n.id !== notificationId),
            unreadCount: notification && !notification.read 
              ? Math.max(0, state.unreadCount - 1) 
              : state.unreadCount,
          };
        });
      },
      
      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
      
      toggleNotifications: () => set((state) => ({ isOpen: !state.isOpen })),
      openNotifications: () => set({ isOpen: true }),
      closeNotifications: () => set({ isOpen: false }),
    }),
    {
      name: 'ululato-notifications',
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
);

// ============ AUTH STORE ============

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  
  // Actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      orders: [],
      
      login: (email: string, _password: string) => {
        // Simulate login - find user by email
        const user = users.find(u => u.email === email);
        
        if (user) {
          const userOrders = mockOrders.filter(o => o.userId === user.id);
          set({ user, isAuthenticated: true, orders: userOrders });
          
          // Add welcome notification
          useNotificationsStore.getState().addNotification({
            type: 'success',
            title: '¡Bienvenido de vuelta!',
            message: `Hola ${user.name}, nos alegra verte de nuevo`,
          });
          
          return true;
        }
        
        // Demo login for any email
        const demoUser: User = {
          id: 'demo-user',
          email,
          name: email.split('@')[0],
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
          role: 'BUYER',
          createdAt: new Date(),
        };
        
        set({ user: demoUser, isAuthenticated: true, orders: [] });
        
        // Add welcome notification
        useNotificationsStore.getState().addNotification({
          type: 'success',
          title: '¡Bienvenido a ULULATO!',
          message: 'Tu cuenta ha sido creada exitosamente',
        });
        
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, orders: [] });
      },
      
      register: (name: string, email: string, _password: string) => {
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          name,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
          role: 'BUYER',
          createdAt: new Date(),
        };
        
        set({ user: newUser, isAuthenticated: true, orders: [] });
        
        // Add welcome notification
        useNotificationsStore.getState().addNotification({
          type: 'success',
          title: '¡Bienvenido a ULULATO!',
          message: `Hola ${name}, tu cuenta ha sido creada exitosamente`,
        });
        
        return true;
      },
    }),
    {
      name: 'ululato-auth',
    }
  )
);

// ============ UI STORE ============

interface UIState {
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  viewMode: '2D' | '3D';
  
  // Actions
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setViewMode: (mode: '2D' | '3D') => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isLoading: false,
  searchQuery: '',
  selectedCategory: null,
  viewMode: '2D',
  
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));

// ============ CHECKOUT STORE ============

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

interface CheckoutState {
  step: number;
  shippingAddress: ShippingAddress | null;
  paymentInfo: PaymentInfo | null;
  isComplete: boolean;
  orderId: string | null;
  
  // Actions
  setStep: (step: number) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  completeOrder: () => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  step: 1,
  shippingAddress: null,
  paymentInfo: null,
  isComplete: false,
  orderId: null,
  
  setStep: (step) => set({ step }),
  
  setShippingAddress: (address) => set({ shippingAddress: address, step: 2 }),
  
  setPaymentInfo: (info) => set({ paymentInfo: info }),
  
  completeOrder: () => {
    const orderId = `ORD-${Date.now()}`;
    set({
      isComplete: true,
      orderId,
      step: 3,
    });
    
    // Add order notification
    useNotificationsStore.getState().addNotification({
      type: 'order',
      title: '¡Pedido confirmado!',
      message: `Tu pedido ${orderId} ha sido procesado exitosamente`,
      actionUrl: '/profile',
      actionLabel: 'Ver pedido',
    });
  },
  
  resetCheckout: () => set({
    step: 1,
    shippingAddress: null,
    paymentInfo: null,
    isComplete: false,
    orderId: null,
  }),
}));


// ============ RECENTLY VIEWED STORE ============

interface RecentlyViewedState {
  viewedIds: string[];
  maxItems: number;
  
  // Actions
  addToHistory: (productId: string) => void;
  clearHistory: () => void;
  
  // Computed
  getRecentlyViewed: () => string[];
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      viewedIds: [],
      maxItems: 10,
      
      addToHistory: (productId) => {
        set((state) => {
          // Remove if already exists (to move to front)
          const filtered = state.viewedIds.filter(id => id !== productId);
          // Add to front and limit to maxItems
          return {
            viewedIds: [productId, ...filtered].slice(0, state.maxItems),
          };
        });
      },
      
      clearHistory: () => set({ viewedIds: [] }),
      
      getRecentlyViewed: () => get().viewedIds,
    }),
    {
      name: 'ululato-recently-viewed',
    }
  )
);

// ============ COMPARE STORE ============

interface CompareState {
  compareIds: string[];
  maxItems: number;
  isOpen: boolean;
  
  // Actions
  addToCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  toggleComparePanel: () => void;
  openComparePanel: () => void;
  closeComparePanel: () => void;
  
  // Computed
  compareCount: () => number;
  canAddMore: () => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareIds: [],
      maxItems: 4,
      isOpen: false,
      
      addToCompare: (productId) => {
        const state = get();
        if (state.compareIds.length >= state.maxItems) {
          return false;
        }
        if (state.compareIds.includes(productId)) {
          return true;
        }
        set({ compareIds: [...state.compareIds, productId] });
        return true;
      },
      
      removeFromCompare: (productId) => {
        set((state) => ({
          compareIds: state.compareIds.filter(id => id !== productId),
        }));
      },
      
      clearCompare: () => set({ compareIds: [] }),
      
      isInCompare: (productId) => get().compareIds.includes(productId),
      
      toggleComparePanel: () => set((state) => ({ isOpen: !state.isOpen })),
      openComparePanel: () => set({ isOpen: true }),
      closeComparePanel: () => set({ isOpen: false }),
      
      compareCount: () => get().compareIds.length,
      canAddMore: () => get().compareIds.length < get().maxItems,
    }),
    {
      name: 'ululato-compare',
      partialize: (state) => ({
        compareIds: state.compareIds,
      }),
    }
  )
);
