import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// @ts-ignore
import './globals.css'
import Navigation from '@/components/Navigation'
import { AuthProvider } from '@/components/AuthContext'

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
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}