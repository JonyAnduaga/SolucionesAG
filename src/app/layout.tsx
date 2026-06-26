import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter, JetBrains_Mono, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Soluciones A|G - Consultoría y Soluciones Empresariales CONTPAQi®',
    template: '%s | Soluciones A|G'
  },
  description: 'Distribuidores autorizados CONTPAQi® en Metepec, Estado de México. Implementación, capacitación y soporte técnico de sistemas CONTPAQi. Partner autorizado iiNube.',
  keywords: [
    'CONTPAQi',
    'distribuidor CONTPAQi',
    'consultoría CONTPAQi',
    'CONTPAQi Contabilidad',
    'CONTPAQi Nóminas',
    'CONTPAQi Comercial',
    'servidor virtual VPS',
    'iiNube',
    'software contable México',
    'Metepec',
    'Estado de México',
    'implementación CONTPAQi',
    'soporte técnico CONTPAQi'
  ],
  authors: [{ name: 'Soluciones A|G' }],
  creator: 'Soluciones A|G',
  publisher: 'Soluciones A|G',
  metadataBase: new URL('https://solucionesag.com'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://solucionesag.com',
    siteName: 'Soluciones A|G',
    title: 'Soluciones A|G - Consultoría CONTPAQi® y Servidores Virtuales',
    description: 'Distribuidores autorizados CONTPAQi® en Metepec. Implementación, capacitación y soporte técnico. Partner autorizado iiNube.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Soluciones A|G - Consultoría CONTPAQi'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soluciones A|G - Consultoría CONTPAQi®',
    description: 'Distribuidores autorizados CONTPAQi® en Metepec, Estado de México.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-MX"
      className={`${inter.variable} ${jetbrains.variable} ${cinzel.variable} ${montserrat.variable}`}
    >
      <head>
        <meta name="geo.region" content="MX-MEX" />
        <meta name="geo.placename" content="Metepec, Estado de México" />
      </head>
      <body className="font-sans bg-bg-primary text-ink-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
