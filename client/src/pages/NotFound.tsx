/**
 * ULULATO 404 Not Found Page
 * Design: Dark luxury 404 page
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="font-display text-[150px] md:text-[200px] font-bold leading-none text-white/5">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center animate-pulse-glow">
              <span className="text-primary-foreground font-display font-bold text-4xl">U</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="btn-brand gap-2">
              <Home className="w-5 h-5" />
              Ir al Inicio
            </Button>
          </Link>
          <Link href="/market">
            <Button variant="outline" className="gap-2 border-white/20 hover:bg-white/10">
              <Search className="w-5 h-5" />
              Explorar Marketplace
            </Button>
          </Link>
        </div>

        {/* Back Link */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la página anterior
        </button>
      </div>
    </div>
  );
}
