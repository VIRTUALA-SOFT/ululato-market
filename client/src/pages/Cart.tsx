/**
 * ULULATO Cart Page
 * Design: Full cart page with detailed list
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCartStore } from '@/lib/store';
import { formatPrice, products } from '@/lib/mockDb';
import { cn } from '@/lib/utils';

export default function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
  } = useCartStore();

  // Get recommended products
  const recommendedProducts = products
    .filter((p) => !items.some((item) => item.productId === p.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-24 pb-16">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/5 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-muted-foreground mb-8">
              Explora nuestro marketplace y encuentra productos únicos creados por artesanos colombianos
            </p>
            <Link href="/market">
              <Button className="btn-brand text-lg px-8 py-6">
                Explorar Marketplace
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold mb-8">
                Productos <span className="text-primary">Recomendados</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-24 pb-16">
        <h1 className="font-display text-3xl font-bold mb-8">
          Tu <span className="text-primary">Carrito</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="p-4 md:p-6 rounded-2xl glass-card border border-white/10 hover:border-primary/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  {/* Product Image */}
                  <Link href={`/product/${item.product.slug}`}>
                    <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-secondary/50 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/product/${item.product.slug}`}>
                          <h3 className="font-display font-semibold text-lg hover:text-primary transition-colors">
                            {item.product.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.storeName}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-4 gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">Cantidad:</span>
                        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({item.product.stock} disponibles)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-display font-bold text-xl text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.product.price)} c/u
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-2xl glass-card border border-white/10">
              <h3 className="font-display text-xl font-bold mb-6">
                Resumen del Pedido
              </h3>

              {/* Totals */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} productos)
                  </span>
                  <span className="font-medium">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className={cn('font-medium', shipping() === 0 && 'text-green-500')}>
                    {shipping() === 0 ? 'Gratis' : formatPrice(shipping())}
                  </span>
                </div>
                {shipping() > 0 && (
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-primary">
                      <Truck className="w-4 h-4 inline mr-2" />
                      ¡Agrega {formatPrice(200000 - subtotal())} más para envío gratis!
                    </p>
                  </div>
                )}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="font-display font-bold text-lg">Total</span>
                    <span className="font-display font-bold text-2xl text-primary">
                      {formatPrice(total())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button className="w-full btn-brand text-lg py-6 mb-4">
                  Proceder al Pago
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link
                href="/market"
                className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continuar comprando
              </Link>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Compra 100% segura y protegida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-8">
              También te puede <span className="text-primary">interesar</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
