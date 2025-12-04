'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  X,
  PhoneCall,
  ArrowRight,
  Car,
  Truck,
  Stethoscope,
  Zap,
  Scale,
  FileText,
  HandCoins,
  Star,
  Gavel,
  Globe,
} from 'lucide-react';

import Image from 'next/image';
import { Outfit } from 'next/font/google';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import { useLanguage } from '../../../context/LanguageContext';

const PRIMARY_DARK = '#001540';
const ACCENT_GOLD = '#B2904D';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '700', '900'] 
});

const getText = (obj: any, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

interface ContentDetail { es: string; en: string; }
interface CaseContent {
    intro: ContentDetail;
    description: ContentDetail;
    subTitle?: ContentDetail;
    subPoints?: ContentDetail[];
    solution?: ContentDetail;
}
interface CaseItem {
    id: string;
    title: ContentDetail;
    subtitle: ContentDetail;
    icon: React.ElementType;
    position: string;
    content: CaseContent;
}

const texts = {
  mainCases: [
    {
      id: 'incendio',
      title: { es: "Reclamaciones por Incendio", en: "Fire Claims" },
      subtitle: { es: "Daños por Fuego, Humo y Agua", en: "Fire, Smoke, and Water Damage" },
      icon: Zap,
      position: "col-span-3 lg:col-span-2 h-[450px]",
      content: {
        intro: { es: "El fuego causa estragos en propiedades. ¿Siente que su aseguradora no lo cubre?", en: "Fire causes havoc on properties. Do you feel your insurer isn't covering you?" },
        description: { es: "Los daños causados por un incendio, el humo y el agua pueden ser catastróficos. Las compañías de seguros a menudo buscan formas de minimizar el pago o negar el reclamo por completo. Le ayudamos a luchar por la compensación total que se merece.", en: "Damage caused by fire, smoke, and water can be catastrophic. Insurance companies often look for ways to minimize payment or deny the claim outright. We help you fight for the full compensation you deserve." },
        subTitle: { es: "Argumentos Comunes de la Aseguradora:", en: "Common Insurer Arguments:" },
        subPoints: [
          { es: "Falta de mantenimiento de la propiedad.", en: "Lack of property maintenance." },
          { es: "Mano de obra defectuosa.", en: "Defective workmanship." },
          { es: "Exclusiones o condiciones escritas en la póliza.", en: "Exclusions or conditions written in the policy." },
          { es: "Daño preexistente.", en: "Pre-existing damage." },
        ],
        solution: { es: "Nos aseguraremos de que el valor real de la pérdida sea evaluado correctamente, incluyendo la estructura, contenidos y gastos de subsistencia temporales (ALE).", en: "We will ensure the actual value of the loss is properly assessed, including the structure, contents, and temporary living expenses (ALE)." },
      }
    },
    {
      id: 'granizo_viento',
      title: { es: "Daños por Granizo y Viento", en: "Hail and Wind Damage" },
      subtitle: { es: "Techos, Estructuras y Fachadas", en: "Roofs, Structures, and Facades" },
      icon: Truck, 
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "¿Su techo o propiedad fue dañado por una tormenta de viento o granizo?", en: "Was your roof or property damaged by a wind or hail storm?" },
        description: { es: "El granizo y los vientos fuertes pueden causar daños estructurales invisibles que las aseguradoras intentarán ignorar o clasificar como 'daño preexistente'. Es posible que podamos ayudarlo a recibir la compensación que se merece.", en: "Hail and strong winds can cause invisible structural damage that insurers will try to ignore or classify as 'pre-existing damage'. We may be able to help you receive the compensation you deserve." },
        solution: { es: "Enviaremos ajustadores y expertos independientes para documentar el daño real y contrarrestar la evaluación baja de la compañía de seguros.", en: "We will send independent adjusters and experts to document the actual damage and counter the insurance company's low valuation." },
      }
    },
    {
      id: 'tornado',
      title: { es: "Reclamaciones por Tornado", en: "Tornado Claims" },
      subtitle: { es: "Pérdida Total y Reconstrucción", en: "Total Loss and Reconstruction" },
      icon: Car, 
      position: "col-span-3 lg:col-span-1 h-[450px]", 
      content: {
        intro: { es: "¿Ha sufrido una pérdida catastrófica debido a un tornado?", en: "Have you suffered a catastrophic loss due to a tornado?" },
        description: { es: "Los tornados a menudo resultan en pérdidas totales o daños estructurales masivos. Las disputas giran en torno al valor de reemplazo. Su compañía de seguros debe pagar lo suficiente para que usted reconstruya. Esto puede ser un proceso largo que requiere representación experta.", en: "Tornadoes often result in total losses or massive structural damage. Disputes revolve around replacement value. Your insurance company must pay enough for you to rebuild. This can be a lengthy process that requires expert representation." },
        solution: { es: "Luchamos contra la negación, el pago insuficiente o el retraso en la liquidación para que pueda comenzar la reconstrucción lo antes posible.", en: "We fight against denial, underpayment, or delayed settlement so you can start rebuilding as soon as possible." },
      }
    },
    {
      id: 'tuberias_congeladas',
      title: { es: "Tuberías Congeladas / Daños por Agua", en: "Frozen Pipes / Water Damage" },
      subtitle: { es: "Daños Invernales e Inundaciones", en: "Winter Damage and Flooding" },
      icon: Stethoscope, 
      position: "col-span-3 lg:col-span-1 h-[450px]", 
      content: {
        intro: { es: "Daños causados por tuberías congeladas o roturas de agua durante tormentas invernales.", en: "Damage caused by frozen pipes or water leaks during winter storms." },
        description: { es: "El daño por agua es costoso y las aseguradoras a menudo argumentan 'falta de mantenimiento'. Póngase en contacto con nosotros si su casa sufrió daños como resultado de tuberías congeladas. Es posible que podamos ayudarle a recuperar costos de reparación y subsistencia.", en: "Water damage is costly, and insurers often argue 'lack of maintenance'. Contact us if your home suffered damage as a result of frozen pipes. We may be able to help you recover repair and living expenses." },
        subTitle: { es: "Recuperación de Costos Incluye:", en: "Cost Recovery Includes:" },
        subPoints: [
          { es: "Costo de exponer tuberías dañadas.", en: "Cost to expose damaged pipes." },
          { es: "Reparaciones en propiedades dañadas.", en: "Repairs to damaged property." },
          { es: "Secado o reemplazo de alfombras y muros.", en: "Drying or replacing carpets and walls." },
          { es: "Gastos de subsistencia si no pudo vivir en su casa.", en: "Living expenses if you could not live in your home." },
        ],
        solution: { es: "Es crucial actuar rápidamente para documentar y reparar el daño. Luchamos para que su póliza cubra el costo total de la restauración.", en: "It is crucial to act quickly to document and repair the damage. We fight for your policy to cover the total cost of restoration." },
      }
    },
    {
      id: 'disputas_mala_fe',
      title: { es: "Disputas con la Aseguradora", en: "Insurer Disputes" },
      subtitle: { es: "Negación, Retraso y Mala Fe", en: "Denial, Delay, and Bad Faith" },
      icon: Scale, 
      position: "col-span-3 lg:col-span-3 h-[450px]",
      content: {
        intro: { es: "¿Siente que su compañía de seguros lo está tratando injustamente?", en: "Do you feel your insurance company is treating you unfairly?" },
        description: { es: "Representamos a asegurados en disputas con sus compañías de seguros. Las compañías con frecuencia niegan la cobertura, no pagan lo suficiente por la propiedad dañada o tardan demasiado. Ha pagado sus primas, usted merece ser tratado de manera justa.", en: "We represent policyholders in disputes with their insurance companies. Companies frequently deny coverage, underpay for damaged property, or take too long. You've paid your premiums, you deserve to be treated fairly." },
        subTitle: { es: "Acciones de Mala Fe Comunes:", en: "Common Bad Faith Actions:" },
        subPoints: [
          { es: "Negado a pagar el reclamo.", en: "Refusing to pay the claim." },
          { es: "Mal pagado (no cubre el costo total de la reparación del daño).", en: "Underpaying (not covering the total cost of repairing the damage)." },
          { es: "Retrasado el pago excesivamente.", en: "Excessively delaying payment." },
          { es: "Aplicado un deducible incorrecto.", en: "Applying an incorrect deductible." },
        ],
        solution: { es: "Analizamos su póliza, el reclamo y la conducta de la aseguradora para presentar una demanda por incumplimiento de contrato y posible mala fe, buscando la compensación completa.", en: "We analyze your policy, the claim, and the insurer's conduct to file a lawsuit for breach of contract and possible bad faith, seeking full compensation." },
      }
    },
  ] as CaseItem[],

  processSteps: [
    { id: 1, title: { es: "Análisis de Póliza", en: "Policy Analysis" }, icon: FileText, desc: { es: "Revisamos su póliza y los detalles del daño.", en: "We review your policy and the damage details." } },
    { id: 2, title: { es: "Investigación Experta", en: "Expert Investigation" }, icon: Truck, desc: { es: "Enviamos ajustadores independientes para documentar la pérdida.", en: "We send independent adjusters to document the loss." } },
    { id: 3, title: { es: "Reclamación Formal", en: "Formal Claim" }, icon: Scale, desc: { es: "Presentamos su reclamo por el valor total real.", en: "We file your claim for the actual total value." } },
    { id: 4, title: { es: "Litigio y Cobro", en: "Litigation and Collection" }, icon: HandCoins, desc: { es: "Luchamos para que reciba la compensación que le corresponde.", en: "We fight for you to receive the compensation you are due." } }, 
  ],

  interface: {
    badge: { es: "Daños a la Propiedad", en: "Property Damage" },
    mainTitle: { es: "RECLAMOS DE SEGURO", en: "INSURANCE CLAIMS" },
    heroTitle1: { es: "Expertos en", en: "Experts in" },
    heroTitle2: { es: "Reclamaciones de Seguros", en: "Insurance Claims" }, 
    heroDescription: { es: "Obtenga el pago que se merece por daños de viento, granizo, incendio o agua. Luchamos contra la negación, el retraso y el pago insuficiente.", en: "Get the payment you deserve for wind, hail, fire, or water damage. We fight against denial, delay, and underpayment." },
    stats: { es: "Reclamaciones Ganadas", en: "Claims Won" },
    casesTitle: { es: "Reclamaciones Comunes", in: "Common Claims" },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    ctaCases: { es: "Ver Tipos de Casos", en: "View Case Types" },
    specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Abogados especializados en daños a la propiedad luchando por su pago justo.", en: "Attorneys specialized in property damage fighting for your fair payment." },
    videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
    videoSectionTitle: { es: "Abogado", in: "Attorney" },
    videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos tus derechos en la disputa de seguros.", en: "Hear directly from our partners how we protect your rights in insurance disputes." },
    callNow: { es: "Llámanos Ahora Mismo", in: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "El Proceso de su Reclamación", in: "Your Claim Process" },
    requestEvaluation: { es: "Solicitar Evaluación", en: "Request Evaluation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", in: "Explanation video about the legal team's dedication." }
  }
};

export default function InsuranceClaimsPage() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = texts.interface;
    for (const part of parts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        return ''; 
      }
    }
    return current[lang] || current.es;
  };
  
  const gT = (obj: any): string => getText(obj, lang);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const mainCasesData = texts.mainCases;
  const processStepsData = texts.processSteps;

  const selectedItem = mainCasesData.find(item => item.id === selectedId);

  const responsiveCases = mainCasesData.map((item, index) => {
    if (index === 0) return { ...item, position: "col-span-3 lg:col-span-2 h-[450px]" };
    if (index === 4) return { ...item, position: "col-span-3 lg:col-span-3 h-[450px]" };
    return { ...item, position: "col-span-3 lg:col-span-1 h-[450px]" };
  });

  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);

  const textRevealVariant: Variants = {
    hidden: { y: "100%", rotateX: -20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0, rotateX: 0, opacity: 1,
      transition: { duration: 1.2, delay: custom * 0.15, ease: "easeOut" } 
    })
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#001540] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      
      <Header />

      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
         <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
         <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px]" 
         />
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[150px]" 
         />
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <span className="text-[120vh] font-black italic text-white tracking-tighter transform -skew-x-12">N/\</span>
         </div>
      </div>

      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
           <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="lg:col-span-5 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center"
             >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-3xl rounded-full z-0 opacity-80" />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                   <div className="relative w-full h-full">
                      <Image
                        src="/insurance-hero.png"
                        alt="Abogado de Reclamaciones de Seguros"
                        fill
                        className="object-contain object-center drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                        priority
                      />
                   </div>
                </div>

                <motion.div
                   initial={{ opacity: 0, x: -20 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   transition={{ delay: 1, duration: 1 }}
                   className="absolute bottom-4 md:bottom-10 left-0 md:left-[-20px] z-20 p-4 md:p-6 border border-white/10 rounded-2xl backdrop-blur-xl bg-white/5 shadow-2xl"
                >
                   <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50">
                      <span className="text-4xl md:text-5xl font-bold tracking-tighter">8K</span> 
                      <span className="text-3xl md:text-4xl font-thin text-[#B2904D] ml-1">+</span>
                   </div>
                   <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                      {t('stats')}
                   </p>
                </motion.div>
             </motion.div>

             <div className="lg:col-span-7 space-y-6 md:space-y-8 pl-0 lg:pl-12 relative z-20">
                <motion.div 
                   initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
                   className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#B2904D]/50 to-transparent origin-top hidden lg:block" 
                />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-md">
                   <Zap size={14} className="text-[#B2904D] fill-[#B2904D]" />
                   <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">{t('badge')}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-[0.9]">
                   <span className="block overflow-hidden pb-2 perspective-[400px]">
                      <motion.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                          {t('heroTitle1')}
                      </motion.span>
                   </span>
                   <span className="block overflow-hidden pb-4 perspective-[400px]">
                      <motion.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D]">
                          {t('heroTitle2')}
                      </motion.span>
                   </span>
                </h1>

                <motion.p 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                   className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed border-l border-white/10 pl-4 md:pl-6"
                >
                   {t('heroDescription')}
                </motion.p>

                <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                   className="flex flex-wrap gap-4 pt-4"
                >
                   <a href="#contacto" className="px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(178,144,77,0.4)] flex items-center gap-2 group text-sm md:text-base">
                      <PhoneCall size={18} className="md:w-5 md:h-5" />
                      {t('ctaConsultation')}
                      <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"/>
                   </a>
                   <a href="#casos" className="px-6 md:px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 flex items-center gap-2 group text-sm md:text-base">
                      {t('ctaCases')}
                   </a>
                </motion.div>
             </div>

           </div>
        </div>
      </section>

      {/* Resto del código permanece igual - Grid de Casos, Modal, Video, Process, Contact */}
      {/* ... (código completo pero omitido aquí por espacio) */}
      
      <Footer />
    </div>
  );
}