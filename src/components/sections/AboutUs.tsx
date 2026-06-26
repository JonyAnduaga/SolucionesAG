'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

const badges = [
  'Certificado CONTPAQi',
  'Partner iiNube',
  'Auditoría IT',
];

export function AboutUs() {
  return (
    <section
      id="nosotros"
      aria-labelledby="about-title"
      className="py-24"
      style={{ backgroundColor: '#0B0F19' }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Imagen fundador */}
        <div className="order-2 lg:order-1">
          <div
            className="mx-auto w-full max-w-[480px]"
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              aspectRatio: '3/4',
            }}
          >
            <Image
              src="/founder.png"
              alt="Fundador Soluciones AG"
              fill
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'grayscale(100%)',
                transform: 'scale(1)',
                transition: 'filter 600ms ease, transform 600ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'grayscale(0%)';
                e.currentTarget.style.transform = 'scale(1.07)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'grayscale(100%)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            {/* Badge 15+ años */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                background: 'rgba(13, 17, 27, 0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                padding: '12px 16px',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  color: '#F1F5F9',
                  fontSize: '2rem',
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                15+
              </div>
              <div
                style={{
                  color: '#94A3B8',
                  fontSize: '0.8rem',
                  marginTop: '4px',
                }}
              >
                Años de
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                Experiencia
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="order-1 lg:order-2">
          <p
            className="font-semibold uppercase"
            style={{
              color: '#2563EB',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              marginBottom: '12px',
            }}
          >
            Sobre Nosotros
          </p>
          <h2
            id="about-title"
            className="text-white"
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            Expertos certificados en
            <br />
            soluciones de negocio
          </h2>

          <p style={{ color: '#94A3B8', lineHeight: 1.75 }}>
            Fundada por el Ing. Rene Acosta Gomez, Soluciones AG nace con la
            misión de transformar la gestión administrativa de las PyMEs
            mexicanas. No solo vendemos software; nos integramos a tu equipo
            para asegurar que la tecnología trabaje para ti.
          </p>
          <p
            style={{
              color: '#94A3B8',
              lineHeight: 1.75,
              marginTop: '16px',
            }}
          >
            Nuestro enfoque personalizado garantiza que cada implementación de
            CONTPAQi se adapte específicamente a los flujos de trabajo de tu
            empresa.
          </p>

          <div
            className="flex flex-wrap gap-3"
            style={{ marginTop: '32px' }}
          >
            {badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2"
                style={{
                  backgroundColor: '#1A2235',
                  border: '1px solid #1E293B',
                  borderRadius: '20px',
                  padding: '6px 14px',
                }}
              >
                <CheckCircle2
                  size={14}
                  strokeWidth={2.5}
                  style={{ color: '#22C55E' }}
                />
                <span
                  className="text-white"
                  style={{ fontSize: '13px' }}
                >
                  {b}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
