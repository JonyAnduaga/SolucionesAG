export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0B0F19',
        borderTop: '1px solid #1E293B',
        padding: '20px 0',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 md:flex-row">
        <p className="text-sm" style={{ color: '#4B5563' }}>
          © 2026 Soluciones AG. Todos los derechos reservados.
        </p>
        <p className="flex items-center gap-2 text-sm" style={{ color: '#4B5563' }}>
          <a
            href="#aviso"
            className="transition-colors hover:text-ink-secondary"
            style={{ color: '#4B5563' }}
          >
            Aviso de Privacidad
          </a>
          <span aria-hidden>|</span>
          <a
            href="#terminos"
            className="transition-colors hover:text-ink-secondary"
            style={{ color: '#4B5563' }}
          >
            Términos y Condiciones
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
