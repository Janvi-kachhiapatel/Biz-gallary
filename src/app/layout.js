import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'BizGallery - Local Business Discovery',
  description: 'Find the best local shops near you.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}