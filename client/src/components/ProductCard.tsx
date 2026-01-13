/**
 * ULULATO Product Card Component
 * Design: Glassmorphic card with neon hover effects
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState, memo } from 'react';
import { Link } from 'wouter';
import { Heart, ShoppingCart, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, formatPrice } from '@/lib/mockDb';
import { useCartStore, useFavoritesStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

function ProductCard({ product, featured = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  
  const isLiked = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success('Producto agregado al carrito', {
      description: product.title,
      action: {
        label: 'Ver carrito',
        onClick: openCart,
      },
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowFavorite = toggleFavorite(product.id);
    toast.success(nowFavorite ? 'Agregado a favoritos' : 'Eliminado de favoritos', {
      description: product.title,
    });
  };

  const getLevelBadge = (level: string) => {
    const badges: Record<string, { color: string; icon: boolean }> = {
      'MercadoLider': { color: 'bg-primary text-primary-foreground', icon: true },
      'Platinum': { color: 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900', icon: true },
      'Gold': { color: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-amber-900', icon: true },
      'Emprendedor': { color: 'bg-secondary text-secondary-foreground', icon: false },
      'Nuevo': { color: 'bg-muted text-muted-foreground', icon: false },
    };
    return badges[level] || badges['Nuevo'];
  };

  const badge = getLevelBadge(product.storeLevel);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`}>
      <article
        className={cn(
          'group relative rounded-2xl overflow-hidden transition-all duration-300',
          'glass-card border border-white/10',
          'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
          featured && 'md:col-span-2 md:row-span-2'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className={cn(
          'relative overflow-hidden bg-secondary/30',
          featured ? 'aspect-square md:aspect-[4/3]' : 'aspect-square'
        )}>
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
          
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={cn(
              'w-full h-full object-cover transition-transform duration-500',
              isHovered && 'scale-110',
              !imageLoaded && 'opacity-0'
            )}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
            {/* Discount Badge */}
            {hasDiscount && (
              <span className="px-2 py-1 rounded-lg bg-destructive text-destructive-foreground text-xs font-bold">
                -{discountPercent}%
              </span>
            )}

            {/* Like Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'ml-auto w-9 h-9 rounded-full backdrop-blur-md transition-all',
                isLiked
                  ? 'bg-destructive/20 text-destructive'
                  : 'bg-black/30 text-white hover:bg-destructive/20 hover:text-destructive'
              )}
              onClick={handleLike}
            >
              <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
            </Button>
          </div>

          {/* Quick Add Button */}
          <div className={cn(
            'absolute bottom-3 left-3 right-3 transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <Button
              className="w-full btn-brand gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
              Agregar al Carrito
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Store Info */}
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
              badge.color
            )}>
              {badge.icon && <Award className="w-3 h-3" />}
              {product.storeLevel}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {product.storeName}
            </span>
          </div>

          {/* Title */}
          <h3 className={cn(
            'font-display font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors',
            featured ? 'text-lg md:text-xl' : 'text-sm md:text-base'
          )}>
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount} reseñas)
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              {product.sold} vendidos
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className={cn(
              'font-display font-bold text-primary',
              featured ? 'text-xl md:text-2xl' : 'text-lg'
            )}>
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>

          {/* Stock Warning */}
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-xs text-destructive mt-2">
              ¡Solo quedan {product.stock} unidades!
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

export default memo(ProductCard);
