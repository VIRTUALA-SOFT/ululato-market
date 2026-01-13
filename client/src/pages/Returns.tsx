/**
 * ULULATO Returns Policy Page
 * Design: Returns and refund policy information
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  CreditCard,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const steps = [
  {
    number: '01',
    title: 'Solicita la devolución',
    description: 'Ingresa a "Mis Pedidos" en tu perfil, selecciona el producto y haz clic en "Solicitar devolución". Describe el motivo y adjunta fotos si es necesario.',
  },
  {
    number: '02',
    title: 'Espera la aprobación',
    description: 'Nuestro equipo revisará tu solicitud en 24-48 horas hábiles. Recibirás un correo con la decisión y las instrucciones para continuar.',
  },
  {
    number: '03',
    title: 'Envía el producto',
    description: 'Empaca el producto en su empaque original con todos los accesorios. Te proporcionaremos una guía de envío prepagada.',
  },
  {
    number: '04',
    title: 'Recibe tu reembolso',
    description: 'Una vez recibido y verificado el producto, procesaremos tu reembolso en 3-5 días hábiles al método de pago original.',
  },
];

const eligibleItems = [
  'Productos con defectos de fabricación',
  'Productos diferentes al pedido',
  'Productos dañados durante el envío',
  'Productos sin usar con etiquetas originales',
  'Productos en su empaque original',
];

const nonEligibleItems = [
  'Artesanías personalizadas o hechas a medida',
  'Productos usados o sin etiquetas',
  'Productos sin empaque original',
  'Alimentos y productos perecederos',
  'Productos con más de 30 días desde la entrega',
];

export default function Returns() {
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
            <span className="text-foreground">Devoluciones</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-6"
            >
              <RotateCcw className="w-4 h-4 text-primary" />
              <span className="text-sm">30 días para devolver</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              Política de <span className="text-primary">Devoluciones</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Tu satisfacción es nuestra prioridad. Si no estás conforme con tu compra, te ayudamos a resolverlo
            </motion.p>
          </div>
        </div>
      </section>

      {/* Key Info */}
      <section className="py-12 border-y border-white/10">
        <div className="container">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl glass-card border border-white/10 text-center"
            >
              <Clock className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-display font-bold mb-1">30 Días</h3>
              <p className="text-sm text-muted-foreground">Plazo para solicitar devolución</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl glass-card border border-white/10 text-center"
            >
              <Package className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-display font-bold mb-1">Envío Gratis</h3>
              <p className="text-sm text-muted-foreground">En devoluciones aprobadas</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl glass-card border border-white/10 text-center"
            >
              <CreditCard className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-display font-bold mb-1">3-5 Días</h3>
              <p className="text-sm text-muted-foreground">Para procesar el reembolso</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-12 text-center">
            ¿Cómo solicitar una devolución?
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 rounded-xl glass-card border border-white/10"
                >
                  <span className="absolute -top-4 -left-2 text-6xl font-display font-bold text-primary/20">
                    {step.number}
                  </span>
                  <div className="relative">
                    <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <h2 className="font-display text-2xl font-bold mb-12 text-center">
            ¿Qué productos son elegibles?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Eligible */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl glass-card border border-primary/30 bg-primary/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg">Elegibles para devolución</h3>
              </div>
              <ul className="space-y-3">
                {eligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Non-Eligible */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl glass-card border border-destructive/30 bg-destructive/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="font-display font-bold text-lg">No elegibles</h3>
              </div>
              <ul className="space-y-3">
                {nonEligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Refund Info */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-8">Información sobre reembolsos</h2>
            
            <div className="space-y-6 glass-card rounded-2xl border border-white/10 p-6 md:p-8">
              <div>
                <h4 className="font-bold mb-2">Método de reembolso</h4>
                <p className="text-muted-foreground text-sm">
                  El reembolso se realizará al mismo método de pago utilizado en la compra original. 
                  Para pagos con tarjeta de crédito, el reembolso puede tardar hasta 10 días hábiles 
                  en reflejarse según tu banco.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Reembolso parcial</h4>
                <p className="text-muted-foreground text-sm">
                  En caso de que el producto presente señales de uso o le falten accesorios, 
                  podemos ofrecer un reembolso parcial. Te notificaremos el monto antes de proceder.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Cambio por otro producto</h4>
                <p className="text-muted-foreground text-sm">
                  Si prefieres cambiar el producto por otro de igual o mayor valor (pagando la diferencia), 
                  indícalo en tu solicitud de devolución. Procesaremos el cambio una vez recibamos el producto original.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Costos de envío</h4>
                <p className="text-muted-foreground text-sm">
                  Los costos de envío originales no son reembolsables, excepto en casos donde el producto 
                  llegó defectuoso o diferente al pedido. En devoluciones aprobadas, el envío de retorno es gratuito.
                </p>
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
              ¿Necesitas ayuda con una devolución?
            </h2>
            <p className="text-muted-foreground mb-8">
              Nuestro equipo de soporte está disponible para asistirte en el proceso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-brand">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contactar Soporte
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="border-white/20">
                  Ir a Mis Pedidos
                  <ArrowRight className="w-4 h-4 ml-2" />
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
