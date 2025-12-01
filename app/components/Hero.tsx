'use client'

import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Outfit } from 'next/font/google';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500'] 
})

const associations = [
  { name: 'American Bar Association', logo: 'https://3cbymunqi03dlsyk.public.blob.vercel-storage.com/ABA.png' },
  { name: 'Rama Judicial de Puerto Rico', logo: 'https://3cbymunqi03dlsyk.public.blob.vercel-storage.com/puertorico.png' },
  { name: 'State Bar of New Mexico', logo: 'https://3cbymunqi03dlsyk.public.blob.vercel-storage.com/sts-br-nm.png' },
  { name: 'Illinois State Bar Association', logo: 'https://3cbymunqi03dlsyk.public.blob.vercel-storage.com/isba.png' },
  { name: 'The Chicago Bar Association', logo: 'https://3cbymunqi03dlsyk.public.blob.vercel-storage.com/CBA-A.png' },
];

export default function HeroProfessional() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 40 });
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 40 });

  const textRevealVariant = {
    hidden: { y: "100%", rotateX: -20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0, rotateX: 0, opacity: 1,
      transition: { 
        duration: 1.2, 
        delay: custom * 0.15, 
        ease: [0.25, 1, 0.5, 1] as const // Corrección TypeScript aplicada
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      // CAMBIOS DE ESPACIADO: pt-36 lg:pt-44 para bajar todo
      className={`relative min-h-screen w-full flex flex-col justify-center bg-[#001540] overflow-hidden ${font.className} pt-36 lg:pt-44 pb-32`}
    >
      {/* 1. FONDO ATMOSFÉRICO (Azul Marino Profundo) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradiente radial más rico */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        
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
        {/* Volvemos al layout 5-7 */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* --- IZQUIERDA: IMAGEN (Cols 5) --- */}
          <motion.div 
            style={{ x, y }} 
            className="lg:col-span-5 relative h-[500px] lg:h-[750px] flex items-end justify-center perspective-[1000px]"
          >
             {/* Glow azul intenso detrás */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-3xl rounded-full z-0 opacity-80" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50, rotateY: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10 w-full h-full"
            >
               {/* ANIMACIÓN DE FLOTACIÓN SUAVE (Breathing effect) */}
               <motion.div
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="relative w-full h-full"
               >
                 <Image
                   src="/abogado-manuel-solis.png"
                   alt="Abogado Manuel Solis"
                   fill
                   className="object-contain object-bottom drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
                   priority
                 />
               </motion.div>
            </motion.div>
          </motion.div>


          {/* --- DERECHA: TEXTO (Cols 7) --- */}
          <div className="lg:col-span-7 space-y-12 pl-0 lg:pl-12 relative z-20">
            
            <motion.div 
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-sky-500/30 to-transparent origin-top hidden lg:block" 
            />

            <div className="relative">
              <h1 className="text-5xl md:text-6xl lg:text-[6rem] leading-[0.9] font-thin text-white tracking-tight">
                <span className="block overflow-hidden pb-2 perspective-[400px]">
                  <motion.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                    {language === 'es' ? 'Abogados de' : 'Attorneys for'}
                  </motion.span>
                </span>
                
                {/* --- EFECTO WOW: RAYO DE LUZ (Inmigración) --- */}
                <span className="block overflow-hidden pb-2 perspective-[400px]">
                  <motion.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-medium relative w-fit">
                    <span className="text-white drop-shadow-2xl">
                      {language === 'es' ? 'Inmigración' : 'Immigration'}
                    </span>
                    {/* El rayo de luz */}
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] bg-clip-text text-transparent mix-blend-color-dodge pointer-events-none"
                      animate={{ backgroundPosition: ["-150% 0", "150% 0"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                    >
                      {language === 'es' ? 'Inmigración' : 'Immigration'}
                    </motion.span>
                  </motion.span>
                </span>
                
                {/* --- EFECTO WOW: RAYO DE LUZ (& Accidentes) --- */}
                <span className="block overflow-hidden perspective-[400px]">
                  <motion.div custom={2} variants={textRevealVariant} initial="hidden" animate="visible" className="flex items-center gap-4 relative">
                    <span className="text-3xl md:text-5xl font-thin text-sky-400/60 align-middle">&</span>
                    <span className="font-light relative w-fit">
                        <span className="text-white drop-shadow-2xl">
                          {language === 'es' ? 'Accidentes' : 'Accidents'}
                        </span>
                        {/* El rayo de luz */}
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
               <span className="text-white font-normal">Manuel Solis</span>. 
               {t.hero?.description || (language === 'es' ? ' Décadas de experiencia luchando por los derechos de nuestra comunidad.' : ' Decades of experience fighting for the rights of our community.')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-16 pt-8 pl-4"
            >
              <div className="group">
                <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50 group-hover:to-sky-400 transition-all duration-500">
                  <span className="text-5xl lg:text-6xl font-extralight tracking-tighter">50,000</span>
                  <span className="text-4xl font-thin text-sky-400 ml-1 group-hover:rotate-12 transition-transform">+</span>
                </div>
                <p className="text-xs text-white/50 uppercase tracking-[0.3em] mt-2 font-medium group-hover:text-white/80 transition-colors">
                  {language === 'es' ? 'Casos Ganados' : 'Cases Won'}
                </p>
              </div>

              <div className="group">
                <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50 group-hover:to-sky-400 transition-all duration-500">
                  <span className="text-5xl lg:text-6xl font-extralight tracking-tighter">35</span>
                  <span className="text-4xl font-thin text-sky-400 ml-1 group-hover:rotate-12 transition-transform">+</span>
                </div>
                <p className="text-xs text-white/50 uppercase tracking-[0.3em] mt-2 font-medium group-hover:text-white/80 transition-colors">
                  {language === 'es' ? 'Años de Experiencia' : 'Years Experience'}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* FOOTER: MARQUEE ASOCIACIONES (REGRESO ABAJO, LENTO Y LIMPIO) */}
      {/* Separado del contenido principal con margin-top implícito por el layout */}
      <div className="absolute bottom-0 left-0 right-0 z-30 w-full border-t border-white/5 bg-transparent pt-8 pb-8">
        <div className="relative w-full overflow-hidden mask-linear-fade">
           {/* Máscaras laterales para suavizar la entrada/salida */}
           <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#001540] to-transparent z-20" />
           <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#001540] to-transparent z-20" />
           
           <motion.div 
             className="flex items-center gap-32 whitespace-nowrap pl-16" // GAP-32 para buena separación
             // Velocidad muy lenta (duration: 60)
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
           >
             {[...associations, ...associations, ...associations].map((assoc, idx) => (
               <div key={idx} className="flex items-center justify-center group opacity-40 hover:opacity-100 transition-opacity duration-500">
                  <div className="relative h-20 w-auto flex-shrink-0 filter grayscale brightness-[1.5] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500">
                     <Image 
                        src={assoc.logo} 
                        alt={assoc.name} 
                        height={80} // Altura ajustada
                        width={180} 
                        className="h-full w-auto object-contain drop-shadow-lg"
                     />
                  </div>
               </div>
             ))}
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