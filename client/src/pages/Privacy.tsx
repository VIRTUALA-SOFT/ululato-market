/**
 * ULULATO Privacy Policy Page
 * Design: Privacy policy information
 * Style: "Neon Ancestral" - Cyberpunk Indígena
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight, Shield, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    title: '1. Información que Recopilamos',
    content: `Recopilamos información que usted nos proporciona directamente y datos que se generan automáticamente cuando utiliza nuestra plataforma.

Información proporcionada por usted:
• Datos de registro: nombre, correo electrónico, número de teléfono
• Información de perfil: foto, biografía, ubicación
• Datos de pago: información de tarjetas (procesada por terceros seguros)
• Direcciones de envío
• Comunicaciones con soporte y otros usuarios
• Contenido que publica: productos, reseñas, comentarios

Información recopilada automáticamente:
• Dirección IP y datos de ubicación aproximada
• Tipo de dispositivo y navegador
• Páginas visitadas y tiempo de permanencia
• Productos vistos y búsquedas realizadas
• Cookies y tecnologías similares`,
  },
  {
    title: '2. Uso de la Información',
    content: `Utilizamos la información recopilada para:

Operación del servicio:
• Procesar transacciones y envíos
• Facilitar la comunicación entre compradores y vendedores
• Proporcionar soporte al cliente
• Verificar identidades y prevenir fraudes

Mejora del servicio:
• Personalizar su experiencia en la plataforma
• Desarrollar nuevas funcionalidades
• Analizar tendencias y comportamientos de uso
• Realizar investigaciones y análisis

Comunicaciones:
• Enviar confirmaciones de pedidos y actualizaciones
• Notificar sobre cambios en nuestros servicios
• Enviar promociones y ofertas (con su consentimiento)
• Responder a sus consultas y solicitudes`,
  },
  {
    title: '3. Compartir Información',
    content: `Compartimos su información en las siguientes circunstancias:

Con otros usuarios:
• Los vendedores reciben información necesaria para procesar pedidos
• Los compradores ven información pública de los vendedores
• Las reseñas y calificaciones son visibles públicamente

Con proveedores de servicios:
• Procesadores de pago (Stripe, PayU, etc.)
• Empresas de logística y envío
• Servicios de almacenamiento en la nube
• Herramientas de análisis y marketing

Por requerimientos legales:
• Cuando sea requerido por ley o proceso legal
• Para proteger derechos, propiedad o seguridad
• En caso de investigaciones de fraude

Nunca vendemos su información personal a terceros con fines de marketing.`,
  },
  {
    title: '4. Seguridad de los Datos',
    content: `Implementamos medidas de seguridad técnicas y organizativas para proteger su información:

Medidas técnicas:
• Encriptación SSL/TLS para todas las comunicaciones
• Encriptación de datos sensibles en reposo
• Firewalls y sistemas de detección de intrusos
• Monitoreo continuo de seguridad
• Copias de seguridad regulares

Medidas organizativas:
• Acceso restringido a datos personales
• Capacitación en seguridad para empleados
• Políticas de manejo de datos
• Auditorías de seguridad periódicas

A pesar de nuestros esfuerzos, ningún sistema es completamente seguro. Le notificaremos en caso de cualquier brecha de seguridad que afecte sus datos.`,
  },
  {
    title: '5. Sus Derechos',
    content: `De acuerdo con la Ley 1581 de 2012 y el RGPD (para usuarios en la UE), usted tiene los siguientes derechos:

• Acceso: Solicitar una copia de sus datos personales
• Rectificación: Corregir datos inexactos o incompletos
• Eliminación: Solicitar la eliminación de sus datos
• Portabilidad: Recibir sus datos en formato estructurado
• Oposición: Oponerse al procesamiento de sus datos
• Limitación: Restringir el procesamiento de sus datos
• Retiro del consentimiento: Retirar su consentimiento en cualquier momento

Para ejercer estos derechos, contáctenos en privacidad@ululato.com. Responderemos en un plazo máximo de 15 días hábiles.`,
  },
  {
    title: '6. Retención de Datos',
    content: `Conservamos su información durante el tiempo necesario para:

• Mantener su cuenta activa y proporcionar servicios
• Cumplir con obligaciones legales y fiscales
• Resolver disputas y hacer cumplir acuerdos
• Prevenir fraudes y abusos

Períodos de retención específicos:
• Datos de cuenta: mientras la cuenta esté activa + 5 años
• Datos de transacciones: 10 años (requisito fiscal)
• Comunicaciones de soporte: 3 años
• Datos de navegación: 2 años

Puede solicitar la eliminación de su cuenta en cualquier momento. Algunos datos pueden retenerse por obligaciones legales.`,
  },
  {
    title: '7. Cookies y Tecnologías Similares',
    content: `Utilizamos cookies y tecnologías similares para:

Cookies esenciales:
• Mantener su sesión iniciada
• Recordar preferencias de idioma
• Garantizar la seguridad de la plataforma

Cookies de rendimiento:
• Analizar cómo se utiliza la plataforma
• Identificar problemas técnicos
• Medir el rendimiento del sitio

Cookies de funcionalidad:
• Recordar sus preferencias
• Personalizar su experiencia
• Guardar productos en su carrito

Cookies de marketing:
• Mostrar anuncios relevantes
• Medir la efectividad de campañas

Puede gestionar sus preferencias de cookies en la configuración de su navegador o a través de nuestro panel de cookies.`,
  },
  {
    title: '8. Menores de Edad',
    content: `ULULATO no está dirigido a menores de 18 años. No recopilamos intencionalmente información de menores de edad.

Si es padre o tutor y cree que su hijo nos ha proporcionado información personal, contáctenos inmediatamente para que podamos eliminar dicha información.

Los menores de 18 años pueden utilizar la plataforma solo bajo la supervisión de un adulto responsable.`,
  },
  {
    title: '9. Transferencias Internacionales',
    content: `Sus datos pueden ser transferidos y procesados en servidores ubicados fuera de Colombia, incluyendo Estados Unidos y la Unión Europea.

Cuando transferimos datos internacionalmente, nos aseguramos de que:
• Existan garantías adecuadas de protección
• Se cumplan las regulaciones aplicables
• Los proveedores cumplan con estándares de seguridad

Utilizamos cláusulas contractuales estándar aprobadas y trabajamos solo con proveedores que cumplen con altos estándares de privacidad.`,
  },
  {
    title: '10. Cambios a esta Política',
    content: `Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios significativos a través de:

• Un aviso destacado en la plataforma
• Un correo electrónico a la dirección registrada
• Una notificación en la aplicación

Le recomendamos revisar esta política regularmente. El uso continuado de la plataforma después de los cambios constituye su aceptación de la política actualizada.`,
  },
  {
    title: '11. Contacto',
    content: `Para preguntas sobre esta Política de Privacidad o el manejo de sus datos:

Oficial de Protección de Datos:
• Correo: privacidad@ululato.com
• Dirección: Calle 100 #19-61, Oficina 501, Bogotá, Colombia
• Teléfono: +57 300 123 4567

También puede presentar una queja ante la Superintendencia de Industria y Comercio (SIC) si considera que sus derechos han sido vulnerados.`,
  },
];

export default function Privacy() {
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
            <span className="text-foreground">Política de Privacidad</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 mb-6"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm">Tu privacidad es importante</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-6"
            >
              Política de <span className="text-primary">Privacidad</span>
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
                <p className="text-lg text-muted-foreground mb-8">
                  En ULULATO, nos comprometemos a proteger su privacidad y sus datos personales. 
                  Esta política describe cómo recopilamos, usamos y protegemos su información.
                </p>

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
