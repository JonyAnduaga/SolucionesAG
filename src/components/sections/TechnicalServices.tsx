'use client';

import {
  Download,
  Database,
  RefreshCw,
  Headphones,
  KeyRound,
  AlertCircle,
  Archive,
  Code2,
  ArrowRight,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';

interface TechItem {
  name: string;
  Icon: ComponentType<LucideProps>;
}

const items: TechItem[] = [
  { name: 'Instalaciones', Icon: Download },
  { name: 'Migraciones', Icon: Database },
  { name: 'Reinstalaciones', Icon: RefreshCw },
  { name: 'Soporte Técnico', Icon: Headphones },
  { name: 'Recuperación de Contraseñas', Icon: KeyRound },
  { name: 'Corrección de Errores', Icon: AlertCircle },
  { name: 'Compactación de BD', Icon: Archive },
  { name: 'Formatos a la Medida', Icon: Code2 },
];

export function TechnicalServices() {
  return (
    <section
      id="servicios"
      aria-labelledby="tech-title"
      className="py-24"
      style={{ backgroundColor: '#0B0F19' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p
              className="font-semibold uppercase"
              style={{
                color: '#2563EB',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
              }}
            >
              Servicios Técnicos
            </p>
            <h2
              id="tech-title"
              className="font-bold text-white"
              style={{ fontSize: '2rem', marginTop: '4px' }}
            >
              Servicios CONTPAQi
            </h2>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-1 text-sm hover:underline"
            style={{ color: '#2563EB' }}
          >
            Solicitar cotización <ArrowRight size={14} />
          </a>
        </div>

        <div
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
          style={{ marginTop: '48px' }}
        >
          {items.map(({ name, Icon }) => (
            <button
              type="button"
              key={name}
              className="group flex flex-col items-center text-center transition-colors duration-200"
              style={{
                backgroundColor: '#1A2235',
                border: '1px solid #1E293B',
                borderRadius: '10px',
                padding: '1.5rem 1rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.backgroundColor = '#1E2D4A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1E293B';
                e.currentTarget.style.backgroundColor = '#1A2235';
              }}
            >
              <Icon
                size={24}
                strokeWidth={1.75}
                style={{ color: '#94A3B8' }}
              />
              <span
                className="text-white"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  marginTop: '10px',
                }}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnicalServices;
