'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import type { NavLink } from '@/types';

const links: NavLink[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Consultoría', href: '#consultoria' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Productos', href: '#productos' },
  { label: 'Nube', href: '#nube' },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="Soluciones AG - Consultoría y Soluciones Empresariales"
        width={44}
        height={44}
        priority
        style={{ objectFit: 'contain' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Línea principal */}
        <span
          style={{
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontWeight: 900,
            fontSize: '17px',
            color: '#F1F5F9',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          SOLUCIONES{' '}
          <span>
            A<span style={{ color: '#FFFFFF', fontWeight: 900 }}></span>G
          </span>
        </span>
        {/* Subtítulo CONSULTORÍA */}
        <span
          style={{
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontWeight: 500,
            fontSize: '7px',
            color: '#64748B',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginTop: '2px',
            whiteSpace: 'nowrap',
          }}
        >
          CONSULTORÍA Y SOLUCIONES EMPRESARIALES
        </span>
      </div>
    </div>
  );
}

const HOVER_SHADOW =
  '0 0 8px rgba(96,165,250,0.8), 0 0 20px rgba(59,130,246,0.4)';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const getHref = (anchor: string) => {
    return isHome ? `#${anchor}` : `/#${anchor}`;
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: '#0B0F19',
        borderBottom: '1px solid #1E293B',
        height: '60px',
      }}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-full items-center justify-between px-6"
        style={{ maxWidth: '1280px' }}
      >
        <Link
          href="/"
          aria-label="Inicio"
          className="focus:outline-none"
        >
          <LogoMark />
        </Link>

        <ul
          className="hidden items-center md:flex"
          style={{ gap: '24px' }}
        >
          {[
            { label: 'Inicio', anchor: 'inicio' },
            { label: 'Nosotros', anchor: 'nosotros' },
            { label: 'Consultoría', anchor: 'consultoria' },
            { label: 'Servicios', anchor: 'servicios' },
            { label: 'Productos', anchor: 'productos' },
            { label: 'Nube', anchor: 'nube' }
          ].map(link => (
            <li key={link.label}>
              <a
                href={getHref(link.anchor)}
                onClick={(e) => handleClick(e, getHref(link.anchor))}
                style={{
                  color: '#94A3B8',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  textDecoration: 'none',
                  paddingBottom: '4px',
                  borderBottom: '2px solid transparent',
                  transition: 'all 250ms ease',
                  whiteSpace: 'nowrap'
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
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botones lado derecho */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/quiero-ser-partner">
            <button className="cursor-pointer whitespace-nowrap rounded-md border border-blue-600 px-3.5 py-1.5 text-sm font-medium text-blue-500 transition-all duration-150 hover:bg-blue-600 hover:text-white">
              Quiero ser Partner
            </button>
          </Link>
          <a
            href={getHref('contacto')}
            onClick={(e) => handleClick(e, getHref('contacto'))}
            className="cursor-pointer whitespace-nowrap rounded-md border border-blue-600 px-3.5 py-1.5 text-sm font-medium text-blue-500 transition-all duration-150 hover:bg-blue-600 hover:text-white"
          >
            Contacto
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Drawer móvil */}
      <div
        className={[
          'fixed inset-0 z-40 transition-opacity duration-300 md:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={[
            'absolute right-0 top-0 h-full shadow-2xl transition-transform duration-300',
            open ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
          style={{
            width: '260px',
            backgroundColor: '#111827',
            borderLeft: '1px solid #1E293B',
          }}
        >
          <div
            className="flex items-center px-5"
            style={{ height: '60px', borderBottom: '1px solid #1E293B' }}
          >
            <LogoMark />
          </div>
          <ul className="flex flex-col gap-1 p-4">
            {[
              { label: 'Inicio', anchor: 'inicio' },
              { label: 'Nosotros', anchor: 'nosotros' },
              { label: 'Consultoría', anchor: 'consultoria' },
              { label: 'Servicios', anchor: 'servicios' },
              { label: 'Productos', anchor: 'productos' },
              { label: 'Nube', anchor: 'nube' }
            ].map(link => (
              <li key={link.label}>
                <a
                  href={getHref(link.anchor)}
                  onClick={(e) => handleClick(e, getHref(link.anchor))}
                  className="block rounded-lg px-4 py-3 transition-colors hover:bg-bg-card hover:text-white"
                  style={{
                    color: '#94A3B8',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-3">
              <Link href="/quiero-ser-partner">
                <button
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-md border border-blue-600 px-3.5 py-2 text-center text-sm font-medium text-blue-500 transition-all duration-150 hover:bg-blue-600 hover:text-white"
                >
                  Quiero ser Partner
                </button>
              </Link>
            </li>
            <li className="mt-2">
              <a
                href={getHref('contacto')}
                onClick={(e) => handleClick(e, getHref('contacto'))}
                className="block w-full rounded-md border border-blue-600 px-3.5 py-2 text-center text-sm font-medium text-blue-500 transition-all duration-150 hover:bg-blue-600 hover:text-white"
              >
                Contacto
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </header>
  );
}

export default Navbar;
