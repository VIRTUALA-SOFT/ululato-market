/**
 * ULULATO Auth Pages (Login & Register)
 * Design: Minimalist dark forms with logo anchor
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';

// Login Page
export function LoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = login(email, password);
    
    if (success) {
      toast.success('¡Bienvenido de vuelta!', {
        description: 'Has iniciado sesión correctamente.',
      });
      setLocation('/market');
    } else {
      toast.error('Error al iniciar sesión', {
        description: 'Verifica tus credenciales e intenta de nuevo.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 justify-center mb-8">
            <img 
              src="/images/logo-ululato.png" 
              alt="ULULATO" 
              className="w-12 h-12 object-contain"
            />
            <div className="w-[2px] h-8 bg-white/40 rounded-full" />
            <span 
              className="text-[#FFD100] font-extralight tracking-[0.35em] text-xl uppercase"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.35em' }}
            >
              MARKET
            </span>
          </Link>

          {/* Header */}
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-2">Bienvenido de vuelta</h1>
            <p className="text-muted-foreground">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-white/5 border-white/10 focus:border-primary/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-brand text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Ingresar
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-muted-foreground mb-3">Cuentas de demostración:</p>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => {
                  setEmail('wayuuprince@ululato.com');
                  setPassword('demo123');
                }}
                className="block w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="font-medium">Comprador:</span>{' '}
                <span className="text-muted-foreground">wayuuprince@ululato.com</span>
              </button>
              <button
                onClick={() => {
                  setEmail('tejidos@ululato.com');
                  setPassword('demo123');
                }}
                className="block w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="font-medium">Vendedor:</span>{' '}
                <span className="text-muted-foreground">tejidos@ululato.com</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background" />
        <img
          src="/images/hero-feather-abstract.png"
          alt="ULULATO"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold mb-4">
              Conecta con el <span className="text-primary">origen</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Descubre artesanías únicas y apoya a comunidades indígenas colombianas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Register Page
export function RegisterPage() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = register(name, email, password);
    
    if (success) {
      toast.success('¡Cuenta creada exitosamente!', {
        description: 'Bienvenido a ULULATO.',
      });
      setLocation('/market');
    } else {
      toast.error('Error al crear la cuenta', {
        description: 'Intenta de nuevo más tarde.',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-background" />
        <img
          src="/images/artisan-texture.png"
          alt="ULULATO"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold mb-4">
              Únete a la <span className="text-primary">revolución</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Forma parte de la comunidad que conecta el pasado ancestral con el futuro digital
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 justify-center mb-8">
            <img 
              src="/images/logo-ululato.png" 
              alt="ULULATO" 
              className="w-12 h-12 object-contain"
            />
            <div className="w-[2px] h-8 bg-white/40 rounded-full" />
            <span 
              className="text-[#FFD100] font-extralight tracking-[0.35em] text-xl uppercase"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.35em' }}
            >
              MARKET
            </span>
          </Link>

          {/* Header */}
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-2">Crear cuenta</h1>
            <p className="text-muted-foreground">
              Únete a la comunidad ULULATO
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-white/5 border-white/10 focus:border-primary/50"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-brand text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creando cuenta...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Crear cuenta
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-center text-sm text-muted-foreground">
            Al registrarte, aceptas nuestros{' '}
            <Link href="#" className="text-primary hover:text-primary/80 transition-colors">
              Términos de Servicio
            </Link>{' '}
            y{' '}
            <Link href="#" className="text-primary hover:text-primary/80 transition-colors">
              Política de Privacidad
            </Link>
          </p>

          {/* Login Link */}
          <p className="text-center text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
