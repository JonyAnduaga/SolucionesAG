'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  ChevronDown,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import type { ServiceInterest } from '@/types';

const interesOptions: { value: ServiceInterest; label: string }[] = [
  { value: 'consultoria_general', label: 'Consultoría General' },
  { value: 'contpaqi_contabilidad', label: 'CONTPAQi Contabilidad' },
  { value: 'contpaqi_nominas', label: 'CONTPAQi Nóminas' },
  { value: 'contpaqi_comercial', label: 'CONTPAQi Comercial' },
  { value: 'servidor_vps', label: 'Servidor Virtual VPS' },
  { value: 'soporte_tecnico', label: 'Soporte Técnico' },
  { value: 'carta_porte', label: 'Generar Carta Porte 3.1' },
];

const inputStyle: React.CSSProperties = {
  backgroundColor: '#0B0F19',
  border: '1px solid #1E293B',
  borderRadius: '6px',
  color: '#F1F5F9',
  padding: '10px 14px',
  fontSize: '0.9rem',
  width: '100%',
  outline: 'none',
};

interface ContactRowProps {
  Icon: ComponentType<LucideProps>;
  text: string;
  href?: string;
}

function ContactRow({ Icon, text, href }: ContactRowProps) {
  const content = (
    <>
      <Icon size={16} strokeWidth={2} style={{ color: '#2563EB' }} />
      <span className="text-sm" style={{ color: '#94A3B8' }}>
        {text}
      </span>
    </>
  );
  return href ? (
    <a
      href={href}
      className="flex items-center transition-colors hover:text-white"
      style={{ gap: '12px' }}
    >
      {content}
    </a>
  ) : (
    <div className="flex items-center" style={{ gap: '12px' }}>
      {content}
    </div>
  );
}

interface SocialIconProps {
  Icon: ComponentType<LucideProps>;
  label: string;
  href: string;
}

function SocialIcon({ Icon, label, href }: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex items-center justify-center transition-colors"
      style={{
        width: '36px',
        height: '36px',
        border: '1px solid #1E293B',
        borderRadius: '8px',
        color: '#94A3B8',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#2563EB';
        e.currentTarget.style.color = '#2563EB';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1E293B';
        e.currentTarget.style.color = '#94A3B8';
      }}
    >
      <Icon size={16} />
    </a>
  );
}

function LogoMark40() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="Soluciones AG"
        width={40}
        height={40}
        style={{ objectFit: 'contain' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        {/* Línea principal */}
        <span style={{
          fontFamily: 'var(--font-montserrat), sans-serif',
          fontWeight: 900,
          fontSize: '17px',
          color: '#F1F5F9',
          lineHeight: 1.2,
          letterSpacing: '-0.02em'
        }}>
          SOLUCIONES{' '}
          <span>
            A
            <span style={{ color: '#FFFFFF', fontWeight: 900 }}> | </span>
            G
          </span>
        </span>

        {/* Subtítulo */}
        <span style={{
          fontFamily: 'var(--font-montserrat), sans-serif',
          fontWeight: 500,
          fontSize: '7px',
          color: '#64748B',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '2px',
          whiteSpace: 'nowrap'
        }}>
          CONSULTORÍA Y SOLUCIONES EMPRESARIALES
        </span>

      </div>
    </div>
  );
}

const focusOn = (e: React.FocusEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = '#2563EB';
};
const focusOff = (e: React.FocusEvent<HTMLElement>) => {
  e.currentTarget.style.borderColor = '#1E293B';
};

export function ContactForm() {
  const { data, errors, status, setField, submit } = useContactForm();
  const isSubmitting = status === 'submitting';
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) return;
    submit(e);
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="py-24"
      style={{ backgroundColor: '#111827' }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[45%_55%]">
          {/* Columna izquierda */}
          <div>
            <LogoMark40 />
            <p
              className="text-sm"
              style={{
                color: '#94A3B8',
                lineHeight: 1.6,
                margin: '16px 0 32px',
              }}
            >
              Transformamos la administración de tu empresa con tecnología de
              punta y consultoría experta. Contáctanos hoy para una asesoría
              gratuita.
            </p>

            <div className="space-y-3">
              <ContactRow
                Icon={MapPin}
                text="Av. Vallarta 2440, Guadalajara, Jal."
              />
              <ContactRow
                Icon={Phone}
                text="+52 (33) 1234 5678"
                href="tel:+523312345678"
              />
              <ContactRow
                Icon={Mail}
                text="contacto@solucionesag.com"
                href="mailto:contacto@solucionesag.com"
              />
            </div>

            <div
              className="flex"
              style={{ gap: '12px', marginTop: '24px' }}
            >
              <SocialIcon Icon={Facebook} label="Facebook" href="#" />
              <SocialIcon Icon={Linkedin} label="LinkedIn" href="#" />
              <SocialIcon Icon={MessageCircle} label="WhatsApp" href="#" />
            </div>
          </div>

          {/* Columna derecha — Formulario */}
          <form
            onSubmit={handleSubmit}
            noValidate
            id="contact-title"
            style={{
              backgroundColor: '#1A2235',
              border: '1px solid #1E293B',
              borderRadius: '12px',
              padding: '2rem',
            }}
          >
            <h3
              className="text-white"
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '24px',
              }}
            >
              Envíanos un mensaje
            </h3>

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={data.website ?? ''}
              onChange={(e) => setField('website', e.target.value)}
              style={{
                position: 'absolute',
                opacity: 0,
                top: '-9999px',
                left: '-9999px',
                height: 0,
                width: 0,
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-1.5 block text-xs font-semibold uppercase"
                  style={{ color: '#94A3B8', letterSpacing: '0.05em' }}
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Tu nombre"
                  value={data.nombre}
                  onChange={(e) => setField('nombre', e.target.value)}
                  onFocus={focusOn}
                  onBlur={focusOff}
                  style={inputStyle}
                  aria-invalid={!!errors.nombre}
                />
                {errors.nombre ? (
                  <p className="mt-1 text-xs" style={{ color: '#F87171' }}>
                    {errors.nombre}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="empresa"
                  className="mb-1.5 block text-xs font-semibold uppercase"
                  style={{ color: '#94A3B8', letterSpacing: '0.05em' }}
                >
                  Empresa
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  required
                  placeholder="Nombre de empresa"
                  value={data.empresa}
                  onChange={(e) => setField('empresa', e.target.value)}
                  onFocus={focusOn}
                  onBlur={focusOff}
                  style={inputStyle}
                  aria-invalid={!!errors.empresa}
                />
                {errors.empresa ? (
                  <p className="mt-1 text-xs" style={{ color: '#F87171' }}>
                    {errors.empresa}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="correo"
                className="mb-1.5 block text-xs font-semibold uppercase"
                style={{ color: '#94A3B8', letterSpacing: '0.05em' }}
              >
                Correo Electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                autoComplete="email"
                required
                placeholder="correo@empresa.com"
                value={data.correo}
                onChange={(e) => setField('correo', e.target.value)}
                onFocus={focusOn}
                onBlur={focusOff}
                style={inputStyle}
                aria-invalid={!!errors.correo}
              />
              {errors.correo ? (
                <p className="mt-1 text-xs" style={{ color: '#F87171' }}>
                  {errors.correo}
                </p>
              ) : null}
            </div>

            <div className="mt-4">
              <label
                htmlFor="interes"
                className="mb-1.5 block text-xs font-semibold uppercase"
                style={{ color: '#94A3B8', letterSpacing: '0.05em' }}
              >
                Interés
              </label>
              <div className="relative">
                <select
                  id="interes"
                  name="interes"
                  required
                  value={data.interes}
                  onChange={(e) =>
                    setField('interes', e.target.value as ServiceInterest)
                  }
                  onFocus={focusOn}
                  onBlur={focusOff}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    paddingRight: '40px',
                  }}
                >
                  {interesOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#94A3B8' }}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="mensaje"
                className="mb-1.5 block text-xs font-semibold uppercase"
                style={{ color: '#94A3B8', letterSpacing: '0.05em' }}
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                required
                placeholder="¿Cómo podemos ayudarte?"
                value={data.mensaje}
                onChange={(e) => setField('mensaje', e.target.value)}
                onFocus={focusOn}
                onBlur={focusOff}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                aria-invalid={!!errors.mensaje}
              />
              {errors.mensaje ? (
                <p className="mt-1 text-xs" style={{ color: '#F87171' }}>
                  {errors.mensaje}
                </p>
              ) : null}
            </div>

            {status === 'success' ? (
              <p
                role="status"
                className="mt-4 rounded-md p-3 text-sm"
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  color: '#22C55E',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                }}
              >
                ¡Mensaje enviado! Te contactaremos pronto.
              </p>
            ) : null}

            <div className="mt-6 flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || (process.env.NODE_ENV !== 'production' ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' : '')}
                onChange={(token) => setCaptchaToken(token)}
                theme="dark"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !captchaToken}
              className="mt-6 w-full font-semibold text-white transition-colors disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#2563EB',
                height: '44px',
                borderRadius: '6px',
                fontSize: '0.95rem',
                opacity: (isSubmitting || !captchaToken) ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && captchaToken)
                  e.currentTarget.style.backgroundColor = '#1D4ED8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563EB';
              }}
            >
              {isSubmitting ? 'Enviando…' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
