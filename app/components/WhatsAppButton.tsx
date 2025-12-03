'use client'

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLanguage();
  
  // Número de WhatsApp
  const whatsappNumber = '5215555555555';
  
  // Mensaje predeterminado
  const defaultMessage = encodeURIComponent(t.whatsapp.defaultMessage);
  
  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
  
  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
    
    // Analytics tracking (opcional)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        'event_category': 'contact',
        'event_label': 'whatsapp_button'
      });
    }
  };

  return (
    <>
      {/* Botón flotante de WhatsApp */}
      {/* CAMBIO: right-24 para separarlo del botón de IA que está en right-6 */}
      <div className="fixed bottom-6 right-24 z-50">
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            {t.whatsapp.tooltip}
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        )}
        
        {/* Botón principal */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl"
          aria-label="Contact us on WhatsApp"
        >
          {/* ELIMINADO: Se quitó el span con animate-ping (efecto de onda) */}
          
          {/* Icono de WhatsApp */}
          <MessageCircle className="w-8 h-8 relative z-10" strokeWidth={2} />
          
          {/* Badge de notificación rojo (sin onda, solo estático o pulso suave si deseas) */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
      
      {/* Estilos personalizados */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 20px 50px rgba(37, 211, 102, 0.5);
        }
      `}</style>
    </>
  );
}