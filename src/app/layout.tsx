import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import DynamicBackground from '@/components/three/DynamicBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sazzad Hossen | Frontend Developer Portfolio',
  description:
    'Personal portfolio of Sazzad Hossen, a passionate Frontend Developer building modern, responsive, and interactive web applications.',
  keywords: ['Sazzad Islam', 'Frontend Developer', 'Web Developer', 'React', 'Next.js', 'Tailwind CSS', 'Portfolio'],
  authors: [{ name: 'Sazzad Islam' }],
  openGraph: {
    title: 'Sazzad Hossen | Frontend Developer Portfolio',
    description: 'Personal portfolio of Sazzad Hossen, building modern & interactive websites.',
    url: 'https://my-portfolio-sazzad.vercel.app',
    siteName: 'Sazzad Hossen Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8FAFC] dark:bg-[#080D12] text-[#0F172A] dark:text-[#F8FAFC] antialiased selection:bg-[#8B5CF6] selection:text-white transition-colors duration-300"
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Client-only 3D Background Canvas */}
            <DynamicBackground />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
