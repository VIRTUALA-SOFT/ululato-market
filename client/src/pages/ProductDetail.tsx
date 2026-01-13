/**
 * ULULATO Product Detail Page
 * Design: 2D/3D toggle viewer, product info, reviews
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState, useRef, Suspense } from 'react';
import { useParams, Link } from 'wouter';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
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
  Box,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import { getProductBySlug, getReviewsByProduct, products, formatPrice } from '@/lib/mockDb';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// 3D Product Viewer Component
function Product3DViewer({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load texture from product image
  useState(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      setTexture(tex);
    });
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Simplified bag/mochila shape */}
        <cylinderGeometry args={[1, 0.8, 2, 32]} />
        <meshStandardMaterial
          color="#FFD100"
          metalness={0.1}
          roughness={0.8}
          map={texture}
        />
      </mesh>
      {/* Strap */}
      <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.8, 0.05, 16, 100, Math.PI]} />
        <meshStandardMaterial color="#101C38" metalness={0.3} roughness={0.7} />
      </mesh>
    </Float>
  );
}

// 3D Scene
function Scene3D({ imageUrl }: { imageUrl: string }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 50 }}
      className="w-full h-full"
    >
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        color="#FFD100"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#101C38" />
      
      <Suspense fallback={null}>
        <Product3DViewer imageUrl={imageUrl} />
        <Environment preset="city" />
      </Suspense>
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addItem, openCart } = useCartStore();

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
          {/* Product Images/3D Viewer */}
          <div className="space-y-4">
            {/* Main Viewer */}
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-card border border-white/10">
              {viewMode === '2D' ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Scene3D imageUrl={product.images[0]} />
              )}

              {/* View Mode Toggle */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg glass-card border border-white/10">
                <ImageIcon className={cn('w-4 h-4', viewMode === '2D' ? 'text-primary' : 'text-muted-foreground')} />
                <Switch
                  checked={viewMode === '3D'}
                  onCheckedChange={(checked) => setViewMode(checked ? '3D' : '2D')}
                />
                <Box className={cn('w-4 h-4', viewMode === '3D' ? 'text-primary' : 'text-muted-foreground')} />
              </div>

              {/* Discount Badge */}
              {hasDiscount && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-destructive text-destructive-foreground text-sm font-bold">
                  -{discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnail Gallery (2D mode only) */}
            {viewMode === '2D' && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-white/10 hover:border-white/30'
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* 3D Mode Instructions */}
            {viewMode === '3D' && (
              <p className="text-center text-sm text-muted-foreground">
                Arrastra para rotar • Scroll para zoom • Vista previa del "Gemelo Digital"
              </p>
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
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center gap-2 p-1 rounded-lg bg-white/5 border border-white/10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} disponibles
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 btn-brand text-lg py-6 gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-lg py-6 border-primary/50 text-primary hover:bg-primary/10"
                onClick={handleBuyNow}
              >
                Comprar Ahora
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className={cn(
                  'gap-2',
                  isLiked ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
                )}
                onClick={() => {
                  setIsLiked(!isLiked);
                  toast.success(isLiked ? 'Eliminado de favoritos' : 'Agregado a favoritos');
                }}
              >
                <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                {isLiked ? 'En favoritos' : 'Agregar a favoritos'}
              </Button>
              <Button
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Enlace copiado al portapapeles');
                }}
              >
                <Share2 className="w-5 h-5" />
                Compartir
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Envío Nacional</p>
                  <p className="text-xs text-muted-foreground">3-5 días hábiles</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <Shield className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Compra Protegida</p>
                  <p className="text-xs text-muted-foreground">100% seguro</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <RotateCcw className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Devoluciones</p>
                  <p className="text-xs text-muted-foreground">30 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container py-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start bg-white/5 border border-white/10 p-1 rounded-xl">
            <TabsTrigger value="description" className="rounded-lg">Descripción</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg">
              Reseñas ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-lg">Envío</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <h3 className="font-display text-xl font-semibold mt-6 mb-4 text-foreground">Características</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Hecho a mano por artesanos colombianos</li>
                <li>Materiales 100% naturales y sostenibles</li>
                <li>Diseño único con patrones tradicionales</li>
                <li>Certificado de autenticidad incluido</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-xl glass-card border border-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">{review.userName}</span>
                          <div className="flex items-center gap-1">
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
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(review.createdAt).toLocaleDateString('es-CO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Este producto aún no tiene reseñas.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <h3 className="font-display text-xl font-semibold mb-4 text-foreground">Información de Envío</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Envío nacional a todas las ciudades de Colombia</li>
                <li>Tiempo de entrega: 3-5 días hábiles</li>
                <li>Envío gratis en compras mayores a $200.000</li>
                <li>Seguimiento en tiempo real de tu pedido</li>
              </ul>
              <h3 className="font-display text-xl font-semibold mt-6 mb-4 text-foreground">Política de Devoluciones</h3>
              <p className="text-muted-foreground">
                Tienes 30 días para devolver tu producto si no estás satisfecho. 
                El producto debe estar en su empaque original y sin usar.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container py-12">
          <h2 className="font-display text-2xl font-bold mb-8">
            Productos <span className="text-primary">Relacionados</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
