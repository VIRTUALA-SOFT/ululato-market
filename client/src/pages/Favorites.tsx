/**
 * ULULATO Favorites Page
 * Design: Grid of favorited products with quick actions
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useMemo } from 'react';
import { Link } from 'wouter';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useFavoritesStore } from '@/lib/store';
import { products } from '@/lib/mockDb';

export default function Favorites() {
  const { favoriteIds, clearFavorites, totalFavorites } = useFavoritesStore();
  const favCount = totalFavorites();

  // Get favorite products
  const favoriteProducts = useMemo(() => {
    return products.filter(p => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Mis <span className="text-primary">Favoritos</span>
              </h1>
              <p className="text-muted-foreground">
                {favCount === 0
                  ? 'Aún no tienes productos favoritos'
                  : `${favCount} producto${favCount !== 1 ? 's' : ''} guardado${favCount !== 1 ? 's' : ''}`}
              </p>
            </div>

            {favCount > 0 && (
              <Button
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={clearFavorites}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Limpiar favoritos
              </Button>
            )}
          </div>

          {/* Empty State */}
          {favCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-3">
                Tu lista de favoritos está vacía
              </h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Explora nuestro marketplace y guarda los productos que te gusten 
                haciendo clic en el corazón
              </p>
              <Link href="/market">
                <Button className="btn-brand gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Explorar Marketplace
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  ¿Buscas más productos?
                </p>
                <Link href="/market">
                  <Button variant="outline" className="gap-2 border-primary/50 text-primary hover:bg-primary/10">
                    Explorar más productos
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
