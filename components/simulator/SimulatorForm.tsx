'use client'

import React, { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'

const popularCareers = [
  'Software Engineer',
  'Data Scientist',
  'Doctor',
  'Lawyer',
  'Teacher',
  'Marketing Manager',
  'Financial Analyst',
  'Graphic Designer',
  'Mechanical Engineer',
  'Nurse',
  'Architect',
  'Psychologist',
  'Business Analyst',
  'Product Manager',
  'UX Designer',
]

export default function SimulatorForm({ onSubmit }: { onSubmit: (career: string) => void }) {
  const [career, setCareer] = useState('')
  const [customCareer, setCustomCareer] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedCareer = customCareer || career
    if (selectedCareer) {
      onSubmit(selectedCareer)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Select or Enter a Career to Simulate *
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {popularCareers.map((careerOption) => (
            <button
              key={careerOption}
              type="button"
              onClick={() => {
                setCareer(careerOption)
                setCustomCareer('')
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                career === careerOption
                  ? 'border-primary-600 bg-primary-50 text-primary-700 font-semibold'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              {careerOption}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={customCareer}
            onChange={(e) => {
              setCustomCareer(e.target.value)
              setCareer('')
            }}
            placeholder="Or type a custom career..."
            className="input-field pl-12"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!career && !customCareer}
        className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Simulate Career <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  )
}

