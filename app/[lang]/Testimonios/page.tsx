'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Star, 
  ArrowRight, MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import ContactForm from '../../components/ContactForm';
import { useLanguage } from '../../context/LanguageContext';
import { Outfit } from 'next/font/google';

// --- FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '800', '900'] 
});

// --- DATA ---
const testimonials = [
  {
    id: 'alma-alvarado',
    name: 'Alma Alvarado',
    category: { es: 'Accidentes', en: 'Accidents' },
    image: 'https://manuelsolis.com/wp-content/uploads/2023/12/d7695fc0fb2a14bad98487f70444d63c.png',
    video: 'https://SolisPullZone.b-cdn.net/alma-alvarado.mp4',
    quote: {
      es: "Recuperé la tranquilidad después de mi accidente.",
      en: "I recovered my peace of mind after my accident."
    },
    story: {
      es: "Después de un grave accidente, Alma se sentía perdida. Nuestro equipo intervino para asegurar la compensación máxima.",
      en: "After a serious accident, Alma felt lost. Our team stepped in to secure maximum compensation."
    }
  },
  {
    id: 'alma-garcia',
    name: 'Alma García',
    category: { es: 'Inmigración', en: 'Immigration' },
    image: 'https://manuelsolis.com/wp-content/uploads/2023/12/866963ca424e7b42258ff5da5f5f0426.png',
    video: 'https://SolisPullZone.b-cdn.net/alma-garcia-testimonial.mp4',
    quote: {
      es: "Gracias al equipo pude alcanzar el resultado que anhelaba.",
      en: "Thanks to the team, I was able to achieve the result I longed for."
    },
    story: {
      es: "Alma soñaba con regularizar su estatus. Gracias a la experiencia del equipo legal, pudo enfrentar el proceso con éxito.",
      en: "Alma dreamed of regularizing her status. Thanks to the legal team's experience, she was able to face the process successfully."
    }
  },
  {
    id: 'carlos-zuniga',
    name: 'Carlos Zúñiga',
    category: { es: 'Ley Criminal', en: 'Criminal Law' },
    image: 'https://manuelsolis.com/wp-content/uploads/2023/12/ad195c8834bedc323ce1960b0f43a331.png',
    video: 'https://SolisPullZone.b-cdn.net/carlos-zuniga-testimonial.mp4',
    quote: {
      es: "Pelearon por mis derechos cuando nadie más quería escucharme.",
      en: "They fought for my rights when no one else would listen to me."
    },
    story: {
      es: "Carlos enfrentaba cargos que amenazaban su libertad. La defensa estratégica logró desestimar los cargos más graves.",
      en: "Carlos faced charges that threatened his freedom. Strategic defense managed to dismiss the most serious charges."
    }
  },
  {
    id: 'cecilia-limon',
    name: 'Cecilia Limón',
    category: { es: 'Familia', en: 'Family' },
    image: 'https://manuelsolis.com/wp-content/uploads/2024/01/cecilia-limon.jpg',
    video: 'https://SolisPullZone.b-cdn.net/cecilia-limon.mp4',
    quote: {
      es: "Unieron a mi familia de nuevo.",
      en: "They reunited my family."
    },
    story: {
      es: "Cecilia buscaba la reunificación familiar. Logramos aprobar su caso mediante una petición familiar compleja.",
      en: "Cecilia sought family reunification. We managed to approve her case through a complex family petition."
    }
  },
  {
    id: 'dagoberto-limon',
    name: 'Dagoberto Limón',
    category: { es: 'Inmigración', en: 'Immigration' },
    image: 'https://SolisPullZone.b-cdn.net/dagoberto-limon.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/dagoberto-limon.mp4',
    quote: {
      es: "El proceso fue claro y rápido.",
      en: "The process was clear and fast."
    },
    story: {
      es: "Dagoberto pensó que su caso estaba perdido. Nuestros expertos encontraron una vía legal que otros habían pasado por alto.",
      en: "Dagoberto thought his case was lost. Our experts found a legal path that others had overlooked."
    }
  },
  {
    id: 'doris-licona',
    name: 'Doris Licona',
    category: { es: 'Visa U', en: 'U Visa' },
    image: 'https://SolisPullZone.b-cdn.net/images/doris-licona.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/doris-licona-testimonial.mp4',
    quote: {
      es: "Me ayudaron después de ser víctima de un crimen.",
      en: "They helped me after being a crime victim."
    },
    story: {
      es: "Como víctima de un crimen, Doris tenía miedo. La guiamos y tramitamos su Visa U exitosamente.",
      en: "As a crime victim, Doris was afraid. We guided her and successfully processed her U Visa."
    }
  },
  {
    id: 'juana-edith',
    name: 'Juana Edith Pérez',
    category: { es: 'Residencia', en: 'Residency' },
    image: 'https://SolisPullZone.b-cdn.net/images/juana-edith-perez.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/juana-edith-perez-testimonial.mp4',
    quote: {
      es: "Un servicio honesto y transparente.",
      en: "Honest and transparent service."
    },
    story: {
      es: "Juana Edith destaca la honestidad con la que se manejó su caso, permitiéndole planificar su futuro con seguridad.",
      en: "Juana Edith highlights the honesty with which her case was handled, allowing her to plan her future with confidence."
    }
  },
  {
    id: 'leonardo-aguirre',
    name: 'Leonardo Aguirre',
    category: { es: 'Permiso de Trabajo', en: 'Work Permit' },
    image: 'https://SolisPullZone.b-cdn.net/images/leonardo-aguirre.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/leonardo-aguirre-testimonial.mp4',
    quote: {
      es: "Ahora puedo trabajar legalmente.",
      en: "Now I can work legally."
    },
    story: {
      es: "Obtener su permiso de trabajo cambió la vida de Leonardo, abriéndole puertas a mejores oportunidades laborales.",
      en: "Obtaining his work permit changed Leonardo's life, opening doors to better job opportunities."
    }
  },
  {
    id: 'norma-mendoza',
    name: 'Norma Mendoza',
    category: { es: 'Ciudadanía', en: 'Citizenship' },
    image: 'https://SolisPullZone.b-cdn.net/images/norma-mendoza.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/norma-mendoza.mp4',
    quote: {
      es: "El sueño americano hecho realidad.",
      en: "The American dream come true."
    },
    story: {
      es: "Norma completó su proceso de naturalización con nuestra guía, convirtiéndose orgullosamente en ciudadana.",
      en: "Norma completed her naturalization process with our guidance, proudly becoming a citizen."
    }
  },
  {
    id: 'xiomara-zamora',
    name: 'Xiomara Zamora',
    category: { es: 'Inmigración', en: 'Immigration' },
    image: 'https://SolisPullZone.b-cdn.net/images/xiomara-zamora.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/xiomara-zamora-testimonial.mp4',
    quote: {
      es: "No se rindieron con mi caso.",
      en: "They didn't give up on my case."
    },
    story: {
      es: "A pesar de las dificultades iniciales, el equipo legal persistió hasta encontrar la solución adecuada.",
      en: "Despite initial difficulties, the legal team persisted until finding the right solution."
    }
  }
];

export default function TestimonialsPage() {
  const { language } = useLanguage();
  // CORRECCIÓN TYPESCRIPT: Especificar el tipo del estado
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTestimonial = testimonials.find(t => t.id === selectedId);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  // CORRECCIÓN TYPESCRIPT: Añadir tipo 'any' (o más específico) para evitar error implícito
  const getText = (obj: any) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.es || obj;
  };

  const texts = {
    hero: {
      badge: { es: 'Casos Reales', en: 'Real Cases' },
      title1: { es: 'Historias de', en: 'Success' },
      title2: { es: 'Éxito', en: 'Stories' },
      subtitle: {
        es: 'Resultados que cambian vidas. Personas reales que confiaron su futuro en nosotros.',
        en: 'Results that change lives. Real people who trusted their future to us.'
      }
    },
    card: {
      viewFullStory: { es: 'Ver Historia Completa', en: 'View Full Story' }
    },
    modal: {
      badge: { es: 'Testimonio', en: 'Testimonial' },
      button: { es: 'Solicitar Consulta', en: 'Request Consultation' }
    }
  };

  return (
    <div className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
      
      <Header />

      {/* =========================================================================
          1. FONDO ATMOSFÉRICO FIJO (CON TU CÓDIGO EXACTO)
          Usamos 'fixed' para que cubra toda la pantalla mientras haces scroll.
      ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
         
         {/* --- 2. FONDO DE LA "N" GIGANTE (Tu animación) --- */}
         <motion.div
            initial={{ x: "60%" }} 
            animate={{ x: "-160%" }} 
            transition={{ 
              duration: 80, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none"
         >
            <span className={`text-[160vh] leading-none font-extrabold italic text-white tracking-tighter mix-blend-overlay transform -skew-x-12 ${font.className}`}>
                 N/\И/\
            </span>
         </motion.div>

         {/* Luces ambientales (Tu animación) */}
         <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[150px]" 
         />
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full blur-[180px]" 
         />
         
         <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>


      {/* =========================================================================
          2. CONTENIDO PRINCIPAL (z-10 para estar sobre el fondo)
      ========================================================================= */}
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-20 px-4 z-10 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg mb-8">
               <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
               <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{texts.hero.badge[language]}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin text-white tracking-tight mb-8 drop-shadow-2xl">
              {texts.hero.title1[language]} <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#F3E5AB]">{texts.hero.title2[language]}</span>
            </h1>
            
            <p className="text-blue-100/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-8">
              {texts.hero.subtitle[language]}
            </p>
        </motion.div>
      </section>

      {/* --- GRID DE TESTIMONIOS --- */}
      <section className="px-4 pb-32 relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {testimonials.map((item, index) => (
            <motion.div
              layoutId={`card-${item.id}`}
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedId(item.id)}
              className="group cursor-pointer h-[550px]"
            >
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#000a20]/60 backdrop-blur-xl border border-[#B2904D]/40 shadow-[0_0_30px_-5px_rgba(178,144,77,0.3)] hover:shadow-[0_0_50px_-5px_rgba(178,144,77,0.5)] hover:border-[#B2904D]/70 transition-all duration-500 flex flex-col">
                
                {/* Fondo animado interno de la tarjeta */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[32px]">
                    <motion.div 
                        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -left-20 w-64 h-64 bg-[#B2904D]/20 rounded-full blur-[80px] mix-blend-screen" 
                    />
                     <motion.div 
                        animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                        className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] mix-blend-screen" 
                    />
                </div>

                {/* Imagen */}
                <div className="relative h-[320px] w-full overflow-hidden z-10 rounded-t-[32px]">
                   <Image 
                     src={item.image} 
                     alt={item.name} 
                     fill 
                     className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                     unoptimized
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] via-transparent to-transparent opacity-80" />
                   
                   <div className="absolute top-6 left-6">
                      <div className="bg-[#001540]/80 backdrop-blur-md border border-[#B2904D]/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                          {getText(item.category)}
                      </div>
                   </div>
                   
                   <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-500">
                      <div className="w-20 h-20 rounded-full bg-[#B2904D]/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-[0_0_30px_rgba(178,144,77,0.6)]">
                          <Play fill="white" size={24} className="ml-1" />
                      </div>
                   </div>
                </div>

                {/* Info Card */}
                <div className="p-10 flex flex-col justify-between flex-grow relative z-10">
                   <div>
                     <h3 className="text-3xl font-thin text-white mb-3 group-hover:text-[#B2904D] transition-colors">
                       {item.name}
                     </h3>
                     <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-[#B2904D] fill-[#B2904D]" />
                        ))}
                     </div>
                     <p className="text-blue-100/80 text-base font-light italic line-clamp-2 leading-relaxed">
                       "{getText(item.quote)}"
                     </p>
                   </div>
                   
                   <div className="pt-6 flex items-center text-white/90 text-sm font-bold uppercase tracking-wider group/btn">
                      {texts.card.viewFullStory[language]}
                      <ArrowRight size={16} className="ml-2 text-[#B2904D] group-hover/btn:translate-x-2 transition-transform" />
                   </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedId && selectedTestimonial && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[#000a20]/90 backdrop-blur-xl"
            />
            <motion.div 
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-7xl h-[85vh] bg-[#001540] rounded-[32px] border border-[#B2904D]/30 shadow-[0_0_50px_rgba(178,144,77,0.2)] overflow-hidden flex flex-col lg:flex-row z-10"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-[#B2904D] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10"
              >
                <X size={24} />
              </button>
              <div className="w-full lg:w-2/3 h-full bg-black relative flex items-center justify-center">
                 <video 
                   ref={videoRef}
                   src={selectedTestimonial.video} 
                   className="w-full h-full object-contain bg-black"
                   controls
                   autoPlay
                   playsInline
                   poster={selectedTestimonial.image}
                 />
              </div>
              <div className="w-full lg:w-1/3 h-full bg-[#001540] p-12 flex flex-col relative overflow-y-auto border-l border-white/5">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                      <span className="inline-block text-sm font-bold text-[#B2904D] uppercase tracking-widest mb-4">{texts.modal.badge[language]}</span>
                      <h2 className="text-4xl md:text-5xl font-thin text-white mb-8 leading-tight">
                        {selectedTestimonial.name}
                      </h2>
                      <div className="relative pl-6 border-l-4 border-[#B2904D] mb-10 bg-white/5 p-6 rounded-r-2xl">
                         <p className="text-xl italic text-blue-50 font-light leading-relaxed">
                           "{getText(selectedTestimonial.quote)}"
                         </p>
                      </div>
                      <div className="mb-12">
                        <p className="text-blue-100/80 text-lg leading-relaxed font-light">
                           {getText(selectedTestimonial.story)}
                        </p>
                      </div>
                      <div className="mt-auto">
                         <a href="#contacto" onClick={() => setSelectedId(null)} className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#B2904D] text-[#001540] font-bold text-lg shadow-[0_0_30px_rgba(178,144,77,0.5)] hover:bg-white hover:text-[#001540] transition-colors duration-300">
                            <MessageSquare size={20} />
                            {texts.modal.button[language]}
                         </a>
                      </div>
                  </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- FORMULARIO SECTION (SACO DEL CONTENEDOR, STRETCHED) --- */}
      <section id="contacto" className="relative py-20 z-10 w-full">
         <div className="container mx-auto px-4 lg:px-12">
            
            {/* Formulario directo, sin título Inicie su Consulta, sin contenedor de fondo */}
            <div className="text-white w-full">
               <ContactForm />
            </div>

         </div>
      </section>

      <Footer />
    </div>
  );
}