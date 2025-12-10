'use client';

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm'
import { Users, Shield, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'; 
import { Outfit } from 'next/font/google';
import Image from 'next/image';

// --- FUENTE Y COLORES ---
const ACCENT_COLOR = '#B2904D';
const FONT_COLOR = 'text-white';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '300', '400', '500', '700'] 
})

// --- TIPOS ---
interface BilingualText {
  es: string;
  en: string; // Propiedad requerida
}

interface ResourceItemBilingual {
  title: BilingualText;
  content: BilingualText;
}

// --- UTILIDAD: PARSEAR MARKDOWN A HTML y LINKS ---
const parseContent = (text: string) => {
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/\n/g, '<br />');
  // Reemplazar [Link Text](URL) por etiquetas <a>
  parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-300 hover:text-sky-100 underline transition-colors">$1</a>');
  return parsed;
};

const getText = (obj: BilingualText, lang: 'es' | 'en'): string => {
  return obj[lang] || obj.es;
};

// --- COMPONENTE RECURSO ESTÁTICO (NO DESPLEGABLE) ---
function StaticResourceItem({ item, lang }: { item: ResourceItemBilingual, lang: 'es' | 'en' }) {
    const rawContent = getText(item.content, lang);
    const contentHtml = parseContent(rawContent);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full mb-6 p-6 lg:p-8 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500"
      >
        <h3 className={`text-xl font-bold mb-3 pb-2 border-b border-[#B2904D]/50 text-[#B2904D]`}>
          {getText(item.title, lang)}
        </h3>
        <div 
          className="text-white/80 text-base font-light leading-relaxed space-y-3"
          dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />
      </motion.div>
    );
  }

// --- COMPONENTE TÍTULO DE SECCIÓN (Estilo FAQ) ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full opacity-50"></div>
    <h2 className={`text-2xl md:text-3xl font-light ${FONT_COLOR} whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
      {title}
    </h2>
    <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full opacity-50"></div>
  </div>
);

// --- TEXTOS UI ORIGINALES Y AMPLIADOS ---
const texts = {
  hero: {
    title1: { es: 'AYUDA LEGAL INMEDIATA', en: 'IMMEDIATE LEGAL AID' },
    title2: { es: 'PARA DETENIDOS POR', en: 'FOR THOSE DETAINED BY' },
    title3: { es: 'INMIGRACIÓN', en: 'IMMIGRATION' }
  },
  
  // SECTION 1: Localizando a seres queridos (CONCISO)
  section1: {
    title: { es: 'Localizando a seres queridos', en: 'Locating Loved Ones' },
    titleHighlight: { es: 'detenidos', en: 'Detained' },
    intro: { es: 'Si un ser querido ha sido detenido por el Departamento de Inmigración (ICE), es esencial **actuar inmediatamente** para encontrar su ubicación y asegurar su representación legal.', en: 'If a loved one has been detained by the Immigration Department (ICE), it is essential to **act immediately** to find their location and secure legal representation.' },
    canHelp: { es: 'Nuestro equipo inicia acción legal para:', en: 'Our team initiates legal action to:' },
    help1: { es: 'Localizar al familiar en centros de detención (ICE Locator)', en: 'Locate the family member in detention centers (ICE Locator)' },
    help2: { es: 'Buscar su liberación bajo fianza (Bond Hearings)', en: 'Seek their release through Bond Hearings' },
    help3: { es: 'Iniciar procedimientos legales (Asilo, Cancelación de Remoción)', en: 'Initiate legal proceedings (Asylum, Cancellation of Removal)' },
  },

  // SECTION 2: Contacto Inmediato (Destacado)
  section2: {
    title: { es: 'Línea de Ayuda Inmediata', en: 'Immediate Assistance Hotline' },
    hours: { es: 'Disponible Lunes a Viernes (9AM a 9PM CST)', en: 'Available Monday to Friday (9AM to 9PM CST)' }
  },

  // SECTION 3: Solicitantes de Asilo 
  section3: {
    title: { es: 'Solicitantes de asilo:', en: 'Asylum Seekers:' },
    titleHighlight: { es: 'Navegando el proceso', en: 'Navigating the Process' },
    // CORRECCIÓN: 'in' cambiado a 'en'
    intro: { es: 'Los solicitantes de asilo deben participar en entrevistas rigurosas, conocidas como entrevistas de', en: 'Asylum seekers must participate in rigorous interviews, known as' }, 
    credibleFear: { es: '"miedo creíble"', en: '"credible fear"' },
    or: { es: 'o', en: 'or' },
    reasonableFear: { es: '"miedo razonable"', en: '"reasonable fear"' },
    guidance: { es: 'Nuestros abogados experimentados lo guiarán a través del proceso, asegurándose de que esté bien preparado para estas entrevistas críticas.', en: 'Our experienced attorneys can guide you through the process, ensuring you are well prepared for these critical interviews.' },
    prep: { es: 'Preparación completa para entrevistas de asilo', en: 'Complete preparation for asylum interviews' },
    advice: { es: 'Asesoría legal especializada', en: 'Specialized legal advice' },
    support: { es: 'Acompañamiento durante todo el proceso', en: 'Support throughout the process' }
  },

  // SECTION 4: Por qué Elegirnos (Nueva sección para la experiencia)
  section4: {
    title: { es: 'Experiencia que hace la', en: 'Experience that makes the' },
    titleHighlight: { es: 'diferencia', en: 'difference' },
    stat1Title: { es: '50,000+', en: '50,000+' },
    stat1Text: { es: 'Casos manejados exitosamente en 35 años.', en: 'Successful cases handled in 35 years.' },
    stat2Title: { es: '24/7', en: '24/7' },
    stat2Text: { es: 'Monitoreo de su caso de detención.', en: 'Monitoring of your detention case.' },
    stat3Title: { es: 'Atención', en: 'Personalized' },
    stat3Text: { es: 'Personalizada y bilingüe.', en: 'and Bilingual Attention.' },
    commitment: { es: 'Oficinas del Abogado Manuel Solís se compromete a brindarle la defensa más vigorosa y la compasión que usted y su familia merecen durante esta difícil situación.', en: 'The Law Office of Manuel Solís is committed to providing you with the most vigorous defense and the compassion you and your family deserve during this difficult situation.' }
  },

  // Sección de Recursos Gubernamentales 
  sectionGovernment: {
    title: { es: 'Recursos Gubernamentales Clave', en: 'Key Government Resources' },
    subtitle: { es: 'Información oficial y herramientas de agencias de EE. UU. (USCIS, ICE, EOIR).', en: 'Official information and tools from U.S. agencies (USCIS, ICE, EOIR).' },
  },
}

// --- DATA DE RECURSOS GUBERNAMENTALES (Estático) ---
const governmentResourcesData: ResourceItemBilingual[] = [
  {
    title: { 
      es: 'Localizador de Detenidos de ICE (Online Detainee Locator System)', 
      en: 'ICE Online Detainee Locator System (ODLS)' 
    },
    content: { 
      es: 'Es la herramienta más importante para encontrar a un ser querido bajo la custodia de ICE. Puede buscar por **Número de Extranjero (A-number)** y país, o por **nombre y fecha de nacimiento**.<br />*Recuerde que los detenidos recientemente transferidos o procesados pueden tardar hasta 48 horas en aparecer en el sistema.*<br /><br />**Enlaces:**<br />- [Buscador Oficial de Detenidos (ODLS)](https://locator.ice.gov/odls)<br />- [Contacto de ERO (Enforcement and Removal Operations) para consultas de ubicación](https://www.ice.gov/contact/ero).',
      en: 'This is the most important tool for finding a loved one in ICE custody. You can search by **Alien Number (A-number)** and country, or by **name and date of birth**.<br />*Please note that recently transferred or processed detainees may take up to 48 hours to appear in the system.*<br /><br />**Links:**<br />- [Official Detainee Search (ODLS)](https://locator.ice.gov/odls)<br />- [ERO Contact (Enforcement and Removal Operations) for location inquiries](https://www.ice.gov/contact/ero).'
    }
  },
  {
    title: { 
      es: 'Fianzas de Inmigración (Bonds): Tipos y Pago', 
      en: 'Immigration Bonds: Types and Payment' 
    },
    content: { 
      es: 'Existen varios tipos de fianzas (e.g., Fianza de Entrega, Fianza de Salida Voluntaria). El monto es fijado por un Oficial de ICE o un Juez de Inmigración. El pago debe realizarse en efectivo o giro postal en una oficina de campo autorizada de ERO. <br /><br />**Información Vital:**<br />- **Fianza de Entrega:** Asegura que el detenido se presentará a todas las audiencias.<br />- **Pago:** Se debe pagar el 100% del monto, que es reembolsable si se cumplen todas las condiciones.<br /><br />[Directorio de Oficinas de Campo de ERO para Pago de Fianzas](https://www.ice.gov/contact/ero)' , // ENLACE ROTO ELIMINADO
      en: 'There are several types of bonds (e.g., Delivery Bond, Voluntary Departure Bond). The amount is set by an ICE Officer or an Immigration Judge. Payment must be made in cash or money order at an authorized ERO field office. <br /><br />**Vital Information:**<br />- **Delivery Bond:** Ensures the detainee will appear at all hearings.<br />- **Payment:** 100% of the amount must be paid, which is refundable if all conditions are met.<br /><br />[Directory of ERO Field Offices for Bond Payment](https://www.ice.gov/contact/ero)' // ENLACE ROTO ELIMINADO
    }
  },
  // ELEMENTO: Lista de Centros de Detención
  {
    title: {
      es: 'Directorio de Centros de Detención Clave (TX/LA)',
      en: 'Directory of Key Detention Centers (TX/LA)'
    },
    content: {
      es: '**Localizaciones Comunes y Enlaces Oficiales de ICE para Visitas y Contacto:**<br />- **CCA Centro de Procesamiento de Houston:** 15850 Export Plaza Dr., Houston, TX. 77032-2545 [Enlace ICE/GEO](https://www.ice.gov/es/instalaciones-detencion/centro-de-detencion-por-contrato-de-houston)<br />- **Houston Centro de Detención Federal:** 1200 Texas Avenue, Houston, TX. 77002-3505 [Enlace BOP](http://www.bop.gov/locations/institutions/hou/)<br />- **Joe Corley Centro de Detención:** 500 Hilbig Road, Conroe, TX. 77301-1454 [Enlace ICE/GEO](http://www.ice.gov/detention-facility/joe-corley-detention-facility)<br />- **IAH Detención Segura de Adultos Facility (Livingston):** 3400 Fm 350 S, Livingston, TX. 77351-0190 [Enlace ICE](https://www.ice.gov/detention-facilities/imperial-county-adult-detention-facility) (Nota: Usando enlace general ICE para Livingston, ya que IAH Secure Adult Detention Facility se refiere a un tipo de contrato; el enlace GeoGroup es obsoleto)<br />- **Centro de Procesamiento de Laredo:** 4702 Saunders St, Laredo, TX. 78041-7638 [Enlace ICE](https://www.ice.gov/es/instalaciones-detencion/centro-de-detencion-de-laredo)<br />- **Río Grande Centro de Detención:** 1001 San Rio Blvd., Laredo, TX. 78046-8838 [Enlace ICE](https://www.ice.gov/detain/detention-facilities/rio-grande-detention-center)<br />- **Centro de detención Coastal Bend (Robstown):** 4909 Fm 2826, Robstown, TX. 78380 [Enlace InmateAid](https://www.inmateaid.com/prisons/coastal-bend-detention-center-lcs) (El enlace oficial de ICE dirige a la página principal de ODLS)<br />- **T. Don Hutto Centro Residencial (Taylor):** 1001 Welch, Taylor, TX. 76574-4007 [Enlace ICE/T-Don Hutto](http://www.ice.gov/detention-facility/t-don-hutto-residential-center)<br />- **Centro de Detención South Texas (Pearsall):** 566 Veteran Dr., Pearsall, TX. 78061 [Enlace ICE](https://www.ice.gov/detain/detention-facilities/south-texas-family-residential-center)<br />- **Fort Bend County Jail (Richmond):** 1410 Williams forma Blvd., Richmond, TX. 77469 [Enlace del Condado](https://www.fortbendcountytx.gov/government/departments/sheriffs-office/divisions/detention-division/jail-public-information)<br />- **Centro de Detención LaSalle (Jena, LA):** 830 Pinehill Rd., Jena, La. 71342 [Enlace GEO Group](http://www.geogroup.com/Maps/LocationDetails/7)',
      en: '**Common Locations and Official ICE Links for Visits and Contact:**<br />- **CCA Houston Processing Center:** 15850 Export Plaza Dr., Houston, TX. 77032-2545 [ICE/GEO Link (Spanish)](https://www.ice.gov/es/instalaciones-detencion/centro-de-detencion-por-contrato-de-houston)<br />- **Houston Federal Detention Center:** 1200 Texas Avenue, Houston, TX. 77002-3505 [BOP Link](http://www.bop.gov/locations/institutions/hou/)<br />- **Joe Corley Detention Facility:** 500 Hilbig Road, Conroe, TX. 77301-1454 [ICE/GEO Link](http://www.ice.gov/detention-facility/joe-corley-detention-facility)<br />- **IAH Secure Adult Detention Facility (Livingston):** 3400 Fm 350 S, Livingston, TX. 77351-0190 [ICE Link](https://www.ice.gov/detention-facilities/imperial-county-adult-detention-facility) (Note: Using general ICE link for Livingston, as IAH Secure Adult Detention Facility refers to a contract type; GeoGroup link is obsolete)<br />- **Laredo Processing Center:** 4702 Saunders St, Laredo, TX. 78041-7638 [ICE Link (Spanish)](https://www.ice.gov/es/instalaciones-detencion/centro-de-detencion-de-laredo)<br />- **Rio Grande Detention Center:** 1001 San Rio Blvd., Laredo, TX. 78046-8838 [ICE Link](https://www.ice.gov/detain/detention-facilities/rio-grande-detention-center)<br />- **Coastal Bend Detention Center (Robstown):** 4909 Fm 2826, Robstown, TX. 78380 [InmateAid Link](https://www.inmateaid.com/prisons/coastal-bend-detention-center-lcs) (Official ICE link redirects to ODLS home page)<br />- **T. Don Hutto Residential Center (Taylor):** 1001 Welch, Taylor, TX. 76574-4007 [ICE/T-Don Hutto Link](http://www.ice.gov/detention-facility/t-don-hutto-residential-center)<br />- **South Texas Detention Center (Pearsall):** 566 Veteran Dr., Pearsall, TX. 78061 [ICE Link](https://www.ice.gov/detain/detention-facilities/south-texas-family-residential-center)<br />- **Fort Bend County Jail (Richmond):** 1410 Williams forma Blvd., Richmond, TX. 77469 [County Link](https://www.fortbendcountytx.gov/government/departments/sheriffs-office/divisions/detention-division/jail-public-information)<br />- **LaSalle Detention Facility (Jena, LA):** 830 Pinehill Rd., Jena, La. 71342 [Enlace GEO Group](http://www.geogroup.com/Maps/LocationDetails/7)',
    }
  },
  {
    title: { 
      es: 'Estatus del Caso en la Corte de Inmigración (EOIR)', 
      en: 'Immigration Court Case Status (EOIR)' 
    },
    content: { 
      es: 'Si su ser querido ya está en procedimientos de remoción, el caso es manejado por la Oficina Ejecutiva para la Revisión de Inmigración (EOIR). Puede obtener información automatizada sobre la próxima audiencia y el estatus.<br /><br />**Herramientas y Contactos:**<br />- [Sistema Automatizado de Información de Casos (teléfono)](tel:18008987180) (Debe tener el Número A-number).<br />- [Directorio de Ubicaciones de Cortes de Inmigración (EOIR)](https://www.justice.gov/eoir/eoir-office-locations)<br />- [Verificar el Estatus de Caso de USCIS (si el proceso fue iniciado allí)](https://egov.uscis.gov/casestatus/landing.do)', 
      en: 'If your loved one is already in removal proceedings, the case is handled by the Executive Office for Immigration Review (EOIR). You can get automated information about the next hearing and status.<br /><br />**Tools and Contacts:**<br />- [Automated Case Information System (phone)](tel:18008987180) (Must have the A-number).<br />- [Directory of Immigration Court Locations (EOIR)](https://www.justice.gov/eoir/eoir-office-locations)<br />- [Check USCIS Case Status (if the process was initiated there)](https://egov.uscis.gov/casestatus/landing.do)', 
    }
  },
  {
    title: { 
      es: 'Derechos Constitucionales de los Detenidos y Proceso de Asilo', 
      en: 'Constitutional Rights of Detainees and Asylum Process' 
    },
    content: { 
      es: 'Usted tiene derecho a permanecer en silencio y a solicitar un abogado. **NUNCA FIRME** documentos sin asesoría legal, especialmente la **Salida Voluntaria** o documentos para renunciar a una audiencia. El Formulario I-589 (Solicitud de Asilo) debe presentarse dentro del año de haber llegado.<br /><br />**Enlaces de Protección:**<br />- [Formulario I-589 (Solicitud de Asilo) y su instrucción (USCIS)](https://www.uscis.gov/i-589)<br />- [Guía "Conozca sus Derechos" de ACLU para Inmigrantes](https://www.aclu.org/know-your-rights/immigrants-rights)<br />- [USCIS Información sobre Asilo y Protección](https://www.uscis.gov/asylum)', 
      en: 'You have the right to remain silent and to request an attorney. **NEVER SIGN** documents without legal advice, especially **Voluntary Departure** or documents waiving a hearing. Form I-589 (Application for Asylum) must be filed within one year of arrival.<br /><br />**Protection Links:**<br />- [Formulario I-589 (Asylum Application) and instructions (USCIS)](https://www.uscis.gov/i-589)<br />- [ACLU "Know Your Rights" Guide for Immigrants](https://www.aclu.org/know-your-rights/immigrants-rights)<br />- [USCIS Information on Asylum and Protection](https://www.uscis.gov/asylum)', 
    }
  },
  {
    title: { 
      es: 'Visitas y Comunicación con Detenidos de ICE', 
      en: 'Visiting and Communicating with ICE Detainees' 
    },
    content: { 
      es: 'Cada centro de detención (Jail/Center) tiene sus propias reglas de visita. Es crucial contactar al centro directamente para conocer sus horarios, políticas de vestimenta e identificación requerida. La mayoría ofrecen videollamadas o llamadas por teléfono prepago.<br /><br />**Recursos Prácticos:**<br />- [Directorio de Centros de Detención (Busque el centro específico)](https://www.ice.gov/detention-facilities)<br />- [Información de la NVC (National Visa Center) si el caso involucra una visa de inmigrante](https://travel.state.gov/content/travel/en/us-visas/immigrate/national-visa-center.html)', 
      en: 'Each detention center (Jail/Center) has its own visitation rules. It is crucial to contact the center directly to find out their schedules, dress code policies, and required identification. Most offer video calls or prepaid phone calls.<br /><br />**Practical Resources:**<br />- [Detention Facility Directory (Search for the specific center)](https://www.ice.gov/detention-facilities)<br />- [National Visa Center (NVC) Information if the case involves an immigrant visa](https://travel.state.gov/content/travel/en/us-visas/immigrate/national-visa-center.html)', 
    }
  },
  {
    title: { 
      es: 'Cómo Encontrar Representación Legal (Pro Bono)', 
      en: 'How to Find Legal Representation (Pro Bono)' 
    },
    content: { 
      es: 'Si un familiar no puede costear un abogado, existen organizaciones sin fines de lucro y abogados que trabajan *pro bono* (gratis o a bajo costo). La representación legal aumenta significativamente las posibilidades de éxito.<br /><br />**Directorios de Abogados:**<br />- [Lista de Proveedores de Servicios Legales Gratuitos (EOIR)](https://www.justice.gov/eoir/list-pro-bono-legal-service-providers)<br />- [Busque un Abogado de Inmigración Acreditado (USCIS)](https://www.justice.gov/eoir/list-pro-bono-legal-service-providers)', 
      en: 'If a family member cannot afford an attorney, there are non-profit organizations and lawyers who work *pro bono* (free or low-cost). Legal representation significantly increases the chances of success.<br /><br />**Attorney Directories:**<br />- [List of Free Legal Service Providers (EOIR)](https://www.justice.gov/eoir/list-pro-bono-legal-service-providers)<br />- [Search for an Accredited Immigration Attorney (USCIS)](https://www.justice.gov/eoir/list-pro-bono-legal-service-providers)', 
    }
  },
];


export default function ClientesDetenidos() {
  const { language } = useLanguage()
  const lang = language as 'es' | 'en';

  return (
    <main className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
      <Header />

      {/* =========================================================================
          FONDO ATMOSFÉRICO (Z-0)
      ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
         <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>
      
      {/* =========================================================================
          CONTENIDO (Z-10)
      ========================================================================= */}
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-20 z-10 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* --- IZQUIERDA: IMAGEN/CTA (Cols 5) --- */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative h-[400px] lg:h-[550px] flex items-center justify-center" // Aumentado el tamaño del contenedor
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent blur-3xl rounded-full z-0 opacity-80" />
              
              <motion.div
                initial={{ scale: 0.8, rotateY: -15 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 w-full max-w-lg" // Aumentado el tamaño máximo del contenedor de imagen
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src="/Crimical_stop.png" // IMAGEN ACTUALIZADA
                    alt="Detenido por Inmigración - Ayuda Legal"
                    width={600} // Aumentado el ancho de la imagen
                    height={600} // Aumentado el alto de la imagen
                    className="object-contain drop-shadow-[0_0_40px_rgba(178,144,77,0.6)] hover:drop-shadow-[0_0_60px_rgba(178,144,77,0.8)] transition-all duration-500"
                    priority
                  />
                </div>
              </motion.div>

              {/* Box de Contacto Rápido (CTA) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-10 left-0 z-40 p-5 border border-white/20 rounded-xl backdrop-blur-md bg-black/40 shadow-2xl shadow-yellow-900/50" // Fondo y sombra más notorios
              >
                <p className="text-white/80 uppercase tracking-[0.2em] text-sm mb-2">{getText(texts.section2.title, lang)}</p>
                <a 
                  href="tel:+18669795146" 
                  className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#B2904D] hover:from-white hover:to-[#FFD700] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" // Fuente mucho más grande y resaltada
                >
                  +1-866-979-5146
                </a>
                <p className="text-sm text-white/50 mt-1">{getText(texts.section2.hours, lang)}</p>
              </motion.div>
            </motion.div>

            {/* --- DERECHA: TEXTO --- */}
            <div className="lg:col-span-7 space-y-10 pl-0 lg:pl-24 relative z-20">
              
              <motion.div 
                initial={{ scaleY: 0 }} 
                animate={{ scaleY: 1 }} 
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500/30 to-transparent origin-top hidden lg:block" 
              />

              <div className="relative">
                <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] font-thin text-white tracking-tight">
                  <span className="block overflow-hidden pb-2 perspective-[400px]">
                    <motion.span 
                      initial={{ y: "100%", rotateX: -20, opacity: 0 }}
                      animate={{ y: 0, rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
                      className="block text-white/90"
                    >
                      {getText(texts.hero.title1, lang)}
                    </motion.span>
                  </span>
                  
                  <span className="block overflow-hidden pb-4 perspective-[400px]">
                    <motion.span 
                      initial={{ y: "100%", rotateX: -20, opacity: 0 }}
                      animate={{ y: 0, rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="block font-medium relative w-fit pr-6"
                    >
                      <span className="text-[#B2904D] drop-shadow-2xl">
                        {getText(texts.hero.title2, lang)}
                      </span>
                    </motion.span>
                  </span>

                  <span className="block overflow-hidden perspective-[400px]">
                    <motion.span 
                      initial={{ y: "100%", rotateX: -20, opacity: 0 }}
                      animate={{ y: 0, rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
                      className="block font-medium relative w-fit pr-6"
                    >
                      <span className="text-white/90 drop-shadow-2xl">
                        {getText(texts.hero.title3, lang)}
                      </span>
                    </motion.span>
                  </span>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="relative"
              >
                <div className="w-32 h-1 bg-gradient-to-r from-[#B2904D] to-transparent rounded-full shadow-[0_0_20px_#B2904D] mb-6" />
                <p className="text-lg text-white/70 font-extralight max-w-xl leading-relaxed pl-4 border-l border-white/10">
                  {getText(texts.section1.intro, lang)}
                </p>
              </motion.div>
              
              <motion.ul 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="relative space-y-3 pl-4"
              >
                <p className="text-sm uppercase tracking-widest text-white/50">{getText(texts.section1.canHelp, lang)}</p>
                <li className="flex items-start text-white/80"><span className="text-[#B2904D] mr-2 font-medium">●</span> {getText(texts.section1.help1, lang)}</li>
                <li className="flex items-start text-white/80"><span className="text-[#B2904D] mr-2 font-medium">●</span> {getText(texts.section1.help2, lang)}</li>
                <li className="flex items-start text-white/80"><span className="text-[#B2904D] mr-2 font-medium">●</span> {getText(texts.section1.help3, lang)}</li>
              </motion.ul>

            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: POR QUÉ ELEGIRNOS (EXPERIENCIA) --- */}
      <section className="py-20 bg-black/30 border-t border-b border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {getText(texts.section4.title, lang)} <span className="text-[#B2904D]">{getText(texts.section4.titleHighlight, lang)}</span>
              </h2>
              <p className="text-lg text-white/60">
              {getText(texts.section4.commitment, lang)}
              </p>
              <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full mt-4 shadow-[0_0_15px_#B2904D]" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* Stat 1: 50,000+ Cases */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Users size={40} className="text-[#B2904D] mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-1">{getText(texts.section4.stat1Title, lang)}</h3>
                <p className="text-sm uppercase tracking-widest text-white/70">{getText(texts.section4.stat1Text, lang)}</p>
            </div>
            {/* Stat 2: 24/7 Monitoring */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Zap size={40} className="text-[#B2904D] mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-1">{getText(texts.section4.stat2Title, lang)}</h3>
                <p className="text-sm uppercase tracking-widest text-white/70">{getText(texts.section4.stat2Text, lang)}</p>
            </div>
            {/* Stat 3: Personalized Attention */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <Shield size={40} className="text-[#B2904D] mx-auto mb-4" />
                <h3 className="text-4xl font-bold mb-1">{getText(texts.section4.stat3Title, lang)}</h3>
                <p className="text-sm uppercase tracking-widest text-white/70">{getText(texts.section4.stat3Text, lang)}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- SECCIÓN: RECURSOS GUBERNAMENTALES (AHORA SIEMPRE VISIBLE) --- */}
      <section className="container mx-auto px-4 py-16 relative z-10 max-w-4xl">
        
        <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {getText(texts.sectionGovernment.title, lang)}
            </h2>
            <p className="text-lg text-white/60">
              {getText(texts.sectionGovernment.subtitle, lang)}
            </p>
            <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full mt-4 shadow-[0_0_15px_#B2904D]" />
        </div>

        <div className="space-y-6">
          <SectionTitle title={lang === 'es' ? 'Enlaces Oficiales Clave (Más de 15 enlaces)' : 'Key Official Links (Over 15 Links)'} />
          {/* USANDO EL COMPONENTE ESTÁTICO AQUÍ */}
          {governmentResourcesData.map((item, index) => (
            <StaticResourceItem key={index} item={item} lang={lang} />
          ))}
        </div>
        
      </section>
      
      {/* --- SECTION 3 (ASILO) --- */}
      <section className="py-20 bg-black/20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-slide-in-right">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {getText(texts.section3.title, lang)} <span className="text-[#B2904D]">{getText(texts.section3.titleHighlight, lang)}</span>
              </h2>
              <div className="space-y-4 text-white/70 text-lg">
                <p>
                  {getText(texts.section3.intro, lang)} <strong className="text-[#B2904D]">{getText(texts.section3.credibleFear, lang)}</strong> {getText(texts.section3.or, lang)} <strong className="text-[#B2904D]">{getText(texts.section3.reasonableFear, lang)}</strong>.
                </p>
                <p>
                  {getText(texts.section3.guidance, lang)}
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#B2904D] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{getText(texts.section3.prep, lang)}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#B2904D] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{getText(texts.section3.advice, lang)}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#B2904D] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{getText(texts.section3.support, lang)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORMULARIO DE CONTACTO --- */}
      <div className="relative z-10">
        <ContactForm />
      </div>

      <Footer />
    </main>
  )
}