'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '@/components/AuthContext'
import AuthModal from '@/components/AuthModal'
import UserProfile from '@/components/UserProfile'

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/simulator', label: 'Simulator' },
    { href: '/admissions', label: 'Admissions' },
  ]

  const handleAuthClick = () => {
    setAuthModalOpen(true)
    setMobileMenuOpen(false)
  }

  const handleProfileClick = () => {
    setShowProfile(true)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
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
            <div className="hidden md:flex items-center gap-6">
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
              
              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.name.split(' ')[0]}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="px-6 py-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-medium"
                  >
                    Get Started
                  </button>
                </div>
              )}
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
                
                {/* Mobile Auth Buttons */}
                <div className="border-t border-orange-100 pt-4 mt-2">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-300 text-left"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 rounded-xl transition-all duration-300 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleAuthClick}
                        className="px-4 py-3 text-orange-600 hover:text-orange-700 font-medium transition-colors text-left"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={handleAuthClick}
                        className="px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 font-medium text-center"
                      >
                        Get Started Free
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        defaultView="login"
      />

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-orange-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <UserProfile />
          </div>
        </div>
      )}
    </>
  )
}