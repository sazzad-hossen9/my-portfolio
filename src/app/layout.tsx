import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sazzad Islam | Frontend Developer Portfolio',
  description:
    'Personal portfolio of Sazzad Islam, a passionate Frontend Developer building modern, responsive, and interactive web applications.',
  keywords: ['Sazzad Islam', 'Frontend Developer', 'Web Developer', 'React', 'Next.js', 'Tailwind CSS', 'Portfolio'],
  authors: [{ name: 'Sazzad Islam' }],
  openGraph: {
    title: 'Sazzad Islam | Frontend Developer Portfolio',
    description: 'Personal portfolio of Sazzad Islam, building modern & interactive websites.',
    url: 'https://my-portfolio-sazzad.vercel.app',
    siteName: 'Sazzad Islam Portfolio',
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
      <body className="min-h-screen bg-[#F8FAFC] dark:bg-[#080D12] text-[#0F172A] dark:text-[#F8FAFC] antialiased selection:bg-[#8B5CF6] selection:text-white transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
