'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GraduationCap, Menu, X } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/simulator', label: 'Simulator' },
    { href: '/admissions', label: 'Admissions' },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline">
              Career<span className="text-orange-500">Mentor</span>
            </span>
            <span className="sm:hidden">
              C<span className="text-orange-500">M</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-orange-600 bg-orange-50 border border-orange-200'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-orange-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-orange-100 py-4 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-orange-600 bg-orange-50 border border-orange-200'
                      : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}