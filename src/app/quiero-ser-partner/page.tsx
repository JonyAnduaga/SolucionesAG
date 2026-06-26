'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import ReCAPTCHA from 'react-google-recaptcha'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import {
  ArrowLeft, BookOpen, Users, Cpu,
  GraduationCap, Headphones, TrendingUp,
  Star, Shield, ShoppingCart, Settings,
  RefreshCw, ClipboardList, Rocket,
  Check, UserCheck
} from 'lucide-react'

/* ──────────────────────────────────────────────
   Datos
   ────────────────────────────────────────────── */

const perfiles = [
  {
    icono: BookOpen,
    color: '#3B82F6',
    titulo: 'Despachos Contables',
    descripcion:
      'Firmas y despachos que buscan ampliar su portafolio de servicios incorporando soluciones tecnológicas empresariales CONTPAQi®.',
  },
  {
    icono: Users,
    color: '#22C55E',
    titulo: 'Contadores Independientes',
    descripcion:
      'Profesionales contables independientes que desean evolucionar hacia un modelo de consultoría tecnológica y generar ingresos adicionales.',
  },
  {
    icono: Cpu,
    color: '#8B5CF6',
    titulo: 'Profesionales de Sistemas',
    descripcion:
      'Especialistas en tecnología que quieren incorporar software empresarial a su oferta de servicios con el respaldo de Soluciones AG.',
  },
]

const beneficios = [
  {
    numero: '01',
    icono: GraduationCap,
    color: '#3B82F6',
    titulo: 'Capacitación técnica y funcional',
    descripcion:
      'Formación sobre los sistemas CONTPAQi®, su funcionamiento, implementación y mejores prácticas para atender a tus clientes con excelencia.',
  },
  {
    numero: '02',
    icono: UserCheck,
    color: '#22C55E',
    titulo: 'Acompañamiento en proyectos',
    descripcion:
      'Apoyo en la implementación inicial con clientes para asegurar una correcta instalación y configuración de los sistemas.',
  },
  {
    numero: '03',
    icono: Headphones,
    color: '#8B5CF6',
    titulo: 'Soporte especializado',
    descripcion:
      'Acceso a respaldo técnico para resolver incidencias o dudas durante el uso de los sistemas en tus proyectos.',
  },
  {
    numero: '04',
    icono: TrendingUp,
    color: '#F59E0B',
    titulo: 'Modelo de negocio escalable',
    descripcion:
      'Genera ingresos mediante venta de licencias, servicios de implementación, capacitación, soporte y mantenimiento a tus clientes.',
  },
  {
    numero: '05',
    icono: Star,
    color: '#EC4899',
    titulo: 'Desarrollo profesional',
    descripcion:
      'Evoluciona hacia un modelo de consultoría tecnológica empresarial, ampliando tus servicios y tu valor como profesional.',
  },
  {
    numero: '06',
    icono: Shield,
    color: '#14B8A6',
    titulo: 'Respaldo de experiencia',
    descripcion:
      'Soluciones AG acompaña a los socios en proyectos complejos, sin que tengas que enfrentar implementaciones difíciles sin apoyo.',
  },
]

const fuentes = [
  {
    icono: ShoppingCart,
    color: '#3B82F6',
    titulo: 'Venta de licencias',
    descripcion: 'Comercializa los sistemas CONTPAQi® con márgenes atractivos.',
  },
  {
    icono: Settings,
    color: '#22C55E',
    titulo: 'Implementación',
    descripcion: 'Cobra por la configuración e instalación de los sistemas.',
  },
  {
    icono: GraduationCap,
    color: '#8B5CF6',
    titulo: 'Capacitación',
    descripcion: 'Ofrece cursos y entrenamientos a los usuarios de tus clientes.',
  },
  {
    icono: Headphones,
    color: '#F59E0B',
    titulo: 'Soporte técnico',
    descripcion: 'Brinda pólizas de soporte mensual o anual a tu cartera.',
  },
  {
    icono: RefreshCw,
    color: '#EC4899',
    titulo: 'Actualizaciones',
    descripcion: 'Gestiona renovaciones y mantenimiento de licencias activas.',
  },
]

const pasos = [
  {
    numero: 1,
    icono: ClipboardList,
    color: '#3B82F6',
    titulo: 'Solicita información',
    descripcion:
      'Llena el formulario y cuéntanos sobre tu perfil profesional y tus objetivos de negocio.',
  },
  {
    numero: 2,
    icono: GraduationCap,
    color: '#22C55E',
    titulo: 'Capacitación y onboarding',
    descripcion:
      'Recibirás formación técnica y funcional sobre los sistemas CONTPAQi® con acompañamiento de nuestro equipo.',
  },
  {
    numero: 3,
    icono: Rocket,
    color: '#8B5CF6',
    titulo: '¡Comienza a crecer!',
    descripcion:
      'Empieza a ofrecer soluciones CONTPAQi® a tus clientes con el respaldo completo de Soluciones AG.',
  },
]

/* ──────────────────────────────────────────────
   Helpers reutilizables
   ────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: 'rgba(37,99,235,0.15)',
        border: '1px solid rgba(37,99,235,0.4)',
        color: '#60A5FA',
        borderRadius: '20px',
        padding: '6px 16px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}
    >
      {children}
    </span>
  )
}

/* ──────────────────────────────────────────────
   Página
   ────────────────────────────────────────────── */

export default function QuieroSerPartner() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    perfil: '',
    experiencia: '',
    mensaje: '',
    website: '', // honeypot
  })
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  /* ── Captcha state ── */
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.website) return // bot

    if (!captchaToken) return // recaptcha

    setEnviando(true)
    // Simular envío
    await new Promise((r) => setTimeout(r, 1200))
    setEnviando(false)
    setEnviado(true)
  }

  /* ── Estilos inline reutilizados ── */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0B0F19',
    border: '1px solid #1E293B',
    borderRadius: '6px',
    color: '#F1F5F9',
    padding: '10px 14px',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 200ms ease',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#94A3B8',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '6px',
    fontWeight: 500,
  }

  return (
    <main style={{ background: '#0B0F19', minHeight: '100vh' }}>
      <Navbar />

      {/* Botón volver */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '24px 48px 0',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#94A3B8',
            fontSize: '0.875rem',
            textDecoration: 'none',
            paddingBottom: '4px',
            borderBottom: '2px solid transparent',
            transition: 'all 250ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.textShadow =
              '0 0 8px rgba(96,165,250,0.8), 0 0 20px rgba(59,130,246,0.4)'
            e.currentTarget.style.borderBottomColor = '#2563EB'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#94A3B8'
            e.currentTarget.style.textShadow = 'none'
            e.currentTarget.style.borderBottomColor = 'transparent'
          }}
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>
      </div>

      {/* ────────────────────────────────────────
          [1] HERO
          ──────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        width: '100%',
        minHeight: '580px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>

        {/* Imagen de fondo */}
        <Image
          src="/hero-partner.png"
          alt="Partnership CONTPAQi Soluciones AG"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
            filter: 'brightness(0.45)'
          }}
        />

        {/* Overlay gradiente */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(11,15,25,0.5) 0%, rgba(11,15,25,0.85) 100%)',
          zIndex: 1
        }} />

        {/* Contenido */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '100px 24px'
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
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            PROGRAMA DE SOCIOS DISTRIBUIDORES
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
            Conviértete en distribuidor
            CONTPAQi® y haz crecer
            tus ingresos
          </h1>

          {/* Subtítulo */}
          <p style={{
            color: '#CBD5E1',
            fontSize: '1.1rem',
            lineHeight: 1.75,
            marginBottom: '40px',
            maxWidth: '620px',
            margin: '0 auto 40px'
          }}>
            Soluciones AG desarrolla un programa de
            colaboración orientado a despachos contables,
            contadores independientes y profesionales de
            sistemas que desean ampliar sus servicios.
          </p>

          {/* Botón CTA */}
          <button
            onClick={() => {
              document.getElementById('formulario-partner')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              background: '#2563EB',
              color: 'white',
              padding: '14px 36px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 150ms',
              boxShadow: '0 8px 24px rgba(37,99,235,0.4)'
            }}
            onMouseEnter={e =>
              e.currentTarget.style.background = '#1D4ED8'
            }
            onMouseLeave={e =>
              e.currentTarget.style.background = '#2563EB'
            }
          >
            Quiero ser Partner
          </button>

        </div>
      </section>

      {/* ────────────────────────────────────────
          [2] ¿A QUIÉN VA DIRIGIDO?
          ──────────────────────────────────────── */}
      <section style={{ background: '#111827', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionLabel>PROGRAMA DE COLABORACIÓN</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontWeight: 900,
                fontSize: '2.25rem',
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
              }}
            >
              ¿A quién va dirigido?
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="partner-grid-3"
          >
            {perfiles.map((p) => {
              const Icon = p.icono
              return (
                <div
                  key={p.titulo}
                  style={{
                    background: '#1A2235',
                    border: '1px solid #1E293B',
                    borderRadius: '12px',
                    padding: '2rem',
                    transition: 'border-color 250ms ease, transform 250ms ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = p.color
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1E293B'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      background: `${p.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color={p.color} />
                  </div>
                  <h3
                    style={{
                      color: '#F1F5F9',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      marginTop: '16px',
                      marginBottom: '0',
                    }}
                  >
                    {p.titulo}
                  </h3>
                  <p
                    style={{
                      color: '#94A3B8',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      marginTop: '8px',
                    }}
                  >
                    {p.descripcion}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          [3] BENEFICIOS
          ──────────────────────────────────────── */}
      <section style={{ background: '#0B0F19', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionLabel>PRINCIPALES BENEFICIOS</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontWeight: 900,
                fontSize: '2.25rem',
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Beneficios de ser socio distribuidor
            </h2>
            <p
              style={{
                color: '#94A3B8',
                fontSize: '1rem',
                maxWidth: '620px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Al integrarse al programa, los socios obtienen acompañamiento para
              desarrollar su negocio de soluciones empresariales.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="partner-grid-benefits"
          >
            {beneficios.map((b) => {
              const Icon = b.icono
              return (
                <div
                  key={b.numero}
                  style={{
                    background: '#1A2235',
                    border: '1px solid #1E293B',
                    borderRadius: '10px',
                    padding: '1.75rem',
                    transition: 'border-color 250ms ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = b.color)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = '#1E293B')
                  }
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        color: `${b.color}4D`,
                        fontWeight: 900,
                        fontSize: '1.5rem',
                        lineHeight: 1,
                      }}
                    >
                      {b.numero}
                    </span>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: `${b.color}26`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} color={b.color} />
                    </div>
                  </div>
                  <h3
                    style={{
                      color: '#F1F5F9',
                      fontWeight: 600,
                      fontSize: '1rem',
                      marginTop: '16px',
                      marginBottom: '0',
                    }}
                  >
                    {b.titulo}
                  </h3>
                  <p
                    style={{
                      color: '#94A3B8',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      marginTop: '8px',
                    }}
                  >
                    {b.descripcion}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          [4] MODELO DE INGRESOS
          ──────────────────────────────────────── */}
      <section style={{ background: '#111827', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionLabel>OPORTUNIDADES DE NEGOCIO</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontWeight: 900,
                fontSize: '2.25rem',
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              5 formas de generar ingresos
            </h2>
            <p
              style={{
                color: '#94A3B8',
                fontSize: '1rem',
                maxWidth: '580px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Como socio distribuidor puedes monetizar tu relación con cada cliente de
              múltiples formas.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '20px',
            }}
            className="partner-grid-ingresos"
          >
            {fuentes.map((f) => {
              const Icon = f.icono
              return (
                <div
                  key={f.titulo}
                  style={{
                    background: '#1A2235',
                    border: '1px solid #1E293B',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    transition: 'border-color 250ms ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = f.color)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = '#1E293B')
                  }
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      margin: '0 auto',
                      borderRadius: '12px',
                      background: `${f.color}26`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={24} color={f.color} />
                  </div>
                  <h3
                    style={{
                      color: '#F1F5F9',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      marginTop: '12px',
                      marginBottom: '0',
                    }}
                  >
                    {f.titulo}
                  </h3>
                  <p
                    style={{
                      color: '#94A3B8',
                      fontSize: '0.8rem',
                      lineHeight: 1.55,
                      marginTop: '6px',
                    }}
                  >
                    {f.descripcion}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          [5] PROCESO
          ──────────────────────────────────────── */}
      <section style={{ background: '#0B0F19', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <SectionLabel>¿CÓMO EMPEZAR?</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontWeight: 900,
                fontSize: '2.25rem',
                color: '#F1F5F9',
                letterSpacing: '-0.02em',
              }}
            >
              Proceso para ser Partner
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '48px',
              position: 'relative',
            }}
            className="partner-grid-process"
          >
            {/* Línea conectora desktop */}
            <div
              className="partner-process-line"
              style={{
                position: 'absolute',
                top: '28px',
                left: 'calc(16.66% + 28px)',
                right: 'calc(16.66% + 28px)',
                height: '1px',
                background: '#1E293B',
              }}
            />

            {pasos.map((p) => {
              const Icon = p.icono
              return (
                <div
                  key={p.numero}
                  style={{
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {/* Círculo */}
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: p.color,
                      margin: '0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        color: '#FFFFFF',
                        fontWeight: 900,
                        fontSize: '1.25rem',
                      }}
                    >
                      {p.numero}
                    </span>
                  </div>

                  {/* Ícono */}
                  <div
                    style={{
                      marginTop: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={28} color={p.color} />
                  </div>

                  <h3
                    style={{
                      color: '#F1F5F9',
                      fontWeight: 700,
                      fontSize: '1rem',
                      marginTop: '16px',
                      marginBottom: '0',
                    }}
                  >
                    {p.titulo}
                  </h3>
                  <p
                    style={{
                      color: '#94A3B8',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      marginTop: '8px',
                    }}
                  >
                    {p.descripcion}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          [6] FORMULARIO
          ──────────────────────────────────────── */}
      <section
        id="formulario-partner"
        style={{ background: '#111827', padding: '80px 24px' }}
      >
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            background: '#1A2235',
            border: '1px solid #1E293B',
            borderRadius: '12px',
            padding: '2.5rem',
          }}
        >
          {enviado ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(34,197,94,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <Check size={32} color="#22C55E" />
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat), sans-serif',
                  fontWeight: 900,
                  fontSize: '1.75rem',
                  color: '#F1F5F9',
                  marginBottom: '12px',
                }}
              >
                ¡Solicitud enviada!
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.7 }}>
                Nuestro equipo te contactará en menos de 24 horas. ¡Gracias por tu
                interés en ser Partner de Soluciones AG!
              </p>
            </div>
          ) : (
            <>
              <h2
                style={{
                  fontFamily: 'var(--font-montserrat), sans-serif',
                  fontWeight: 900,
                  fontSize: '1.75rem',
                  color: '#F1F5F9',
                  textAlign: 'center',
                  marginBottom: '8px',
                }}
              >
                Solicita información sin compromiso
              </h2>
              <p
                style={{
                  color: '#94A3B8',
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                }}
              >
                Nuestro equipo te contactará en menos de 24 horas para platicarte sobre
                el programa.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Fila 1 */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '16px',
                  }}
                  className="partner-form-row"
                >
                  <div>
                    <label style={labelStyle}>Nombre completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = '#2563EB')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = '#1E293B')
                      }
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Empresa / Despacho *</label>
                    <input
                      type="text"
                      name="empresa"
                      required
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = '#2563EB')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = '#1E293B')
                      }
                    />
                  </div>
                </div>

                {/* Fila 2 */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '16px',
                  }}
                  className="partner-form-row"
                >
                  <div>
                    <label style={labelStyle}>Correo electrónico *</label>
                    <input
                      type="email"
                      name="correo"
                      required
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="tu@correo.com"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = '#2563EB')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = '#1E293B')
                      }
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Teléfono *</label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="(55) 1234 5678"
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = '#2563EB')
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = '#1E293B')
                      }
                    />
                  </div>
                </div>

                {/* Fila 3 — Perfil */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Tu perfil profesional *</label>
                  <select
                    name="perfil"
                    required
                    value={formData.perfil}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                      paddingRight: '36px',
                      color: formData.perfil ? '#F1F5F9' : '#4B5563',
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = '#2563EB')
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = '#1E293B')
                    }
                  >
                    <option value="" disabled>
                      Selecciona tu perfil
                    </option>
                    <option value="despacho">Despacho contable</option>
                    <option value="contador">Contador independiente</option>
                    <option value="sistemas">Profesional de sistemas / TI</option>
                    <option value="consultor">Consultor empresarial</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {/* Fila 4 — Experiencia */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>
                    ¿Tienes experiencia con CONTPAQi®?
                  </label>
                  <select
                    name="experiencia"
                    value={formData.experiencia}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 14px center',
                      paddingRight: '36px',
                      color: formData.experiencia ? '#F1F5F9' : '#4B5563',
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = '#2563EB')
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = '#1E293B')
                    }
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="usuario">Sí, soy usuario actual</option>
                    <option value="basica">Sí, tengo experiencia básica</option>
                    <option value="aprender">
                      No, pero me interesa aprender
                    </option>
                    <option value="otra-marca">
                      Soy distribuidor de otra marca
                    </option>
                  </select>
                </div>

                {/* Fila 5 — Mensaje */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={labelStyle}>
                    ¿Cuéntanos sobre tu negocio y qué esperas del programa?
                  </label>
                  <textarea
                    name="mensaje"
                    rows={3}
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Ej. Soy contador con 5 años de experiencia, tengo 20 clientes y quiero ofrecerles soluciones CONTPAQi®..."
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '80px',
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = '#2563EB')
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = '#1E293B')
                    }
                  />
                </div>

                {/* Honeypot */}
                <div
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    top: '-9999px',
                    left: '-9999px',
                  }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Captcha */}
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                    onChange={(token) => setCaptchaToken(token)}
                    theme="dark"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={enviando || !captchaToken}
                  style={{
                    width: '100%',
                    height: '52px',
                    background: enviando ? '#1E40AF' : '#2563EB',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: (enviando || !captchaToken) ? 'not-allowed' : 'pointer',
                    transition: 'background 200ms ease',
                    opacity: (enviando || !captchaToken) ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!enviando && captchaToken) e.currentTarget.style.background = '#1D4ED8'
                  }}
                  onMouseLeave={(e) => {
                    if (!enviando && captchaToken) e.currentTarget.style.background = '#2563EB'
                  }}
                >
                  {enviando
                    ? 'Enviando...'
                    : 'Quiero ser Partner de Soluciones AG'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          Responsive CSS
          ──────────────────────────────────────── */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .partner-grid-ingresos {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .partner-grid-3 {
            grid-template-columns: 1fr !important;
          }
          .partner-grid-benefits {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .partner-grid-ingresos {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .partner-grid-process {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .partner-process-line {
            display: none !important;
          }
          .partner-form-row {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .partner-grid-benefits {
            grid-template-columns: 1fr !important;
          }
          .partner-grid-ingresos {
            grid-template-columns: 1fr !important;
          }
        }
        /* Placeholder color for dark inputs */
        section input::placeholder,
        section textarea::placeholder {
          color: #4B5563;
        }
        /* Select option styling */
        section select option {
          background: #0B0F19;
          color: #F1F5F9;
        }
      `}</style>
    </main>
  )
}
