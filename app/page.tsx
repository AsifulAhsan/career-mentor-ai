import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Target,
  Building2,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            CareerMentor <span className="text-primary-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your intelligent companion for career planning, university
            selection, and professional growth. Get personalized roadmaps
            powered by advanced AI.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link
            href="/roadmap"
            className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
              <Target className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Career Roadmap
            </h3>
            <p className="text-gray-600 mb-4">
              Get a personalized, step-by-step career roadmap tailored to your
              interests, academic performance, and goals. Includes learning
              paths, certifications, and timelines.
            </p>
            <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
              Explore <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/simulator"
            className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
              <Building2 className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Career Simulator
            </h3>
            <p className="text-gray-600 mb-4">
              Experience a day in the life of any career. Get insights on
              salary, job demand, required skills, tools, and future
              opportunities.
            </p>
            <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
              Simulate <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/admissions"
            className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <GraduationCap className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Admission Hub
            </h3>
            <p className="text-gray-600 mb-4">
              Find and compare universities worldwide. Get AI-powered admission
              suggestions, scholarship opportunities, and realistic admission
              probabilities.
            </p>
            <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
              Discover <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
