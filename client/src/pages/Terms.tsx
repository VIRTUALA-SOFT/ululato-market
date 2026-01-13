/**
 * ULULATO Terms of Use Page
 * Design: Legal terms and conditions
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    title: '1. Aceptación de los Términos',
    content: `Al acceder y utilizar la plataforma ULULATO ("la Plataforma"), usted acepta estar sujeto a estos Términos de Uso. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a la Plataforma.

Estos términos se aplican a todos los usuarios de la Plataforma, incluyendo compradores, vendedores y visitantes. Nos reservamos el derecho de modificar estos términos en cualquier momento, notificando a los usuarios a través de la Plataforma o por correo electrónico.`,
  },
  {
    title: '2. Descripción del Servicio',
    content: `ULULATO es un marketplace que conecta artesanos colombianos con compradores interesados en productos artesanales auténticos. La Plataforma facilita la compra y venta de artesanías, pero no es parte de las transacciones entre compradores y vendedores.

Actuamos como intermediarios tecnológicos, proporcionando la infraestructura para que vendedores publiquen sus productos y compradores puedan adquirirlos. No somos propietarios de los productos listados ni garantizamos la calidad de los mismos más allá de nuestras políticas de protección al comprador.`,
  },
  {
    title: '3. Registro y Cuentas',
    content: `Para utilizar ciertas funciones de la Plataforma, debe crear una cuenta proporcionando información precisa y completa. Usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta.

Requisitos para el registro:
• Ser mayor de 18 años o contar con autorización de un tutor legal
• Proporcionar información veraz y actualizada
• No crear múltiples cuentas sin autorización
• Notificar inmediatamente cualquier uso no autorizado de su cuenta

Nos reservamos el derecho de suspender o cancelar cuentas que violen estos términos o que presenten actividad sospechosa.`,
  },
  {
    title: '4. Vendedores',
    content: `Los vendedores en ULULATO deben cumplir con los siguientes requisitos y obligaciones:

• Ser artesanos o representantes autorizados de comunidades artesanas
• Ofrecer productos auténticos y de calidad
• Proporcionar descripciones precisas y fotos reales de los productos
• Cumplir con los tiempos de envío establecidos
• Responder a las consultas de los compradores en un plazo razonable
• Cumplir con todas las leyes y regulaciones aplicables
• Pagar las comisiones correspondientes según el plan seleccionado

ULULATO se reserva el derecho de remover productos o suspender vendedores que no cumplan con estos estándares.`,
  },
  {
    title: '5. Compradores',
    content: `Los compradores en ULULATO tienen los siguientes derechos y obligaciones:

Derechos:
• Recibir productos conforme a la descripción publicada
• Acceder a la protección al comprador según nuestras políticas
• Solicitar devoluciones dentro del plazo establecido
• Recibir soporte para resolver disputas

Obligaciones:
• Proporcionar información de envío precisa
• Realizar pagos a través de los métodos autorizados
• Comunicar cualquier problema con el pedido de manera oportuna
• Tratar a los vendedores con respeto`,
  },
  {
    title: '6. Pagos y Comisiones',
    content: `Todos los pagos en la Plataforma se procesan a través de pasarelas de pago seguras. ULULATO cobra una comisión sobre cada venta realizada, según el plan del vendedor.

El dinero de las ventas se retiene hasta que el comprador confirme la recepción del producto o transcurra el período de protección. Los vendedores reciben sus pagos según la frecuencia establecida en su plan.

No nos hacemos responsables por problemas con los métodos de pago externos, aunque trabajamos para resolver cualquier inconveniente que pueda surgir.`,
  },
  {
    title: '7. Propiedad Intelectual',
    content: `Todo el contenido de la Plataforma, incluyendo pero no limitado a textos, gráficos, logos, iconos, imágenes, clips de audio, descargas digitales y compilaciones de datos, es propiedad de ULULATO o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.

Los vendedores conservan los derechos sobre las imágenes y descripciones de sus productos, pero otorgan a ULULATO una licencia no exclusiva para usar dicho contenido con fines de promoción y operación de la Plataforma.`,
  },
  {
    title: '8. Conducta Prohibida',
    content: `Está prohibido en la Plataforma:

• Publicar contenido falso, engañoso o fraudulento
• Vender productos falsificados o ilegales
• Realizar transacciones fuera de la Plataforma para evadir comisiones
• Manipular reseñas o calificaciones
• Acosar o amenazar a otros usuarios
• Intentar acceder sin autorización a sistemas de la Plataforma
• Usar la Plataforma para actividades ilegales
• Crear múltiples cuentas para evadir restricciones

Las violaciones pueden resultar en suspensión o cancelación permanente de la cuenta.`,
  },
  {
    title: '9. Limitación de Responsabilidad',
    content: `ULULATO proporciona la Plataforma "tal cual" y "según disponibilidad". No garantizamos que la Plataforma estará libre de errores o interrupciones.

En la máxima medida permitida por la ley, ULULATO no será responsable por:
• Daños indirectos, incidentales o consecuentes
• Pérdida de beneficios o datos
• Acciones de terceros, incluyendo vendedores y compradores
• Problemas con productos adquiridos a través de la Plataforma

Nuestra responsabilidad máxima se limita al monto de las comisiones pagadas en los últimos 12 meses.`,
  },
  {
    title: '10. Ley Aplicable y Jurisdicción',
    content: `Estos Términos de Uso se rigen por las leyes de la República de Colombia. Cualquier disputa relacionada con estos términos o el uso de la Plataforma se someterá a la jurisdicción de los tribunales de Bogotá, Colombia.

Antes de iniciar cualquier acción legal, las partes acuerdan intentar resolver la disputa de manera amistosa a través de los canales de soporte de ULULATO.`,
  },
  {
    title: '11. Contacto',
    content: `Para cualquier pregunta sobre estos Términos de Uso, puede contactarnos a través de:

• Correo electrónico: legal@ululato.com
• Dirección: Calle 100 #19-61, Oficina 501, Bogotá, Colombia
• Teléfono: +57 300 123 4567

Responderemos a sus consultas en un plazo máximo de 10 días hábiles.`,
  },
];

export default function Terms() {
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
            <span className="text-foreground">Términos de Uso</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-6"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm">Documento legal</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              Términos de <span className="text-primary">Uso</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-muted-foreground"
            >
              <Calendar className="w-4 h-4" />
              <span>Última actualización: 15 de enero de 2026</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
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

      <Footer />
    </div>
  );
}
