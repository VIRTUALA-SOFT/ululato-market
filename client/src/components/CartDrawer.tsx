/**
 * ULULATO Cart Drawer Component
 * Design: Glassmorphic slide-out drawer
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/mockDb';
import { cn } from '@/lib/utils';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
  } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md z-50 transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="h-full glass-card border-l border-white/10 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg">Tu Carrito</h2>
                <p className="text-sm text-muted-foreground">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
              className="text-foreground/70 hover:text-foreground hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Tu carrito está vacío
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Explora nuestro marketplace y encuentra productos únicos
                </p>
                <Link href="/market" onClick={closeCart}>
                  <Button className="btn-brand">
                    Explorar Productos
                  </Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10 group hover:border-primary/30 transition-all"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary/50 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.product.title}
                    </h4>
                    <p className="text-primary font-semibold">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 bg-white/10 rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-white/10"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-white/10"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-white/10 p-4 space-y-4">
              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className={shipping() === 0 ? 'text-green-500' : ''}>
                    {shipping() === 0 ? 'Gratis' : formatPrice(shipping())}
                  </span>
                </div>
                {shipping() > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Envío gratis en compras mayores a {formatPrice(200000)}
                  </p>
                )}
                <div className="flex justify-between font-display font-bold text-lg pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total())}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" onClick={closeCart}>
                <Button className="w-full btn-brand text-lg py-6">
                  Proceder al Pago
                </Button>
              </Link>

              <Link
                href="/market"
                onClick={closeCart}
                className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continuar comprando
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
