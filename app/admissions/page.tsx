'use client'

import { useState } from 'react'
import UniversitySearch from '@/components/admissions/UniversitySearch'
import UniversityComparison from '@/components/admissions/UniversityComparison'
import AdmissionSuggestions from '@/components/admissions/AdmissionSuggestions'
import { Search, GitCompare, Sparkles } from 'lucide-react'

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'compare' | 'suggestions'>('search')
  const [selectedUniversities, setSelectedUniversities] = useState<any[]>([])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Admission Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your perfect university, compare programs, and get AI-powered admission guidance.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'search'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Search className="w-5 h-5" />
            Search Universities
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'compare'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <GitCompare className="w-5 h-5" />
            Compare (2-3)
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all inline-flex items-center gap-2 ${
              activeTab === 'suggestions'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            AI Suggestions
          </button>
        </div>

        {/* Tab Content */}
        <div className="card">
          {activeTab === 'search' && (
            <UniversitySearch
              onSelectUniversity={(uni) => {
                if (!selectedUniversities.find(u => u.id === uni.id)) {
                  setSelectedUniversities([...selectedUniversities, uni])
                }
              }}
            />
          )}
          {activeTab === 'compare' && (
            <UniversityComparison
              selectedUniversities={selectedUniversities}
              onSelectUniversity={(uni) => {
                if (selectedUniversities.length < 3 && !selectedUniversities.find(u => u.id === uni.id)) {
                  setSelectedUniversities([...selectedUniversities, uni])
                }
              }}
              onRemoveUniversity={(id) => {
                setSelectedUniversities(selectedUniversities.filter(u => u.id !== id))
              }}
            />
          )}
          {activeTab === 'suggestions' && <AdmissionSuggestions />}
        </div>
      </div>
    </div>
  )
}

