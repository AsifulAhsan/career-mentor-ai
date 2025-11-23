"use client";
import React, { useState } from "react";
import {
  ArrowRight,
  GraduationCap,
  Target,
  Building2,
  Sparkles,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import { useAuth } from "./AuthContext";

export default function DashboardScreen() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const { user } = useAuth();

  const features = [
    {
      id: "roadmap",
      href: "/roadmap",
      icon: Target,
      number: "01",
      title: "Career Roadmap",
      description:
        "Get a personalized, step-by-step career roadmap tailored to your interests, academic performance, and goals.",
      action: "Build Your Roadmap",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      id: "simulator",
      href: "/simulator",
      icon: Building2,
      number: "02",
      title: "Career Simulator",
      description:
        "Experience a day in the life of any career. Get insights on salary, job demand, and required skills.",
      action: "Start Simulation",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      id: "admissions",
      href: "/admissions",
      icon: GraduationCap,
      number: "03",
      title: "Admission Hub",
      description:
        "Find and compare universities worldwide. Get AI-powered admission suggestions and scholarship opportunities.",
      action: "Explore Universities",
      gradient: "from-orange-600 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col">
      {/* Simple Welcome Section */}
      <section className="container mx-auto px-4 pt-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Welcome back, {user?.name}
              </h1>
            </div>
            <p className="text-slate-600 text-lg">
              Ready to continue your career journey?
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="container mx-auto px-4 pb-12 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = active === index;
              const isHovered = hovered === index;

              return (
                <div
                  key={feature.id}
                  className="h-full"
                  onMouseEnter={() => {
                    setActive(index);
                    setHovered(index);
                  }}
                  onMouseLeave={() => setHovered(null)}
                >
                  <a
                    href={feature.href}
                    className={`
                      block h-full relative overflow-hidden rounded-2xl cursor-pointer
                      transition-all duration-500 ease-out
                      ${
                        isActive
                          ? `bg-gradient-to-br ${feature.gradient} transform scale-[1.02] shadow-xl`
                          : "bg-white hover:bg-white/95 backdrop-blur-sm border border-orange-100 hover:border-orange-200 shadow-sm hover:shadow-md"
                      }
                      min-h-[320px] md:min-h-[380px]
                      group
                    `}
                  >
                    {/* Background Pattern */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive
                          ? "opacity-10"
                          : "opacity-0 group-hover:opacity-5"
                      }`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(249,115,22,0.1)_1px,transparent_0)] bg-[length:24px_24px]" />
                    </div>

                    {/* Content Container */}
                    <div className="h-full p-8 flex flex-col justify-between relative z-10">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span
                            className={`
                            text-sm font-mono font-semibold transition-all duration-300
                            ${
                              isActive
                                ? "text-white/90"
                                : "text-slate-500 group-hover:text-slate-600"
                            }
                          `}
                          >
                            {feature.number}
                          </span>
                          <div
                            className={`
                            w-12 h-12 rounded-xl flex items-center justify-center
                            transition-all duration-300 group-hover:scale-110
                            ${
                              isActive
                                ? "bg-white/20 backdrop-blur-sm"
                                : "bg-orange-50 border border-orange-100"
                            }
                          `}
                          >
                            <Icon
                              className={`w-6 h-6 transition-colors duration-300 ${
                                isActive ? "text-white" : "text-orange-500"
                              }`}
                            />
                          </div>
                        </div>

                        <h3
                          className={`
                          text-xl md:text-2xl font-bold transition-colors duration-300
                          ${isActive ? "text-white" : "text-slate-900"}
                          group-hover:translate-x-1
                        `}
                        >
                          {feature.title}
                        </h3>

                        <p
                          className={`
                          text-sm md:text-base leading-relaxed transition-all duration-500
                          ${
                            isActive
                              ? "opacity-100 text-white/90"
                              : "text-slate-600"
                          }
                        `}
                        >
                          {feature.description}
                        </p>
                      </div>

                      <div
                        className={`
                        flex items-center gap-2 font-semibold text-sm
                        transition-all duration-500 mt-6
                        ${
                          isActive
                            ? "text-white"
                            : "text-slate-600 group-hover:text-orange-500"
                        }
                        group-hover:gap-3
                      `}
                      >
                        <span
                          className={`
                          border-b transition-all duration-300 pb-1
                          ${
                            isActive
                              ? "border-white/50"
                              : "border-transparent group-hover:border-orange-300"
                          }
                        `}
                        >
                          {feature.action}
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform duration-500 ${
                            isHovered ? "animate-pulse" : ""
                          } ${
                            isActive
                              ? "translate-x-0"
                              : "group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </div>

                    <div
                      className={`
                      absolute inset-0 rounded-2xl bg-gradient-to-r ${
                        feature.gradient
                      } 
                      opacity-0 transition-opacity duration-300
                      ${isHovered && !isActive ? "opacity-100" : ""}
                      -z-10
                    `}
                    >
                      <div className="absolute inset-[1px] rounded-2xl bg-white"></div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-orange-100">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${
                      active === index
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 scale-110"
                        : "bg-orange-200 hover:bg-orange-300"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

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
