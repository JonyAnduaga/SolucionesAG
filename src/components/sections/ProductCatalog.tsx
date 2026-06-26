'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  logoUrl: string;
  logoGroup: 'horizontal' | 'square';
  fichaTecnicaUrl: string;
}

const productosEscritorio: Producto[] = [
  {
    id: 'contabilidad',
    nombre: 'Contabilidad',
    descripcion:
      'Sistema contable integral con cumplimiento fiscal SAT, CFDI, contabilidad electrónica y reportes financieros.',
    logoUrl: '/productos/escritorio/CONTPAQi_submarca_contabilidad_RGB_A.png',
    logoGroup: 'horizontal',
    fichaTecnicaUrl: '/fichas/desktop/Ficha_Producto_CONTPAQi_Contabilidad.pdf',
  },
  {
    id: 'nominas',
    nombre: 'Nóminas',
    descripcion:
      'Cálculo y timbrado de nómina conforme al SAT e IMSS, prestaciones, finiquitos y dispersión bancaria.',
    logoUrl: '/productos/escritorio/CONTPAQi_submarca_Nominas_RGB_A.png',
    logoGroup: 'horizontal',
    fichaTecnicaUrl: '/fichas/desktop/Ficha_Producto_CONTPAQi_Nominas.pdf',
  },
  {
    id: 'comercial-premium',
    nombre: 'Comercial Premium',
    descripcion:
      'Punto de venta, inventarios, facturación y CRM para comercios y distribuidores en crecimiento.',
    logoUrl:
      '/productos/escritorio/CONTPAQi_submarca_Comercial_Premium_RGB_A.png',
    logoGroup: 'horizontal',
    fichaTecnicaUrl:
      '/fichas/desktop/Ficha_Producto_CONTPAQi_Comercial_Premium.pdf',
  },
  {
    id: 'comercial-pro',
    nombre: 'Comercial Pro',
    descripcion:
      'Solución avanzada para empresas con operaciones comerciales complejas, multialmacén y multiempresa.',
    logoUrl: '/productos/escritorio/CONTPAQi_submarca_Comercial_Pro_RGB_A.png',
    logoGroup: 'horizontal',
    fichaTecnicaUrl:
      '/fichas/desktop/Ficha_Producto_CONTPAQi_Comercial_Pro.pdf',
  },
  {
    id: 'comercial-start',
    nombre: 'Comercial Start',
    descripcion:
      'La solución ideal para pequeños negocios que inician su digitalización con facturación e inventarios.',
    logoUrl:
      '/productos/escritorio/CONTPAQi_submarca_Comercial_Start_RGB_A.png',
    logoGroup: 'horizontal',
    fichaTecnicaUrl:
      '/fichas/desktop/Ficha_Producto_CONTPAQi_Comercial_Start.pdf',
  },
  {
    id: 'factura-electronica',
    nombre: 'Factura Electrónica',
    descripcion:
      'Timbrado de CFDI 4.0 ilimitado, complementos de pago y cancelaciones conforme al SAT.',
    logoUrl: encodeURI(
      '/productos/escritorio/CONTPAQi_submarca_Factura electronica_RGB_A.png',
    ),
    logoGroup: 'horizontal',
    fichaTecnicaUrl:
      '/fichas/desktop/Ficha_Producto_CONTPAQi_Factura_Electronica.pdf',
  },
  {
    id: 'xml-en-linea',
    nombre: 'XML en Línea+',
    descripcion:
      'Descarga, almacena y administra tus archivos XML del SAT de forma automática y ordenada.',
    logoUrl: encodeURI(
      '/productos/escritorio/CONTPAQi_submarca_XML en linea+_RGB_A.png',
    ),
    logoGroup: 'horizontal',
    fichaTecnicaUrl: '/fichas/desktop/Ficha_Producto_CONTPAQi_XML_en_Linea.pdf',
  },
];

const productosNube: Producto[] = [
  {
    id: 'contpaqi-vende',
    nombre: 'CONTPAQi Vende',
    descripcion:
      'Punto de venta en la nube para tiendas modernas con múltiples cajas y catálogos sincronizados.',
    logoUrl: '/productos/nube/Logo-CONTPAQi-Vende_Negativo.png',
    logoGroup: 'square',
    fichaTecnicaUrl: '/fichas/nube/Ficha_de_Producto_CONTPAQi_Vende.pdf',
  },
  {
    id: 'contpaqi-personia',
    nombre: 'CONTPAQi Personia',
    descripcion:
      'Gestión de capital humano en la nube: recibos digitales, expediente único y autoservicio del colaborador.',
    logoUrl: encodeURI('/productos/nube/Logo CONTPAQi Personia_Negativo.png'),
    logoGroup: 'square',
    fichaTecnicaUrl: '/fichas/nube/Ficha_de_Producto_CONTPAQi_Personia.pdf',
  },
  {
    id: 'contpaqi-contabiliza',
    nombre: 'CONTPAQi Contabiliza',
    descripcion:
      'Contabilidad básica en la nube ideal para emprendedores y despachos pequeños. Conciliación automática.',
    logoUrl: encodeURI(
      '/productos/nube/Logo CONTPAQi Contabiliza_Mesa de trabajo 1.png',
    ),
    logoGroup: 'square',
    fichaTecnicaUrl: '/fichas/nube/Ficha_de_Producto_CONTPAQi_Contabiliza.pdf',
  },
  {
    id: 'contpaqi-anticipa',
    nombre: 'CONTPAQi Anticipa',
    descripcion:
      'Solución de anticipos y pagos en la nube para gestionar cobros anticipados de forma eficiente.',
    logoUrl: encodeURI('/productos/nube/CONTPAQi Anticipa Logo-02.png'),
    logoGroup: 'horizontal',
    fichaTecnicaUrl: '/fichas/nube/Ficha_de_Producto_CONTPAQi_Anticipa.pdf',
  },
  {
    id: 'contpaqi-colabora',
    nombre: 'CONTPAQi Colabora',
    descripcion:
      'Plataforma colaborativa en la nube para compartir información contable con clientes y despachos.',
    logoUrl: '/productos/nube/Logo_CONTPAQi_Colabora-01.png',
    logoGroup: 'horizontal',
    fichaTecnicaUrl: '/fichas/nube/Ficha_de_Producto_CONTPAQi_Colabora.pdf',
  },
  {
    id: 'contpaqi-optimiza',
    nombre: 'CONTPAQi Optimiza',
    descripcion:
      'Herramienta de análisis y optimización de procesos administrativos en la nube para PyMEs.',
    logoUrl: encodeURI('/productos/nube/CONTPAQi Optimiza Logo-02.png'),
    logoGroup: 'horizontal',
    fichaTecnicaUrl: '/fichas/nube/Ficha_de_Producto_CONTPAQi_Optimiza.pdf',
  },
];

function ProductCard({ producto }: { producto: Producto }) {
  return (
    <div
      style={{
        background: '#1A2235',
        border: '1px solid #1E293B',
        borderRadius: '10px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '220px',
        transition: 'border-color 200ms, transform 200ms',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#2563EB';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1E293B';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Contenedor logo */}
      <div
        style={{
          width: '100%',
          height: '110px',
          background: 'transparent',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '8px',
          paddingRight: '8px',
          marginBottom: '16px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={producto.logoUrl}
          alt={producto.nombre}
          width={260}
          height={producto.logoGroup === 'square' ? 90 : 70}
          style={{
            objectFit: 'contain',
            objectPosition: 'left center',
            height: producto.logoGroup === 'square' ? '90px' : '70px',
            width: 'auto',
            maxWidth: '100%',
            transition: 'filter 300ms ease, transform 300ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.2)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </div>

      {/* Descripción */}
      <p
        style={{
          color: '#94A3B8',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          flexGrow: 1,
          margin: 0,
        }}
      >
        {producto.descripcion}
      </p>

      {producto.fichaTecnicaUrl ? (
        <a
          href={producto.fichaTecnicaUrl}
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: '#3B82F6',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginTop: '16px',
            textDecoration: 'none',
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#60A5FA';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#3B82F6';
          }}
        >
          Ficha Técnica →
        </a>
      ) : (
        <span
          style={{
            color: '#4B5563',
            fontSize: '0.875rem',
            marginTop: '16px',
            fontStyle: 'italic',
            cursor: 'not-allowed',
          }}
        >
          Ficha Técnica (próximamente)
        </span>
      )}
    </div>
  );
}

function useVisibleCount(): number {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else setCount(3);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return count;
}

interface ProductSliderProps {
  productos: Producto[];
}

function ProductSlider({ productos }: ProductSliderProps) {
  const visibleCount = useVisibleCount();
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(productos.length - visibleCount, 0);

  // Reajustar currentIndex si cambia visibleCount y se pasa del máximo
  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [currentIndex, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const totalWidthPct = (productos.length / visibleCount) * 100;

  const atStart = currentIndex === 0;
  const atEnd = currentIndex >= maxIndex;

  return (
    <div style={{ position: 'relative' }}>
      {/* Flecha izquierda */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={handlePrev}
        disabled={atStart}
        style={{
          position: 'absolute',
          left: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: atStart ? '#1E293B' : '#2563EB',
          border: '1px solid #1E293B',
          color: atStart ? '#4B5563' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: atStart ? 'not-allowed' : 'pointer',
          transition: 'all 200ms',
        }}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Track con overflow hidden */}
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            width: `${totalWidthPct}%`,
            transform: `translateX(-${(currentIndex / productos.length) * 100}%)`,
            transition: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {productos.map((producto) => (
            <div
              key={producto.id}
              style={{
                flex: `0 0 ${100 / productos.length}%`,
                paddingLeft: '8px',
                paddingRight: '8px',
                boxSizing: 'border-box',
              }}
            >
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      </div>

      {/* Flecha derecha */}
      <button
        type="button"
        aria-label="Siguiente"
        onClick={handleNext}
        disabled={atEnd}
        style={{
          position: 'absolute',
          right: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: atEnd ? '#1E293B' : '#2563EB',
          border: '1px solid #1E293B',
          color: atEnd ? '#4B5563' : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: atEnd ? 'not-allowed' : 'pointer',
          transition: 'all 200ms',
        }}
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '24px',
        }}
      >
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a la página ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: currentIndex === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: currentIndex === i ? '#2563EB' : '#1E293B',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 300ms',
              padding: 0,
            }}
          />
        ))}
      </div>

    </div>
  );
}

export function ProductCatalog() {
  return (
    <section
      id="productos"
      aria-labelledby="catalog-title"
      className="py-24"
      style={{ backgroundColor: '#111827' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p
            className="font-semibold uppercase"
            style={{
              color: '#2563EB',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
            }}
          >
            Productos
          </p>
          <h2
            id="catalog-title"
            className="text-white"
            style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '12px' }}
          >
            Catálogo de Productos
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl"
            style={{ color: '#94A3B8' }}
          >
            Soluciones de escritorio y nube para cada necesidad empresarial.
          </p>
        </div>

        {/* Escritorio */}
        <div
          style={{
            borderLeft: '3px solid #2563EB',
            paddingLeft: '14px',
            margin: '48px 0 24px',
          }}
        >
          <h3
            className="text-white"
            style={{ fontSize: '1.1rem', fontWeight: 600 }}
          >
            Sistemas de Escritorio
          </h3>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '0.85rem',
              marginTop: '2px',
            }}
          >
            Instalación local con poder profesional para tu equipo contable.
          </p>
        </div>
        <div style={{ padding: '0 24px' }}>
          <ProductSlider productos={productosEscritorio} />
        </div>

        {/* Nube */}
        <div
          style={{
            borderLeft: '3px solid #2563EB',
            paddingLeft: '14px',
            margin: '48px 0 24px',
          }}
        >
          <h3
            className="text-white"
            style={{ fontSize: '1.1rem', fontWeight: 600 }}
          >
            Sistemas Nube
          </h3>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '0.85rem',
              marginTop: '2px',
            }}
          >
            Acceso desde cualquier lugar, actualizaciones automáticas, sin
            servidores propios.
          </p>
        </div>
        <div style={{ padding: '0 24px' }}>
          <ProductSlider productos={productosNube} />
        </div>
      </div>
    </section>
  );
}

export default ProductCatalog;
