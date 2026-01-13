/**
 * ULULATO Cookies Policy Page
 * Design: Cookies policy information
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, Cookie, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const cookieTypes = [
  {
    name: 'Cookies Esenciales',
    description: 'Necesarias para el funcionamiento básico del sitio. No pueden ser desactivadas.',
    examples: [
      { name: 'session_id', purpose: 'Mantener su sesión iniciada', duration: 'Sesión' },
      { name: 'csrf_token', purpose: 'Protección contra ataques CSRF', duration: 'Sesión' },
      { name: 'cart_items', purpose: 'Guardar productos en el carrito', duration: '30 días' },
    ],
    required: true,
  },
  {
    name: 'Cookies de Rendimiento',
    description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio.',
    examples: [
      { name: '_ga', purpose: 'Google Analytics - Análisis de tráfico', duration: '2 años' },
      { name: '_gid', purpose: 'Google Analytics - Identificador de sesión', duration: '24 horas' },
      { name: 'performance_metrics', purpose: 'Métricas de rendimiento del sitio', duration: '7 días' },
    ],
    required: false,
  },
  {
    name: 'Cookies de Funcionalidad',
    description: 'Permiten recordar sus preferencias y personalizar su experiencia.',
    examples: [
      { name: 'language', purpose: 'Recordar idioma preferido', duration: '1 año' },
      { name: 'theme', purpose: 'Recordar tema visual', duration: '1 año' },
      { name: 'recent_searches', purpose: 'Historial de búsquedas', duration: '30 días' },
    ],
    required: false,
  },
  {
    name: 'Cookies de Marketing',
    description: 'Utilizadas para mostrar anuncios relevantes y medir campañas.',
    examples: [
      { name: '_fbp', purpose: 'Facebook Pixel - Seguimiento de conversiones', duration: '90 días' },
      { name: 'ads_prefs', purpose: 'Preferencias de publicidad', duration: '1 año' },
      { name: 'remarketing', purpose: 'Mostrar anuncios personalizados', duration: '30 días' },
    ],
    required: false,
  },
];

const sections = [
  {
    title: '¿Qué son las cookies?',
    content: `Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (computadora, tablet o teléfono móvil) cuando visita un sitio web. Las cookies permiten que el sitio recuerde sus acciones y preferencias durante un período de tiempo.

Las cookies no pueden dañar su dispositivo ni acceder a otros archivos. Son ampliamente utilizadas para hacer que los sitios web funcionen de manera más eficiente y proporcionar información a los propietarios del sitio.`,
  },
  {
    title: '¿Cómo usamos las cookies?',
    content: `En ULULATO utilizamos cookies para:

• Mantener su sesión iniciada mientras navega
• Recordar los productos en su carrito de compras
• Entender cómo utiliza nuestra plataforma
• Mejorar su experiencia personalizando el contenido
• Mostrar anuncios relevantes
• Prevenir fraudes y garantizar la seguridad

Algunas cookies son establecidas por nosotros (cookies propias) y otras por servicios de terceros que utilizamos (cookies de terceros).`,
  },
  {
    title: 'Cookies de terceros',
    content: `Utilizamos servicios de terceros que pueden establecer sus propias cookies:

• Google Analytics: Para análisis de tráfico y comportamiento
• Facebook Pixel: Para medir conversiones de anuncios
• Stripe: Para procesamiento seguro de pagos
• Intercom: Para chat de soporte en vivo
• Cloudflare: Para seguridad y rendimiento

Estos terceros tienen sus propias políticas de privacidad. Le recomendamos revisarlas para entender cómo manejan sus datos.`,
  },
  {
    title: 'Gestión de cookies',
    content: `Puede controlar y gestionar las cookies de varias formas:

Configuración del navegador:
La mayoría de los navegadores le permiten ver, eliminar y bloquear cookies. La configuración varía según el navegador:
• Chrome: Configuración > Privacidad y seguridad > Cookies
• Firefox: Opciones > Privacidad y seguridad
• Safari: Preferencias > Privacidad
• Edge: Configuración > Privacidad y servicios

Tenga en cuenta que bloquear todas las cookies puede afectar la funcionalidad del sitio.

Opt-out de terceros:
• Google Analytics: tools.google.com/dlpage/gaoptout
• Facebook: www.facebook.com/settings/?tab=ads`,
  },
  {
    title: 'Cambios a esta política',
    content: `Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en nuestras prácticas o por razones operativas, legales o regulatorias.

Le notificaremos sobre cambios significativos a través de un aviso en nuestro sitio web. Le recomendamos revisar esta política regularmente.`,
  },
];

export default function Cookies() {
  const handleManageCookies = () => {
    toast.info('Panel de gestión de cookies próximamente disponible');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Política de Cookies</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-6"
            >
              <Cookie className="w-4 h-4 text-primary" />
              <span className="text-sm">Transparencia en el uso de cookies</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              Política de <span className="text-primary">Cookies</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-muted-foreground mb-6"
            >
              <Calendar className="w-4 h-4" />
              <span>Última actualización: 15 de enero de 2026</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button onClick={handleManageCookies} className="btn-brand">
                <Settings className="w-4 h-4 mr-2" />
                Gestionar preferencias de cookies
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-8 text-center">
              Tipos de cookies que utilizamos
            </h2>

            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl border border-white/10 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display font-bold text-lg">{type.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                    </div>
                    {type.required ? (
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                        Requeridas
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-white/10 text-muted-foreground text-xs font-medium rounded-full">
                        Opcionales
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 pr-4 font-medium">Cookie</th>
                          <th className="text-left py-2 pr-4 font-medium">Propósito</th>
                          <th className="text-left py-2 font-medium">Duración</th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.examples.map((cookie, cookieIndex) => (
                          <tr key={cookieIndex} className="border-b border-white/5">
                            <td className="py-2 pr-4 font-mono text-primary text-xs">
                              {cookie.name}
                            </td>
                            <td className="py-2 pr-4 text-muted-foreground">
                              {cookie.purpose}
                            </td>
                            <td className="py-2 text-muted-foreground">
                              {cookie.duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl border border-white/10 p-6 md:p-10">
              <div className="prose prose-invert max-w-none">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="mb-8 last:mb-0"
                  >
                    <h2 className="font-display text-xl font-bold mb-4 text-primary">
                      {section.title}
                    </h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              ¿Preguntas sobre cookies?
            </h2>
            <p className="text-muted-foreground mb-8">
              Si tiene alguna pregunta sobre nuestra política de cookies, no dude en contactarnos
            </p>
            <Link href="/contact">
              <Button className="btn-brand">
                Contactar soporte
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
