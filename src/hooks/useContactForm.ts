'use client';

import { useState, useCallback } from 'react';
import { contactFormSchema } from '@/lib/validators';
import type { ContactFormData, ServiceInterest } from '@/types';

type FormErrors = Partial<Record<keyof ContactFormData, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialData: ContactFormData = {
  nombre: '',
  empresa: '',
  correo: '',
  interes: 'consultoria_general' as ServiceInterest,
  mensaje: '',
  website: '',
};

export function useContactForm() {
  const [data, setData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const setField = useCallback(
    <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const submit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Honeypot: si está lleno, abortar silenciosamente
      if (data.website && data.website.length > 0) {
        setStatus('error');
        return;
      }

      const result = contactFormSchema.safeParse(data);
      if (!result.success) {
        const fieldErrors: FormErrors = {};
        for (const issue of result.error.issues) {
          const key = issue.path[0] as keyof ContactFormData;
          if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        setStatus('error');
        return;
      }

      setStatus('submitting');
      try {
        // Aquí iría POST a /api/contact
        await new Promise((r) => setTimeout(r, 800));
        setStatus('success');
        setData(initialData);
      } catch {
        setStatus('error');
      }
    },
    [data],
  );

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setStatus('idle');
  }, []);

  return { data, errors, status, setField, submit, reset };
}
