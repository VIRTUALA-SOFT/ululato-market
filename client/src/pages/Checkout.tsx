/**
 * ULULATO Checkout Page
 * Design: Multi-step checkout with shipping, payment, coupons and success
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  MapPin,
  CreditCard,
  Check,
  ChevronRight,
  Truck,
  Shield,
  ArrowLeft,
  Tag,
  X,
  Percent,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { useCartStore, useCheckoutStore, useAuthStore, useCouponStore, availableCoupons } from '@/lib/store';
import { formatPrice } from '@/lib/mockDb';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

// Confetti effect for success
const fireConfetti = () => {
  const colors = ['#FFD100', '#101C38', '#C81D25', '#FFFFFF'];
  
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors,
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
  }, 200);

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
  }, 400);
};

// Coupon Input Component
function CouponSection() {
  const [couponCode, setCouponCode] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { appliedCoupon, discountAmount, error, applyCoupon, removeCoupon } = useCouponStore();
  const { items, subtotal } = useCartStore();
  
  const categories = Array.from(new Set(items.map(item => item.product.category)));

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Ingresa un código de cupón');
      return;
    }
    
    const success = applyCoupon(couponCode.trim(), subtotal(), categories);
    if (success) {
      toast.success('¡Cupón aplicado exitosamente!');
      setCouponCode('');
    } else {
      toast.error(error || 'Cupón inválido');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.info('Cupón eliminado');
  };

  return (
    <div className="space-y-3">
      {appliedCoupon ? (
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Tag className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{appliedCoupon.code}</p>
                <p className="text-xs text-muted-foreground">{appliedCoupon.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold">-{formatPrice(discountAmount)}</span>
              <button
                onClick={handleRemoveCoupon}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Tag className="w-4 h-4" />
            {isExpanded ? 'Ocultar cupón' : '¿Tienes un cupón de descuento?'}
          </button>
          
          {isExpanded && (
            <div className="flex gap-2">
              <Input
                placeholder="Ingresa tu código"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="h-10 bg-white/5 border-white/10 focus:border-primary/50 uppercase"
              />
              <Button
                onClick={handleApplyCoupon}
                variant="outline"
                className="h-10 border-primary text-primary hover:bg-primary/10"
              >
                Aplicar
              </Button>
            </div>
          )}
          
          {/* Available Coupons Hint */}
          <div className="text-xs text-muted-foreground">
            <p>Cupones disponibles: <span className="text-primary">BIENVENIDO10</span>, <span className="text-primary">ARTESANO20</span>, <span className="text-primary">ENVIOGRATIS</span></p>
          </div>
        </>
      )}
    </div>
  );
}

// Step 1: Shipping Address
function ShippingStep({ onNext }: { onNext: () => void }) {
  const { setShippingAddress } = useCheckoutStore();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingAddress(formData);
    onNext();
  };

  const colombianDepartments = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá',
    'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó',
    'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira',
    'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío',
    'Risaralda', 'San Andrés', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
    'Vaupés', 'Vichada',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre completo</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+57 300 123 4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          placeholder="Calle, número, apartamento..."
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Departamento</Label>
          <Select
            value={formData.state}
            onValueChange={(value) => setFormData({ ...formData, state: value })}
          >
            <SelectTrigger className="h-12 bg-white/5 border-white/10">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {colombianDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">Código postal</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full btn-brand text-lg py-6">
        Continuar al pago
        <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </form>
  );
}

// Step 2: Payment
function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { setPaymentInfo, completeOrder } = useCheckoutStore();
  const { clearCart } = useCartStore();
  const { removeCoupon } = useCouponStore();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPaymentInfo(formData);
    completeOrder();
    clearCart();
    removeCoupon();
    
    setIsProcessing(false);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
        <Shield className="w-5 h-5 text-primary" />
        <p className="text-sm text-muted-foreground">
          Tus datos de pago están protegidos con encriptación SSL
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Número de tarjeta</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) =>
            setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })
          }
          maxLength={19}
          className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardName">Nombre en la tarjeta</Label>
        <Input
          id="cardName"
          placeholder="Como aparece en la tarjeta"
          value={formData.cardName}
          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
          className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="expiry">Fecha de expiración</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={(e) =>
              setFormData({ ...formData, expiry: formatExpiry(e.target.value) })
            }
            maxLength={5}
            className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="password"
            placeholder="123"
            value={formData.cvv}
            onChange={(e) =>
              setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })
            }
            maxLength={4}
            className="h-12 bg-white/5 border-white/10 focus:border-primary/50"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-12 border-white/10 hover:bg-white/10"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
        <Button
          type="submit"
          className="flex-1 btn-brand text-lg py-6"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Procesando...
            </span>
          ) : (
            'Confirmar Pago'
          )}
        </Button>
      </div>
    </form>
  );
}

// Step 3: Success
function SuccessStep() {
  const { orderId, shippingAddress } = useCheckoutStore();

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
        <Check className="w-10 h-10 text-primary" />
      </div>

      <h2 className="font-display text-3xl font-bold mb-4">¡Pedido Confirmado!</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Tu pedido ha sido procesado exitosamente. Recibirás un correo de confirmación
        con los detalles de tu compra.
      </p>

      <div className="p-6 rounded-xl glass-card border border-white/10 text-left mb-8 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Truck className="w-5 h-5 text-primary" />
          <span className="font-medium">Información de envío</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {shippingAddress?.name}<br />
          {shippingAddress?.address}<br />
          {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}
        </p>
        <p className="text-sm text-primary mt-4">
          Número de pedido: #{orderId || 'ULU-' + Date.now().toString(36).toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/profile">
          <Button variant="outline" className="border-white/10 hover:bg-white/10">
            Ver mis pedidos
          </Button>
        </Link>
        <Link href="/market">
          <Button className="btn-brand">
            Seguir comprando
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function Checkout() {
  const [step, setStep] = useState(1);
  const { items, subtotal, shipping, total } = useCartStore();
  const { isComplete } = useCheckoutStore();
  const { isAuthenticated } = useAuthStore();
  const { appliedCoupon, discountAmount } = useCouponStore();
  const [, setLocation] = useLocation();

  // Redirect if cart is empty (except on success step)
  useEffect(() => {
    if (items.length === 0 && !isComplete) {
      setLocation('/market');
    }
  }, [items.length, isComplete, setLocation]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/auth/login');
    }
  }, [isAuthenticated, setLocation]);

  const steps = [
    { id: 1, title: 'Envío', icon: MapPin },
    { id: 2, title: 'Pago', icon: CreditCard },
    { id: 3, title: 'Confirmación', icon: Check },
  ];

  // Calculate final total with discount
  const finalTotal = total() - discountAmount;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container pt-24 pb-16">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all',
                    step >= s.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-white/20 text-muted-foreground'
                  )}
                >
                  {step > s.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <s.icon className="w-6 h-6" />
                  )}
                </div>
                <span
                  className={cn(
                    'ml-3 font-medium hidden sm:block',
                    step >= s.id ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {s.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-12 sm:w-24 h-0.5 mx-4',
                      step > s.id ? 'bg-primary' : 'bg-white/10'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="p-6 md:p-8 rounded-2xl glass-card border border-white/10">
              {step === 1 && <ShippingStep onNext={() => setStep(2)} />}
              {step === 2 && (
                <PaymentStep onNext={() => setStep(3)} onBack={() => setStep(1)} />
              )}
              {step === 3 && <SuccessStep />}
            </div>
          </div>

          {/* Order Summary */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl glass-card border border-white/10">
                <h3 className="font-display text-xl font-bold mb-6">
                  Resumen del Pedido
                </h3>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary/50 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-2">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-sm text-primary font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="py-4 border-t border-white/10">
                  <CouponSection />
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal())}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Percent className="w-3 h-3" />
                        Descuento ({appliedCoupon.code})
                      </span>
                      <span className="text-green-500">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className={shipping() === 0 ? 'text-green-500' : ''}>
                      {shipping() === 0 ? 'Gratis' : formatPrice(shipping())}
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-display font-bold text-lg pt-3 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(finalTotal)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <p className="text-xs text-green-500 text-right">
                      ¡Ahorraste {formatPrice(discountAmount)}!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
