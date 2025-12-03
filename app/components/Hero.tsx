'use client'

import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Outfit } from 'next/font/google';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '800', '900'] 
})

const associations = [
  { name: 'Chicago Bar Association', logo: '/state-bar/Chicago-bar.png' },
  { name: 'Illinois State Bar Association', logo: '/state-bar/illinois-bar.png' },
  { name: 'State Bar of New Mexico', logo: '/state-bar/nm-state.png' },
  { name: 'American Bar Association', logo: '/state-bar/aba-state.png' },
  { name: 'Rama Judicial de Puerto Rico', logo: '/state-bar/pr-state.png' },
  { name: 'CD State Bar', logo: '/state-bar/cd-state.png' },
];

export default function HeroProfessional() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);

  const textRevealVariant = {
    hidden: { y: "100%", rotateX: -20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0, rotateX: 0, opacity: 1,
      transition: { 
        duration: 1.2, 
        delay: custom * 0.15, 
        ease: [0.25, 1, 0.5, 1] as const 
      }
    })
  };

  // Función para obtener el tamaño correcto según el logo
  const getLogoSize = (logoName: string) => {
    if (logoName.includes('aba-state')) {
      return { height: 80, width: 180, containerHeight: 'h-20' };
    }
    if (logoName.includes('illinois-bar') || logoName.includes('nm-state')) {
      return { height: 140, width: 280, containerHeight: 'h-32' };
    }
    if (logoName.includes('Chicago-bar')) {
      return { height: 130, width: 250, containerHeight: 'h-30' };
    }
    return { height: 120, width: 240, containerHeight: 'h-28' };
  };

  // Función para obtener margen adicional antes de ciertos logos
  const getExtraMargin = (logoName: string) => {
    if (logoName.includes('illinois-bar')) {
      return 'ml-16';
    }
    if (logoName.includes('nm-state')) {
      return 'ml-36';
    }
    if (logoName.includes('aba-state')) {
      return 'ml-20'; // Juntar más ABA con NM
    }
    if (logoName.includes('pr-state')) {
      return 'ml-20';
    }
    return '';
  };

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col justify-center bg-[#001540] overflow-hidden ${font.className} pt-36 lg:pt-44 pb-64`}
    >
      {/* 1. FONDO ATMOSFÉRICO */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        
        {/* --- 2. FONDO DE LA "N" GIGANTE --- */}
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

        {/* Luces ambientales */}
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

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex-grow flex flex-col justify-center">
        {/* Layout Principal */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* --- IZQUIERDA: IMAGEN (Cols 5) --- */}
          <motion.div 
            className="lg:col-span-5 relative h-[500px] lg:h-[750px] flex items-end justify-center perspective-[1000px]"
          >
            {/* Glow azul intenso detrás */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-3xl rounded-full z-0 opacity-80" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50, rotateY: 5, x: 0 }}
              animate={{ opacity: 1, scale: 1.75, y: -80, x: -90, rotateY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10 w-full h-full origin-bottom"
            >
               {/* Imagen FIJA */}
               <div className="relative w-full h-full">
                 <Image
                   src="/manuelsolisl.png"
                   alt="Abogado Manuel Solis"
                   fill
                   className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                   priority
                 />
               </div>
            </motion.div>

            {/* --- CUADRO FLOTANTE: 35+ AÑOS --- */}
            <motion.div
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-10 right-[-20px] z-40 p-6 border border-white/10 rounded-xl backdrop-blur-md bg-white/5 shadow-2xl text-right min-w-[180px]"
            >
                <div className="group">
                  <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50 justify-end">
                    <span className="text-5xl font-extralight tracking-tighter">35</span> 
                    <span className="text-4xl font-thin text-[#B2904D] ml-1 group-hover:rotate-12 transition-transform">+</span>
                  </div>
                  <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                    {language === 'es' ? 'Años de Experiencia' : 'Years Experience'}
                  </p>
                </div>
            </motion.div>
          </motion.div>


          {/* --- DERECHA: TEXTO (Cols 7) --- */}
          <div className="lg:col-span-7 space-y-12 pl-0 lg:pl-48 relative z-20 -mt-20">
            
            <motion.div 
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute left-20 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-sky-500/30 to-transparent origin-top hidden lg:block" 
            />

            <div className="relative">
              <h1 className="text-5xl md:text-6xl lg:text-[6rem] leading-[0.9] font-thin text-white tracking-tight">
                <span className="block overflow-hidden pb-2 perspective-[400px]">
                  <motion.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                    {language === 'es' ? 'Abogados de' : 'Attorneys for'}
                  </motion.span>
                </span>
                
                {/* --- Inmigración (Dorado) --- */}
                <span className="block overflow-hidden pb-4 pr-4 perspective-[400px]">
                  {/* CORRECCIÓN: Se agregó 'pr-6' (padding-right-6) AL ELEMENTO INTERNO (motion.span).
                     Esto fuerza a que el ancho del elemento sea mayor que el texto,
                     asegurando que la 'n' y su sombra queden dentro del área visible
                     y no sean cortadas por el overflow-hidden del padre.
                  */}
                  <motion.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-medium relative w-fit pr-6">
                    <span className="text-[#B2904D] drop-shadow-2xl">
                      {language === 'es' ? 'Inmigración' : 'Immigration'}
                    </span>
                    {/* Rayo de luz */}
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] bg-clip-text text-transparent mix-blend-color-dodge pointer-events-none"
                      animate={{ backgroundPosition: ["-150% 0", "150% 0"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                    >
                      {language === 'es' ? 'Inmigración' : 'Immigration'}
                    </motion.span>
                  </motion.span>
                </span>
                
                {/* --- & (Blanco) y Accidentes (Dorado) --- */}
                <span className="block overflow-hidden perspective-[400px]">
                  <motion.div custom={2} variants={textRevealVariant} initial="hidden" animate="visible" className="flex items-center gap-4 relative">
                    <span className="text-3xl md:text-5xl font-thin text-white align-middle">&</span>
                    <span className="font-light relative w-fit pr-6"> {/* También aplicado aquí por seguridad */}
                        <span className="text-[#B2904D] drop-shadow-2xl">
                          {language === 'es' ? 'Accidentes' : 'Accidents'}
                        </span>
                        {/* Rayo de luz */}
                        <motion.span 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] bg-clip-text text-transparent mix-blend-color-dodge pointer-events-none"
                          animate={{ backgroundPosition: ["-150% 0", "150% 0"] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2, delay: 0.5 }}
                        >
                          {language === 'es' ? 'Accidentes' : 'Accidents'}
                        </motion.span>
                    </span>
                  </motion.div>
                </span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl text-white/70 font-extralight max-w-lg leading-relaxed pl-4 border-l border-white/10"
            >
                <span className="text-white font-normal">Manuel Solis:</span> 
                {t.hero?.description || (language === 'es' ? ' Nuestros abogados de inmigración están aquí para asistirle. Somos la opción más confiable para resolver sus desafíos legales con éxito.' : ' Expert immigration attorneys here to assist you. We are the most reliable option to successfully resolve your legal challenges.')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-16 -mt-10 pl-4 drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
            >
              <div className="group">
                {/* 50,000 Grande */}
                <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50 group-hover:to-sky-400 transition-all duration-500">
                  <span className="text-7xl lg:text-9xl font-bold tracking-tighter">50,000</span>
                  <span className="text-5xl font-thin text-[#B2904D] ml-2 group-hover:rotate-12 transition-transform">+</span>
                </div>
                <p className="text-sm text-white/50 uppercase tracking-[0.3em] mt-2 font-medium group-hover:text-white/80 transition-colors">
                  {language === 'es' ? 'Casos Ganados' : 'Cases Won'}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* FOOTER: MARQUEE ASOCIACIONES */}
      <div className="absolute bottom-0 left-0 right-0 z-30 w-full border-t border-white/5 bg-transparent pt-24 pb-16">
        <div className="relative w-full overflow-hidden mask-linear-fade">
           <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#001540] to-transparent z-20" />
           <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#001540] to-transparent z-20" />
           
           <motion.div 
             className="flex items-center gap-80 whitespace-nowrap pl-16" 
             animate={{ x: ["0%", "-33.333%"] }}
             transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
           >
             {[...associations, ...associations, ...associations].map((assoc, idx) => {
               const size = getLogoSize(assoc.logo);
               const extraMargin = getExtraMargin(assoc.logo);
               
               return (
                 <div key={idx} className={`flex items-center justify-center group opacity-40 hover:opacity-100 transition-opacity duration-500 ${extraMargin}`}>
                   <div className={`relative ${size.containerHeight} w-auto flex-shrink-0 filter grayscale brightness-[1.5] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500`}>
                       <Image 
                         src={assoc.logo} 
                         alt={assoc.name} 
                         height={size.height} 
                         width={size.width} 
                         className="h-full w-auto object-contain drop-shadow-lg"
                       />
                   </div>
                 </div>
               );
             })}
           </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
}