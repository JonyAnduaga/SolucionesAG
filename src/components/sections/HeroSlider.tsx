'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ───────────────────────── slide data ───────────────────────── */

interface Slide {
  id: number;
  titulo: string;
  descripcion: string;
  logoUrl: string;
  fichaTecnicaUrl: string;
  ctaPrimario: string;
  ctaSecundario: string;
  promoImage?: string;
  bgImage?: string;
  badge?: string;
  accentColor?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: 'LICENCIA OFICIAL CONTPAQi®',
    titulo: 'El Software Contable favorito de los Contadores Mexicanos',
    descripcion: 'Gestión fiscal, CFDI 4.0, contabilidad electrónica y cumplimiento SAT en un solo sistema.',
    logoUrl: '/productos/escritorio/CONTPAQi_submarca_contabilidad_RGB_A.png',
    fichaTecnicaUrl: '/fichas/desktop/Ficha_Producto_CONTPAQi_Contabilidad.pdf',
    ctaPrimario: 'Solicitar Demo',
    ctaSecundario: 'Descargar Ficha Técnica',
    accentColor: '#2563EB',
    bgImage: '/hero-bg-contabilidad.png'
  },
  {
    id: 2,
    badge: 'CUMPLIMIENTO TOTAL SAT E IMSS',
    titulo: 'Timbra y Calcula Nóminas sin complicaciones',
    descripcion: 'Dispersión bancaria, finiquitos, prestaciones y recibos digitales en cumplimiento con la ley.',
    logoUrl: '/productos/escritorio/CONTPAQi_submarca_Nominas_RGB_A.png',
    fichaTecnicaUrl: '/fichas/desktop/Ficha_Producto_CONTPAQi_Nominas.pdf',
    ctaPrimario: 'Solicitar Demo',
    ctaSecundario: 'Descargar Ficha Técnica',
    accentColor: '#2563EB',
    bgImage: '/hero-bg-nominas.png'
  },
  {
    id: 3,
    badge: 'PUNTO DE VENTA EMPRESARIAL',
    titulo: 'Facturación, Inventarios y CRM para tu negocio en crecimiento',
    descripcion: 'Control total de tu operación comercial: ventas, compras, cuentas por cobrar y más.',
    logoUrl: '/productos/escritorio/CONTPAQi_submarca_Comercial_Premium_RGB_A.png',
    fichaTecnicaUrl: '/fichas/desktop/Ficha_Producto_CONTPAQi_Comercial_Premium.pdf',
    ctaPrimario: 'Solicitar Demo',
    ctaSecundario: 'Descargar Ficha Técnica',
    accentColor: '#2563EB',
    bgImage: '/hero-bg-comercial.png'
  }
];

/* ───────────────────────── component ────────────────────────── */

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* navigation helpers */
  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1,
    );
  }, []);

  /* autoplay */
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(goToNext, 6000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, currentSlide, goToNext]);

  /* scroll-to for CTA */
  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* inject keyframes + responsive rules once */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @media (max-width: 767px) {
          .hero-slider-root { height: calc(100vh - 124px) !important; min-height: 500px !important; padding: 60px 24px !important; }
          .hero-slide-inner { flex-direction: column-reverse !important; padding: 40px 24px !important; max-width: 100% !important; gap: 32px !important; }
          .hero-slide-active {
            display: flex !important;
            position: relative !important;
          }
          .hero-text-col {
            width: 100% !important;
            padding-right: 0 !important;
            text-align: center !important;
            align-items: center !important;
            padding-top: 24px !important;
          }
          .hero-badge { align-self: center !important; }
          .hero-title { font-size: 1.75rem !important; max-width: 100% !important; }
          .hero-desc  { max-width: 100% !important; }
          .hero-ctas  { justify-content: center !important; }
          .hero-img-col { height: auto !important; width: 100% !important; max-width: 280px !important; margin: 0 auto !important; padding: 0 0 8px !important; }
          .hero-product-logo { height: 80px !important; }
          .hero-glow { width: 220px !important; height: 220px !important; }
          .hero-arrow { display: none !important; }
          .hero-slide-inactive { display: none !important; }
        }
      `}} />

      <section
        id="hero-slider"
        className="hero-slider-root"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 124px)',
          minHeight: 560,
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at top right, rgba(37,99,235,0.08) 0%, #0B0F19 60%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* ── slides ── */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`hero-slide-grid ${isActive ? 'hero-slide-active' : 'hero-slide-inactive'}`}
              aria-hidden={!isActive}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                pointerEvents: isActive ? 'auto' : 'none',
                transition: 'opacity 500ms ease, transform 500ms ease',
                overflow: 'hidden',
              }}
            >
              {slide.bgImage && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 35%',
                  backgroundRepeat: 'no-repeat',
                  opacity: 0.55,
                  zIndex: 0
                }} />
              )}

              {slide.bgImage && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '180px',
                  height: '180px',
                  background: 'radial-gradient(circle at bottom right, #0B0F19 0%, #0B0F19 40%, transparent 75%)',
                  zIndex: 1,
                  pointerEvents: 'none'
                }} />
              )}

              {/* Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(11,15,25,0.75) 0%, rgba(11,15,25,0.55) 50%, rgba(11,15,25,0.8) 100%)',
                zIndex: 1
              }} />

              {/* inner flex wrapper for centering */}
              <div
                className="hero-slide-inner"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  maxWidth: '1280px',
                  margin: '0 auto',
                  padding: '0 80px',
                  gap: '64px',
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* left column — text */}
                <div
                  className="hero-text-col"
                  style={{
                    width: '55%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '20px'
                  }}
                >
                  {slide.badge && (
                    <div
                      className="hero-badge"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        background: 'rgba(37,99,235,0.15)',
                        border: '1px solid rgba(37,99,235,0.4)',
                        color: '#60A5FA',
                        borderRadius: '20px',
                        padding: '6px 16px',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        marginBottom: '20px'
                      }}
                    >
                      {slide.badge}
                    </div>
                  )}

                  <h1
                    className="hero-title"
                    style={{
                      fontFamily: 'var(--font-montserrat), sans-serif',
                      fontWeight: 900,
                      fontSize: '3rem',
                      color: '#F1F5F9',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      margin: 0,
                    }}
                  >
                    {slide.titulo}
                  </h1>

                  <p
                    className="hero-desc"
                    style={{
                      color: '#94A3B8',
                      fontSize: '1rem',
                      lineHeight: 1.75,
                      maxWidth: '480px',
                      margin: 0,
                    }}
                  >
                    {slide.descripcion}
                  </p>

                  <div
                    className="hero-ctas"
                    style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      onMouseEnter={() => setHoveredBtn(`primary-${slide.id}`)}
                      onMouseLeave={() => setHoveredBtn(null)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '14px 28px',
                        borderRadius: 8,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'background 150ms',
                        background:
                          hoveredBtn === `primary-${slide.id}`
                            ? '#1d4ed8'
                            : '#2563eb',
                        color: '#fff',
                        fontWeight: 700,
                        border: 'none',
                      }}
                    >
                      {slide.ctaPrimario}
                    </button>

                    {slide.fichaTecnicaUrl ? (
                      <a
                        href={slide.fichaTecnicaUrl}
                        download
                        onMouseEnter={() => setHoveredBtn(`secondary-${slide.id}`)}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '14px 28px',
                          borderRadius: 8,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          transition: 'background 150ms, border-color 150ms',
                          background:
                            hoveredBtn === `secondary-${slide.id}`
                              ? 'rgba(37, 99, 235, 0.1)'
                              : 'transparent',
                          color: '#60a5fa',
                          fontWeight: 600,
                          border: '1px solid rgba(37, 99, 235, 0.5)',
                        }}
                      >
                        {slide.ctaSecundario}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        onMouseEnter={() => setHoveredBtn(`secondary-${slide.id}`)}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '14px 28px',
                          borderRadius: 8,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          transition: 'background 150ms, border-color 150ms',
                          background:
                            hoveredBtn === `secondary-${slide.id}`
                              ? 'rgba(37, 99, 235, 0.1)'
                              : 'transparent',
                          color: '#60a5fa',
                          fontWeight: 600,
                          border: '1px solid rgba(37, 99, 235, 0.5)',
                        }}
                      >
                        {slide.ctaSecundario}
                      </button>
                    )}
                  </div>
                </div>

                {/* right column — glow and floating logo */}
                <div
                  className="hero-img-col"
                  style={{
                    width: '45%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    height: '100%'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                  }}>
                    {/* Glow circle detrás del logo */}
                    <div style={{
                      position: 'absolute',
                      width: '480px',
                      height: '480px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1
                    }} />

                    {/* Logo flotando */}
                    <Image
                      src={slide.logoUrl}
                      alt={slide.titulo}
                      width={420}
                      height={140}
                      style={{
                        objectFit: 'contain',
                        width: 'auto',
                        height: '140px',
                        filter: 'drop-shadow(0 0 30px rgba(37,99,235,0.5))',
                        animation: 'float 4s ease-in-out infinite',
                        position: 'relative',
                        zIndex: 2
                      }}
                    />
                  </div>
                </div>
              </div>{/* close hero-slide-inner */}
            </div>
          );
        })}

        {/* ── arrows ── */}
        <button
          type="button"
          className="hero-arrow"
          onClick={goPrev}
          aria-label="Slide anterior"
          onMouseEnter={() => setHoveredBtn('arrow-left')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            position: 'absolute',
            top: '50%',
            left: 24,
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background:
              hoveredBtn === 'arrow-left'
                ? 'rgba(37,99,235,0.3)'
                : 'rgba(255,255,255,0.08)',
            border:
              hoveredBtn === 'arrow-left'
                ? '1px solid #2563eb'
                : '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 200ms, border-color 200ms',
            zIndex: 10,
          }}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="hero-arrow"
          onClick={goToNext}
          aria-label="Slide siguiente"
          onMouseEnter={() => setHoveredBtn('arrow-right')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            position: 'absolute',
            top: '50%',
            right: 24,
            transform: 'translateY(-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background:
              hoveredBtn === 'arrow-right'
                ? 'rgba(37,99,235,0.3)'
                : 'rgba(255,255,255,0.08)',
            border:
              hoveredBtn === 'arrow-right'
                ? '1px solid #2563eb'
                : '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 200ms, border-color 200ms',
            zIndex: 10,
          }}
        >
          <ChevronRight size={22} />
        </button>

        {/* ── dots ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
            zIndex: 10,
          }}
        >
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir al slide ${idx + 1}`}
              style={{
                width: idx === currentSlide ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: idx === currentSlide ? '#2563eb' : '#1e293b',
                border: `1px solid ${idx === currentSlide ? '#2563eb' : '#334155'}`,
                cursor: 'pointer',
                padding: 0,
                transition: 'width 300ms, background 300ms, border-color 300ms',
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
