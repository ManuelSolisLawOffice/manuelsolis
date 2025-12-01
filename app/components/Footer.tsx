'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'
import { Outfit } from 'next/font/google'

// --- FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'] 
})

// --- COLORES ---
const PRIMARY_DARK = '#001540';
const ACCENT_GOLD = '#B2904D';

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear()

  // --- DATOS ---
  const footerLinks = [
    { name: language === 'es' ? 'INICIO' : 'HOME', href: `/${language}` },
    { name: language === 'es' ? 'AREAS LEGALES' : 'LEGAL AREAS', href: `/${language}/servicios` },
    { name: language === 'es' ? 'TESTIMONIALES' : 'TESTIMONIALS', href: `/${language}/Testimonios` },
    { name: language === 'es' ? 'ABOGADOS' : 'ATTORNEYS', href: `/${language}/abogados` },
    { name: language === 'es' ? 'OFICINAS' : 'OFFICES', href: `/${language}/oficinas` },
    { name: language === 'es' ? 'INFORMACIÓN' : 'INFORMATION', href: `/${language}/noticias` },
  ]

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/AbogadoManuelSolisOficial/', icon: Facebook },
    { name: 'Twitter', href: 'https://twitter.com/AbogadoMSolis', icon: Twitter },
    { name: 'Instagram', href: 'https://www.instagram.com/abogadomanuelsolisoficial/', icon: Instagram },
    { name: 'YouTube', href: 'https://www.youtube.com/channel/UCWD61mNBq6qJ0BMhj_-a4Vg', icon: Youtube },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/manuel-solis-law-firm/', icon: Linkedin },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative bg-[${PRIMARY_DARK}] text-white overflow-hidden ${font.className}`}>
      
      {/* 1. DECORACIÓN DE FONDO */}
      {/* Borde superior brillante */}
      <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[${ACCENT_GOLD}] to-transparent opacity-50`} />
      {/* Glow ambiental superior */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-[${ACCENT_GOLD}]/10 blur-[80px] pointer-events-none`} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        
        {/* LOGO & SOCIALS */}
        <div className="flex flex-col items-center mb-16">
          <Link href={`/${language}`} className="inline-block mb-10 group relative">
            <div className={`absolute -inset-4 bg-[${ACCENT_GOLD}]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <Image
              src="/logo-manuel-solis.png"
              alt="Logo Manuel Solis"
              width={300}
              height={90}
              className="h-24 w-auto relative z-10 drop-shadow-2xl"
            />
          </Link>

          <div className="flex gap-4 mb-8">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center justify-center w-12 h-12 rounded-full 
                    bg-white/5 border border-white/10 backdrop-blur-sm
                    text-white transition-all duration-300
                    hover:bg-[${ACCENT_GOLD}] hover:border-[${ACCENT_GOLD}] hover:text-[${PRIMARY_DARK}] hover:shadow-[0_0_15px_rgba(178,144,77,0.6)]
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.a>
              )
            })}
          </div>
        </div>

        {/* NAVIGATION LINKS (GRID) */}
        <nav className="mb-16 border-t border-white/10 border-b py-10">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-12">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="relative group text-sm md:text-base font-medium tracking-wider text-blue-100/70 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                  {/* Underline animado */}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-[${ACCENT_GOLD}] transition-all duration-300 group-hover:w-full`} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-blue-200/40">
          
          {/* Categorías (Links secundarios) */}
          <div className="flex flex-wrap justify-center gap-4">
             <Link href={`/${language}/category/proteccion-legal-para-migrantes`} className="hover:text-[${ACCENT_GOLD}] transition-colors">
               {language === 'es' ? 'Protección legal' : 'Legal Protection'}
             </Link>
             <span>|</span>
             <Link href={`/${language}/category/derechos-de-migrantes`} className="hover:text-[${ACCENT_GOLD}] transition-colors">
               {language === 'es' ? 'Derechos de migrantes' : 'Migrant Rights'}
             </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
             <p>
               © {currentYear} Manuel Solis Law Firm. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
             </p>
          </div>
        </div>

      </div>

      {/* BOTÓN "BACK TO TOP" */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`absolute bottom-8 right-8 w-10 h-10 rounded-full bg-[${ACCENT_GOLD}]/10 border border-[${ACCENT_GOLD}]/30 text-[${ACCENT_GOLD}] flex items-center justify-center hover:bg-[${ACCENT_GOLD}] hover:text-[${PRIMARY_DARK}] transition-all duration-300 backdrop-blur-md hidden md:flex`}
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  )
}