'use client'

import React, { useState } from 'react'
import { X, Search, CheckCircle } from 'lucide-react'
import universitiesData from '@/data/universities.json'

export default function UniversityComparison({
  selectedUniversities,
  onSelectUniversity,
  onRemoveUniversity,
}: {
  selectedUniversities: any[]
  onSelectUniversity: (uni: any) => void
  onRemoveUniversity: (id: number) => void
}) {
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const availableUniversities = universitiesData.filter(
    u => !selectedUniversities.find(su => su.id === u.id) &&
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const comparisonFields = [
    { label: 'Ranking', key: 'ranking', format: (v: any) => `#${v}` },
    { label: 'Location', key: 'location' },
    { label: 'Tuition', key: 'tuition', format: (v: any, uni: any) => `${v.toLocaleString()} ${uni.currency}/year` },
    { label: 'Duration', key: 'duration' },
    { label: 'Admission Difficulty', key: 'admissionDifficulty' },
    { label: 'Programs', key: 'programs', format: (v: any) => v.join(', ') },
    { label: 'Scholarships', key: 'scholarships', format: (v: any) => v.join(', ') },
    { label: 'Career Outcomes', key: 'careerOutcomes' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Compare Universities</h2>
        {selectedUniversities.length < 3 && (
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Add University
          </button>
        )}
      </div>

      {showSearch && selectedUniversities.length < 3 && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search universities to add..."
              className="input-field pl-10"
            />
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {availableUniversities.length === 0 ? (
              <p className="text-gray-500 text-sm">No universities found</p>
            ) : (
              availableUniversities.map(uni => (
                <button
                  key={uni.id}
                  onClick={() => {
                    onSelectUniversity(uni)
                    setSearchTerm('')
                    setShowSearch(false)
                  }}
                  className="w-full text-left p-3 bg-white rounded-lg hover:bg-primary-50 border border-gray-200 hover:border-primary-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{uni.name}</h4>
                      <p className="text-sm text-gray-600">{uni.location}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {selectedUniversities.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="mb-4">No universities selected for comparison.</p>
          <p className="text-sm">Click "Add University" to start comparing.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left p-4 font-bold text-gray-900">Criteria</th>
                {selectedUniversities.map(uni => (
                  <th key={uni.id} className="text-left p-4 font-bold text-gray-900 relative">
                    <div className="flex items-center justify-between">
                      <span>{uni.name}</span>
                      <button
                        onClick={() => onRemoveUniversity(uni.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFields.map((field, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-700">{field.label}</td>
                  {selectedUniversities.map(uni => (
                    <td key={uni.id} className="p-4 text-gray-700">
                      {field.format
                        ? field.format(uni[field.key], uni)
                        : uni[field.key] || 'N/A'}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b-2 border-gray-200">
                <td className="p-4 font-semibold text-gray-700">Requirements</td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="p-4 text-gray-700">
                    <div className="space-y-1 text-sm">
                      {uni.requirements.sscGPA && <div>SSC GPA: {uni.requirements.sscGPA}</div>}
                      {uni.requirements.hscGPA && <div>HSC GPA: {uni.requirements.hscGPA}</div>}
                      {uni.requirements.gpa && <div>GPA: {uni.requirements.gpa}</div>}
                      {uni.requirements.sat && <div>SAT: {uni.requirements.sat}</div>}
                      {uni.requirements.ielts && <div>IELTS: {uni.requirements.ielts}</div>}
                      {uni.requirements.toefl && <div>TOEFL: {uni.requirements.toefl}</div>}
                      {uni.requirements.admissionTest && <div>Admission Test: {uni.requirements.admissionTest}</div>}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-semibold text-gray-700">Alumni Success</td>
                {selectedUniversities.map(uni => (
                  <td key={uni.id} className="p-4 text-gray-700 text-sm">
                    {uni.alumniSuccess}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

