'use client'

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface FormData {
  currentClass: string
  interests: string
  sscGPA: string
  hscGPA: string
  grades: string
  testScores: string
  strengths: string
  country: string
  financial: string
  workStyle: string
  skills: string
  hobbies: string
}

export default function RoadmapForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    currentClass: '',
    interests: '',
    sscGPA: '',
    hscGPA: '',
    grades: '',
    testScores: '',
    strengths: '',
    country: 'Bangladesh',
    financial: '',
    workStyle: '',
    skills: '',
    hobbies: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Enrolled Class *
          </label>
          <select
            required
            value={formData.currentClass}
            onChange={(e) => handleChange('currentClass', e.target.value)}
            className="input-field"
          >
            <option value="">Select your current class</option>
            <option value="Class 6-8">Class 6-8 (Junior Secondary)</option>
            <option value="Class 9-10">Class 9-10 (Secondary - SSC Level)</option>
            <option value="Class 11-12">Class 11-12 (Higher Secondary - HSC Level)</option>
            <option value="University">University/College</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Select the class you are currently studying in</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Career Interests *
          </label>
          <input
            type="text"
            required
            value={formData.interests}
            onChange={(e) => handleChange('interests', e.target.value)}
            placeholder="e.g., Software Engineering, Medicine, Business"
            className="input-field"
          />
        </div>

        {formData.currentClass === 'Class 9-10' || formData.currentClass === 'Class 11-12' || formData.currentClass === 'University' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SSC GPA (Secondary School Certificate)
            </label>
            <input
              type="text"
              value={formData.sscGPA}
              onChange={(e) => handleChange('sscGPA', e.target.value)}
              placeholder="e.g., 5.00, 4.50, 4.00"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">Out of 5.00 (A+ = 5.0, A = 4.0, A- = 3.5, etc.)</p>
          </div>
        ) : null}

        {formData.currentClass === 'Class 11-12' || formData.currentClass === 'University' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              HSC GPA (Higher Secondary Certificate)
            </label>
            <input
              type="text"
              value={formData.hscGPA}
              onChange={(e) => handleChange('hscGPA', e.target.value)}
              placeholder="e.g., 5.00, 4.50, 4.00"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">Out of 5.00 (A+ = 5.0, A = 4.0, A- = 3.5, etc.)</p>
          </div>
        ) : null}

        {formData.currentClass === 'Class 6-8' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Academic Performance
            </label>
            <select
              value={formData.sscGPA}
              onChange={(e) => handleChange('sscGPA', e.target.value)}
              className="input-field"
            >
              <option value="">Select performance level</option>
              <option value="Excellent">Excellent (A+ grades)</option>
              <option value="Very Good">Very Good (A grades)</option>
              <option value="Good">Good (A- grades)</option>
              <option value="Average">Average (B grades)</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Subject-wise Grades (Optional)
          </label>
          <input
            type="text"
            value={formData.grades}
            onChange={(e) => handleChange('grades', e.target.value)}
            placeholder="e.g., A+ in Math, A in Physics, A- in Chemistry"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Test Scores (IELTS, TOEFL, SAT, etc.)
          </label>
          <input
            type="text"
            value={formData.testScores}
            onChange={(e) => handleChange('testScores', e.target.value)}
            placeholder="e.g., IELTS 7.0, TOEFL 100, SAT 1400"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Academic Strengths
          </label>
          <input
            type="text"
            value={formData.strengths}
            onChange={(e) => handleChange('strengths', e.target.value)}
            placeholder="e.g., Strong in Math, Analytical thinking"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Country/Region *
          </label>
          <select
            required
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="input-field"
          >
            <option value="Bangladesh">Bangladesh</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Singapore">Singapore</option>
            <option value="India">India</option>
            <option value="Japan">Japan</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Financial Capability
          </label>
          <select
            value={formData.financial}
            onChange={(e) => handleChange('financial', e.target.value)}
            className="input-field"
          >
            <option value="">Select option</option>
            <option value="Full scholarship needed">Full scholarship needed</option>
            <option value="Up to 50,000 BDT/year">Up to 50,000 BDT/year</option>
            <option value="50,000 - 200,000 BDT/year">50,000 - 200,000 BDT/year</option>
            <option value="200,000 - 500,000 BDT/year">200,000 - 500,000 BDT/year</option>
            <option value="Above 500,000 BDT/year">Above 500,000 BDT/year</option>
            <option value="No financial constraints">No financial constraints</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Work Style Preference
          </label>
          <select
            value={formData.workStyle}
            onChange={(e) => handleChange('workStyle', e.target.value)}
            className="input-field"
          >
            <option value="">Select option</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Personal Skills
        </label>
        <textarea
          value={formData.skills}
          onChange={(e) => handleChange('skills', e.target.value)}
          placeholder="e.g., Leadership, Communication, Problem-solving, Creativity"
          rows={3}
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hobbies & Interests
        </label>
        <textarea
          value={formData.hobbies}
          onChange={(e) => handleChange('hobbies', e.target.value)}
          placeholder="e.g., Coding, Reading, Sports, Music"
          rows={3}
          className="input-field"
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2"
      >
        Generate Roadmap <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  )
}

