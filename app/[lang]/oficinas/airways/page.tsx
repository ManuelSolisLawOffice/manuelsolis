'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, CheckCircle2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { useParams } from 'next/navigation';

// --- IMPORTACIONES DE COMPONENTES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';

// --- CONFIGURACIÓN DE FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '800', '900'] 
});

// --- DATOS ESPECÍFICOS: MEMPHIS AIRWAYS ---
const officeData = {
  id: 'memphis-airways',
  city: 'Memphis Airways',
  state: 'TN',
  title: { es: 'Memphis Airways, TN Oficina', en: 'Memphis Airways, TN Office' },
  quote: { es: 'Contamos con representación legal en todo Estados Unidos', en: 'We have legal representation throughout the United States' },
  description: { es: 'En el Bufete de Abogados Manuel Solís te guiamos en tu trámite de visa humanitaria, permiso de trabajo, ciudadanía, entre otros. Contamos con representación legal en todo Estados Unidos. Nuestro equipo analiza cada situación de manera detallada, elaborando estrategias legales personalizadas.', en: 'At the Law Office of Manuel Solís, we guide you through your humanitarian visa process, work permit, citizenship, and more. We have legal representation throughout the United States. Our team analyzes each situation in detail, developing personalized legal strategies.' },
  address: '3385 Airways Blvd Suite 320, Memphis, TN 38116',
  phone: '+1 901-557-8357',
  email: 'memphis@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 9:00 AM - 1:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 9:00 AM - 1:00 PM' },
  mapLink: 'https://maps.app.goo.gl/s3zDpAmWvfZQdFt7A',
  imageUrl: '/offices/ofAirways.png',
  services: [
    { es: 'VISA HUMANITARIA', en: 'HUMANITARIAN VISA' },
    { es: 'PERMISO DE TRABAJO', en: 'WORK PERMIT' },
    { es: 'CIUDADANÍA', en: 'CITIZENSHIP' },
    { es: 'DEFENSA DE DEPORTACIÓN', en: 'DEPORTATION DEFENSE' }
  ],
  attorneys: [
    { name: 'Manuel Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
    { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
    { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
    { name: 'Andrew Fink', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-11.png' },
    { name: 'Ana Patricia Rueda', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-13.png' },
    { name: 'Eduardo García', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2025/05/imagen-768x1024.jpeg' },
  ]
};

// --- TEXTOS DE INTERFAZ ---
const uiText = {
  address: { es: 'Dirección', en: 'Address' },
  phone: { es: 'Teléfono', en: 'Phone' },
  hours: { es: 'Horario', en: 'Hours' },
  viewMap: { es: 'Ver en mapa', en: 'View on map' },
  services: { es: 'Servicios en esta sede', en: 'Services at this Location' },
  team: { es: 'Nuestro "Equipo Legal"', en: 'Our "Legal Team"' }
};

export default function OfficeAirwaysPage() {
  const params = useParams();
  const lang = (params?.lang as 'es' | 'en') || 'es';
  const t = (obj: any) => obj[lang] || obj.es;

  return (
    <>
      <Header />
      
      <main className={`relative w-full min-h-screen bg-[#001540] overflow-hidden ${font.className}`}>
        
        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full blur-[180px]" 
          />
          
          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="relative z-10 pt-[160px] pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* --- HERO SECTION --- */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
              
              {/* Texto Hero */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6">
                  <Sparkles className="text-[#B2904D]" size={14} />
                  <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">Memphis, Tennessee</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-thin text-white mb-6 leading-tight">
                  {t(officeData.title)}
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-[#B2904D] to-transparent mb-8" />

                <p className="text-[#B2904D] font-light italic text-lg md:text-xl border-l-2 border-[#B2904D] pl-6 mb-8">
                  "{t(officeData.quote)}"
                </p>

                <p className="text-white/70 text-base md:text-lg leading-relaxed font-light max-w-xl">
                  {t(officeData.description)}
                </p>
              </motion.div>

              {/* Imagen Hero */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.15)] group"
              >
                <Image 
                  src={officeData.imageUrl}
                  alt="Memphis Airways Office"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-60" />
              </motion.div>
            </div>

            {/* --- INFO GRID --- */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-24">
              
              {/* Detalles de Contacto */}
              <div className="lg:col-span-5 space-y-8">
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10"
                 >
                   <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                     <MapPin className="text-[#B2904D]" /> {t(uiText.address)}
                   </h3>
                   
                   <div className="space-y-6">
                      {/* Dirección */}
                      <div className="group">
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.address)}</p>
                        <p className="text-white text-lg leading-snug">{officeData.address}</p>
                        <a href={officeData.mapLink} target="_blank" className="inline-flex items-center gap-2 text-[#B2904D] mt-3 text-sm font-bold hover:text-[#fff] transition-colors">
                          {t(uiText.viewMap)} →
                        </a>
                      </div>
                      <div className="h-px bg-white/10" />

                      {/* Teléfono */}
                      <div>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.phone)}</p>
                        <a href={`tel:${officeData.phone}`} className="text-2xl text-white font-thin hover:text-[#B2904D] transition-colors">
                          {officeData.phone}
                        </a>
                      </div>
                      <div className="h-px bg-white/10" />

                      {/* Horario */}
                      <div>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.hours)}</p>
                        <div className="flex items-start gap-3">
                          <Clock className="text-[#B2904D] mt-1 shrink-0" size={18} />
                          <p className="text-white text-base">{t(officeData.hours)}</p>
                        </div>
                      </div>
                   </div>
                 </motion.div>

                 {/* Lista de Servicios */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="p-6 md:p-8 rounded-2xl border border-[#B2904D]/30 bg-gradient-to-br from-[#B2904D]/10 to-transparent"
                 >
                   <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
                     <Star className="text-[#B2904D]" fill="#B2904D" size={20} /> {t(uiText.services)}
                   </h3>
                   <ul className="grid gap-4">
                     {officeData.services.map((service, idx) => (
                       <li key={idx} className="flex items-center gap-3">
                         <CheckCircle2 className="text-[#B2904D] shrink-0" size={18} />
                         <span className="text-white/90 text-sm md:text-base font-medium tracking-wide">
                           {t(service)}
                         </span>
                       </li>
                     ))}
                   </ul>
                 </motion.div>
              </div>

              {/* Grid de Abogados */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-1 h-10 bg-[#B2904D] rounded-full" />
                    <h3 className="text-3xl font-thin text-white">{t(uiText.team)}</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {officeData.attorneys.map((person, idx) => (
                      <div key={idx} className="group text-center bg-white/5 rounded-xl p-4 border border-white/5 hover:border-[#B2904D]/30 transition-all duration-300 hover:bg-white/10">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#B2904D] transition-all duration-500 shadow-lg">
                            <Image 
                              src={person.image} 
                              alt={person.name} 
                              width={96} 
                              height={96} 
                              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                            />
                          </div>
                        </div>
                        <h5 className="font-bold text-white text-sm md:text-base leading-tight mb-1 group-hover:text-[#B2904D] transition-colors">
                          {person.name}
                        </h5>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                          {t(person.role)}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* --- FORMULARIO DE CONTACTO --- */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-[#001540]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D]" />
                
                <div className="p-6 md:p-12">
                   {/* Se eliminaron los textos de título aquí por petición */}
                   <ContactForm />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}