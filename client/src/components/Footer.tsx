/**
 * ULULATO Footer Component
 * Design: Dark luxury footer with brand elements
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    marketplace: [
      { label: 'Explorar', href: '/market' },
      { label: 'Categorías', href: '/market' },
      { label: 'Vendedores', href: '/market' },
      { label: 'Ofertas', href: '/market' },
    ],
    vendedores: [
      { label: 'Vender en ULULATO', href: '/sell' },
      { label: 'Centro de Vendedores', href: '/sell' },
      { label: 'Guía de Inicio', href: '/seller-guide' },
      { label: 'Comisiones', href: '/fees' },
    ],
    soporte: [
      { label: 'Centro de Ayuda', href: '/help' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Envíos', href: '/shipping' },
      { label: 'Devoluciones', href: '/returns' },
    ],
    legal: [
      { label: 'Términos de Uso', href: '/terms' },
      { label: 'Privacidad', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/ululato', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/ululato', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/ululato', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-secondary/30 border-t border-white/10">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              {/* Logo U */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">U</span>
              </div>
              {/* Vertical Divider */}
              <div className="w-px h-6 bg-white/30" />
              {/* MARKET Text */}
              <span 
                className="text-[#FFD100] font-light tracking-[0.25em] text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                MARKET
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Conectamos el origen ancestral con el futuro digital. Marketplace de artesanías y productos colombianos auténticos.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              Marketplace
            </h4>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              Vendedores
            </h4>
            <ul className="space-y-3">
              {footerLinks.vendedores.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              Soporte
            </h4>
            <ul className="space-y-3">
              {footerLinks.soporte.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a 
                  href="mailto:hola@ululato.com" 
                  className="hover:text-primary transition-colors"
                >
                  hola@ululato.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a 
                  href="tel:+573001234567" 
                  className="hover:text-primary transition-colors"
                >
                  +57 300 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {currentYear} ULULATO. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
