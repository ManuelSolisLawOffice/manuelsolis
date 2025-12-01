'use client';

import Link from 'next/link'
import { useRef } from 'react';
import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion'; 
import { useLanguage } from '../context/LanguageContext'
import { Outfit } from 'next/font/google';

// 1. Configuración de Fuente (Igual que About)
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600'] 
})

export default function Services() {
  const { language } = useLanguage();
  const containerRef = useRef(null);

  // --- VARIANTS (Igual que About para consistencia) ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // DATA
  const services = [
    {
      title: language === 'es' ? 'Accidentes' : 'Accidents',
      href: `/${language}/servicios/accidentes`, 
      items: language === 'es' 
        ? ['Accidentes de aviación', 'Accidentes automovilísticos', 'Accidentes de vehículos de 18 ruedas', 'Negligencia médica', 'Explosión de plantas industriales']
        : ['Aviation accidents', 'Car accidents', '18-wheeler accidents', 'Medical negligence', 'Industrial plant explosions'],
    },
    {
      title: language === 'es' ? 'Migración' : 'Immigration',
      href: `/${language}/servicios/inmigracion`, 
      items: language === 'es'
        ? ['Defensa contra la deportación', 'Residencia por un familiar', 'Petición de residencia por parte del empleador', 'Asilo', 'U-Visa / VAWA', 'Naturalización']
        : ['Deportation defense', 'Family-based residency', 'Employer-sponsored residency petition', 'Asylum', 'U-Visa / VAWA', 'Naturalization'],
    },
    {
      title: language === 'es' ? 'Seguros' : 'Insurance',
      href: `/${language}/servicios/seguros`, 
      items: language === 'es'
        ? ['Reclamaciones por granizo', 'Reclamaciones por tormentas de viento', 'Reclamaciones por incendio', 'Reclamaciones por tornado']
        : ['Hail claims', 'Windstorm claims', 'Fire claims', 'Tornado claims'],
    },
    {
      title: language === 'es' ? 'Ley Criminal' : 'Criminal Law',
      href: `/${language}/servicios/ley-criminal`, 
      items: language === 'es'
        ? ['Violencia Doméstica', 'Asalto', 'DWI - Manejo en estado de ebriedad', 'Hurto', 'Prostitución']
        : ['Domestic Violence', 'Assault', 'DWI - Driving While Intoxicated', 'Theft', 'Prostitution'],
    },
    {
      title: language === 'es' ? 'Familia' : 'Family',
      href: `/${language}/servicios/familia`, 
      items: language === 'es'
        ? ['Divorcios', 'Custodia', 'Manutención de los hijos']
        : ['Divorce', 'Custody', 'Child support'],
    },
    {
      title: language === 'es' ? 'Planificación Patrimonial' : 'Estate Planning',
      href: `/${language}/servicios/planificacion`, 
      items: language === 'es'
        ? ['Testamentos']
        : ['Wills'],
    },
  ]

  return (
    <section 
        id="servicios" 
        ref={containerRef}
        className={`relative py-32 lg:py-40 w-full bg-[#001540] overflow-hidden ${font.className}`}
    >
      {/* --- FONDO ATMOSFÉRICO (Igual a About) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#001540]" />
        {/* Luces ajustadas para esta sección */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#B2904D]/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- ENCABEZADO --- */}
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-20 text-center"
          >
            {/* Pill decorativa (Versión Dark Glass) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-blue-200/70 uppercase">
                {language === 'es' ? 'EXPERIENCIA COMPROBADA' : 'PROVEN EXPERIENCE'}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight">
              {language === 'es' ? 'Nuestras' : 'Our'}{' '}
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#ffeebb] to-[#B2904D]">
                {language === 'es' ? 'Áreas Legales' : 'Legal Areas'}
              </span>
            </h2>
            <p className="text-xl text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
              {language === 'es'
                ? 'Expertos en diversas áreas del derecho luchando incansablemente por proteger su futuro.'
                : 'Experts in various areas of law fighting tirelessly to protect your future.'
              }
            </p>
          </motion.div>
        
        {/* --- GRID DE SERVICIOS --- */}
        <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => {
            return (
              <motion.div key={index} variants={fadeInUp} className="block h-full">
                <Link
                  href={service.href} 
                  className="block h-full group" 
                >
                  <div className="relative h-full p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md 
                                transition-all duration-500 hover:bg-white/10 hover:border-[#B2904D]/30 hover:-translate-y-2
                                flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[#B2904D]/10">
                    
                    {/* Brillo interno al hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center mb-6 pb-4 border-b border-white/10 group-hover:border-[#B2904D]/30 transition-colors duration-500">
                            {/* Barra vertical decorativa dorada (Glow effect) */}
                            <div className="w-1 h-8 bg-[#B2904D] rounded-full mr-5 group-hover:h-12 group-hover:shadow-[0_0_15px_rgba(178,144,77,0.6)] transition-all duration-500"></div>
                            
                            <h3 className="text-3xl font-light text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#B2904D] transition-all duration-300">
                                {service.title}
                            </h3>
                        </div>

                        {/* Lista de Ítems */}
                        <div>
                            <ul className="space-y-3">
                                {service.items.slice(0, 4).map((item: string, idx: number) => ( 
                                    <li key={idx} className="flex items-start text-blue-100/70 group-hover:text-blue-50 transition-colors duration-300">
                                        {/* Pequeño punto dorado */}
                                        <div className="w-1 h-1 bg-[#B2904D]/50 rounded-full mt-2.5 mr-3 flex-shrink-0 group-hover:bg-[#B2904D] transition-colors"></div>
                                        <span className="font-light text-sm leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Botón sutil "Ver más" */}
                    <div className="relative z-10 mt-8 pt-4 border-t border-transparent group-hover:border-white/10 transition-colors duration-500">
                        <span className="text-sm font-medium text-[#B2904D] tracking-wide flex items-center gap-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                             {language === 'es' ? 'Ver detalles' : 'View details'} 
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                    </div>

                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
        
      </div>
    </section>
  )
}