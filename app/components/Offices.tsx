'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Globe, Navigation, Scale, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { Outfit } from 'next/font/google';

// --- CONFIGURACIÓN DE FUENTE & ESTILOS ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700'] 
});

// --- COLORES DE LA PALETA ---
const PRIMARY_COLOR_DARK = '#001540';
const ACCENT_COLOR_GOLD = '#B2904D';
const LIGHT_BLUE_ACCENT = '#38bdf8'; // sky-400

// Función auxiliar para mapas
const generateMapUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

// --- TIPOS DE DATOS ---
type OfficeData = {
  id: string; 
  city: string;
  state: string; 
  title: { es: string; en: string }; 
  quote: { es: string; en: string }; 
  description: { es: string; en: string }; 
  address: string;
  phone: string;
  email: string;
  hours: { es: string; en: string };
  mapLink: string;
  image: string;
  services: { es: string; en: string }[];
};

// --- DATOS COMPLETOS (IMÁGENES ACTUALIZADAS A .PNG) ---
const officesData: OfficeData[] = [
  {
    id: 'houston-principal',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Houston', en: 'Houston' },
    quote: { es: 'El centro neurálgico de nuestra firma.', en: 'The nerve center of our firm.' },
    description: { es: 'Nuestras oficinas de Houston en Navigation Boulevard son las primeras que abrimos hace más de 30 años. Aquí recibimos a más de 200 clientes a la semana.', en: 'Our Houston offices on Navigation Boulevard were the first we opened more than 30 years ago. Here we receive over 200 clients a week.' },
    address: '6657 Navigation Blvd, Houston, Texas 77011',
    phone: '(713) 701-1731',
    email: 'houston@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 7pm | Sáb 9am - 4pm', en: 'Mon - Fri 9am - 7pm | Sat 9am - 4pm' },
    mapLink: generateMapUrl('6657 Navigation Blvd, Houston, Texas 77011'),
    image: '/offices/Houston.png',
    services: [ { es: 'ACCIDENTES', en: 'ACCIDENTS' }, { es: 'INMIGRACIÓN', en: 'IMMIGRATION' }, { es: 'CRIMINAL', en: 'CRIMINAL' } ],
  },
  {
    id: 'harlingen',
    city: 'Harlingen',
    state: 'TX',
    title: { es: 'Harlingen', en: 'Harlingen' },
    quote: { es: 'Conexión directa con la frontera.', en: 'Direct connection with the border.' },
    description: { es: 'Especializados en defensa de deportación y casos de asilo en la zona de la frontera sur.', en: 'Specializing in deportation defense and asylum cases in the southern border area.' },
    address: '320 E. Jackson St., Harlingen, Texas 78550',
    phone: '(956) 597-7090',
    email: 'harlingen@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('320 E. Jackson St., Harlingen, Texas 78550'),
    image: '/offices/Harlingen.png',
    services: [ { es: 'INMIGRACIÓN', en: 'IMMIGRATION' }, { es: 'DEPORTACIÓN', en: 'DEPORTATION' } ],
  },
  {
    id: 'houston-bellaire',
    city: 'Houston Bellaire',
    state: 'TX',
    title: { es: 'Houston Bellaire', en: 'Houston Bellaire' },
    quote: { es: 'Asistencia especializada en el oeste.', en: 'Specialized assistance in the west.' },
    description: { 
        es: 'Nuestra ubicación en Bellaire ofrece servicios con personal bilingüe en inglés, español y chino para atender a la diversa población.', 
        en: 'Our Bellaire location offers services with bilingual staff in English, Spanish, and Chinese to serve the diverse population.' 
    }, 
    address: '9600 Bellaire Blvd, Suite 237, Houston, TX 77036',
    phone: '(713) 701-1731',
    email: 'bellaire@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('9600 Bellaire Blvd, Suite 237, Houston, TX 77036'),
    image: '/offices/Houston.png',
    services: [ { es: 'INMIGRACIÓN', en: 'IMMIGRATION' }, { es: 'FAMILIA', en: 'FAMILY' } ],
  },
  {
    id: 'dallas',
    city: 'Dallas',
    state: 'TX',
    title: { es: 'Dallas', en: 'Dallas' },
    quote: { es: 'Servicio ininterrumpido para usted.', en: 'Uninterrupted service for you.' },
    description: { es: 'En el corazón de Dallas, nuestras puertas están abiertas seis días a la semana. Un refugio legal para la comunidad del norte de Texas.', en: 'In the heart of Dallas, our doors are open six days a week. A legal haven for the North Texas community.' },
    address: '1120 Empire Central place, Dallas, Texas 75247',
    phone: '(214) 753-8315',
    email: 'dallas@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 8am - 3pm', en: 'Mon - Fri 9am - 6pm | Sat 8am - 3pm' },
    mapLink: generateMapUrl('1120 Empire Central place, Dallas, Texas 75247'),
    image: '/offices/Dallas.png',
    services: [{ es: 'INMIGRACIÓN', en: 'IMMIGRATION' }, { es: 'SEGUROS', en: 'INSURANCE' }],
  },
  {
    id: 'el-paso',
    city: 'El Paso',
    state: 'TX',
    title: { es: 'El Paso', en: 'El Paso' },
    quote: { es: 'Luchando en la línea de batalla.', en: 'Fighting on the front line.' },
    description: { es: 'Sirviendo a la comunidad de El Paso y Juarez con pasión y experiencia en la ley de inmigración.', en: 'Serving the El Paso and Juarez community with passion and experience in immigration law.' },
    address: '3632 Admiral Street, El Paso, Texas 79925',
    phone: '(915) 233-7127',
    email: 'elpaso@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 5pm', en: 'Mon - Fri 9am - 5pm' },
    mapLink: generateMapUrl('3632 Admiral Street, El Paso, Texas 79925'),
    image: '/offices/El paso.png',
    services: [{ es: 'INMIGRACIÓN', en: 'IMMIGRATION' }, { es: 'CRIMINAL', en: 'CRIMINAL' }],
  },
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    state: 'CA',
    title: { es: 'Los Angeles', en: 'Los Angeles' },
    quote: { es: 'Defensa sin fronteras.', en: 'Defense without borders.' },
    description: { es: 'Desde Pico Rivera servimos a toda California. Especialistas en casos complejos de deportación y visas de trabajo.', en: 'Serving all of California from Pico Rivera. Specialists in complex deportation cases and work visas.' },
    address: '8337 Telegraph Rd, Unit 115, Pico Rivera, California 90660',
    phone: '(213) 784-1554',
    email: 'losangeles@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 8am - 2pm', en: 'Mon - Fri 9am - 6pm | Sat 8am - 2pm' },
    mapLink: generateMapUrl('8337 Telegraph Rd, Unit 115, Pico Rivera, California 90660'),
    image: '/offices/Los Angeles.png',
    services: [{ es: 'INMIGRACIÓN', en: 'IMMIGRATION' }, { es: 'ACCIDENTES', en: 'ACCIDENTS' }],
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'IL',
    title: { es: 'Chicago', en: 'Chicago' }, 
    quote: { es: 'Justicia para el medio oeste.', en: 'Justice for the Midwest.' },
    description: { es: 'Atendemos casos de Inmigración, familia, criminal y accidentes en nuestro edificio propio en Cicero.', en: 'We handle Immigration, family, criminal, and accident cases in our own building in Cicero.' },
    address: '6000 West Cermak Road, Cicero, Illinois 60804',
    phone: '(312) 477-0389',
    email: 'chicago@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 8am - 4pm', en: 'Mon - Fri 9am - 6pm | Sat 8am - 4pm' },
    mapLink: generateMapUrl('6000 West Cermak Road, Cicero, Illinois 60804'),
    image: '/offices/Chicago.png',
    services: [{ es: 'CRIMINAL', en: 'CRIMINAL' }, { es: 'FAMILIA', en: 'FAMILY' }],
  },
  {
    id: 'denver',
    city: 'Denver',
    state: 'CO',
    title: { es: 'Denver', en: 'Denver' },
    quote: { es: 'Protección para Colorado.', en: 'Protection for Colorado.' },
    description: { es: 'Nuestra oficina en Denver extiende nuestros servicios al área de las Montañas Rocosas, enfocados en defensa migratoria.', en: 'Our Denver office extends our services to the Rocky Mountain area, focused on immigration defense.' },
    address: '5400 Ward Road, Building IV, Arvada, Colorado 80002',
    phone: '(720) 358-8973',
    email: 'denver@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('5400 Ward Road, Building IV, Arvada, Colorado 80002'),
    image: '/offices/Denver.png',
    services: [{ es: 'INMIGRACIÓN', en: 'IMMIGRATION' }, { es: 'ACCIDENTES', en: 'ACCIDENTS' }],
  },
  {
    id: 'memphis',
    city: 'Memphis',
    state: 'TN',
    title: { es: 'Memphis', en: 'Memphis' },
    quote: { es: 'Servicio en el corazón de Tennessee.', en: 'Service in the heart of Tennessee.' },
    description: { es: 'Desde Memphis, servimos a la comunidad en Tennessee y estados circundantes, ofreciendo experiencia en casos de lesiones personales.', en: 'From Memphis, we serve the community in Tennessee and surrounding states, offering expertise in personal injury cases.' },
    address: '3385 Airways Boulevard, Suite 320, Memphis, Tennessee 38116',
    phone: '(901) 557-8357',
    email: 'memphis@manuelsolis.com',
    hours: { es: 'Lun - Vie 9am - 5pm', en: 'Mon - Fri 9am - 5pm' },
    mapLink: generateMapUrl('3385 Airways Boulevard, Suite 320, Memphis, Tennessee 38116'),
    image: '/offices/Memphis.png',
    services: [{ es: 'ACCIDENTES', en: 'ACCIDENTS' }, { es: 'SEGUROS', en: 'INSURANCE' }],
  },
].sort((a, b) => a.city.localeCompare(b.city)).map(office => ({
    ...office,
    id: office.id || office.city.toLowerCase().replace(/\s/g, '-')
}));

// --- MINI COMPONENTE: ACCIÓN HUD ---
const ActionHUD = ({ label, value, icon: Icon, href }: { label: string, value: string, icon: React.ElementType, href: string }) => {
    const isExternal = href.startsWith('http') || href.startsWith('tel') || href.startsWith('mailto');
    
    return (
      <a 
        href={href}
        target={isExternal && !href.startsWith('tel') && !href.startsWith('mailto') ? "_blank" : undefined}
        rel={isExternal && !href.startsWith('tel') && !href.startsWith('mailto') ? "noopener noreferrer" : undefined}
        className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#B2904D]/10 transition-all duration-300 group relative overflow-hidden"
        style={{ transitionProperty: 'background-color, transform' }}
      >
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[10px] text-blue-300/60 font-bold uppercase tracking-widest mb-1 group-hover:text-[#B2904D] transition-colors">
              {label}
            </p>
            {['tel', 'mailto'].some(prefix => href.startsWith(prefix)) ? (
                <p className="text-white font-bold text-sm group-hover:text-white transition-colors">{value}</p>
            ) : (
                <p className="text-white font-medium text-sm group-hover:text-white transition-colors">{value}</p>
            )}
          </div>
          <Icon size={18} className="text-[#B2904D] group-hover:text-white transition-colors" />
        </div>
      </a>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function FuturisticOffices() {
  const { language } = useLanguage(); 
  const lang = language as 'es' | 'en';
  
  const [activeId, setActiveId] = useState(officesData[0].id);
  const activeOffice = officesData.find(o => o.id === activeId) || officesData[0];
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  // --- LÓGICA DE STATUS ---
  useEffect(() => {
    const checkTime = () => {
        const now = new Date();
        const hour = now.getHours();
        // Abierto de 9 AM (9) a 7 PM (19)
        if (hour >= 9 && hour < 19) {
            setIsOfficeOpen(true);
        } else {
            setIsOfficeOpen(false);
        }
    };
    checkTime();
    const interval = setInterval(checkTime, 60000); // Revisar cada minuto
    return () => clearInterval(interval);
  }, []);

  // --- PARALLAX 3D EFFECT VARIABLES ---
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const gT = (obj: any) => obj[lang] || obj.es;

  return (
    <section 
      id="oficinas"
      className={`relative py-32 lg:py-40 w-full min-h-screen bg-[${PRIMARY_COLOR_DARK}] overflow-hidden ${font.className} selection:bg-[${ACCENT_COLOR_GOLD}] selection:text-[${PRIMARY_COLOR_DARK}]`}
    >
      {/* 1. FONDO ATMOSFÉRICO ACTIVO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradiente de profundidad */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/50 via-[${PRIMARY_COLOR_DARK}] to-[#000a20]`} />
        
        {/* Orbes flotantes */}
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-[${ACCENT_COLOR_GOLD}]/5 rounded-full blur-[150px] mix-blend-screen`}
        />
        {/* Textura de ruido */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>

      {/* --- MÁSCARAS ESTILO ESCALÓN (Negro Degradado) --- */}
      {/* Arriba */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />
      {/* Abajo */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />


      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* HEADER: TÍTULO */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(178,144,77,0.1)]`}
          >
            <Globe size={14} className={`text-[${ACCENT_COLOR_GOLD}]`} />
            <span className="text-xs font-bold tracking-[0.3em] text-blue-100 uppercase">
              {language === 'es' ? 'Nueve Puntos de Misión' : 'Nine Mission Points'}
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-thin text-white tracking-tight leading-none">
            {language === 'es' ? 'Centro de' : 'Global'} <span className={`font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-[${ACCENT_COLOR_GOLD}] to-white`}>{language === 'es' ? 'Comando Global' : 'Command Center'}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 min-h-[700px]">
          
          {/* --- LATERAL: MENÚ HOLOGRÁFICO (COL 3) --- */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="text-xs font-bold text-blue-300/50 uppercase tracking-widest pl-2 mb-2 flex items-center gap-2">
              <Navigation size={12} /> {language === 'es' ? 'Acceso Rápido' : 'Quick Access'}
            </div>
            
            <div className="flex flex-col gap-2 relative">
               {/* Línea decorativa vertical */}
               <div className="absolute left-[18px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

               {officesData.map((office) => {
                 const isActive = activeId === office.id;
                 const stateCode = office.state;

                 return (
                   <motion.button
                     key={office.id}
                     onClick={() => setActiveId(office.id)}
                     className={`group relative pl-10 pr-6 py-4 rounded-r-xl rounded-l-sm text-left transition-all duration-500 overflow-hidden flex justify-between items-center
                       ${isActive ? 'bg-gradient-to-r from-white/10 to-transparent' : 'hover:bg-white/5'}
                     `}
                     whileHover={{ x: isActive ? 0 : 5 }}
                   >
                     {/* Marcador activo animado */}
                     {isActive && (
                       <motion.div 
                         layoutId="activeGlow"
                         className={`absolute left-0 top-0 bottom-0 w-1 bg-[${ACCENT_COLOR_GOLD}] shadow-[0_0_15px_rgba(178,144,77,0.5)] rounded-full`}
                       />
                     )}

                     {/* Dot inactivo */}
                     {!isActive && (
                        <div className="absolute left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors" />
                     )}
                     
                     <div className="relative z-10">
                       <span className={`block text-xl font-serif leading-none transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-200/50 group-hover:text-blue-100'}`}>
                         {office.city}
                       </span>
                     </div>
                     
                     <span className={`text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full ${isActive ? `bg-[${ACCENT_COLOR_GOLD}] text-[${PRIMARY_COLOR_DARK}]` : 'bg-blue-900/40 text-blue-300/60'}`}>
                        {stateCode}
                     </span>
                   </motion.button>
                 );
               })}
            </div>
          </div>

          {/* --- CENTRAL: DATA VISUALIZER (3D CARD - COL 9) --- */}
          <div className="lg:col-span-9 perspective-[2000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOffice.id}
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className={`relative h-full bg-[#000a20]/80 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col`}
              >
                
                {/* 1. TOP SECTION (Media + Title) */}
                <div className="relative h-[350px] w-full bg-black group overflow-hidden">
                   
                   {/* Imagen de fondo con efecto de foco */}
                   <Image 
                     src={activeOffice.image} 
                     alt={activeOffice.city} 
                     fill 
                     className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] via-transparent to-transparent opacity-90" />
                   
                   {/* HUD TOP CORNER: STATUS (ACTIVO / OFFLINE) */}
                   <div className="absolute top-6 right-6 z-20 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                        <p className={`text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 ${isOfficeOpen ? 'text-green-400' : 'text-red-400'}`}>
                            STATUS 
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOfficeOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                        </p>
                        <motion.p 
                            className="text-white text-lg font-mono mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <motion.span 
                                animate={{ opacity: [0.5, 1, 0.5] }} 
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className={`text-[${LIGHT_BLUE_ACCENT}]`}
                            >
                                [ {activeOffice.state} ]
                            </motion.span>
                             {' '} {isOfficeOpen ? 'ACTIVE' : 'OFFLINE'}
                        </motion.p>
                   </div>
                   
                   {/* MAIN TITLE */}
                   <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-20">
                     <h3 className="text-4xl md:text-5xl font-serif font-medium text-white mb-2 leading-tight">
                       {gT(activeOffice.title)}
                     </h3>
                     <p className={`text-[${ACCENT_COLOR_GOLD}] font-light italic text-lg`}>
                       "{gT(activeOffice.quote)}"
                     </p>
                   </div>
                </div>

                {/* 2. INFO DASHBOARD (Main Content) */}
                <div className="p-8 lg:p-12 flex flex-col gap-10">
                   
                   {/* DESCRIPTION & SERVICES GRID */}
                   <div className="grid lg:grid-cols-3 gap-8 border-b border-white/10 pb-8">
                     <div className="lg:col-span-2">
                       <h4 className="text-xl font-thin text-white mb-3">{language === 'es' ? 'Contexto de Operación' : 'Operation Context'}</h4>
                       <p className="text-blue-100/70 text-base leading-relaxed text-justify border-l-2 border-white/10 pl-4">
                         {gT(activeOffice.description)}
                       </p>
                     </div>

                     <div className={`bg-white/5 rounded-2xl p-6 border border-white/10`}>
                         <h4 className={`text-white font-bold text-sm mb-4 uppercase tracking-widest flex items-center gap-2`}>
                            <Scale size={14} className={`text-[${ACCENT_COLOR_GOLD}]`} /> {language === 'es' ? 'Áreas Legales' : 'Legal Sectors'}
                         </h4>
                         <ul className="space-y-3">
                             {activeOffice.services.map((service, idx) => (
                                 <motion.li 
                                   key={idx} 
                                   initial={{ opacity: 0, x: -10 }} 
                                   animate={{ opacity: 1, x: 0 }} 
                                   transition={{ duration: 0.3, delay: 0.1 * idx }}
                                   className="flex items-center gap-2 text-blue-100/80 text-sm"
                                 >
                                     <ArrowUpRight size={14} className={`text-[${LIGHT_BLUE_ACCENT}]`} />
                                     {gT(service)}
                                 </motion.li>
                             ))}
                         </ul>
                     </div>
                   </div>
                   
                   {/* CONTACT ACTIONS GRID (The HUD) */}
                   <div className="space-y-6">
                     <h4 className="text-xl font-thin text-white mb-4 flex items-center gap-3">
                         <motion.div 
                           animate={{ rotate: [0, 360] }}
                           transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                           className={`w-4 h-4 rounded-full border border-dashed border-[${ACCENT_COLOR_GOLD}]`}
                         />
                         <span className={`text-[${ACCENT_COLOR_GOLD}] font-medium`}>{language === 'es' ? 'Protocolo' : 'Protocol'}</span> {language === 'es' ? 'de Acceso' : 'Access'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         {/* Los enlaces están configurados para llamar, enviar email o ir al mapa */}
                         <ActionHUD label={language === 'es' ? 'Ubicación' : 'Location Grid'} value={activeOffice.address} icon={MapPin} href={activeOffice.mapLink} />
                         <ActionHUD label={language === 'es' ? 'Línea Directa' : 'Direct Line'} value={activeOffice.phone} icon={Phone} href={`tel:${activeOffice.phone.replace(/[^0-9]/g, '')}`} />
                         <ActionHUD label={language === 'es' ? 'Canal Email' : 'Email Channel'} value={activeOffice.email} icon={Mail} href={`mailto:${activeOffice.email}`} />
                         <ActionHUD label={language === 'es' ? 'Horario Operativo' : 'Operating Hours'} value={gT(activeOffice.hours)} icon={Clock} href="#" />
                      </div>
                   </div>
                   
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}