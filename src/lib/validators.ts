import { z } from 'zod';

export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre es demasiado largo'),
  empresa: z
    .string()
    .min(2, 'La empresa debe tener al menos 2 caracteres')
    .max(120, 'El nombre de empresa es demasiado largo'),
  correo: z
    .string()
    .email('Correo electrónico inválido')
    .max(120, 'Correo demasiado largo'),
  interes: z.enum([
    'consultoria_general',
    'contpaqi_contabilidad',
    'contpaqi_nominas',
    'contpaqi_comercial',
    'servidor_vps',
    'soporte_tecnico',
    'carta_porte',
  ]),
  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje es demasiado largo'),
  website: z.string().max(0, 'Spam detectado').optional().or(z.literal('')),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
