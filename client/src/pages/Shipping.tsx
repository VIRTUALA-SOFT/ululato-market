/**
 * ULULATO Shipping Information Page
 * Design: Shipping rates and delivery information
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Truck,
  Package,
  MapPin,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const shippingZones = [
  {
    zone: 'Ciudades Principales',
    cities: 'Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga',
    time: '3-5 días hábiles',
    cost: 'Desde $12.000',
    freeFrom: '$200.000',
  },
  {
    zone: 'Ciudades Intermedias',
    cities: 'Pereira, Manizales, Ibagué, Cúcuta, Santa Marta, Villavicencio',
    time: '5-7 días hábiles',
    cost: 'Desde $18.000',
    freeFrom: '$250.000',
  },
  {
    zone: 'Zonas Rurales',
    cities: 'Municipios y veredas de difícil acceso',
    time: '7-12 días hábiles',
    cost: 'Desde $25.000',
    freeFrom: '$300.000',
  },
];

const features = [
  {
    icon: Package,
    title: 'Empaque Seguro',
    description: 'Cada artesanía es empacada con materiales especiales para proteger su integridad durante el transporte.',
  },
  {
    icon: MapPin,
    title: 'Seguimiento en Tiempo Real',
    description: 'Rastrea tu pedido en todo momento desde tu cuenta o con el número de guía que te enviamos.',
  },
  {
    icon: Shield,
    title: 'Envío Asegurado',
    description: 'Todos los envíos incluyen seguro contra pérdida o daño. Tu compra está protegida.',
  },
  {
    icon: Clock,
    title: 'Despacho Rápido',
    description: 'Los pedidos se despachan en 24-48 horas hábiles después de confirmar el pago.',
  },
];

export default function Shipping() {
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
            <Link href="/help" className="hover:text-foreground transition-colors">Centro de Ayuda</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Envíos</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-6"
            >
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-sm">Envío a todo Colombia</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              Información de <span className="text-primary">Envíos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Llevamos el arte ancestral colombiano hasta la puerta de tu casa con cuidado y dedicación
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-y border-white/10">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl glass-card border border-white/10 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Zones */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">
            Tarifas y Tiempos de Entrega
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {shippingZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl border border-white/10 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-primary mb-1">
                      {zone.zone}
                    </h3>
                    <p className="text-sm text-muted-foreground">{zone.cities}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 md:gap-8">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Tiempo</p>
                      <p className="font-bold">{zone.time}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Costo</p>
                      <p className="font-bold">{zone.cost}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Gratis desde</p>
                      <p className="font-bold text-primary">{zone.freeFrom}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-8">Información Importante</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-xl bg-primary/10 border border-primary/30">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Envío Gratis</h4>
                  <p className="text-sm text-muted-foreground">
                    Disfruta de envío gratis en compras superiores al monto indicado para tu zona. 
                    El descuento se aplica automáticamente al finalizar tu compra.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <Package className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Empaque Especial para Artesanías</h4>
                  <p className="text-sm text-muted-foreground">
                    Cada producto es empacado individualmente con materiales de protección 
                    especiales. Las piezas frágiles reciben un tratamiento adicional sin costo extra.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Tiempo de Preparación</h4>
                  <p className="text-sm text-muted-foreground">
                    Algunos productos artesanales pueden requerir tiempo adicional de preparación 
                    (hasta 5 días) si son hechos bajo pedido. Esto se indicará en la página del producto.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Zonas de Difícil Acceso</h4>
                  <p className="text-sm text-muted-foreground">
                    Para algunas zonas rurales o de orden público, los tiempos de entrega pueden 
                    extenderse. Te notificaremos si tu dirección está en una zona especial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              ¿Tienes más preguntas sobre envíos?
            </h2>
            <p className="text-muted-foreground mb-8">
              Visita nuestro Centro de Ayuda para encontrar respuestas a todas tus dudas
            </p>
            <Link href="/help">
              <button className="btn-brand px-8 py-3 rounded-lg font-medium">
                Ir al Centro de Ayuda
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
