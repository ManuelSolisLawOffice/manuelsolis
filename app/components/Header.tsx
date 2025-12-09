'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Outfit } from 'next/font/google'

// IMPORTANTE: Agregué pesos más gruesos (600, 700) para que el número grande se vea bien en bold.
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400', '500', '600', '700'] 
})

const FlagES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3 w-3 rounded-[1px] flex-shrink-0 opacity-90">
    <path fill="#AA151B" d="M0 0h512v512H0z"/>
    <path fill="#F1BF00" d="M0 128h512v256H0z"/>
  </svg>
);

const FlagUS = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3 w-3 rounded-[1px] flex-shrink-0 opacity-90">
    <path fill="#BD3D44" d="M0 0h512v512H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h512M0 129h512M0 202.7h512M0 276.3h512M0 350h512M0 423.7h512"/>
    <path fill="#192F5D" d="M0 0h249.1v249.1H0z"/>
  </svg>
);

export default function HeaderProfessional() {
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Configuración de contacto
  const phoneNumber = "1-888-676-1238";
  const phoneLink = "tel:18886761238";
  const callText = language === 'es' ? 'Llámanos ahora para una consulta gratuita:' : 'Call us now for a free consultation:';
  const joinInText = language === 'es' ? 'UNIRSE' : 'JOIN IN'; 

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const menuItems = [
    { 
      name: language === 'es' ? 'Servicios' : 'Services',
      href: '', 
      type: 'dropdown',
      key: 'services',
      submenu: language === 'es'
        ? [
          { name: 'Inmigración', href: `/${language}/servicios/inmigracion` },
          { name: 'Accidentes', href: `/${language}/servicios/accidentes` },
          { name: 'Seguros', href: `/${language}/servicios/seguros` },
          { name: 'Ley Criminal', href: `/${language}/servicios/ley-criminal` },
          { name: 'Familia', href: `/${language}/servicios/familia` },
        ]
        : [
          { name: 'Immigration', href: `/${language}/servicios/inmigracion` },
          { name: 'Accidents', href: `/${language}/servicios/accidentes` },
          { name: 'Insurance', href: `/${language}/servicios/seguros` },
          { name: 'Criminal Law', href: `/${language}/servicios/ley-criminal` },
          { name: 'Family', href: `/${language}/servicios/familia` },
        ]
    },
    {
      name: language === 'es' ? 'Detenidos' : 'Detained',
      href: `/${language}/clientes-detenidos`,
      type: 'link'
    },
    // --- OFICINAS ACTUALIZADAS ---
    { 
      name: language === 'es' ? 'Oficinas' : 'Offices',
      href: '', 
      type: 'dropdown',
      key: 'offices',
      submenu: [
        { name: 'Houston Principal', href: `/${language}/oficinas/houston-principal` },
        { name: 'Houston Main St', href: `/${language}/oficinas/main-st` },
        { name: 'Houston North Loop', href: `/${language}/oficinas/north-loop` },
        { name: 'Houston Northchase', href: `/${language}/oficinas/northchase` },
        { name: 'Houston Bellaire', href: `/${language}/oficinas/houston-bellaire` },
        { name: 'Houston (Kirby)', href: `/${language}/oficinas/kirby` },
        { name: 'Dallas', href: `/${language}/oficinas/dallas` },
        { name: 'El Paso', href: `/${language}/oficinas/el-paso` },
        { name: 'Harlingen', href: `/${language}/oficinas/harlingen` },
        { name: 'Chicago', href: `/${language}/oficinas/chicago` },
        { name: 'Los Angeles', href: `/${language}/oficinas/losangeles` },
        { name: 'Arvada (Denver)', href: `/${language}/oficinas/arvada` },
        { name: 'Memphis', href: `/${language}/oficinas/memphis` },
        { name: 'Memphis Airways', href: `/${language}/oficinas/airways` },
      ]
    },
    // ------------------------------------
    {
      name: language === 'es' ? 'Testimonios' : 'Testimonials',
      href: `/${language}/Testimonios`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'Abogados' : 'Attorneys',
      href: '', 
      type: 'dropdown',
      key: 'attorneys',
      submenu: language === 'es'
        ? [
          { name: 'Nuestro Equipo', href: `/${language}/abogados` },
          { name: 'Sobre Nosotros', href: `/${language}/nosotros` },
          { name: 'Preguntas Frecuentes', href: `/${language}/informacion/faq` },
        ]
        : [
          { name: 'Our Team', href: `/${language}/abogados` },
          { name: 'About Us', href: `/${language}/nosotros` },
          { name: 'FAQ', href: `/${language}/informacion/faq` },
        ]
    },
    { 
      name: language === 'es' ? 'Clientes' : 'Clients',
      // ¡CAMBIO AQUÍ! Ahora apunta a la URL externa
      href: 'https://solislawfirm.com',
      // Agregamos 'external' para saber que debemos usar <a> o <Link legacyBehavior> con target='_blank' si es necesario, aunque en este caso usamos Link sin target, que Next.js manejará correctamente.
      type: 'external' 
    },
  ];

  const toggleLang = (lang: 'es' | 'en') => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  const renderLink = (item: typeof menuItems[0], isMobile: boolean = false) => {
    // Para enlaces externos, usamos <a> con target="_blank" por si acaso, aunque no es estrictamente necesario para la funcionalidad.
    if (item.type === 'external') {
      return (
        <a 
          href={item.href}
          target="_blank" // Se recomienda para enlaces externos
          rel="noopener noreferrer" // Mejora de seguridad
          onClick={() => isMobile && setIsMenuOpen(false)}
          className={`
            ${isMobile ? 
              'block text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em]' : 
              'text-[12px] font-light uppercase tracking-[0.2em] text-white/95 group-hover:text-white transition-all duration-300 drop-shadow-sm'
            }
          `}
        >
          {item.name}
        </a>
      );
    }

    // Para enlaces internos (o que no son dropdowns), usamos Link de Next
    return (
      <Link 
        href={item.href}
        onClick={() => isMobile && setIsMenuOpen(false)}
        className={`
          ${isMobile ? 
            'block text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em]' : 
            'text-[12px] font-light uppercase tracking-[0.2em] text-white/95 group-hover:text-white transition-all duration-300 drop-shadow-sm'
          }
        `}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full flex flex-col ${font.className}`}
        initial={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
        animate={{
          backgroundColor: isScrolled ? 'rgba(5, 15, 30, 0.65)' : 'rgba(0,0,0,0)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* PARTE SUPERIOR: Logo y Menú */}
        <div 
          className="w-full transition-all duration-500"
          style={{ 
            paddingTop: isScrolled ? '0.5rem' : '0.75rem', 
            paddingBottom: isScrolled ? '0.5rem' : '0.75rem' 
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 flex items-center">
            
            {/* Logo */}
            <Link href={`/${language}`} className="relative z-50 mr-12 lg:mr-16">
              <div className={`relative transition-all duration-700 ease-in-out ${isScrolled ? 'w-[140px]' : 'w-[190px]'}`}>
                <Image
                  src="/logo-manuel-solis.png" 
                  alt="Logo Manuel Solis"
                  width={200} 
                  height={65}
                  className="w-full h-auto object-contain opacity-100 hover:scale-105 transition-all duration-500"
                  priority
                />
              </div>
            </Link>

            {/* Menú Desktop - Alineado a la izquierda (junto al logo) */}
            <div className="hidden lg:flex items-center">
              <nav className="flex items-center gap-6 xl:gap-8">
                {menuItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer py-3">
                      {item.submenu || item.type === 'external' ? (
                        // Renderiza el componente de enlace (Link o <a>)
                        renderLink(item)
                      ) : (
                        // Para items sin submenu y tipo 'link'
                        <Link 
                          href={item.href}
                          className="text-[12px] font-light uppercase tracking-[0.2em] text-white/95 group-hover:text-white transition-all duration-300 drop-shadow-sm"
                        >
                          {item.name}
                        </Link>
                      )}
                      {item.submenu && (
                        <ChevronDown className="w-2.5 h-2.5 text-white/60 group-hover:text-white transition-transform duration-500 group-hover:rotate-180" />
                      )}
                    </div>
                    
                    {/* Línea decorativa */}
                    <span className="absolute bottom-1 left-0 w-0 h-[0.5px] bg-sky-200 transition-all duration-500 ease-out group-hover:w-full box-shadow-glow" />

                    {/* Submenu */}
                    {item.submenu && (
                      <div className="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 perspective-[1000px]">
                        {/* Se aumentó el max-height y se añadió scroll para las oficinas */}
                        <div className="min-w-[260px] bg-[#0b1c33]/70 backdrop-blur-3xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-4 px-2 border border-white/10 transform origin-top transition-transform duration-500 max-h-[80vh] overflow-y-auto scrollbar-hide">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group/item flex items-center px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                            >
                              <span className="text-[12px] font-light text-gray-200 group-hover/item:text-white uppercase tracking-[0.15em] group-hover/item:translate-x-1 transition-transform duration-300">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Separador y Acciones a la Derecha */}
            <div className="hidden lg:flex items-center gap-6 ml-auto">
              <div className="h-6 w-[0.5px] bg-white/20" />

              {/* Selector Idioma */}
              <div className="relative group">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 text-[10px] font-light text-white/80 hover:text-white uppercase tracking-[0.2em] transition-all duration-300"
                >
                  {language === 'es' ? <FlagES /> : <FlagUS />}
                  <span>{language === 'es' ? 'ES' : 'EN'}</span>
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-4 w-32 bg-[#0b1c33]/80 backdrop-blur-3xl rounded-xl shadow-2xl border border-white/10 overflow-hidden p-1"
                    >
                      <button onClick={() => toggleLang('es')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                        <FlagES /> <span className="text-[10px] font-light text-white tracking-widest">ESP</span>
                      </button>
                      <button onClick={() => toggleLang('en')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                        <FlagUS /> <span className="text-[10px] font-light text-white tracking-widest">ENG</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BOTÓN JOIN IN (Sin Flecha) */}
              <Link 
                  href={`/${language}/join-in`}
                  className="text-[10px] font-medium uppercase tracking-[0.15em] bg-[#B2904D] text-[#001026] px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-90 shadow-md transform hover:-translate-y-[1px]"
              >
                {joinInText}
              </Link>
            </div>

            {/* Mobile Actions: Phone Icon + Toggle (Alineado a la derecha) */}
            <div className="lg:hidden flex items-center gap-4 ml-auto">
              <a 
                href={phoneLink}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-sky-300 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Call us"
              >
                <Phone size={16} />
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-sky-300 transition-colors"
              >
                {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
              </button>
            </div>
          </div>
        </div>

        {/* PARTE INFERIOR: Línea de teléfono (SOLO DESKTOP) - ARREGLADA */}
        {/* Se mantiene el fondo sutil bg-white/[0.02] y el borde original */}
        <div className="hidden lg:block w-full border-t border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-6 lg:px-12">
            <a 
              href={phoneLink}
              // Aumenté ligeramente el padding vertical (py-3) para darle espacio al texto más grande
              // Aumenté el gap entre el texto y el número (gap-4)
              className="flex items-center justify-center gap-4 py-3 w-full group cursor-pointer hover:bg-white/5 transition-all duration-300"
            >
              {/* Texto descriptivo aumentado ligeramente a text-xs */}
              <span className="text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors font-light">
                {callText}
              </span>
              <div className="flex items-center gap-3">
                  {/* Icono aumentado a w-4 h-4, manteniendo el color sky-300 original */}
                  <Phone className="w-4 h-4 text-sky-300 group-hover:text-white transition-colors" />
                  {/* Número aumentado significativamente a text-lg y font-bold, manteniendo colores originales */}
                  <span className="text-lg font-bold tracking-widest text-white group-hover:text-sky-200 transition-colors">
                    {phoneNumber}
                  </span>
              </div>
            </a>
          </div>
        </div>

      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 bg-[#051120]/98 backdrop-blur-3xl lg:hidden ${font.className}`}
          >
            <div className="flex flex-col pt-24 px-8 h-full">
              <nav className="flex flex-col space-y-6 overflow-y-auto max-h-[80vh] pb-10">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-white/5 pb-4 group">
                    <div 
                      className="flex justify-between items-center text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em] cursor-pointer"
                      onClick={() => item.submenu && setOpenSubmenu(openSubmenu === item.key ? null : item.key)}
                    >
                      {item.submenu ? (
                        <span>{item.name}</span>
                      ) : (
                        // Renderiza el enlace móvil (Link o <a>)
                        renderLink(item, true)
                      )}
                      {item.submenu && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openSubmenu === item.key ? 'rotate-180' : 'opacity-50'}`} />}
                    </div>
                    
                    <AnimatePresence>
                      {item.submenu && openSubmenu === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-3 ml-2 border-l-[0.5px] border-white/10 pl-5 space-y-3 pt-2"
                        >
                          {item.submenu.map(sub => (
                            <Link 
                              key={sub.name} 
                              href={sub.href} 
                              onClick={() => setIsMenuOpen(false)}
                              className="block text-xs text-gray-400 font-light uppercase tracking-[0.15em] hover:text-white transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                {/* Mobile Language and Join In CTA */}
                <div className="pt-4 flex flex-col gap-4">
                    {/* BOTÓN JOIN IN (Mobile) */}
                    <Link 
                      href={`/${language}/join-in`}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center text-[14px] font-medium uppercase tracking-[0.2em] bg-[#B2904D] text-[#001026] px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-90 shadow-lg"
                    >
                      {language === 'es' ? 'INICIAR CONSULTA' : 'START CONSULTATION'}
                    </Link>

                    <div className="flex gap-4">
                      <button onClick={() => toggleLang('es')} className={`text-xs tracking-widest ${language === 'es' ? 'text-white font-medium' : 'text-gray-500'}`}>ES</button>
                      <div className="w-[1px] h-4 bg-white/20"></div>
                      <button onClick={() => toggleLang('en')} className={`text-xs tracking-widest ${language === 'en' ? 'text-white font-medium' : 'text-gray-500'}`}>EN</button>
                    </div>
                </div>

              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}