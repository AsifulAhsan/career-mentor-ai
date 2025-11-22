'use client'

import React, { useState, useMemo } from 'react'
import { Search, MapPin, GraduationCap, DollarSign } from 'lucide-react'
import universitiesData from '@/data/universities.json'

export default function UniversitySearch({ onSelectUniversity }: { onSelectUniversity: (uni: any) => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCountry, setFilterCountry] = useState('')
  const [filterProgram, setFilterProgram] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'ranking' | 'tuition'>('ranking')

  const countries = Array.from(new Set(universitiesData.map(u => u.country)))
  const programs = Array.from(new Set(universitiesData.flatMap(u => u.programs)))

  const filteredUniversities = useMemo(() => {
    let filtered = universitiesData.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCountry = !filterCountry || uni.country === filterCountry
      const matchesProgram = !filterProgram || uni.programs.includes(filterProgram)
      return matchesSearch && matchesCountry && matchesProgram
    })

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'ranking') return a.ranking - b.ranking
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'tuition') return a.tuition - b.tuition
      return 0
    })

    return filtered
  }, [searchTerm, filterCountry, filterProgram, sortBy])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Universities</h2>
        
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by university name or program..."
              className="input-field pl-12"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="input-field"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              className="input-field"
            >
              <option value="">All Programs</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field"
            >
              <option value="ranking">Sort by Ranking</option>
              <option value="name">Sort by Name</option>
              <option value="tuition">Sort by Tuition</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredUniversities.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No universities found matching your criteria.
            </div>
          ) : (
            filteredUniversities.map(uni => (
              <div
                key={uni.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => onSelectUniversity(uni)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{uni.name}</h3>
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        #{uni.ranking}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {uni.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        {uni.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold text-gray-900">
                      <DollarSign className="w-5 h-5" />
                      {uni.tuition.toLocaleString()} {uni.currency}
                    </div>
                    <div className="text-sm text-gray-500">per year</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {uni.programs.slice(0, 4).map((program, i) => (
                    <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {program}
                    </span>
                  ))}
                  {uni.programs.length > 4 && (
                    <span className="text-gray-500 text-sm">+{uni.programs.length - 4} more</span>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`ml-2 font-semibold ${
                      uni.admissionDifficulty === 'Very High' ? 'text-red-600' :
                      uni.admissionDifficulty === 'High' ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {uni.admissionDifficulty}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Scholarships:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {uni.scholarships.length} available
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Outcomes:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {uni.careerOutcomes.split(',')[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

