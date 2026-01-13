/**
 * ULULATO Fees Page
 * Design: Commission and pricing information for sellers
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Percent,
  CheckCircle,
  XCircle,
  Calculator,
  ArrowRight,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const plans = [
  {
    name: 'Básico',
    description: 'Ideal para artesanos que inician',
    commission: '10%',
    monthlyFee: 'Gratis',
    features: [
      { text: 'Hasta 20 productos', included: true },
      { text: 'Estadísticas básicas', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'Pagos semanales', included: true },
      { text: 'Productos destacados', included: false },
      { text: 'Soporte prioritario', included: false },
      { text: 'Capacitaciones exclusivas', included: false },
    ],
    highlighted: false,
  },
  {
    name: 'Profesional',
    description: 'Para vendedores en crecimiento',
    commission: '8%',
    monthlyFee: '$49.900/mes',
    features: [
      { text: 'Productos ilimitados', included: true },
      { text: 'Estadísticas avanzadas', included: true },
      { text: 'Soporte por chat', included: true },
      { text: 'Pagos cada 3 días', included: true },
      { text: '3 productos destacados/mes', included: true },
      { text: 'Soporte prioritario', included: false },
      { text: 'Capacitaciones exclusivas', included: false },
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    description: 'Para tiendas establecidas',
    commission: '6%',
    monthlyFee: '$149.900/mes',
    features: [
      { text: 'Productos ilimitados', included: true },
      { text: 'Estadísticas en tiempo real', included: true },
      { text: 'Soporte telefónico 24/7', included: true },
      { text: 'Pagos diarios', included: true },
      { text: '10 productos destacados/mes', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Capacitaciones exclusivas', included: true },
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    question: '¿Cuándo recibo mis pagos?',
    answer: 'Los pagos se procesan según tu plan: semanal (Básico), cada 3 días (Profesional) o diario (Premium). El dinero se transfiere a tu cuenta bancaria registrada.',
  },
  {
    question: '¿La comisión incluye IVA?',
    answer: 'Sí, las comisiones mostradas ya incluyen IVA. No hay costos adicionales ocultos.',
  },
  {
    question: '¿Puedo cambiar de plan?',
    answer: 'Sí, puedes cambiar de plan en cualquier momento. El cambio se aplica desde el siguiente período de facturación.',
  },
  {
    question: '¿Hay costos por devoluciones?',
    answer: 'No cobramos comisión sobre productos devueltos. El monto de la comisión se revierte automáticamente.',
  },
];

export default function Fees() {
  const [salePrice, setSalePrice] = useState(100000);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const commissionRates = [0.10, 0.08, 0.06];
  const commission = salePrice * commissionRates[selectedPlan];
  const netEarnings = salePrice - commission;

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
            <span className="text-foreground">Comisiones</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-6"
            >
              <Percent className="w-4 h-4 text-primary" />
              <span className="text-sm">Tarifas transparentes</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-primary">Comisiones</span> y Planes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Sin costos ocultos. Solo pagas cuando vendes. Elige el plan que mejor se adapte a tu negocio.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border ${
                  plan.highlighted
                    ? 'glass-card border-primary bg-primary/5'
                    : 'glass-card border-white/10'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">
                    Más Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="font-display text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl font-display font-bold text-primary mb-1">
                    {plan.commission}
                  </div>
                  <p className="text-sm text-muted-foreground">comisión por venta</p>
                  <div className="mt-2 text-lg font-medium">
                    {plan.monthlyFee}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground/50'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/sell">
                  <Button
                    className={`w-full ${plan.highlighted ? 'btn-brand' : ''}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Comenzar
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-4">
                <Calculator className="w-4 h-4 text-primary" />
                <span className="text-sm">Calculadora de ganancias</span>
              </div>
              <h2 className="font-display text-2xl font-bold">
                Calcula cuánto ganarás
              </h2>
            </div>

            <div className="glass-card rounded-2xl border border-white/10 p-6 md:p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Precio de venta del producto
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Selecciona tu plan
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {plans.map((plan, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPlan(index)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        selectedPlan === index
                          ? 'bg-primary/20 border-primary'
                          : 'glass-card border-white/10 hover:border-white/30'
                      }`}
                    >
                      <p className="font-medium text-sm">{plan.name}</p>
                      <p className="text-xs text-muted-foreground">{plan.commission}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio de venta</span>
                  <span className="font-medium">
                    ${salePrice.toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Comisión ({(commissionRates[selectedPlan] * 100).toFixed(0)}%)
                  </span>
                  <span className="font-medium text-destructive">
                    -${commission.toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="font-bold">Tu ganancia</span>
                  <span className="font-bold text-primary text-xl">
                    ${netEarnings.toLocaleString('es-CO')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-4">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm">Preguntas frecuentes</span>
              </div>
              <h2 className="font-display text-2xl font-bold">
                Sobre comisiones y pagos
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 rounded-xl glass-card border border-white/10"
                >
                  <h4 className="font-bold mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="font-display text-2xl font-bold mb-4">
              ¿Listo para empezar a vender?
            </h2>
            <p className="text-muted-foreground mb-8">
              Crea tu cuenta gratis y comienza a vender hoy mismo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sell">
                <Button className="btn-brand">
                  Crear cuenta de vendedor
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/seller-guide">
                <Button variant="outline" className="border-white/20">
                  Ver guía de inicio
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
