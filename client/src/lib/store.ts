/**
 * ULULATO Global Store - Zustand
 * Manages: Cart, User Auth, UI State
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
  
  completeOrder: () => set({
    isComplete: true,
    orderId: `ORD-${Date.now()}`,
    step: 3,
  }),
  
  resetCheckout: () => set({
    step: 1,
    shippingAddress: null,
    paymentInfo: null,
    isComplete: false,
    orderId: null,
  }),
}));
