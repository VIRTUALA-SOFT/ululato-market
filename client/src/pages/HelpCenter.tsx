/**
 * ULULATO Help Center Page
 * Design: FAQ and support information
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Search,
  HelpCircle,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  Shield,
  Users,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'orders', icon: Package, label: 'Pedidos', count: 8 },
  { id: 'payments', icon: CreditCard, label: 'Pagos', count: 6 },
  { id: 'shipping', icon: Truck, label: 'Envíos', count: 5 },
  { id: 'returns', icon: RotateCcw, label: 'Devoluciones', count: 4 },
  { id: 'security', icon: Shield, label: 'Seguridad', count: 3 },
  { id: 'sellers', icon: Users, label: 'Vendedores', count: 7 },
];

const faqs = [
  {
    category: 'orders',
    question: '¿Cómo puedo hacer seguimiento a mi pedido?',
    answer: 'Una vez realizada tu compra, recibirás un correo electrónico con el número de seguimiento. Puedes ingresar a tu perfil en la sección "Mis Pedidos" para ver el estado actualizado de tu envío en tiempo real.'
  },
  {
    category: 'orders',
    question: '¿Puedo cancelar mi pedido?',
    answer: 'Sí, puedes cancelar tu pedido dentro de las primeras 2 horas después de realizar la compra, siempre y cuando el vendedor no haya iniciado el proceso de envío. Ve a "Mis Pedidos" y selecciona "Cancelar pedido".'
  },
  {
    category: 'orders',
    question: '¿Cómo modifico mi pedido?',
    answer: 'Para modificar un pedido (cantidad, color, talla), debes contactar directamente al vendedor a través del chat de la plataforma dentro de las primeras 24 horas. Si el pedido ya fue enviado, no será posible modificarlo.'
  },
  {
    category: 'payments',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE para transferencias bancarias, Nequi, Daviplata, y pago contra entrega en ciudades principales.'
  },
  {
    category: 'payments',
    question: '¿Es seguro pagar en ULULATO?',
    answer: 'Absolutamente. Utilizamos encriptación SSL de 256 bits y cumplimos con los estándares PCI DSS. Tu información financiera nunca es almacenada en nuestros servidores y todas las transacciones son procesadas por pasarelas de pago certificadas.'
  },
  {
    category: 'payments',
    question: '¿Cuándo se realiza el cobro?',
    answer: 'El cobro se realiza inmediatamente al confirmar tu compra. El dinero queda retenido de forma segura hasta que confirmes la recepción del producto o pasen 7 días después de la entrega.'
  },
  {
    category: 'shipping',
    question: '¿Cuánto tiempo tarda el envío?',
    answer: 'El tiempo de envío varía según tu ubicación: Ciudades principales (3-5 días hábiles), Ciudades intermedias (5-7 días hábiles), Zonas rurales (7-12 días hábiles). Los tiempos pueden variar según disponibilidad del producto.'
  },
  {
    category: 'shipping',
    question: '¿Hacen envíos internacionales?',
    answer: 'Actualmente solo realizamos envíos dentro de Colombia. Estamos trabajando para habilitar envíos internacionales próximamente. Suscríbete a nuestro boletín para ser el primero en enterarte.'
  },
  {
    category: 'shipping',
    question: '¿Cuánto cuesta el envío?',
    answer: 'El costo de envío depende del peso, dimensiones y destino. Envíos a ciudades principales desde $12.000 COP. ¡Envío gratis en compras mayores a $200.000 COP!'
  },
  {
    category: 'returns',
    question: '¿Cuál es la política de devoluciones?',
    answer: 'Tienes 30 días calendario desde la recepción para solicitar una devolución. El producto debe estar sin usar, con etiquetas originales y en su empaque original. Las artesanías personalizadas no son elegibles para devolución.'
  },
  {
    category: 'returns',
    question: '¿Cómo solicito una devolución?',
    answer: 'Ingresa a "Mis Pedidos", selecciona el producto a devolver y haz clic en "Solicitar devolución". Describe el motivo y adjunta fotos si es necesario. Te contactaremos en 24-48 horas con las instrucciones.'
  },
  {
    category: 'security',
    question: '¿Cómo protegen mis datos personales?',
    answer: 'Cumplimos con la Ley 1581 de 2012 de Protección de Datos Personales. Tus datos son encriptados y solo se usan para procesar tus pedidos. Nunca vendemos ni compartimos tu información con terceros.'
  },
  {
    category: 'sellers',
    question: '¿Cómo puedo vender en ULULATO?',
    answer: 'Regístrate como vendedor en la sección "Vender", completa tu perfil con información de tu comunidad o taller, sube fotos de tus productos y espera la verificación (24-72 horas). Una vez aprobado, podrás publicar tus productos.'
  },
  {
    category: 'sellers',
    question: '¿Cuánto cobra ULULATO por venta?',
    answer: 'Cobramos una comisión del 10% sobre el precio de venta (sin incluir envío). Esta comisión cubre el uso de la plataforma, procesamiento de pagos, soporte al cliente y marketing. No hay cuotas mensuales ni costos ocultos.'
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-primary transition-colors"
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown className={cn(
          'w-5 h-5 flex-shrink-0 transition-transform duration-300',
          isOpen && 'rotate-180'
        )} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-muted-foreground leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <span className="text-foreground">Centro de Ayuda</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-6"
            >
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm">¿En qué podemos ayudarte?</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              Centro de <span className="text-primary">Ayuda</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Encuentra respuestas a las preguntas más frecuentes o contáctanos directamente
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar en el centro de ayuda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/5 border-white/10 focus:border-primary"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-y border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={cn(
                  'p-4 rounded-xl border transition-all text-center',
                  selectedCategory === category.id
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'glass-card border-white/10 hover:border-white/30'
                )}
              >
                <category.icon className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">{category.label}</p>
                <p className="text-sm text-muted-foreground">{category.count} artículos</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold mb-8">
              {selectedCategory 
                ? `Preguntas sobre ${categories.find(c => c.id === selectedCategory)?.label}`
                : 'Preguntas Frecuentes'
              }
              {searchQuery && ` - "${searchQuery}"`}
            </h2>

            {filteredFaqs.length > 0 ? (
              <div className="glass-card rounded-2xl border border-white/10 p-6">
                {filteredFaqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card rounded-2xl border border-white/10">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No encontramos resultados</p>
                <p className="text-muted-foreground mb-6">
                  Intenta con otros términos o contáctanos directamente
                </p>
                <Link href="/contact">
                  <Button className="btn-brand">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contactar Soporte
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold mb-4">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-muted-foreground mb-8">
              Nuestro equipo de soporte está disponible de lunes a viernes de 8:00 AM a 6:00 PM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-brand">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar un mensaje
                </Button>
              </Link>
              <a href="mailto:soporte@ululato.com">
                <Button variant="outline" className="border-white/20">
                  soporte@ululato.com
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
