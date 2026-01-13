/**
 * ULULATO Seller Guide Page
 * Design: Getting started guide for sellers
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  BookOpen,
  UserPlus,
  Camera,
  Tag,
  Package,
  TrendingUp,
  Star,
  Shield,
  ArrowRight,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const steps = [
  {
    icon: UserPlus,
    title: 'Crea tu cuenta de vendedor',
    description: 'Regístrate con tu correo electrónico y completa tu perfil con información sobre ti o tu comunidad artesana.',
    tips: [
      'Usa un nombre de tienda memorable y relacionado con tu arte',
      'Agrega una foto de perfil profesional',
      'Escribe una biografía que cuente tu historia',
    ],
  },
  {
    icon: Camera,
    title: 'Prepara tus fotos',
    description: 'Las buenas fotografías son clave para vender. Toma fotos claras con buena iluminación natural.',
    tips: [
      'Usa luz natural, preferiblemente cerca de una ventana',
      'Toma fotos desde varios ángulos',
      'Incluye fotos de detalles y texturas',
      'Usa un fondo neutro (blanco o negro)',
    ],
  },
  {
    icon: Tag,
    title: 'Publica tus productos',
    description: 'Crea listados atractivos con títulos descriptivos, precios competitivos y descripciones detalladas.',
    tips: [
      'Incluye medidas, materiales y técnicas usadas',
      'Menciona el tiempo de elaboración',
      'Usa palabras clave relevantes en el título',
      'Sé honesto sobre posibles variaciones artesanales',
    ],
  },
  {
    icon: Package,
    title: 'Gestiona tus pedidos',
    description: 'Cuando recibas un pedido, prepáralo con cuidado y envíalo dentro del tiempo prometido.',
    tips: [
      'Empaca con materiales de protección adecuados',
      'Incluye una nota de agradecimiento personalizada',
      'Actualiza el estado del pedido en la plataforma',
      'Proporciona el número de seguimiento al comprador',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Crece tu negocio',
    description: 'Analiza tus métricas, responde a las reseñas y mejora constantemente tu oferta.',
    tips: [
      'Revisa tus estadísticas de ventas regularmente',
      'Responde rápido a las preguntas de compradores',
      'Pide reseñas a clientes satisfechos',
      'Ofrece promociones en fechas especiales',
    ],
  },
];

const benefits = [
  {
    icon: Star,
    title: 'Alcance Nacional',
    description: 'Llega a compradores en todo Colombia interesados en artesanías auténticas.',
  },
  {
    icon: Shield,
    title: 'Pagos Seguros',
    description: 'Recibe tus pagos de forma segura y puntual cada semana.',
  },
  {
    icon: TrendingUp,
    title: 'Herramientas de Gestión',
    description: 'Dashboard con estadísticas, inventario y gestión de pedidos.',
  },
  {
    icon: BookOpen,
    title: 'Capacitación Gratuita',
    description: 'Acceso a recursos y talleres para mejorar tus ventas.',
  },
];

export default function SellerGuide() {
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
            <Link href="/sell" className="hover:text-foreground transition-colors">Vender</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Guía de Inicio</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-6"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm">Guía completa para vendedores</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              Comienza a <span className="text-primary">Vender</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Todo lo que necesitas saber para empezar a vender tus artesanías en ULULATO y conectar con compradores de todo el país
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/sell">
                <Button className="btn-brand">
                  Crear cuenta de vendedor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 border-y border-white/10">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl glass-card border border-white/10 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-12 text-center">
            Paso a paso para empezar
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl border border-white/10 p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-primary">Paso {index + 1}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Consejos</span>
                      </div>
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-8 text-center">
              Requisitos para vender
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl glass-card border border-white/10">
                <h3 className="font-bold mb-4">Documentación</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Cédula de ciudadanía o NIT</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Cuenta bancaria a tu nombre</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Correo electrónico válido</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Número de celular activo</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl glass-card border border-white/10">
                <h3 className="font-bold mb-4">Productos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Artesanías o productos artesanales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Fotos de alta calidad (mín. 3 por producto)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Descripción detallada del producto</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Capacidad de envío nacional</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-muted-foreground mb-8">
              Únete a cientos de artesanos colombianos que ya venden en ULULATO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sell">
                <Button className="btn-brand">
                  Crear cuenta de vendedor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/fees">
                <Button variant="outline" className="border-white/20">
                  Ver comisiones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
