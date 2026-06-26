'use client';

import { Monitor, Cloud, Shield, Server } from 'lucide-react';
import { usePathname } from 'next/navigation';

const partners = [
  {
    nombre: 'CONTPAQi',
    icono: <Monitor size={16} />,
    color: '#0066CC',
    fontWeight: 700,
    href: 'productos'
  },
  {
    nombre: 'iiNube',
    icono: <Cloud size={16} />,
    color: '#0066CC',
    fontWeight: 700,
    href: 'nube'
  },
  {
    nombre: 'ESET NOD32',
    icono: <Shield size={16} />,
    color: '#0066CC',
    fontWeight: 700,
    href: 'nube'
  },
  {
    nombre: 'TSPlus',
    icono: <Server size={16} />,
    color: '#0066CC',
    fontWeight: 700,
    href: 'nube'
  }
];

export function BrandingBar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const getHref = (anchor: string) =>
    isHome ? `#${anchor}` : `/#${anchor}`;

  return (
    <div style={{
      background: '#0D1117',
      borderTop: '1px solid #1E293B',
      borderBottom: '1px solid #1E293B',
      height: '56px',
      overflow: 'hidden',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Track con doble lista para loop infinito */}
      <div className="marquee-track">
        {[...partners, ...partners, ...partners].map((p, i) => (
          <a
            key={i}
            href={getHref(p.href)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0 48px',
              cursor: 'pointer',
              transition: 'opacity 200ms',
              opacity: 0.7,
              textDecoration: 'none'
            }}
            onMouseEnter={e =>
              e.currentTarget.style.opacity = '1'
            }
            onMouseLeave={e =>
              e.currentTarget.style.opacity = '0.7'
            }
          >
            {/* Ícono con color de marca */}
            <span style={{ color: p.color }}>
              {p.icono}
            </span>

            {/* Nombre con color de marca */}
            <span style={{
              color: p.color,
              fontWeight: p.fontWeight,
              fontSize: '0.875rem',
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-montserrat), sans-serif'
            }}>
              {p.nombre}
            </span>

            {/* Separador entre partners */}
            <span style={{
              color: '#1E293B',
              marginLeft: '48px',
              fontSize: '1.2rem',
              fontWeight: 100
            }}>
              |
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default BrandingBar;
