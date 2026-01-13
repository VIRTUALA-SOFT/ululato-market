/**
 * ULULATO Product Detail Page
 * Design: Interactive 3D viewer with image gallery
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState, useRef, useEffect, useCallback, Suspense, lazy } from 'react';
import { useParams, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Award,
  ChevronRight,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Move,
  Eye,
  Box,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductBySlug, getReviewsByProduct, products, formatPrice } from '@/lib/mockDb';
import { useCartStore, useFavoritesStore, useRecentlyViewedStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Lazy load 3D viewer for better performance
const Universal3DViewer = lazy(() => import('@/components/Universal3DViewer'));

// Interactive Image Viewer with Zoom and Pan
function ImageViewer({ 
  src, 
  alt,
  onFullscreen 
}: { 
  src: string; 
  alt: string;
  onFullscreen: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);

  const minZoom = 1;
  const maxZoom = 4;
  const zoomStep = 0.5;

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + zoomStep, maxZoom));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.max(prev - zoomStep, minZoom);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  }, []);

  const handleReset = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }, [handleZoomIn, handleZoomOut]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [zoom, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const maxPan = (zoom - 1) * 150;
      setPosition({
        x: Math.max(-maxPan, Math.min(maxPan, newX)),
        y: Math.max(-maxPan, Math.min(maxPan, newY)),
      });
    }
  }, [isDragging, zoom, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      handleReset();
    }
  }, [zoom, handleReset]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-2xl bg-black/50"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(true)}
    >
      <div
        className={cn(
          "w-full h-full transition-transform duration-200",
          isDragging ? "cursor-grabbing" : zoom > 1 ? "cursor-grab" : "cursor-zoom-in"
        )}
        style={{
          transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain select-none"
          draggable={false}
        />
      </div>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/20 shadow-lg"
          >
            <button
              onClick={handleZoomOut}
              disabled={zoom <= minZoom}
              className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Alejar"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <div className="px-3 min-w-[60px] text-center">
              <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
            </div>
            
            <button
              onClick={handleZoomIn}
              disabled={zoom >= maxZoom}
              className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Acercar"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-white/20 mx-1" />
            
            <button
              onClick={handleReset}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Restablecer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={onFullscreen}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Pantalla completa"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {zoom > 1 && (
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card border border-white/20 text-sm">
          <Move className="w-4 h-4 text-primary" />
          <span>Arrastra para mover</span>
        </div>
      )}

      {zoom === 1 && (
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card border border-white/20 text-sm text-muted-foreground">
          <Eye className="w-4 h-4" />
          <span>Doble clic o scroll para zoom</span>
        </div>
      )}
    </div>
  );
}

// Fullscreen Image Modal
function FullscreenModal({ 
  src, 
  alt, 
  isOpen, 
  onClose 
}: { 
  src: string; 
  alt: string; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full glass-card border border-white/20 hover:bg-white/10 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div 
        className="w-full h-full max-w-6xl max-h-[90vh] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <ImageViewer src={src} alt={alt} onFullscreen={onClose} />
      </div>
    </motion.div>
  );
}

// 3D Loading Fallback
function Viewer3DFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-2xl">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground">Cargando visor 3D...</p>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  
  const { addItem, openCart } = useCartStore();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const { addToHistory } = useRecentlyViewedStore();

  // Get product images directly from the product data
  const productImages = product?.images || [];

  // Track product view
  useEffect(() => {
    if (product) {
      addToHistory(product.id);
    }
  }, [product, addToHistory]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-muted-foreground mb-8">El producto que buscas no existe o ha sido eliminado.</p>
          <Link href="/market">
            <Button className="btn-brand">Volver al Marketplace</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const reviews = getReviewsByProduct(product.id);
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const isLiked = isFavorite(product.id);

  const handleToggleFavorite = () => {
    if (isLiked) {
      removeFavorite(product.id);
      toast.info('Eliminado de favoritos');
    } else {
      addFavorite(product.id);
      toast.success('Agregado a favoritos');
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success('Producto agregado al carrito', {
      description: `${quantity}x ${product.title}`,
      action: {
        label: 'Ver carrito',
        onClick: openCart,
      },
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    window.location.href = '/checkout';
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Enlace copiado al portapapeles');
    }
  };

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/market" className="hover:text-foreground transition-colors">Marketplace</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/market?category=${product.category}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate">{product.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images / 3D Viewer */}
          <div className="space-y-4">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 p-1 rounded-lg glass-card border border-white/10">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-9 px-4 gap-2 rounded-md transition-all',
                    viewMode === '2d' && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  onClick={() => setViewMode('2d')}
                >
                  <ImageIcon className="w-4 h-4" />
                  Galería
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'h-9 px-4 gap-2 rounded-md transition-all',
                    viewMode === '3d' && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  onClick={() => setViewMode('3d')}
                >
                  <Box className="w-4 h-4" />
                  Vista 3D
                </Button>
              </div>
              
              {viewMode === '2d' && (
                <span className="text-sm text-muted-foreground">
                  {selectedImage + 1} / {productImages.length}
                </span>
              )}
            </div>

            {/* Main Viewer */}
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-card border border-white/10">
              {viewMode === '2d' ? (
                <>
                  <ImageViewer 
                    src={productImages[selectedImage]} 
                    alt={product.title}
                    onFullscreen={() => setIsFullscreen(true)}
                  />

                  {/* Discount Badge */}
                  {hasDiscount && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-destructive text-destructive-foreground text-sm font-bold z-10">
                      -{discountPercent}%
                    </span>
                  )}
                </>
              ) : (
                <Suspense fallback={<Viewer3DFallback />}>
                  <Universal3DViewer 
                    img={productImages[0]} 
                    type={product.type3D}
                  />
                </Suspense>
              )}
            </div>

            {/* Thumbnail Gallery (only in 2D mode) */}
            {viewMode === '2d' && productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                      selectedImage === index
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-white/10 hover:border-white/30'
                    )}
                  >
                    <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* 3D Mode Instructions */}
            {viewMode === '3d' && (
              <div className="text-center text-sm text-muted-foreground">
                <p>Arrastra para rotar • Scroll para zoom • Selecciona un modo de visualización</p>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Store Badge */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                <Award className="w-4 h-4" />
                {product.storeLevel}
              </span>
              <Link
                href={`/store/${product.storeId}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {product.storeName}
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5',
                      i < Math.floor(product.rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    )}
                  />
                ))}
                <span className="ml-2 font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.reviewCount} reseñas)
              </span>
              <span className="text-muted-foreground">
                {product.sold} vendidos
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg glass-card border border-white/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} disponibles
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1 btn-brand gap-2 h-12"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 border-primary text-primary hover:bg-primary/10"
                onClick={handleBuyNow}
              >
                Comprar Ahora
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={handleToggleFavorite}
                className={cn(
                  'flex items-center gap-2 text-sm transition-colors',
                  isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                {isLiked ? 'En favoritos' : 'Agregar a favoritos'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Envío Nacional</p>
                  <p className="text-xs text-muted-foreground">3-7 días hábiles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Compra Protegida</p>
                  <p className="text-xs text-muted-foreground">Garantía de devolución</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <RotateCcw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Devolución Gratis</p>
                  <p className="text-xs text-muted-foreground">30 días para devolver</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Artesanía Certificada</p>
                  <p className="text-xs text-muted-foreground">100% auténtico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="container py-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start glass-card border border-white/10 p-1 h-auto">
            <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Descripción
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Reseñas ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Envío y Devoluciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-4">Características</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Hecho a mano por artesanos colombianos
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Materiales 100% naturales y sostenibles
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Certificado de autenticidad incluido
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Comercio justo - Apoyo directo a comunidades
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-4">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm glass-card border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="p-6 rounded-xl glass-card border border-white/10">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{review.userName}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString('es-CO')}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 my-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'w-4 h-4',
                                i < review.rating
                                  ? 'fill-primary text-primary'
                                  : 'text-muted-foreground'
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aún no hay reseñas para este producto.</p>
                <p className="text-sm text-muted-foreground mt-2">¡Sé el primero en dejar una reseña!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Información de Envío</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Truck className="w-5 h-5 text-primary mt-0.5" />
                    <span>Envío a todo Colombia en 3-7 días hábiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Truck className="w-5 h-5 text-primary mt-0.5" />
                    <span>Envío gratis en compras mayores a $200.000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Truck className="w-5 h-5 text-primary mt-0.5" />
                    <span>Seguimiento en tiempo real de tu pedido</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Política de Devoluciones</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <RotateCcw className="w-5 h-5 text-primary mt-0.5" />
                    <span>30 días para devoluciones sin preguntas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <RotateCcw className="w-5 h-5 text-primary mt-0.5" />
                    <span>Reembolso completo o cambio por otro producto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <RotateCcw className="w-5 h-5 text-primary mt-0.5" />
                    <span>El producto debe estar en su estado original</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container py-12">
          <h2 className="font-display text-2xl font-bold mb-8">Productos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <FullscreenModal
            src={productImages[selectedImage]}
            alt={product.title}
            isOpen={isFullscreen}
            onClose={() => setIsFullscreen(false)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
