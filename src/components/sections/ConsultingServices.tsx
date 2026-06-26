'use client';

import { Settings2, GraduationCap, TrendingUp } from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  Icon: ComponentType<LucideProps>;
  color: string;
}

const services: Service[] = [
  {
    title: 'Implementación',
    description:
      'Configuración estratégica de sistemas desde cero, asegurando que la estructura de datos se alinee con los objetivos fiscales y comerciales de tu empresa.',
    Icon: Settings2,
    color: '#2563EB',
  },
  {
    title: 'Capacitación',
    description:
      'Programas de entrenamiento continuo para tu personal. Cursos presenciales y remotos para dominar las actualizaciones fiscales y operativas.',
    Icon: GraduationCap,
    color: '#8B5CF6',
  },
  {
    title: 'Mejora de Procesos',
    description:
      'Análisis de flujos administrativos para eliminar cuellos de botella, reducir errores de captura y acelerar la toma de decisiones gerenciales.',
    Icon: TrendingUp,
    color: '#22C55E',
  },
];

function hexToRgba(hex: string, alpha: number): string {
  const v = hex.replace('#', '');
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ConsultingServices() {
  return (
    <section
      id="consultoria"
      aria-labelledby="consulting-title"
      className="py-24"
      style={{ backgroundColor: '#111827' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2
            id="consulting-title"
            className="font-bold text-white"
            style={{ fontSize: '2.25rem' }}
          >
            Consultoría de Negocios
          </h2>
          <p
            className="mt-2"
            style={{ color: '#94A3B8' }}
          >
            Optimización integral de procesos administrativos y operativos.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          style={{ marginTop: '64px' }}
        >
          {services.map(({ title, description, Icon, color }) => (
            <article
              key={title}
              className="transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#1A2235',
                border: '1px solid #1E293B',
                borderRadius: '12px',
                padding: '2rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1E293B';
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  backgroundColor: hexToRgba(color, 0.15),
                  color,
                  marginBottom: '20px',
                }}
              >
                <Icon size={24} strokeWidth={2} />
              </div>
              <h3
                className="text-white"
                style={{ fontSize: '1.1rem', fontWeight: 600 }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: '#94A3B8',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginTop: '12px',
                }}
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ConsultingServices;
