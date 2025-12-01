'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Outfit } from 'next/font/google'

// Mantenemos la fuente fina y elegante
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400'] 
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

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const menuItems = [
    { 
      // CAMBIO REALIZADO: Practice Services
      name: language === 'es' ? 'Servicios' : 'Practice Services',
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
      name: language === 'es' ? 'Oficinas' : 'Offices',
      href: `/${language}/oficinas`,
      type: 'link'
    },
    {
      name: language === 'es' ? 'Testimonios' : 'Testimonials',
      href: `/${language}/Testimonios`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'Preguntas' : 'FAQ',
      href: `/${language}/informacion/faq`,
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
          { name: 'Sobre Nosotros', href: `/${language}/sobre-nosotros` },
        ]
        : [
          { name: 'Our Team', href: `/${language}/abogados` },
          { name: 'About Us', href: `/${language}/sobre-nosotros` },
        ]
    },
  ];

  const toggleLang = (lang: 'es' | 'en') => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full ${font.className}`}
        initial={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
        animate={{
          backgroundColor: isScrolled ? 'rgba(5, 15, 30, 0.5)' : 'rgba(0,0,0,0)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
          // AJUSTE DE POSICIÓN: Reduje el padding superior inicial de 1.25rem a 0.75rem
          paddingTop: isScrolled ? '0.5rem' : '0.75rem', 
          paddingBottom: isScrolled ? '0.5rem' : '0.75rem',
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href={`/${language}`} className="relative z-50">
            <div className={`relative transition-all duration-700 ease-in-out ${isScrolled ? 'w-[150px]' : 'w-[200px]'}`}>
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

          {/* Menú Desktop */}
          <div className="hidden lg:flex items-center gap-12">
            <nav className="flex items-center gap-10">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  <div className="flex items-center gap-1 cursor-pointer py-3">
                    <Link 
                      href={item.href}
                      // AJUSTE: Letras más blancas (text-white/95)
                      className="text-[12px] font-light uppercase tracking-[0.2em] text-white/95 group-hover:text-white transition-all duration-300 drop-shadow-sm"
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <ChevronDown className="w-2.5 h-2.5 text-white/60 group-hover:text-white transition-transform duration-500 group-hover:rotate-180" />
                    )}
                  </div>
                  
                  {/* Línea decorativa */}
                  <span className="absolute bottom-1 left-0 w-0 h-[0.5px] bg-sky-200 transition-all duration-500 ease-out group-hover:w-full box-shadow-glow" />

                  {/* SUBMENU MEJORADO: Más grande, más glass, más moderno */}
                  {item.submenu && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 perspective-[1000px]">
                      
                      {/* Contenedor Glass Premium */}
                      <div className="min-w-[260px] bg-[#0b1c33]/70 backdrop-blur-3xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-4 px-2 border border-white/10 transform origin-top transition-transform duration-500">
                        {item.submenu.map((subItem, idx) => (
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

            <div className="h-4 w-[0.5px] bg-white/20" />

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
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-sky-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 bg-[#051120]/98 backdrop-blur-3xl lg:hidden ${font.className}`}
          >
            <div className="flex flex-col pt-24 px-8 h-full">
              <nav className="flex flex-col space-y-6">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-white/5 pb-4 group">
                    <div 
                      className="flex justify-between items-center text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em] cursor-pointer"
                      onClick={() => item.submenu && setOpenSubmenu(openSubmenu === item.key ? null : item.key)}
                    >
                      {item.submenu ? (
                        <span>{item.name}</span>
                      ) : (
                        <Link href={item.href} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
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
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}