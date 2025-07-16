import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ATCS Monitor Indonesia',
  description: 'Pantau CCTV lalu lintas ATCS real-time',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
