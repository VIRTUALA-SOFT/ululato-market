/**
 * ULULATO Store Profile Page
 * Design: Dedicated page for each seller showing their story, products and reviews
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Calendar,
  Package,
  Award,
  MessageCircle,
  Share2,
  ChevronRight,
  Heart,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { stores, products, reviews, formatPrice, Store, Product, Review } from '@/lib/mockDb';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Store stats component
function StoreStats({ store, productCount }: { store: Store; productCount: number }) {
  const stats = [
    { label: 'Productos', value: productCount, icon: Package },
    { label: 'Ventas', value: store.totalSales.toLocaleString('es-CO'), icon: TrendingUp },
    { label: 'Reputación', value: store.reputation.toFixed(1), icon: Star },
    { label: 'Seguidores', value: Math.floor(store.totalSales * 0.3).toLocaleString('es-CO'), icon: Users },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 rounded-xl glass-card border border-white/10 text-center"
        >
          <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="font-display text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Store reviews component
function StoreReviews({ storeProducts }: { storeProducts: Product[] }) {
  const productIds = storeProducts.map(p => p.id);
  const storeReviews = reviews.filter(r => productIds.includes(r.productId));

  if (storeReviews.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Aún no hay reseñas para esta tienda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {storeReviews.slice(0, 6).map((review) => {
        const product = storeProducts.find(p => p.id === review.productId);
        return (
          <div key={review.id} className="p-6 rounded-xl glass-card border border-white/10">
            <div className="flex items-start gap-4">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{review.userName}</h4>
                    {product && (
                      <Link href={`/product/${product.slug}`}>
                        <span className="text-sm text-primary hover:underline">
                          {product.title}
                        </span>
                      </Link>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString('es-CO')}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
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
        );
      })}
    </div>
  );
}

// Store about section
function StoreAbout({ store }: { store: Store }) {
  const storeHistory = {
    'store-1': {
      story: 'Tejidos Ancestrales nació en 2018 de la mano de María Pushaina, una artesana wayuu de tercera generación de Uribia, La Guajira. Lo que comenzó como un pequeño emprendimiento familiar para preservar las técnicas de tejido tradicionales, se ha convertido en un puente entre las comunidades indígenas y el mundo moderno. Cada pieza que vendemos cuenta una historia de generaciones, tejida con amor y dedicación por mujeres wayuu que mantienen viva su cultura a través del arte.',
      mission: 'Preservar y difundir el arte ancestral wayuu, generando oportunidades económicas justas para las artesanas de La Guajira mientras educamos al mundo sobre la riqueza cultural de Colombia.',
      values: ['Comercio justo', 'Sostenibilidad', 'Preservación cultural', 'Calidad artesanal'],
      location: 'Uribia, La Guajira, Colombia',
      artisans: 15,
    },
    'store-2': {
      story: 'Café Orígenes fue fundada en 2019 por la familia Rodríguez, caficultores de cuarta generación del municipio de Pitalito, Huila. Cansados de ver cómo los intermediarios se quedaban con la mayor parte del valor de su trabajo, decidieron crear un canal directo con los consumidores. Hoy trabajamos con más de 50 familias campesinas de la región, garantizando precios justos y prácticas agrícolas sostenibles.',
      mission: 'Conectar a los caficultores colombianos directamente con los amantes del café de especialidad, eliminando intermediarios y asegurando que cada taza contribuya al bienestar de las comunidades productoras.',
      values: ['Comercio directo', 'Agricultura sostenible', 'Trazabilidad', 'Excelencia en calidad'],
      location: 'Pitalito, Huila, Colombia',
      artisans: 50,
    },
  };

  const info = storeHistory[store.id as keyof typeof storeHistory] || {
    story: store.description,
    mission: 'Ofrecer productos auténticos de la más alta calidad.',
    values: ['Calidad', 'Autenticidad', 'Servicio'],
    location: 'Colombia',
    artisans: 5,
  };

  return (
    <div className="space-y-8">
      {/* Story */}
      <div>
        <h3 className="font-display text-xl font-bold mb-4">Nuestra Historia</h3>
        <p className="text-muted-foreground leading-relaxed">{info.story}</p>
      </div>

      {/* Mission */}
      <div>
        <h3 className="font-display text-xl font-bold mb-4">Misión</h3>
        <p className="text-muted-foreground leading-relaxed">{info.mission}</p>
      </div>

      {/* Values */}
      <div>
        <h3 className="font-display text-xl font-bold mb-4">Valores</h3>
        <div className="flex flex-wrap gap-3">
          {info.values.map((value) => (
            <span
              key={value}
              className="px-4 py-2 rounded-full glass-card border border-white/10 text-sm"
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl glass-card border border-white/10">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Ubicación</p>
              <p className="font-medium">{info.location}</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl glass-card border border-white/10">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Artesanos/Productores</p>
              <p className="font-medium">{info.artisans} familias</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const store = stores.find(s => s.id === storeId);
  const storeProducts = products.filter(p => p.storeId === storeId);

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Tienda no encontrada</h1>
          <p className="text-muted-foreground mb-8">La tienda que buscas no existe.</p>
          <Link href="/market">
            <Button className="btn-brand">Volver al Marketplace</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? 'Dejaste de seguir la tienda' : '¡Ahora sigues a esta tienda!');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: store.name,
          text: store.description,
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

  const memberSince = new Date(store.createdAt).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Store Header */}
      <section className="relative pt-20">
        {/* Banner */}
        <div className="h-48 md:h-64 relative overflow-hidden">
          <img
            src={store.banner}
            alt={`Banner de ${store.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Store Info */}
        <div className="container relative -mt-20">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
              <img
                src={store.logo}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-bold">{store.name}</h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  <Award className="w-4 h-4" />
                  {store.level}
                </span>
              </div>
              
              <p className="text-muted-foreground mb-4 max-w-2xl">{store.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  {store.reputation} reputación
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Desde {memberSince}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant={isFollowing ? 'default' : 'outline'}
                className={cn(
                  'gap-2',
                  isFollowing ? 'btn-brand' : 'border-white/10 hover:bg-white/10'
                )}
                onClick={handleFollow}
              >
                <Heart className={cn('w-4 h-4', isFollowing && 'fill-current')} />
                {isFollowing ? 'Siguiendo' : 'Seguir'}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-white/10 hover:bg-white/10"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-8">
        <StoreStats store={store} productCount={storeProducts.length} />
      </section>

      {/* Tabs Content */}
      <section className="container py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="w-full justify-start glass-card border border-white/10 p-1 h-auto mb-8">
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Productos ({storeProducts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Reseñas
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Acerca de
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {storeProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {storeProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Esta tienda aún no tiene productos.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            <StoreReviews storeProducts={storeProducts} />
          </TabsContent>

          <TabsContent value="about">
            <StoreAbout store={store} />
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </div>
  );
}
