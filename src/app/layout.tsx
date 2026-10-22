import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import DynamicBackground from '@/components/three/DynamicBackground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sazzad Hossen | Frontend Developer Portfolio',
  description:
    'Personal portfolio of Sazzad Hossen, a passionate Frontend Developer building modern, responsive, and interactive web applications.',
  keywords: ['Sazzad Hossen', 'Frontend Developer', 'Web Developer', 'React', 'Next.js', 'Tailwind CSS', 'Portfolio'],
  authors: [{ name: 'Sazzad Hossen' }],
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
        className="min-h-screen bg-[#F8FAFC] dark:bg-[#080D12] text-[#0F172A] dark:text-[#F8FAFC] antialiased selection:bg-[#8B5CF6] selection:text-white transition-colors duration-300 relative overflow-x-hidden"
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            {/* Subtle soft gradient glow matching theme colors */}
            <div
              aria-hidden="true"
              className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
            >
              <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] rounded-full bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/12 blur-[140px]" />
              <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#22C55E]/8 dark:bg-[#22C55E]/10 blur-[150px]" />
              <div className="absolute bottom-[-10%] left-[15%] w-[700px] h-[700px] rounded-full bg-[#8B5CF6]/8 dark:bg-[#8B5CF6]/10 blur-[160px]" />
            </div>

            {/* Client-only 3D Background Canvas */}
            <DynamicBackground />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
