/**
 * ULULATO Checkout Page
 * Design: Multi-step checkout with shipping, payment, and success
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
import { useCartStore, useCheckoutStore, useAuthStore } from '@/lib/store';
import { formatPrice } from '@/lib/mockDb';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

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
  const { orderId, resetCheckout } = useCheckoutStore();

  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
        <Check className="w-12 h-12 text-primary" />
      </div>

      <h2 className="font-display text-3xl font-bold mb-4">
        ¡Pedido Confirmado!
      </h2>

      <p className="text-muted-foreground mb-2">
        Tu pedido ha sido procesado exitosamente
      </p>

      <p className="text-lg font-medium text-primary mb-8">
        Número de orden: {orderId}
      </p>

      <div className="p-6 rounded-xl glass-card border border-white/10 max-w-md mx-auto mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Truck className="w-8 h-8 text-primary" />
          <div className="text-left">
            <p className="font-medium">Envío estimado</p>
            <p className="text-sm text-muted-foreground">3-5 días hábiles</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Recibirás un correo con los detalles de tu pedido y el seguimiento del envío.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/profile/orders" onClick={() => resetCheckout()}>
          <Button variant="outline" className="border-white/10 hover:bg-white/10">
            Ver mis pedidos
          </Button>
        </Link>
        <Link href="/market" onClick={() => resetCheckout()}>
          <Button className="btn-brand">
            Seguir comprando
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Main Checkout Page
export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, subtotal, shipping, total } = useCartStore();
  const { step, setStep, isComplete } = useCheckoutStore();
  const { isAuthenticated } = useAuthStore();

  // Redirect if cart is empty
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

                {/* Totals */}
                <div className="space-y-3 pt-6 border-t border-white/10">
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
                  <div className="flex justify-between font-display font-bold text-lg pt-3 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total())}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
