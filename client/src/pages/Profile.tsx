/**
 * ULULATO Profile Page - Order History
 * Design: User profile with order list
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ChevronRight,
  User,
  Settings,
  LogOut,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/lib/store';
import { orders as mockOrders, formatPrice, OrderStatus } from '@/lib/mockDb';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const getStatusConfig = (status: OrderStatus) => {
  const configs: Record<OrderStatus, { icon: typeof Package; color: string; label: string }> = {
    Pending: { icon: Clock, color: 'text-yellow-500', label: 'Pendiente' },
    Confirmed: { icon: CheckCircle, color: 'text-blue-500', label: 'Confirmado' },
    Processing: { icon: Package, color: 'text-purple-500', label: 'Procesando' },
    Shipped: { icon: Truck, color: 'text-primary', label: 'Enviado' },
    Delivered: { icon: CheckCircle, color: 'text-green-500', label: 'Entregado' },
    Cancelled: { icon: XCircle, color: 'text-destructive', label: 'Cancelado' },
  };
  return configs[status];
};

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, logout, orders } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/auth/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Combine user orders with mock orders for demo
  const allOrders = orders.length > 0 ? orders : mockOrders;

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-24 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* User Card */}
              <div className="p-6 rounded-2xl glass-card border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/50"
                  />
                  <div>
                    <h2 className="font-display font-bold text-lg">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  <Link href="/profile/orders">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 bg-primary/10 text-primary"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Mis Pedidos
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                    onClick={() => toast.info('Funcionalidad próximamente')}
                  >
                    <User className="w-5 h-5" />
                    Mi Perfil
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
                    onClick={() => toast.info('Funcionalidad próximamente')}
                  >
                    <Settings className="w-5 h-5" />
                    Configuración
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                  </Button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">Mis Pedidos</h1>
              <p className="text-muted-foreground">
                Revisa el estado de tus pedidos y su historial
              </p>
            </div>

            {/* Orders List */}
            {allOrders.length > 0 ? (
              <div className="space-y-4">
                {allOrders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={order.id}
                      className="p-6 rounded-2xl glass-card border border-white/10 hover:border-primary/30 transition-all"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-display font-bold">
                              Pedido #{order.id}
                            </span>
                            <span
                              className={cn(
                                'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                                statusConfig.color,
                                'bg-current/10'
                              )}
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('es-CO', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-lg text-primary">
                            {formatPrice(order.total)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                          </p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 mb-6">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 rounded-xl bg-white/5"
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary/50 flex-shrink-0">
                              <img
                                src={item.productImage}
                                alt={item.productTitle}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium line-clamp-1">{item.productTitle}</p>
                              <p className="text-sm text-muted-foreground">
                                Cantidad: {item.quantity} × {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Address */}
                      <div className="p-4 rounded-xl bg-white/5 mb-4">
                        <p className="text-sm font-medium mb-1">Dirección de envío</p>
                        <p className="text-sm text-muted-foreground">
                          {order.shippingAddress.name}, {order.shippingAddress.address},{' '}
                          {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                      </div>

                      {/* Order Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 border-white/10 hover:bg-white/10"
                          onClick={() => toast.info('Funcionalidad próximamente')}
                        >
                          Ver detalles
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                        {order.status === 'Shipped' && (
                          <Button
                            className="flex-1 btn-brand"
                            onClick={() => toast.info('Funcionalidad próximamente')}
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Rastrear envío
                          </Button>
                        )}
                        {order.status === 'Delivered' && (
                          <Button
                            variant="outline"
                            className="flex-1 border-primary/50 text-primary hover:bg-primary/10"
                            onClick={() => toast.info('Funcionalidad próximamente')}
                          >
                            Dejar reseña
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl glass-card border border-white/10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  No tienes pedidos aún
                </h3>
                <p className="text-muted-foreground mb-6">
                  Explora nuestro marketplace y encuentra productos únicos
                </p>
                <Link href="/market">
                  <Button className="btn-brand">Explorar Marketplace</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
