/**
 * ULULATO Landing Page - OPTIMIZED
 * Design: Hero with lightweight particles, mission reveal, featured products
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 * Performance: Lazy loading, reduced particles, optimized animations
 */

import { useEffect, useRef, useState, memo, lazy, Suspense } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, Shield, Truck, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedProducts, categories } from '@/lib/mockDb';
import { cn } from '@/lib/utils';

// Lazy load ProductCard for better initial load
const ProductCard = lazy(() => import('@/components/ProductCard'));

// Loading skeleton for products
function ProductSkeleton() {
  return (
  <div className="rounded-2xl glass-card border border-white/10 p-4 animate-pulse">
    <div className="aspect-square bg-white/5 rounded-xl mb-4" />
    <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
    <div className="h-3 bg-white/5 rounded w-1/2 mb-4" />
    <div className="h-6 bg-white/5 rounded w-1/3" />
  </div>
  );
}

// Optimized Particle System - Reduced count and complexity
const ParticleHero = memo(function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const colors = ['#FFD100', '#101C38', '#C81D25'];
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Limit DPR for performance
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      // Reduced particle count for better performance
      const count = Math.min(40, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 25000));
      particlesRef.current = [];
      
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Simplified mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distSq = dx * dx + dy * dy;
        
        if (distSq < 22500) { // 150^2
          const dist = Math.sqrt(distSq);
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.01;
          p.vy += (dy / dist) * force * 0.01;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Draw fewer connections (only check next 5 particles)
        for (let j = i + 1; j < Math.min(i + 6, particles.length); j++) {
          const p2 = particles[j];
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / 80) * 0.15;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    // Visibility API to pause when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    resize();
    createParticles();
    animate();

    const resizeHandler = () => {
      resize();
      createParticles();
    };

    window.addEventListener('resize', resizeHandler);
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeHandler);
      canvas.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
});

// Mission Section with scroll reveal - Optimized
const MissionSection = memo(function MissionSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = "Somos origen, somos vida, somos la conexión entre el pasado ancestral y el futuro digital.".split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(16, 28, 56, 0.3) 50%, transparent 100%)',
      }}
    >
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {words.map((word, i) => (
              <span
                key={i}
                className={cn(
                  'inline-block mr-3 transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {word === 'origen,' || word === 'vida,' || word === 'ancestral' || word === 'digital.' ? (
                  <span className="text-primary">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h2>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-32 h-32 bg-secondary/30 rounded-full blur-3xl -translate-y-1/2" />
    </section>
  );
});

// Features Section - Memoized
const FeaturesSection = memo(function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Artesanías Auténticas',
      description: 'Cada producto es creado por artesanos colombianos con técnicas ancestrales.',
    },
    {
      icon: Shield,
      title: 'Compra Protegida',
      description: 'Tu dinero está seguro hasta que recibas tu pedido en perfectas condiciones.',
    },
    {
      icon: Truck,
      title: 'Envío Nacional',
      description: 'Llevamos el arte ancestral a cualquier rincón de Colombia.',
    },
    {
      icon: Heart,
      title: 'Comercio Justo',
      description: 'Los artesanos reciben el valor justo por su trabajo y dedicación.',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl glass-card border border-white/10 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

// Categories Section - Memoized
const CategoriesSection = memo(function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Explora por <span className="text-primary">Categoría</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre la riqueza de las tradiciones colombianas en cada una de nuestras categorías
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={`/market?category=${category.name}`}>
              <div className={cn(
                'group relative p-6 rounded-2xl overflow-hidden cursor-pointer',
                'glass-card border border-white/10 hover:border-primary/30',
                'transition-colors duration-300'
              )}>
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity',
                  category.color
                )} />
                <div className="relative z-10 text-center">
                  <span className="text-4xl mb-3 block">{category.icon}</span>
                  <h3 className="font-display font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

// Featured Products Section with Lazy Loading
const FeaturedProductsSection = memo(function FeaturedProductsSection() {
  const [featuredProducts] = useState(() => getFeaturedProducts());

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Productos <span className="text-primary">Destacados</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Los favoritos de nuestra comunidad, seleccionados por su calidad y autenticidad
            </p>
          </div>
          <Link href="/market">
            <Button variant="outline" className="hidden md:flex gap-2 border-primary/50 text-primary hover:bg-primary/10">
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Suspense fallback={<><ProductSkeleton /><ProductSkeleton /><ProductSkeleton /><ProductSkeleton /></>}>
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Suspense>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/market">
            <Button className="btn-brand gap-2">
              Ver todos los productos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

// CTA Section - Optimized image loading
const CTASection = memo(function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero-feather-abstract.png"
              alt=""
              className="w-full h-full object-cover opacity-30"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>

          <div className="relative z-10 p-8 md:p-16 lg:p-24">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Únete a la revolución del{' '}
                <span className="gradient-text">comercio ancestral</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Conviértete en vendedor y comparte tu arte con el mundo. 
                ULULATO te conecta con compradores que valoran la autenticidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sell">
                  <Button className="btn-brand text-lg px-8 py-6">
                    Comenzar a Vender
                  </Button>
                </Link>
                <Link href="/market">
                  <Button variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/10">
                    Explorar Marketplace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Main Home Page - Optimized
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleHero />

        {/* Hero Image - Lazy loaded */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-15">
            <img
              src="/images/hero-feather-abstract.png"
              alt=""
              className="w-full h-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 pointer-events-none" />

        {/* Hero Content */}
        <div className="container relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Marketplace de Futurismo Ancestral</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Donde el <span className="text-primary text-glow">origen</span>
              <br />
              encuentra el <span className="gradient-text">futuro</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Descubre artesanías únicas creadas por comunidades indígenas colombianas. 
              Cada compra apoya el comercio justo y preserva tradiciones milenarias.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/market">
                <Button className="btn-brand text-lg px-8 py-6 gap-2">
                  Explorar Marketplace
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/sell">
                <Button variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/10">
                  Vender Productos
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
              {[
                { value: '500+', label: 'Artesanos' },
                { value: '10K+', label: 'Productos' },
                { value: '50K+', label: 'Clientes' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <MissionSection />
      <FeaturesSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <CTASection />

      <Footer />
    </div>
  );
}
