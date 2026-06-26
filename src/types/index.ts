import type { ReactNode } from 'react';

export type ServiceInterest =
  | 'consultoria_general'
  | 'contpaqi_contabilidad'
  | 'contpaqi_nominas'
  | 'contpaqi_comercial'
  | 'servidor_vps'
  | 'soporte_tecnico'
  | 'carta_porte';

export interface ContactFormData {
  nombre: string;
  empresa: string;
  correo: string;
  interes: ServiceInterest;
  mensaje: string;
  /** honeypot anti-spam */
  website?: string;
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: 'escritorio' | 'nube';
  icono: string;
}

export interface TechnicalService {
  id: string;
  nombre: string;
  icono: ReactNode;
}

export interface NavLink {
  label: string;
  href: string;
  cta?: boolean;
}
