'use client'

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence, Variants } from 'framer-motion' // 1. Importamos Variants
import { User, Phone, Mail, MessageSquare, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react'

// --- COLORES ---
const ACCENT_GOLD = '#B2904D';

// --- VARIANTS (CORREGIDO CON TIPADO EXPLÍCITO) ---
// 2. Asignamos el tipo : Variants para que TypeScript entienda los literales
const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVar: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100 } 
  }
};

// --- COMPONENTE INPUT MEJORADO ---
const NeonInput = ({ icon: Icon, name, type = "text", placeholder, value, onChange, required = false, isTextArea = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      {/* Icono con brillo activo */}
      <motion.div 
        animate={isFocused ? { color: ACCENT_GOLD, scale: 1.1 } : { color: '#64748b', scale: 1 }}
        className="absolute left-4 top-4 z-20 transition-all duration-300"
      >
        <Icon size={20} />
      </motion.div>

      {/* Input / Textarea */}
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          rows={5}
          className={`w-full bg-[#000510]/50 border-2 rounded-xl py-4 pl-12 pr-4 text-white font-medium placeholder-slate-500 focus:outline-none transition-all resize-none z-10 relative
            ${isFocused ? 'border-[#B2904D]/50 bg-[#000510]/80 shadow-[0_0_20px_rgba(178,144,77,0.1)]' : 'border-white/10 hover:border-white/20'}
          `}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`w-full bg-[#000510]/50 border-2 rounded-xl py-4 pl-12 pr-4 text-white font-medium placeholder-slate-500 focus:outline-none transition-all z-10 relative
            ${isFocused ? 'border-[#B2904D]/50 bg-[#000510]/80 shadow-[0_0_20px_rgba(178,144,77,0.1)]' : 'border-white/10 hover:border-white/20'}
          `}
          placeholder={placeholder}
        />
      )}
      
      {/* Etiqueta flotante para el borde inferior animado */}
      <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-transparent overflow-hidden pointer-events-none">
         <motion.div 
           initial={{ x: "-100%" }}
           animate={{ x: isFocused ? "0%" : "-100%" }}
           transition={{ duration: 0.4, ease: "circOut" }}
           className="w-full h-full bg-[#B2904D] shadow-[0_0_10px_#B2904D]"
         />
      </div>
    </div>
  );
};

export default function ContactForm() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', message: '', consent: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '', consent: false });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const t = (es: string, en: string) => (lang === 'es' ? es : en);

  return (
    <section className="relative py-24 w-full bg-[#001540] overflow-hidden" id="contacto">
      
      {/* 1. FONDO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#002050] via-[#001540] to-[#000814]" />
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
           className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[100px]"
         />
         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.07] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-950/40 border border-blue-400/20 backdrop-blur-md mb-6 shadow-lg">
             <Sparkles size={14} className="text-cyan-400" />
             <span className="text-[11px] font-bold tracking-[0.3em] text-cyan-100 uppercase">
               {t('Atención Inmediata', 'Immediate Attention')}
             </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight drop-shadow-lg">
            {t('Solicitud de', 'Request')}{' '}
            <span className="font-medium text-[#B2904D] drop-shadow-[0_0_15px_rgba(178,144,77,0.3)]">
              {t('Consulta', 'Consultation')}
            </span>
          </h2>
          
          <p className="text-lg text-blue-100 max-w-2xl mx-auto font-light leading-relaxed opacity-90">
            {t('Conecte con nuestro sistema legal inteligente. Respuesta prioritaria en menos de 10 minutos.', 'Connect with our intelligent legal system. Priority response within 10 minutes.')}
          </p>
        </motion.div>

        {/* TARJETA PRINCIPAL */}
        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative bg-[#001026]/90 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              
              {/* STATUS OVERLAY */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-[#001540]/95 flex flex-col items-center justify-center text-center rounded-[2rem]"
                  >
                     <CheckCircle2 size={64} className="text-green-400 mb-4 animate-bounce" />
                     <h3 className="text-3xl font-bold text-white mb-2">{t('¡Enviado!', 'Sent!')}</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div variants={itemVar}>
                   <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Identidad', 'Identity')}</label>
                   <div className="space-y-5">
                      <NeonInput icon={User} name="firstName" placeholder={t('Nombre', 'First Name')} value={formData.firstName} onChange={handleChange} required />
                      <NeonInput icon={User} name="lastName" placeholder={t('Apellido', 'Last Name')} value={formData.lastName} onChange={handleChange} required />
                   </div>
                </motion.div>

                <motion.div variants={itemVar}>
                   <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Contacto', 'Contact')}</label>
                   <div className="space-y-5">
                      <NeonInput icon={Phone} name="phone" type="tel" placeholder={t('Teléfono', 'Phone Number')} value={formData.phone} onChange={handleChange} required />
                      <NeonInput icon={Mail} name="email" type="email" placeholder={t('Correo', 'Email Address')} value={formData.email} onChange={handleChange} required />
                   </div>
                </motion.div>
              </div>

              <motion.div variants={itemVar}>
                <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Detalles', 'Details')}</label>
                <NeonInput 
                  icon={MessageSquare} 
                  name="message" 
                  isTextArea
                  placeholder={t('Describa su caso aquí...', 'Describe your case here...')} 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </motion.div>

              {/* CONSENTIMIENTO */}
              <motion.div variants={itemVar} className="flex items-start gap-4 p-5 rounded-xl bg-[#000814]/50 border border-white/10 hover:border-white/20 transition-colors">
                <div className="relative flex items-center pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-transparent transition-all checked:border-[#B2904D] checked:bg-[#B2904D]"
                  />
                  <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[#001540] opacity-0 transition-opacity peer-checked:opacity-100">
                    <CheckCircle2 size={16} strokeWidth={3} />
                  </div>
                </div>
                <label htmlFor="consent" className="text-sm text-blue-100 leading-relaxed cursor-pointer select-none">
                  {t('Autorizo recibir comunicaciones del Law Office of Manuel Solis. Ver', 'I authorize receiving communications from the Law Office of Manuel Solis. See')}{' '}
                  <a href="#" className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">{t('Privacidad', 'Privacy')}</a>.
                </label>
              </motion.div>

              {/* BOTÓN */}
              <motion.div variants={itemVar} className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className={`
                    group relative w-full h-16 overflow-hidden rounded-xl font-bold tracking-widest uppercase text-base transition-all shadow-xl
                    ${!formData.consent 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
                      : 'bg-[#B2904D] text-[#001026] hover:bg-[#cbb06d] shadow-[#B2904D]/20 hover:shadow-[#B2904D]/40 cursor-pointer transform hover:-translate-y-1'
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Zap className="animate-spin" size={20} /> {t('Procesando...', 'Processing...')}
                      </span>
                    ) : (
                      <>
                        <ShieldCheck size={22} />
                        {t('Iniciar Análisis Gratuito', 'Start Free Analysis')}
                      </>
                    )}
                  </span>
                </button>
              </motion.div>

            </form>
        </motion.div>
      </div>
    </section>
  )
}