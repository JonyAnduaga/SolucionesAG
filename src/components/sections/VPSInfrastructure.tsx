'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cloud } from 'lucide-react';

const benefits = [
  'Acceso 24/7 desde cualquier lugar (Windows, Mac, Android)',
  'Respaldos automáticos diarios y seguridad bancaria',
  'Infraestructura escalable sin inversión inicial en hardware',
];

export function VPSInfrastructure() {
  return (
    <section
      id="nube"
      aria-labelledby="vps-title"
      className="py-24"
      style={{ backgroundColor: '#0B0F19' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[60%_40%]">
          {/* Columna izquierda */}
          <div>
            <span
              className="inline-flex items-center gap-1.5 font-semibold uppercase"
              style={{
                color: '#2563EB',
                border: '1px solid #2563EB',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
              }}
            >
              <Cloud size={12} strokeWidth={2.5} />
              Partner Autorizado iiNube
            </span>

            <h2
              id="vps-title"
              className="text-white"
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                lineHeight: 1.15,
                margin: '20px 0',
              }}
            >
              Lleva tu oficina a
              <br />
              cualquier lugar
            </h2>

            <p
              style={{
                color: '#94A3B8',
                lineHeight: 1.75,
                marginBottom: '32px',
              }}
            >
              Olvídate de servidores físicos costosos. Con nuestros Servicios
              de Nube iiNube, accede a tus sistemas CONTPAQi desde cualquier
              dispositivo con internet, con la seguridad y velocidad que tu
              empresa necesita.
            </p>

            <ul className="space-y-0">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center"
                  style={{ gap: '10px', margin: '10px 0' }}
                >
                  <span
                    aria-hidden
                    className="animate-pulse-glow inline-block shrink-0 rounded-full"
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#22C55E',
                    }}
                  />
                  <span style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/cotizador-vps"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#2563EB',
                fontWeight: 500,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'color 150ms'
              }}
              onMouseEnter={e =>
                e.currentTarget.style.color = '#60A5FA'
              }
              onMouseLeave={e =>
                e.currentTarget.style.color = '#2563EB'
              }
            >
              Cotizar Servidor Virtual <ArrowRight size={16} />
            </Link>
          </div>

          {/* Columna derecha */}
          <div style={{
            width: '100%',
            aspectRatio: '1/1',
            maxWidth: '500px',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
          }}>
            <Image
              src="/promo-nube.png"
              alt="Tu sistema CONTPAQi siempre disponible en la nube - Soluciones AG"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 600ms ease',
              }}
              onMouseEnter={e =>
                e.currentTarget.style.transform = 'scale(1.04)'
              }
              onMouseLeave={e =>
                e.currentTarget.style.transform = 'scale(1)'
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VPSInfrastructure;
