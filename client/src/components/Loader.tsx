/**
 * ULULATO Loader Component
 * Design: Animated feather/logo loader
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export default function Loader({ size = 'md', className, text }: LoaderProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className={cn('relative', sizes[size])}>
        {/* Outer Ring */}
        <svg
          className="absolute inset-0 animate-spin"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/10"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="70 200"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD100" />
              <stop offset="50%" stopColor="#101C38" />
              <stop offset="100%" stopColor="#C81D25" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-lg bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center animate-pulse">
            <span className="text-primary-foreground font-display font-bold text-sm">
              U
            </span>
          </div>
        </div>
      </div>

      {text && (
        <p className="text-muted-foreground text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
}

// Full Page Loader
export function PageLoader({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <Loader size="lg" text={text} />
    </div>
  );
}

// Inline Loader
export function InlineLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <Loader size="md" />
    </div>
  );
}
