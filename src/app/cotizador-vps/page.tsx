'use client';

import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Server, Cpu, HardDrive, Wifi } from 'lucide-react';

const planes = [
  {
    id: 'basic',
    nombre: 'VPSi BASIC',
    precio: 1590,
    ram: '4GB RAM DDR5',
    cpu: '8vCPU Intel Xeon Gold',
    storage: '80GB SSD NVME',
    destacado: false,
  },
  {
    id: 'impulso',
    nombre: 'VPSi IMPULSO',
    precio: 1890,
    ram: '6GB RAM DDR5',
    cpu: '8vCPU Intel Xeon Gold',
    storage: '100GB SSD NVME',
    destacado: true,
  },
  {
    id: 'inter',
    nombre: 'VPSi INTER',
    precio: 2690,
    ram: '8GB RAM DDR5',
    cpu: '8vCPU Intel Xeon Gold',
    storage: '240GB SSD NVME',
    destacado: false,
  },
  {
    id: 'pro',
    nombre: 'VPSi PRO',
    precio: 3790,
    ram: '12GB RAM DDR5',
    cpu: '8vCPU Intel Xeon Gold',
    storage: '340GB SSD NVME',
    destacado: false,
  },
  {
    id: 'plus',
    nombre: 'VPSi PLUS',
    precio: 4890,
    ram: '16GB RAM DDR5',
    cpu: '8vCPU Intel Xeon Gold',
    storage: '440GB SSD NVME',
    destacado: false,
  },
  {
    id: 'prime',
    nombre: 'VPSi PRIME',
    precio: 5990,
    ram: '24GB RAM DDR5',
    cpu: '16vCPU Intel Xeon Gold',
    storage: '540GB SSD NVME',
    destacado: false,
  },
  {
    id: 'xprime',
    nombre: 'VPSi XPRIME',
    precio: 6990,
    ram: '32GB RAM DDR5',
    cpu: '16vCPU Intel Xeon Gold',
    storage: '640GB SSD NVME',
    destacado: false,
  },
];

const complementos = [
  {
    nombre: 'Usuario TSPlus',
    precio: '$70/mes',
    descripcion: 'Acceso Web al servidor virtual',
  },
  {
    nombre: 'Microsoft 365',
    precio: '$400/mes',
    descripcion: 'Business Standard mensual',
  },
  {
    nombre: 'ESET Antivirus',
    precio: '$3,500/año',
    descripcion: 'Server Security para Windows',
  },
  {
    nombre: 'BackApps',
    precio: '$2,500/año',
    descripcion: 'Respaldos automatizados',
  },
  {
    nombre: 'TSPlus Security',
    precio: '$6,450',
    descripcion: 'Advanced Security Ultimate licencia perpetua',
  },
];

export default function CotizadorVPS() {
  const [planSeleccionado, setPlanSeleccionado] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    usuarios: '',
    sistemas: '',
    website: '', // honeypot
  });

  const formRef = useRef<HTMLDivElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValido, setCaptchaValido] = useState<boolean>(false);

  const handleSeleccionarPlan = (planId: string) => {
    setPlanSeleccionado(planId);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValido) {
      alert('Por favor completa el CAPTCHA');
      return;
    }
    if (formData.website) return;

    if (planSeleccionado === 'asesor') {
      const mensaje = encodeURIComponent(
        `Hola, soy ${formData.nombre} de ${formData.empresa}. Me interesa hablar con un Asesor Nube. Correo: ${formData.correo} | Tel: ${formData.telefono}`
      );
      window.open(`https://wa.me/527225017865?text=${mensaje}`, '_blank');
      return;
    }

    // Envío por correo para todos los demás casos
    const destinatario = 'i.solucionesag@gmail.com';
    const asunto = encodeURIComponent(`Cotización VPS - ${formData.nombre} | ${formData.empresa}`);
    const cuerpo = encodeURIComponent(
      `Nombre: ${formData.nombre}\nEmpresa: ${formData.empresa}\nCorreo: ${formData.correo}\nTeléfono: ${formData.telefono}\nServidor de Interés: ${planSeleccionado}\nUsuarios: ${formData.usuarios}\nSistemas CONTPAQi: ${formData.sistemas}`
    );
    window.open(`mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="font-sans text-white" style={{ backgroundColor: '#0B0F19' }}>

        {/* ENLACE VOLVER */}
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94A3B8',
              fontSize: '0.875rem',
              fontWeight: 400,
              textDecoration: 'none',
              paddingBottom: '4px',
              borderBottom: '2px solid transparent',
              transition: 'all 250ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.textShadow =
                '0 0 8px rgba(96,165,250,0.8), 0 0 20px rgba(59,130,246,0.4)'
              e.currentTarget.style.borderBottomColor = '#2563EB'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#94A3B8'
              e.currentTarget.style.textShadow = 'none'
              e.currentTarget.style.borderBottomColor = 'transparent'
            }}
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
        </div>

        {/* [1] HERO SUPERIOR */}
        <section style={{
          position: 'relative',
          width: '100%',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>

          {/* Imagen de fondo */}
          <Image
            src="/hero-vps.png"
            alt="Data center servidores virtuales"
            fill
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: 0
            }}
          />

          {/* Overlay oscuro para legibilidad del texto */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(11,15,25,0.92) 0%, rgba(11,15,25,0.75) 50%, rgba(11,15,25,0.85) 100%)',
            zIndex: 1
          }} />

          {/* Contenido encima del overlay */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '80px 24px'
          }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.4)',
              color: '#60A5FA',
              borderRadius: '20px',
              padding: '6px 16px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase' as const,
              marginBottom: '24px'
            }}>
              PARTNER AUTORIZADO DE IINUBE
            </div>

            {/* Título */}
            <h1 style={{
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontWeight: 900,
              fontSize: '3.5rem',
              color: '#F1F5F9',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '20px'
            }}>
              Servidores Virtuales en la Nube
            </h1>

            {/* Subtítulo */}
            <p style={{
              color: '#94A3B8',
              fontSize: '1.1rem',
              lineHeight: 1.75,
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px'
            }}>
              Dale a tu Negocio la Seguridad, Control y La libertad de trabajar con tus Sistemas CONTPAQi® desde cualquier lugar.
            </p>

            {/* Stats en fila */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              flexWrap: 'wrap' as const
            }}>
              {[
                { valor: '99%', label: 'UPTIME - SLA' },
                { valor: '2 GB/s', label: 'UPLINK' },
                { valor: '24/7', label: 'ACCESO SN RESTRICCIONES' },
                { valor: 'OPTIMIZACIÓN DE COSTOS', label: 'Infraestructura Hiperconvergente' }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-montserrat)',
                    fontWeight: 900,
                    fontSize: '2rem',
                    color: '#2563EB',
                    lineHeight: 1
                  }}>
                    {stat.valor}
                  </div>
                  <div style={{
                    color: '#94A3B8',
                    fontSize: '0.875rem',
                    marginTop: '4px'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* [2] PLANES VPS */}
        <section style={{ backgroundColor: '#111827' }} className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <span
                className="font-semibold uppercase tracking-wider"
                style={{ color: '#60A5FA', fontSize: '0.875rem' }}
              >
                PLANES DISPONIBLES
              </span>
              <h2
                className="mt-4 mb-4 text-3xl font-bold"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                Elige el Servidor ideal para tu empresa:
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
                Todos los VPSi Incluyen:
                <br />
                UPLINK HASTA 2 GBPS | DNS | 24HRAS | IP FIJA IPV4 E IPV6 | 99.99% UPTIME | TRANSFERENCIA ILIMITADA | ALTA DISPONIBILIDAD
              </p>
            </div>

            <div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              style={{ gap: '24px' }}
            >
              {planes.map((plan) => (
                <div
                  key={plan.id}
                  style={{
                    backgroundColor: '#1A2235',
                    border: plan.destacado ? '2px solid #2563EB' : '1px solid #1E293B',
                    borderRadius: '12px',
                    padding: '1.75rem',
                    position: 'relative',
                    transform: plan.destacado ? 'scale(1.03)' : 'scale(1)',
                    zIndex: plan.destacado ? 10 : 1,
                  }}
                  className="flex flex-col"
                >
                  {plan.destacado && (
                    <div
                      style={{
                        background: '#2563EB',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        padding: '4px 12px',
                        borderRadius: '0 0 8px 8px',
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      MÁS POPULAR
                    </div>
                  )}

                  <h3 className="mb-4 mt-2 text-xl font-bold text-white">{plan.nombre}</h3>
                  <div className="mb-6 flex items-baseline">
                    <span className="text-[2.5rem] font-black text-blue-500 leading-none">
                      ${plan.precio.toLocaleString()}
                    </span>
                    <span className="ml-2 text-sm" style={{ color: '#94A3B8' }}>
                      /mes MXN
                    </span>
                  </div>

                  <ul className="mb-8 flex-grow space-y-3" style={{ color: '#94A3B8' }}>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-sm bg-blue-500 shrink-0" />
                      {plan.ram}
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-sm bg-blue-500 shrink-0" />
                      {plan.cpu}
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-sm bg-blue-500 shrink-0" />
                      {plan.storage}
                    </li>
                    {/*<li className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-sm bg-blue-500 shrink-0" />
                      Uplink 2 GB/s
                    </li>*/}
                    {/*<li className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-sm bg-blue-500 shrink-0" />
                      Transferencia ilimitada
                    </li>*/}
                  </ul>

                  <button
                    onClick={() => handleSeleccionarPlan(plan.id)}
                    className="w-full rounded-md py-3 text-center font-semibold transition-colors"
                    style={{
                      backgroundColor: plan.destacado ? '#2563EB' : 'transparent',
                      color: plan.destacado ? 'white' : '#60A5FA',
                      border: plan.destacado ? 'none' : '1px solid rgba(37,99,235,0.5)',
                    }}
                    onMouseEnter={(e) => {
                      if (!plan.destacado) {
                        e.currentTarget.style.backgroundColor = 'rgba(37,99,235,0.1)';
                      } else {
                        e.currentTarget.style.backgroundColor = '#1D4ED8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.destacado) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      } else {
                        e.currentTarget.style.backgroundColor = '#2563EB';
                      }
                    }}
                  >
                    Seleccionar Servidor
                  </button>
                </div>
              ))}
            </div>

            {/* Features check list */}
            <div className="mt-16 border-t pt-8 text-center" style={{ borderColor: '#1E293B' }}>
              <p className="mb-6 font-medium text-white">Todos los planes incluyen:</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4" style={{ color: '#94A3B8' }}>
                <span className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> Sistema Operativo a Elegir: Windows 2019 o 2022, Linux o Centos</span>
                <span className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> Firewall perimetral y Firewall general</span>
                <span className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> 7 Respaldos Íntegros (1 Copia de seguridad diaria)</span>
                <span className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> Plan DRP (Recuperación pronta ante desastres)</span>
                <span className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-500" /> Total Estabilidad, Seguridad y Disponibilidad</span>
              </div>
            </div>
          </div>
        </section>

        {/* [3] COMPLEMENTOS */}
        <section style={{ backgroundColor: '#0B0F19' }} className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold text-white">Complementos disponibles</h2>
              <p style={{ color: '#94A3B8' }}>Potencia tu servidor con complementos adicionales</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {complementos.map((comp, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#1A2235',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    padding: '1.25rem',
                  }}
                  className="flex flex-col text-center"
                >
                  <h4 className="font-semibold text-white mb-1">{comp.nombre}</h4>
                  <p className="text-blue-500 font-bold mb-2">{comp.precio}</p>
                  <p className="text-sm mt-auto" style={{ color: '#94A3B8' }}>
                    {comp.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* [4] FORMULARIO DE COTIZACIÓN */}
        <section
          id="formulario-cotizacion"
          ref={formRef}
          style={{ backgroundColor: '#111827' }}
          className="py-20"
        >
          <div className="mx-auto max-w-[700px] px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white">Solicita tu cotización personalizada</h2>
              <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>
                Nuestro equipo te contactará en menos de 24 horas
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: '#1A2235',
                border: '1px solid #1E293B',
                borderRadius: '16px',
                padding: '2rem',
              }}
              className="space-y-6"
            >
              {/* Fila 1 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Nombre completo *</label>
                  <input
                    required
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full rounded-md border p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: '#0B0F19', borderColor: '#334155' }}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Empresa *</label>
                  <input
                    required
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full rounded-md border p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: '#0B0F19', borderColor: '#334155' }}
                  />
                </div>
              </div>

              {/* Fila 2 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Correo electrónico *</label>
                  <input
                    required
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className="w-full rounded-md border p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: '#0B0F19', borderColor: '#334155' }}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Teléfono *</label>
                  <input
                    required
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full rounded-md border p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: '#0B0F19', borderColor: '#334155' }}
                  />
                </div>
              </div>

              {/* Fila 3 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Servidor de Interés *</label>
                <select
                  required
                  name="planSeleccionado"
                  value={planSeleccionado}
                  onChange={(e) => setPlanSeleccionado(e.target.value)}
                  className="w-full rounded-md border p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: '#0B0F19', borderColor: '#334155' }}
                >
                  <option value="">Selecciona un plan...</option>
                  <option value="basic">VPSi BASIC — $1,590/mes</option>
                  <option value="impulso">VPSi IMPULSO — $1,890/mes</option>
                  <option value="inter">VPSi INTER — $2,690/mes</option>
                  <option value="pro">VPSi PRO — $3,790/mes</option>
                  <option value="plus">VPSi PLUS — $4,890/mes</option>
                  <option value="prime">VPSi PRIME — $5,990/mes</option>
                  <option value="xprime">VPSi XPRIME — $6,990/mes</option>
                  <option value="demo">Solicitar DEMO</option>
                  <option value="asesor">Hablar con un Asesor Nube</option>
                </select>
              </div>

              {/* Fila 4 */}
              <div style={{ opacity: planSeleccionado === 'demo' ? 0.4 : 1, pointerEvents: planSeleccionado === 'demo' ? 'none' : 'auto', transition: 'opacity 200ms' }}>
                <label className="mb-2 block text-sm font-medium text-white">¿Cuántos usuarios necesitan acceso?</label>
                <select
                  name="usuarios"
                  value={formData.usuarios}
                  onChange={handleInputChange}
                  className="w-full rounded-md border p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: '#0B0F19', borderColor: '#334155' }}
                >
                  <option value="">Selecciona una opción...</option>
                  <option value="1-5">1-5 usuarios</option>
                  <option value="6-10">6-10 usuarios</option>
                  <option value="11-20">11-20 usuarios</option>
                  <option value="20+">Más de 20 usuarios</option>
                </select>
              </div>

              {/* Fila 5 */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  ¿Qué sistemas CONTPAQi usas actualmente o planeas usar?
                </label>
                <textarea
                  name="sistemas"
                  rows={3}
                  value={formData.sistemas}
                  onChange={handleInputChange}
                  className="w-full rounded-md border p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: '#0B0F19', borderColor: '#334155' }}
                  placeholder="Ej. Contabilidad, Nóminas, Comercial..."
                />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* reCAPTCHA */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '8px 0'
              }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || (process.env.NODE_ENV !== 'production' ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' : '')}
                  onChange={(token) => setCaptchaValido(!!token)}
                  onExpired={() => setCaptchaValido(false)}
                  theme="dark"
                />
              </div>

              <button
                type="submit"
                disabled={!captchaValido}
                style={{
                  width: '100%',
                  height: '52px',
                  background: captchaValido ? '#2563EB' : '#1E293B',
                  color: captchaValido ? 'white' : '#4B5563',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: captchaValido ? 'pointer' : 'not-allowed',
                  transition: 'all 200ms'
                }}
              >
                {!captchaValido ? 'Completa el CAPTCHA para continuar' : planSeleccionado === 'asesor' ? 'Contactar Asesor por WhatsApp' : planSeleccionado === 'demo' ? 'Solicitar DEMO' : 'Solicitar Cotización Gratuita'}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
