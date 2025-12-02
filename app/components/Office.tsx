'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Phone, Clock, Star, CheckCircle2, Play, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Outfit } from 'next/font/google';

// --- CONFIGURACIÓN DE FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '800', '900'] 
});

// Simulamos hook de idioma y formulario si no existen
const useLanguage = () => ({ language: 'es' }); 
const ContactForm = () => (
  <div className="text-white/80 p-6 text-center border-2 border-dashed border-white/10 rounded-xl">
    <h5 className="text-xl font-bold mb-2">Formulario de Contacto</h5>
    <p className="text-sm opacity-60">El formulario se cargará aquí.</p>
  </div>
);

// --- TIPOS DE DATOS ---
type TeamMember = {
  name: string;
  image: string;
  role: { es: string; en: string };
};

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
  videoUrl?: string;
  services: { es: string; en: string }[];
  managers: TeamMember[];
  attorneys: TeamMember[];
};

// --- TEXTOS ---
const interfaceTexts = {
  header: {
    title: { es: 'Nuestras Sedes', en: 'Our Locations' },
    subtitle: { 
      es: 'Selecciona una oficina para ver la información detallada, servicios y el equipo legal a tu disposición.', 
      en: 'Select an office to view detailed information, services, and the legal team at your disposal.' 
    },
    nationalPresence: { es: 'Presencia Nacional', en: 'National Presence' }
  },
  contact: {
    address: { es: 'Dirección', en: 'Address' },
    phone: { es: 'Teléfono', en: 'Phone' },
    hours: { es: 'Horario', en: 'Hours' },
    viewOnMap: { es: 'Ver en mapa', en: 'View on map' },
    servicesTitle: { es: 'Servicios en esta sede', en: 'Services at this Location' },
    attorneysTitle: { es: 'Nuestros Abogados', en: 'Our Attorneys' },
    managersTitle: { es: 'Nuestra Gerencia', en: 'Our Management Team' },
    videoError: { es: 'Tu navegador no soporta el video.', en: 'Your browser does not support the video.' }
  }
};

const getText = (obj: string | { es: string; en: string }, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

// --- DATA COMPLETA ---
const officesData: OfficeData[] = [
  {
    id: 'houston',
    city: 'Houston',
    state: 'TX',
    title: { es: 'Houston, TX Oficina Principal', en: 'Houston, TX Main Office' },
    quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
    description: { es: 'Nuestras oficinas de Houston en Navigation Boulevard son las primeras que abrimos hace ya más de 30 años. Aquí es donde está el centro neurálgico de nuestra firma y donde recibimos a más de 200 clientes a la semana.', en: 'Our Houston offices on Navigation Boulevard were the first we opened more than 30 years ago. This is the nerve center of our firm and where we receive over 200 clients a week.' },
    address: '6657 Navigation Blvd, Houston, Texas 77011',
    phone: '(713) 701-1731',
    email: 'houston@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 9:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 9:00 AM - 4:00 PM' },
    mapLink: 'https://www.google.com/maps/search/?api=1&query=6657+Navigation+Blvd,+Houston,+Texas+77011',
    videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/houston-main.mp4',
    services: [
      { es: 'ACCIDENTES', en: 'ACCIDENTS' }, 
      { es: 'LEY DE FAMILIA', en: 'FAMILY LAW' }, 
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'LEY CRIMINAL', en: 'CRIMINAL LAW' }, 
      { es: 'SEGUROS (ASEGURANZA)', en: 'INSURANCE' }
    ],
    managers: [
      { name: 'Flor Winter', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-10.png' },
      { name: 'Lucy Gomez', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-1.png' },
      { name: 'Luis Salazar', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-2.png' },
      { name: 'Roxana Santamaría', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-3.png' },
      { name: 'María Phan', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-4.png' },
      { name: 'Katty Carrascal', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-5.png' },
      { name: 'Nicolas Santamaría', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-6.png' },
      { name: 'Sonia Romero', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-7.png' },
      { name: 'Omar Cano', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-8.png' },
      { name: 'Francisco Sotomayor', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-9.png' },
      { name: 'Elizabeth Huertas', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-11.png' },
    ],
    attorneys: [
      { name: 'Manuel Solís', role: { es: 'Abogado Principal', en: 'Principal Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
      { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
      { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
      { name: 'Ni Yan', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-8.png' },
      { name: 'Andrew Fink', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-11.png' },
      { name: 'Gregory Finney', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-15-1.png' },
      { name: 'Austen Gunnels', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-18.png' },
    ]
  },
  {
    id: 'dallas',
    city: 'Dallas',
    state: 'TX',
    title: { es: 'Dallas, TX Oficina', en: 'Dallas, TX Office' },
    quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
    description: { es: 'Dallas es una de las grandes ciudades de Texas en las que se concentra una buena cantidad de personas que han venido a este país a vivir y contribuir a su sociedad. Por eso, la firma del abogado Manuel Solís quiso abrir una oficina para ponernos al servicio de nuestros clientes. Nuestras oficinas de Dallas están abiertas de lunes a sábado en horario de 9 de la mañana a 9 de la noche, de manera ininterrumpida.', en: 'Dallas is one of the great cities in Texas where a large number of people who have come to this country to live and contribute to its society are concentrated. That is why the Law Firm of Manuel Solís wanted to open an office to serve our clients. Our Dallas offices are open Monday through Saturday from 9 AM to 9 PM, uninterrupted.' },
    address: '1120 Empire Central Place, Dallas, Texas 75247',
    phone: '(214) 753-8315',
    email: 'dallas@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 8:00 AM - 3:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 8:00 AM - 3:00 PM' },
    mapLink: 'https://goo.gl/maps/ze5VqZn4dLzCKKZp6',
    videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/dallas.mov',
    services: [
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'SEGUROS (ASEGURANZA)', en: 'INSURANCE' }, 
      { es: 'ACCIDENTES', en: 'ACCIDENTS' }
    ],
    managers: [
      { name: 'Maribel Degollado', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-12-233x300.png' }
    ],
    attorneys: [
      { name: 'Manuel Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
      { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
      { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
      { name: 'Mark McBroom', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-12.png' },
      { name: 'Gregory Finney', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-15-1.png' },
    ]
  },
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    state: 'CA',
    title: { es: 'Los Angeles, CA Oficina', en: 'Los Angeles, CA Office' },
    quote: { es: 'Abogados de Inmigración en Los Ángeles con Experiencia', en: 'Experienced Immigration Attorneys in Los Angeles' },
    description: { es: 'Si estás buscando abogados de inmigración en Los Ángeles, el Bufete de Abogados Manuel Solis es la solución perfecta para ti. Nuestro equipo tiene más de 20 años de experiencia ayudando a inmigrantes con una amplia gama de servicios legales. Desde la obtención de visas hasta la defensa en casos de deportación, nuestros abogados de inmigración en Los Ángeles te acompañarán en cada paso del proceso.', en: 'If you are looking for immigration attorneys in Los Angeles, the Law Firm of Manuel Solis is the perfect solution for you. Our team has over 20 years of experience helping immigrants with a wide range of legal services. From obtaining visas to defense in deportation cases, our immigration attorneys in Los Angeles will accompany you every step of the process.' },
    address: '8337 Telegraph Rd Unit 115, Pico Rivera, CA 90660',
    phone: '(213) 784-1554',
    email: 'losangeles@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 8:00 AM - 2:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 8:00 AM - 2:00 PM' },
    mapLink: 'https://maps.app.goo.gl/s3zDpAmWvfZQdFt7A',
    videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/losangeles-final.mov',
    services: [
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'LEY CRIMINAL', en: 'CRIMINAL LAW' }, 
      { es: 'ACCIDENTES', en: 'ACCIDENTS' }
    ],
    managers: [
      { name: 'Morena Fernandez', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-13-233x300.png' }
    ],
    attorneys: [
      { name: 'Manuel Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
      { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
      { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
      { name: 'Andrew Fink', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-11.png' },
      { name: 'Ana Patricia Rueda', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-13.png' },
      { name: 'Eduardo García', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2025/05/imagen-768x1024.jpeg' },
    ]
  },
  {
    id: 'harlingen',
    city: 'Harlingen',
    state: 'TX',
    title: { es: 'Harlingen, TX Oficina', en: 'Harlingen, TX Office' },
    quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
    description: { es: 'Nuestras oficinas en la ciudad de Harlingen nos ayudan a estar más cerca de la frontera con México, sobretodo para los casos de detenidos en los centros de detención de la patrulla fronteriza y las peticiones de asilo.', en: 'Our offices in the city of Harlingen help us to be closer to the border with Mexico, especially for cases of detainees in border patrol detention centers and asylum petitions.' },
    address: '320 E. Jackson, Harlingen, Texas 78550',
    phone: '(956) 597-7090',
    email: 'harlingen@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb (Solo con cita)', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat (Appointment Only)' },
    mapLink: 'https://goo.gl/maps/XbKCSSUBDDSibkAz6',
    videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/harlingen.mov',
    services: [
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'SEGUROS (ASEGURANZA)', en: 'INSURANCE' }
    ],
    managers: [],
    attorneys: [
      { name: 'Manuel Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
      { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
      { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
      { name: 'Andrew Fink', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-11.png' },
      { name: 'Ana Patricia Rueda', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-13.png' },
    ]
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'IL',
    title: { es: 'Chicago, IL Oficina', en: 'Chicago, IL Office' },
    quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
    description: { es: 'Nuestras oficinas en la ciudad de Chicago nos llevan a otra de las grandes urbes de los Estados Unidos donde se concentran una buena cantidad de inmigrantes a los que servimos a diario. Con un edificio de oficinas a disposición de nuestros clientes, nuestra oficina de Chicago atiende casos de Inmigración, familia, criminal y accidentes.', en: 'Our offices in the city of Chicago take us to another of the great cities in the United States where a large number of immigrants we serve daily are concentrated. With an office building available to our clients, our Chicago office handles Immigration, Family, Criminal, and Accident cases.' },
    address: 'W. 6000 Cermak Rd, Cicero, Chicago, Illinois 60804',
    phone: '(312) 477-0389',
    email: 'chicago@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 8:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 8:00 AM - 4:00 PM' },
    mapLink: 'https://maps.app.goo.gl/adcMEbA5fnTXEWA1A',
    videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/chicago-office.mp4',
    services: [
      { es: 'LEY CRIMINAL', en: 'CRIMINAL LAW' }, 
      { es: 'LEY DE FAMILIA', en: 'FAMILY LAW' }, 
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'ACCIDENTES', en: 'ACCIDENTS' }
    ],
    managers: [
      { name: 'Elizabeth Vazquez', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-14-233x300.png' }
    ],
    attorneys: [
      { name: 'Manuel Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
      { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
      { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
      { name: 'Andrew Fink', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-11.png' },
      { name: 'Ana Patricia Rueda', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-13.png' },
      { name: 'Gregory Finney', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-15-1.png' },
      { name: 'Edwin Zavala', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-16.png' },
    ]
  },
  {
    id: 'arvada',
    city: 'Arvada',
    state: 'CO',
    title: { es: 'Arvada, CO Oficina (Área de Denver)', en: 'Arvada, CO Office (Denver Area)' },
    quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
    description: { es: 'Nuestras oficinas de Arvada, Colorado, (Denver) sirven a una gran población de inmigrantes que se movieron a la parte interior de los Estados Unidos. Siendo Denver un gran centro industrial, muchos residentes permanentes han buscado allí mejor fortuna y ya están preparados para obtener su ciudadanía o están buscando traer a algún familiar a los Estados Unidos. Desde las Oficinas del Abogado Manuel Solís nos ponemos a su disposición para prestarles el servicio.', en: 'Our Arvada, Colorado (Denver) offices serve a large immigrant population that moved to the interior part of the United States. With Denver being a major industrial center, many permanent residents have sought better fortune there and are now ready to obtain their citizenship or are looking to bring a family member to the United States. The Law Offices of Attorney Manuel Solís are at your disposal to provide service.' },
    address: '5400 Ward Road, Building IV, Arvada, Colorado 80002',
    phone: '(720) 358-8973',
    email: 'denver@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb: 9:00 AM - 2:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat: 9:00 AM - 2:00 PM' },
    mapLink: 'https://maps.app.goo.gl/v8oPzNQr69oGFmpU9',
    videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/arvada.mov',
    services: [
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'SEGUROS (ASEGURANZA)', en: 'INSURANCE' }
    ],
    managers: [],
    attorneys: [
      { name: 'Manuel Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
      { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
      { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
      { name: 'Andrew Fink', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-11.png' },
      { name: 'Ana Patricia Rueda', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-13.png' },
      { name: 'Eduardo García', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2025/05/imagen-768x1024.jpeg' },
    ]
  },
  {
    id: 'el-paso',
    city: 'El Paso',
    state: 'TX',
    title: { es: 'El Paso, TX Oficina', en: 'El Paso, TX Office' },
    quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
    description: { es: 'Nuestras oficinas en la ciudad de El Paso, Texas, nos permiten tener una presencia estratégica en la frontera para atender de la manera más eficiente y rápida posible a nuestros clientes.', en: 'Our offices in the city of El Paso, Texas, allow us to have a strategic presence on the border to serve our clients in the most efficient and rapid way possible.' },
    address: '1401 Montana Ave, El Paso, TX 79902',
    phone: '(915) 209-3389',
    email: 'elpaso@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM' },
    mapLink: 'https://maps.google.com',
    videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/elpaso.mov',
    services: [
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'SEGUROS (ASEGURANZA)', en: 'INSURANCE' }, 
      { es: 'ACCIDENTES', en: 'ACCIDENTS' }, 
      { es: 'LEY DE FAMILIA', en: 'FAMILY LAW' }, 
      { es: 'LEY CRIMINAL', en: 'CRIMINAL LAW' }
    ],
    managers: [],
    attorneys: [
      { name: 'Manuel Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
      { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
      { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
      { name: 'Andrew Fink', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-11.png' },
      { name: 'Ana Patricia Rueda', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-13.png' },
    ]
  },
  {
    id: 'memphis',
    city: 'Memphis',
    state: 'TN',
    title: { es: 'Memphis, TN Oficina', en: 'Memphis, TN Office' },
    quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
    description: { es: 'Nuestras oficinas de Memphis en Airways Boulevard recién inauguradas listas para atender a nuevos clientes. Nuestra Abogada es Lupita Martínez.', en: 'Our newly opened Memphis offices on Airways Boulevard are ready to serve new clients. Our Attorney is Lupita Martínez.' },
    address: '3385 Airways Blvd Suite 320, Memphis, Tennessee 38116',
    phone: '(901) 557-8357',
    email: 'memphis@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 5:00 PM | Sáb 9:00 AM - 1:00 PM', en: 'Mon - Fri 9:00 AM - 5:00 PM | Sat 9:00 AM - 1:00 PM' },
    mapLink: 'https://maps.app.goo.gl/NfNAVvic9TzhRRY69',
    videoUrl: undefined,
    services: [
      { es: 'LEY CIVIL', en: 'CIVIL LAW' }, 
      { es: 'MULTAS (TICKETS)', en: 'TICKETS' }, 
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'LEY CRIMINAL', en: 'CRIMINAL LAW' }, 
      { es: 'CASOS DE DETENIDOS', en: 'DETAINEE CASES' }
    ],
    managers: [
      { name: 'Michelle Magdonald', role: { es: 'Asistente Legal', en: 'Legal Assistant' }, image: 'https://manuelsolis.com/wp-content/uploads/2025/01/Media-8-225x300.jpg'}
    ],
    attorneys: [
      { name: 'Sara Jones', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2025/05/abogada-memphis-768x768.jpg'},
      { name: 'Peyton Barrow', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2025/05/Peyton-William-Barrow.jpg'}
    ]
  },
  {
    id: 'bellaire',
    city: 'Houston Bellaire',
    state: 'TX',
    title: { es: 'Houston Bellaire (Servicio En Chino)', en: 'Houston Bellaire (Chinese Service)' },
    quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
    description: { es: 'Nuestra oficina de Bellaire es un satélite de nuestra oficina principal en Houston donde atendemos casos de inmigración en la parte norte de esta gran ciudad. Allí, nuestra letrada Ni Yan, atiende en su lengua materna a clientes provenientes de China en sus casos de inmigración.', en: 'Our Bellaire office is a satellite of our main office in Houston where we handle immigration cases in the northern part of this great city. There, our attorney Ni Yan, serves clients from China in their native language for their immigration cases.' },
    address: '9188 Bellaire Blvd #E, Houston, Texas 77036',
    phone: '(281) 903-0462',
    email: 'bellaire@manuelsolis.com',
    hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb 8:00 AM - 4:00 PM', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM' },
    mapLink: 'https://goo.gl/maps/g61U9JLhdEqqvvmv9',
    videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/houston-bellaire.mov',
    services: [
      { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
      { es: 'SEGUROS (ASEGURANZA)', en: 'INSURANCE' }, 
      { es: 'ACCIDENTES', en: 'ACCIDENTS' }, 
      { es: 'LEY DE FAMILIA', en: 'FAMILY LAW' }, 
      { es: 'LEY CRIMINAL', en: 'CRIMINAL LAW' }
    ],
    managers: [],
    attorneys: [
      { name: 'Ni Yan', role: { es: 'Abogada', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-8.png' },
    ]
  }
];

// --- COMPONENTE PRINCIPAL ---
export default function OfficesPremium() {
  const { language } = useLanguage(); 
  const lang = language as 'es' | 'en';
  
  const [selectedId, setSelectedId] = useState(officesData[0].id);
  const [activeOffice, setActiveOffice] = useState(officesData[0]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    requestAnimationFrame(() => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      mouseX.set((clientX - left) / width - 0.5);
      mouseY.set((clientY - top) / height - 0.5);
    });
  }

  const cardX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 20, mass: 0.5 });
  const cardY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 20, mass: 0.5 });

  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = interfaceTexts;
    for (const part of parts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        return ''; 
      }
    }
    return current[lang] || current.es;
  };
  
  const gT = (obj: any): string => getText(obj, lang);

  useEffect(() => {
    const found = officesData.find(o => o.id === selectedId);
    if (found) {
       setActiveOffice(found);
    }
  }, [selectedId]);

  // Force video play when activeOffice changes
  useEffect(() => {
      if(mainVideoRef.current){
          mainVideoRef.current.load();
          const playPromise = mainVideoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              // Auto-play was prevented
              console.log("Auto-play prevented");
            });
          }
      }
  }, [activeOffice]);


  const modalVideoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (isVideoOpen && activeOffice.videoUrl && modalVideoRef.current) {
        modalVideoRef.current.load();
        modalVideoRef.current.play().catch(e => console.error("Error al reproducir video:", e)); 
    }
  }, [isVideoOpen, activeOffice.videoUrl]);


  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      // 🛠️ SOLUCIÓN:
      // 1. -mt-[140px]: Sube el componente 140px hacia arriba para cubrir el hueco blanco del header externo.
      // 2. pt-[160px]: Añade padding arriba para que el contenido interno no se corte.
      className={`relative w-full min-h-screen bg-[#001540] overflow-hidden ${font.className} -mt-[140px] pt-[160px]`}
      id={lang === 'es' ? 'oficinas' : 'locations'}
    >
      {/* 🌌 FONDO ATMOSFÉRICO */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        
        {/* Orbes de animación */}
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

      {/* Ajuste de Padding Vertical (pt-8 en vez de py-16/24) 
        para subir "Nuestras Sedes" y todo el contenido más arriba.
      */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-16 md:pt-12 md:pb-24">
        
        {/* HEADER DEL COMPONENTE */}
        <div className="text-center mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-transparent/10 backdrop-blur-sm border border-[#B2904D]/30 mb-6 md:mb-8"
          >
            <Sparkles className="text-[#B2904D]" size={16} />
            <span className="text-white/70 text-xs md:text-sm font-light tracking-[0.2em] uppercase">{t('header.nationalPresence')}</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-8xl font-thin text-white mb-4 md:mb-6 tracking-tight px-4"
          >
            {t('header.title')}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent mx-auto mb-6 md:mb-8"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/60 max-w-2xl mx-auto text-sm md:text-base lg:text-lg font-light leading-relaxed px-4"
          >
            {t('header.subtitle')}
          </motion.p>
        </div>

        {/* LAYOUT PRINCIPAL */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          
          {/* SIDEBAR */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="lg:sticky lg:top-32"> {/* Ajustado top-24 a top-32 por el cambio de padding */}
              <div className="relative bg-[#001540]/90 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
                
                <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-3">
                  {officesData.map((office) => (
                    <motion.button
                      key={office.id}
                      onClick={() => setSelectedId(office.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        relative group px-3 py-3 md:px-4 md:py-4 rounded-xl text-left transition-all duration-300
                        ${selectedId === office.id 
                          ? 'bg-gradient-to-br from-[#B2904D]/30 to-[#B2904D]/10 border-2 border-[#B2904D] shadow-[0_0_20px_rgba(178,144,77,0.4)]' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#B2904D]/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                        }
                      `}
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="overflow-hidden flex-1 min-w-0">
                          <span className={`block font-bold text-xs md:text-sm lg:text-base leading-tight truncate transition-colors duration-300 ${selectedId === office.id ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                            {office.city}
                          </span>
                          <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.15em] mt-1 block font-medium transition-colors duration-300 ${selectedId === office.id ? 'text-[#B2904D]' : 'text-white/40 group-hover:text-white/60'}`}>
                            {office.state}
                          </span>
                        </div>
                        
                        {selectedId === office.id && (
                          <motion.div 
                            layoutId="activeIndicator" 
                            className="hidden md:block ml-2"
                            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                          >
                            <Star fill="#B2904D" className="text-[#B2904D]" size={16} />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* MAIN CARD */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOffice.id}
                style={{ x: cardX, y: cardY }}
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }} 
                className="relative"
              >
                <div className="relative bg-[#001540]/90 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.2)]">
                  
                  {/* VIDEO HERO - ARREGLADO */}
                  <div className="relative h-[280px] md:h-[400px] lg:h-[500px] w-full overflow-hidden group bg-black">
                    
                    {activeOffice.videoUrl ? (
                      <video 
                        ref={mainVideoRef}
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        preload="auto"
                        // Eliminamos filtros y opacidades raras
                        className="absolute inset-0 w-full h-full object-cover" 
                      >
                        <source src={activeOffice.videoUrl} type="video/mp4" />
                        <source src={activeOffice.videoUrl.replace('.mp4', '.mov')} type="video/quicktime" />
                      </video>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#002868] to-[#001540]" />
                    )}
                    
                    {/* Degradado solo para texto */}
                    <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#001540] via-[#001540]/60 to-transparent" />

                    {activeOffice.videoUrl && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", bounce: 0.5 }} 
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-30"
                      >
                        <motion.button 
                          onClick={() => setIsVideoOpen(true)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                        >
                          <Play size={20} fill="white" className="text-white" />
                        </motion.button>
                      </motion.div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12 text-white z-20">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5 }} 
                      >
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                          <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider bg-[#B2904D]/90 backdrop-blur-sm text-white border border-[#B2904D]">
                            <MapPin size={10} className="inline mr-1" /> {activeOffice.city}, {activeOffice.state}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-4xl lg:text-6xl font-thin mb-2 md:mb-3 leading-[1.1] text-white drop-shadow-lg">
                          {gT(activeOffice.title)}
                        </h3>

                        <p className="text-[#B2904D] font-light italic text-xs md:text-base lg:text-xl max-w-3xl leading-relaxed pl-3 md:pl-4 border-l-2 border-[#B2904D] line-clamp-2 md:line-clamp-none">
                          "{gT(activeOffice.quote)}"
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* CONTENT BODY */}
                  <div className="p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12">
                    
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
                      
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }} 
                      >
                        <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 font-light">
                          {gT(activeOffice.description)}
                        </p>
                        
                        <div className="space-y-4 md:space-y-6">
                          <div className="flex items-start gap-3 md:gap-4 group">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B2904D] flex-shrink-0">
                              <MapPin size={18}/>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] md:text-[11px] text-white/40 font-bold uppercase tracking-wider mb-1">{t('contact.address')}</p>
                              <p className="text-white font-medium text-xs md:text-sm lg:text-base leading-snug break-words">{activeOffice.address}</p>
                              <a 
                                href={activeOffice.mapLink} 
                                target="_blank" 
                                className="inline-flex items-center gap-1 text-[#B2904D] text-xs font-bold hover:text-[#D4AF37] mt-2"
                              >
                                {t('contact.viewOnMap')} →
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B2904D] flex-shrink-0">
                              <Phone size={18}/>
                            </div>
                            <div>
                              <p className="text-[10px] md:text-[11px] text-white/40 font-bold uppercase tracking-wider mb-1">{t('contact.phone')}</p>
                              <a href={`tel:${activeOffice.phone}`} className="text-white font-bold hover:text-[#B2904D] text-sm md:text-base lg:text-lg transition-colors">
                                {activeOffice.phone}
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#B2904D] flex-shrink-0">
                              <Clock size={18}/>
                            </div>
                            <div>
                              <p className="text-[10px] md:text-[11px] text-white/40 font-bold uppercase tracking-wider mb-1">{t('contact.hours')}</p>
                              <p className="text-white font-medium text-xs md:text-sm lg:text-base">{gT(activeOffice.hours)}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }} 
                      >
                        <div className="p-5 md:p-6 lg:p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                          <h4 className="text-lg md:text-xl lg:text-2xl font-light text-white mb-5 md:mb-6 flex items-center gap-2 md:gap-3">
                            <Star className="text-[#B2904D] flex-shrink-0" size={20} fill="#B2904D" /> 
                            <span className="truncate">{t('contact.servicesTitle')}</span>
                          </h4>
                          <ul className="space-y-3 md:space-y-4">
                            {activeOffice.services.map((service, idx) => (
                              <li key={idx} className="flex items-center gap-2 md:gap-3">
                                <CheckCircle2 className="text-[#B2904D] flex-shrink-0" size={16} />
                                <span className="text-white/80 font-medium text-xs md:text-sm lg:text-base tracking-wide">
                                  {gT(service)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>

                    <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* TEAM */}
                    <div>
                      {activeOffice.attorneys.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }} 
                          className="mb-12 md:mb-16"
                        >
                          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                            <div className="w-1 h-8 md:h-10 bg-gradient-to-b from-[#B2904D] to-transparent rounded-full" />
                            <h4 className="text-xl md:text-2xl lg:text-3xl font-light text-white">{t('contact.attorneysTitle')}</h4>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {activeOffice.attorneys.map((person, idx) => (
                              <div key={idx} className="group text-center">
                                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto mb-3 md:mb-4">
                                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#B2904D]/50 transition-all duration-500 bg-white/5 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                                    <Image 
                                      src={person.image} 
                                      alt={person.name} 
                                      width={112} 
                                      height={112} 
                                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                                    />
                                  </div>
                                </div>

                                <h5 className="font-bold text-white text-xs md:text-sm lg:text-base leading-tight group-hover:text-[#B2904D] transition-colors px-1">
                                  {person.name}
                                </h5>
                                <span className="text-[9px] md:text-[10px] lg:text-xs font-medium uppercase tracking-wider text-white/40 mt-1 block">
                                  {gT(person.role)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeOffice.managers.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }} 
                        >
                          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                            <div className="w-1 h-8 md:h-10 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
                            <h4 className="text-xl md:text-2xl lg:text-3xl font-light text-white">{t('contact.managersTitle')}</h4>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {activeOffice.managers.map((person, idx) => (
                              <div key={idx} className="group text-center">
                                <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 bg-white/5">
                                  <Image 
                                    src={person.image} 
                                    alt={person.name} 
                                    width={96} 
                                    height={96} 
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                                  />
                                </div>
                                <h5 className="font-bold text-white text-xs md:text-sm lg:text-base leading-tight px-1">{person.name}</h5>
                                <span className="text-[9px] md:text-[10px] lg:text-xs font-medium uppercase tracking-wider text-white/40 mt-1 block">
                                  {gT(person.role)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* FORM */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }} 
                      className="pt-8 md:pt-12 border-t border-white/10"
                    >
                      <div className="relative bg-[#001540]/80 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 overflow-hidden">
                        <div className="h-1 w-full bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D]" />
                        <div className="p-4 md:p-6 lg:p-8">
                          <ContactForm />
                        </div>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoOpen && activeOffice.videoUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-3 md:p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors p-2 md:p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm z-50"
            >
              <X size={24} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-full max-w-6xl aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20">
                <video ref={modalVideoRef} controls autoPlay className="w-full h-full">
                  <source src={activeOffice.videoUrl} type="video/mp4" />
                  <source src={activeOffice.videoUrl.replace('.mp4', '.mov')} type="video/quicktime" />
                  {t('contact.videoError')}
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}