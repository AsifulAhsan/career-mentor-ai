import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareerMentor AI - Your AI-Powered Career Guidance Platform',
  description: 'Get personalized career roadmaps, simulate careers, and find the perfect university for your future.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </main>
      </body>
    </html>
  )
}

