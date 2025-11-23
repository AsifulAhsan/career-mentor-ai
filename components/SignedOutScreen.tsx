"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  GraduationCap,
  Target,
  Building2,
  Sparkles,
  Users,
  BookOpen,
  Shield,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import AuthModal from "./AuthModal";

export default function SignedOutScreen() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Target,
      title: "Personalized Roadmaps",
      description:
        "AI-generated step-by-step career paths tailored to your skills and interests",
    },
    {
      icon: Building2,
      title: "Career Simulation",
      description: "Experience different careers before making decisions",
    },
    {
      icon: GraduationCap,
      title: "University Matching",
      description: "Find perfect universities with AI-powered recommendations",
    },
  ];

  const stats = [
    { number: "10K+", label: "Students Helped" },
    { number: "500+", label: "Career Paths" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Countries" },
  ];

  const FeatureIcon = features[activeFeature].icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-orange-200">
            <Sparkles className="w-4 h-4" />
            AI-Powered Career Guidance
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Your Future,
            <span className="block text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
              Intelligently Designed
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover your perfect career path with personalized AI guidance,
            step-by-step roadmaps, and real-world career simulations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-semibold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-8 py-4 border-2 border-orange-500 text-orange-500 rounded-2xl font-semibold text-lg hover:bg-orange-50 transition-all duration-300"
            >
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for Career Success
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools to guide you
              from exploration to execution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature List */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setActiveFeature(index)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      activeFeature === index
                        ? "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 shadow-lg"
                        : "bg-white border border-orange-100 hover:border-orange-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          activeFeature === index
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature Visual */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <div className="text-white text-center p-8">
                    <FeatureIcon className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-orange-100">
                      {features[activeFeature].description}
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200 rounded-2xl -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-200 rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
            Why Choose CareerMentor AI?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Personalized for You
              </h3>
              <p className="text-slate-600">
                AI algorithms tailor recommendations to your unique profile and
                goals
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Comprehensive Resources
              </h3>
              <p className="text-slate-600">
                Access roadmaps, simulations, and university data all in one
                place
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Trusted Guidance
              </h3>
              <p className="text-slate-600">
                Backed by data and AI to ensure you make informed decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Design Your Future?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect career path
            with AI guidance
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-semibold text-lg hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Free Today
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultView="signup"
      />
      {/* Modern Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-orange-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Career<span className="text-orange-500">Mentor</span>
                    </h3>
                    <p className="text-sm text-slate-600">
                      AI-Powered Career Guidance
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 max-w-md text-sm leading-relaxed">
                  Empowering students worldwide with intelligent career
                  planning, personalized roadmaps, and AI-driven insights to
                  build successful futures.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Features</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/roadmap"
                      className="text-slate-600 hover:text-orange-500 transition-colors"
                    >
                      Career Roadmap
                    </a>
                  </li>
                  <li>
                    <a
                      href="/simulator"
                      className="text-slate-600 hover:text-orange-500 transition-colors"
                    >
                      Career Simulator
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admissions"
                      className="text-slate-600 hover:text-orange-500 transition-colors"
                    >
                      Admission Hub
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact & Social */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Connect</h4>
                <div className="flex space-x-4 mb-4">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-sm text-slate-600">
                  Ready to start your journey?
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-orange-100">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  © 2025 CareerMentor AI. Made with{" "}
                  <Heart className="w-4 h-4 text-red-500 fill-current" /> for
                  students
                </p>
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <a
                    href="/privacy"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Privacy
                  </a>
                  <a
                    href="/terms"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Terms
                  </a>
                  <a
                    href="/contact"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
