/**
 * ULULATO Navbar Component
 * Design: Glassmorphic sticky navbar with neon accents
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, User, Menu, X, Search, Heart, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore, useAuthStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const { totalItems, openCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const cartCount = totalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
            ? 'backdrop-blur-xl bg-background/80 border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center group-hover:neon-glow transition-all duration-300">
                  <span className="text-primary-foreground font-display font-bold text-lg md:text-xl">U</span>
                </div>
              </div>
              <span className="font-display font-bold text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors">
                ULULATO
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
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  )}
                >
                  {link.label}
                  {location === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Button */}
              <Link href="/market">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 hover:text-foreground hover:bg-white/10"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </Link>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-foreground/70 hover:text-destructive hover:bg-white/10"
              >
                <Heart className="w-5 h-5" />
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-foreground/70 hover:text-primary hover:bg-white/10"
                onClick={openCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse-glow">
                    {cartCount}
                  </span>
                )}
              </Button>

              {/* User Menu */}
              {isAuthenticated ? (
                <Link href="/profile/orders">
                  <Button
                    variant="ghost"
                    className="hidden md:flex items-center gap-2 text-foreground/70 hover:text-foreground hover:bg-white/10"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary/50"
                    />
                    <span className="font-medium">{user?.name}</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <Button className="hidden md:flex btn-brand">
                    <User className="w-4 h-4 mr-2" />
                    Ingresar
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-foreground/70 hover:text-foreground hover:bg-white/10"
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
            'md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-background/95 border-b border-white/10 transition-all duration-300 overflow-hidden',
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block py-3 px-4 rounded-lg font-medium transition-all',
                  location === link.href
                    ? 'bg-primary/20 text-primary'
                    : 'text-foreground/70 hover:bg-white/10 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-white/10 pt-4">
              {isAuthenticated ? (
                <Link
                  href="/profile/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-foreground/70 hover:bg-white/10"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/50"
                  />
                  <div>
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">Ver perfil</p>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <Button className="w-full btn-brand">
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
    </>
  );
}
