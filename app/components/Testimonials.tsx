'use client'

import { useState, useRef, useEffect } from 'react'
import { Star, Play, X } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { Outfit } from 'next/font/google'

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600'] 
})

interface VideoModalProps {
  videoId: string;
  onClose: () => void;
}

const FALLBACK_THUMBNAIL = '/testimonials/Residencia_Octavio.png';

const testimonials = [
  {
    id: 1,
    name: 'Octavio Varela',
    case: 'Residencia Permanente',
    rating: 5,
    comment: 'Feliz, sentí que todo lo que perdí cuando ingresé al país, se me devolvió y con un regalo',
    videoThumbnail: FALLBACK_THUMBNAIL, 
    videoId: 'cTJ9M5PT-S4', 
  },
]

// --- COMPONENTE MODAL ---
function VideoModal({ videoId, onClose }: VideoModalProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000a20]/95 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl aspect-video rounded-3xl shadow-2xl overflow-hidden bg-black border border-white/10" 
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 group"
          aria-label="Cerrar video"
        >
          <div className="p-3 bg-white/10 hover:bg-[#B2904D] backdrop-blur-md rounded-full text-white transition-all duration-300">
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </div>
        </button>

        <iframe
          src={embedUrl}
          title="Testimonio de Cliente"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </motion.div>
    </motion.div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function Testimonials() {
  const { language } = useLanguage();
  const current = testimonials[0]; 
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef(null);

  // --- 1. LÓGICA DE MOVIMIENTO DE MOUSE (Magnetic Effect) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  const xVideo = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 40, damping: 20 });
  const yVideo = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 40, damping: 20 });
  
  const xText = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), { stiffness: 40, damping: 20 });
  const yText = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 40, damping: 20 });

  // --- 2. LÓGICA DE SCROLL PARALLAX ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]); // Fondo se mueve lento
  const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]); // Contenido se mueve contra scroll

  return (
    <section 
        id="testimonios" 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`relative min-h-screen flex flex-col justify-center w-full bg-[#001540] overflow-hidden ${font.className} py-32 lg:py-0`}
    >
      {/* --- FONDO VIVO (WOW FACTOR) --- */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        {/* Fondo Base */}
        <div className="absolute inset-0 bg-[#001540]" />
        
        {/* Orbe 1: Gigante y Respirando (Azul Eléctrico) */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.3, 0.5, 0.3],
                x: [0, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[180px]" 
        />

        {/* Orbe 2: Dorado sutil moviéndose en contra */}
        <motion.div 
            animate={{ 
                scale: [1, 1.3, 1], 
                opacity: [0.1, 0.2, 0.1],
                x: [0, -50, 0],
                y: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#B2904D]/10 rounded-full blur-[200px]" 
        />
        
        {/* Partículas flotantes (Generadas dinámicamente o simuladas) */}
        <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay"></div>
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div 
            style={{ y: yContent }} 
            className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center"
        >
            
            {/* --- COLUMNA VIDEO (IZQUIERDA) --- */}
            {/* Movimiento magnético + Flotación constante */}
            <motion.div 
                style={{ x: xVideo, y: yVideo }}
                className="lg:col-span-7 relative"
            >
                {/* Decoración de círculo giratorio detrás */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-10 border border-white/5 rounded-full z-0 border-dashed opacity-50 hidden lg:block"
                />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 group perspective-[1000px]"
                >
                    {/* Tarjeta de Video con efecto Glassmorphism 3D */}
                    <div 
                        onClick={() => setIsVideoOpen(true)}
                        className="relative w-full aspect-video rounded-[2rem] overflow-hidden 
                                   border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl 
                                   cursor-pointer group-hover:shadow-[#B2904D]/20 group-hover:border-[#B2904D]/40
                                   transition-all duration-500 transform-gpu"
                    >
                        {/* Imagen con Zoom suave */}
                        <Image
                            src={current.videoThumbnail}
                            alt={current.name}
                            fill
                            className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                        
                        {/* Overlay cinematográfico */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-[#001540]/20 to-transparent opacity-80" />

                        {/* Botón Play "Wow" */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative flex items-center justify-center">
                                {/* Ondas expansivas */}
                                <motion.div 
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute w-20 h-20 bg-white/20 rounded-full"
                                />
                                <motion.div 
                                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                    className="absolute w-20 h-20 bg-white/20 rounded-full"
                                />
                                
                                {/* El botón real */}
                                <div className="relative w-24 h-24 bg-[#B2904D]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                                    <Play className="w-10 h-10 text-white ml-1 fill-white" />
                                </div>
                            </div>
                        </div>

                        {/* Texto flotante dentro del video */}
                        <div className="absolute bottom-8 left-8 z-20">
                             <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Historia de Éxito</p>
                             <p className="text-white text-xl font-medium">{current.name}</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>


            {/* --- COLUMNA TEXTO (DERECHA) --- */}
            <motion.div 
                style={{ x: xText, y: yText }}
                className="lg:col-span-5 relative space-y-12"
            >
                 {/* Título de Sección integrado aquí para flujo */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                 >
                     <div className="flex items-center gap-4 mb-6">
                        <span className="h-[1px] w-12 bg-[#B2904D]"></span>
                        <span className="text-[#B2904D] uppercase tracking-[0.2em] text-sm font-semibold">Testimonios</span>
                     </div>
                     <h2 className="text-5xl lg:text-7xl font-thin text-white leading-none">
                        Stories <br />
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
                           of Impact
                        </span>
                     </h2>
                 </motion.div>

                 {/* Cita Principal */}
                 <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative"
                 >
                    {/* Comillas gigantes de fondo */}
                    <span className="absolute -top-12 -left-8 text-9xl text-white/5 font-serif">“</span>
                    
                    <p className="text-2xl lg:text-3xl font-light text-white leading-relaxed relative z-10">
                       {current.comment}
                    </p>
                 </motion.div>

                 {/* Detalles y Estrellas */}
                 <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-4"
                 >
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                           >
                              <Star className="w-6 h-6 fill-[#B2904D] text-[#B2904D]" />
                           </motion.div>
                        ))}
                    </div>
                    <div>
                        <p className="text-white text-lg">{current.case}</p>
                        <p className="text-blue-300/60 text-sm">Cliente Verificado</p>
                    </div>
                 </motion.div>

            </motion.div>

        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && <VideoModal videoId={current.videoId} onClose={() => setIsVideoOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}