/**
 * ULULATO Navbar Component
 * Design: Header con logo U + línea vertical + MARKET en amarillo
 * Style: Dark Mode, High Contrast, Glassmorphism
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, User, Menu, X, Search, Heart, Bell, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useAuthStore, useFavoritesStore, useNotificationsStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import CartDrawer from './CartDrawer';
import NotificationsDrawer from './NotificationsDrawer';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const { totalItems, openCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const { totalFavorites } = useFavoritesStore();
  const { unreadCount, openNotifications } = useNotificationsStore();
  
  const cartCount = totalItems();
  const favCount = totalFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/market', label: 'Marketplace' },
    { href: '/sell', label: 'Vender' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'backdrop-blur-xl bg-[#050505]/90 border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Link Volviendo al Origen */}
            <a 
              href="https://prototipo.ululato.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border border-transparent text-[#C9A962] hover:border-[#C9A962] hover:text-[#FFD100] transition-all duration-300 group mr-4"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-light tracking-wider text-sm uppercase">VOLVIENDO AL ORIGEN</span>
            </a>

            {/* Logo: Plumas + Línea Vertical + MARKET */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Logo Plumas */}
              <div className="relative">
                <img 
                  src="/images/logo-ululato.png" 
                  alt="ULULATO" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Línea Vertical Separadora - Más visible */}
              <div 
                className="h-8 w-[2px] rounded-full"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              />
              
              {/* MARKET Text */}
              <span 
                className="font-sans font-extralight text-lg md:text-xl text-[#FFD100] tracking-[0.35em] uppercase"
                style={{ letterSpacing: '0.35em' }}
              >
                MARKET
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-medium transition-all duration-300 relative py-2',
                    location === link.href
                      ? 'text-[#FFD100]'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                  {location === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD100] rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Button */}
              <Link href="/market">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </Link>

              {/* Favorites */}
              <Link href="/favorites">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden md:flex text-white/70 hover:text-[#C81D25] hover:bg-white/10"
                >
                  <Heart className="w-5 h-5" />
                  {favCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C81D25] text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {favCount > 9 ? '9+' : favCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white/70 hover:text-[#FFD100] hover:bg-white/10"
                onClick={openNotifications}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD100] text-[#050505] text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white/70 hover:text-[#FFD100] hover:bg-white/10"
                onClick={openCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFD100] text-[#050505] text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Button>

              {/* User Menu */}
              {isAuthenticated ? (
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="hidden md:flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#FFD100]/50"
                    />
                    <span className="font-medium">{user?.name}</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button className="hidden md:flex bg-[#FFD100] text-[#050505] hover:bg-[#FFD100]/90 font-semibold">
                    <User className="w-4 h-4 mr-2" />
                    Ingresar
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-[#050505]/95 border-b border-white/10 transition-all duration-300 overflow-hidden',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="container py-4 space-y-4">
            {/* Link Volviendo al Origen - Móvil */}
            <a 
              href="https://prototipo.ululato.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-3 px-4 rounded-lg text-[#C9A962] hover:bg-[#C9A962]/10 hover:text-[#FFD100] transition-all border border-[#C9A962]/30 hover:border-[#C9A962]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-light tracking-wider text-sm uppercase">VOLVIENDO AL ORIGEN</span>
            </a>
            
            <div className="border-t border-white/10 pt-4" />
            
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block py-3 px-4 rounded-lg font-medium transition-all',
                  location === link.href
                    ? 'bg-[#FFD100]/20 text-[#FFD100]'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Favorites Link */}
            <Link
              href="/favorites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 px-4 rounded-lg text-white/70 hover:bg-white/10"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Favoritos
              </span>
              {favCount > 0 && (
                <span className="w-6 h-6 bg-[#C81D25] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>
            
            <div className="border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-white/70 hover:bg-white/10"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#FFD100]/50"
                  />
                  <div>
                    <p className="font-medium text-white">{user?.name}</p>
                    <p className="text-sm text-white/50">Ver perfil</p>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <Button className="w-full bg-[#FFD100] text-[#050505] hover:bg-[#FFD100]/90 font-semibold">
                    <User className="w-4 h-4 mr-2" />
                    Ingresar
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer />
      
      {/* Notifications Drawer */}
      <NotificationsDrawer />
    </>
  );
}
