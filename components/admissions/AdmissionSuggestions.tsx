'use client'

import React, { useState } from 'react'
import { Loader2, Sparkles, GraduationCap, DollarSign, Target } from 'lucide-react'

export default function AdmissionSuggestions() {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any>(null)
  const [formData, setFormData] = useState({
    currentClass: '',
    interests: '',
    sscGPA: '',
    hscGPA: '',
    testScores: '',
    budget: '',
    countries: 'Bangladesh',
    strengths: '',
    weaknesses: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const prompt = `Based on the following Bangladeshi student profile, provide personalized university admission suggestions:

Current Enrolled Class: ${formData.currentClass}
Interests/Major: ${formData.interests}
${formData.currentClass === 'Class 11-12' || formData.currentClass === 'University' ? `SSC GPA: ${formData.sscGPA} (out of 5.00)` : `Current Performance: ${formData.sscGPA}`}
${formData.currentClass === 'University' ? `HSC GPA: ${formData.hscGPA} (out of 5.00)` : ''}
Test Scores: ${formData.testScores}
Budget: ${formData.budget}
Preferred Countries: ${formData.countries}
Strengths: ${formData.strengths}
Weaknesses: ${formData.weaknesses}

Note: This is a Bangladeshi student currently in ${formData.currentClass}.
- Class 9-10: Secondary level (SSC preparation) - provide guidance on subject selection and preparation
- Class 11-12: Higher Secondary level (HSC preparation) - provide admission guidance and preparation timeline
- University: Already in university - provide transfer or graduate program guidance
SSC (Secondary School Certificate) and HSC (Higher Secondary Certificate) are the main academic qualifications. GPA is out of 5.00 (A+ = 5.0, A = 4.0, A- = 3.5, B = 3.0, C = 2.0, D = 1.0, F = 0.0).

Tailor the suggestions according to their current class level. For Class 9-10, focus on subject selection and SSC preparation. For Class 11-12, focus on HSC preparation, admission test preparation, and university selection.

Please provide suggestions in the following JSON format:
{
  "bestFit": [
    {
      "university": "University name",
      "program": "Program name",
      "admissionProbability": "High/Medium/Low",
      "reason": "Why this is a good fit"
    }
  ],
  "backupOptions": [
    {
      "university": "University name",
      "program": "Program name",
      "admissionProbability": "High/Medium/Low",
      "reason": "Why this is a backup option"
    }
  ],
  "improvements": [
    "Area 1 to improve",
    "Area 2 to improve"
  ],
  "requiredDocuments": [
    "Document 1",
    "Document 2"
  ],
  "scholarshipOpportunities": [
    {
      "name": "Scholarship name",
      "eligibility": "Eligibility criteria",
      "amount": "Amount or coverage"
    }
  ],
  "timeline": {
    "applicationDeadline": "When to apply",
    "preparationTime": "How long to prepare",
    "recommendations": ["Recommendation 1", "Recommendation 2"]
  }
}

Make it realistic and actionable. Return ONLY valid JSON, no markdown formatting.`

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type: 'admissions' }),
      })

      const data = await response.json()
      
      // Check for API errors
      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.response) {
        throw new Error('No response from AI')
      }

      // Try to extract JSON from the response
      let suggestionsData
      try {
        // First, try to find JSON in the response
        let jsonText = data.response.trim()
        
        // Remove markdown code blocks if present
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        
        // Try to find JSON object
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          suggestionsData = JSON.parse(jsonMatch[0])
        } else {
          // If no JSON found, try parsing the whole response
          suggestionsData = JSON.parse(jsonText)
        }
      } catch (e) {
        console.error('JSON Parse Error:', e)
        console.error('Raw Response:', data.response)
        
        // Fallback: create structured response with the text
        const responseText = data.response
        
        suggestionsData = {
          bestFit: [
            {
              university: 'Based on your profile',
              program: formData.interests || 'Your desired program',
              admissionProbability: 'Medium',
              reason: responseText.substring(0, 200) + '...'
            }
          ],
          backupOptions: [
            {
              university: 'Alternative options available',
              program: 'Various programs',
              admissionProbability: 'High',
              reason: 'Good backup options based on your profile'
            }
          ],
          improvements: [
            'Focus on improving your academic performance',
            'Prepare for admission tests',
            'Build strong extracurricular activities'
          ],
          requiredDocuments: [
            'SSC Certificate',
            'HSC Certificate',
            'Admission Test Score',
            'Character Certificate',
            'Passport size photos'
          ],
          scholarshipOpportunities: [
            {
              name: 'Merit-based Scholarship',
              eligibility: 'Based on academic performance',
              amount: 'Varies by university'
            }
          ],
          timeline: {
            applicationDeadline: 'Check university websites',
            preparationTime: '6-12 months before admission',
            recommendations: [
              'Start preparing early',
              'Focus on your strengths',
              'Research universities thoroughly'
            ]
          },
          rawResponse: responseText
        }
      }

      // Ensure all required fields exist
      if (!suggestionsData.bestFit) {
        suggestionsData.bestFit = []
      }
      if (!suggestionsData.backupOptions) {
        suggestionsData.backupOptions = []
      }

      setSuggestions(suggestionsData)
    } catch (error: any) {
      console.error('Error getting suggestions:', error)
      alert(`Failed to get suggestions: ${error.message || 'Unknown error'}. Please check the console for details.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">AI-Powered Admission Suggestions</h2>
      </div>

      {!suggestions ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Enrolled Class *
              </label>
              <select
                required
                value={formData.currentClass}
                onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                className="input-field"
              >
                <option value="">Select your current class</option>
                <option value="Class 9-10">Class 9-10 (Secondary - SSC Level)</option>
                <option value="Class 11-12">Class 11-12 (Higher Secondary - HSC Level)</option>
                <option value="University">University/College</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Select the class you are currently studying in</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Career Interests / Desired Major *
              </label>
              <input
                type="text"
                required
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                placeholder="e.g., Computer Science, Medicine, Business"
                className="input-field"
              />
            </div>

            {formData.currentClass === 'Class 11-12' || formData.currentClass === 'University' ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  SSC GPA (Secondary School Certificate) *
                </label>
                <input
                  type="text"
                  required={formData.currentClass === 'Class 11-12' || formData.currentClass === 'University'}
                  value={formData.sscGPA}
                  onChange={(e) => setFormData({ ...formData, sscGPA: e.target.value })}
                  placeholder="e.g., 5.00, 4.50, 4.00"
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">Out of 5.00</p>
              </div>
            ) : null}

            {formData.currentClass === 'University' ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  HSC GPA (Higher Secondary Certificate) *
                </label>
                <input
                  type="text"
                  required={formData.currentClass === 'University'}
                  value={formData.hscGPA}
                  onChange={(e) => setFormData({ ...formData, hscGPA: e.target.value })}
                  placeholder="e.g., 5.00, 4.50, 4.00"
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">Out of 5.00</p>
              </div>
            ) : null}

            {formData.currentClass === 'Class 9-10' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Academic Performance (Optional)
                </label>
                <select
                  value={formData.sscGPA}
                  onChange={(e) => setFormData({ ...formData, sscGPA: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select performance level</option>
                  <option value="Excellent">Excellent (A+ grades)</option>
                  <option value="Very Good">Very Good (A grades)</option>
                  <option value="Good">Good (A- grades)</option>
                  <option value="Average">Average (B grades)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Your current performance in Class 9-10</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Test Scores (SAT, ACT, IELTS, TOEFL)
              </label>
              <input
                type="text"
                value={formData.testScores}
                onChange={(e) => setFormData({ ...formData, testScores: e.target.value })}
                placeholder="e.g., SAT 1400, IELTS 7.5"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget / Financial Capability *
              </label>
              <select
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
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
                Preferred Countries *
              </label>
              <input
                type="text"
                required
                value={formData.countries}
                onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
                placeholder="e.g., Bangladesh, United States, Canada, UK"
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
                onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                placeholder="e.g., Strong in Math, Research experience"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Areas to Improve
            </label>
            <textarea
              value={formData.weaknesses}
              onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
              placeholder="e.g., Need to improve test scores, lack of extracurriculars"
              rows={3}
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Get AI Suggestions
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-8">
          {/* Best Fit */}
          {suggestions.bestFit && suggestions.bestFit.length > 0 && (
            <section className="card">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Best Fit Universities</h3>
              </div>
              <div className="space-y-4">
                {suggestions.bestFit.map((fit: any, i: number) => (
                  <div key={i} className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900">{fit.university}</h4>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {fit.admissionProbability}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1"><strong>Program:</strong> {fit.program}</p>
                    <p className="text-gray-600">{fit.reason}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Backup Options */}
          {suggestions.backupOptions && suggestions.backupOptions.length > 0 && (
            <section className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Backup Options</h3>
              <div className="space-y-4">
                {suggestions.backupOptions.map((option: any, i: number) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900">{option.university}</h4>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {option.admissionProbability}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1"><strong>Program:</strong> {option.program}</p>
                    <p className="text-gray-600">{option.reason}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Improvements */}
          {suggestions.improvements && suggestions.improvements.length > 0 && (
            <section className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Areas to Improve</h3>
              <ul className="space-y-2">
                {suggestions.improvements.map((improvement: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Target className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Required Documents */}
          {suggestions.requiredDocuments && suggestions.requiredDocuments.length > 0 && (
            <section className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Required Documents</h3>
              <ul className="space-y-2">
                {suggestions.requiredDocuments.map((doc: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <GraduationCap className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Scholarships */}
          {suggestions.scholarshipOpportunities && suggestions.scholarshipOpportunities.length > 0 && (
            <section className="card">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-primary-600" />
                <h3 className="text-2xl font-bold text-gray-900">Scholarship Opportunities</h3>
              </div>
              <div className="space-y-4">
                {suggestions.scholarshipOpportunities.map((scholarship: any, i: number) => (
                  <div key={i} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-gray-900 mb-2">{scholarship.name}</h4>
                    <p className="text-gray-700 mb-1"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                    <p className="text-gray-700"><strong>Amount:</strong> {scholarship.amount}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Timeline */}
          {suggestions.timeline && (
            <section className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Timeline</h3>
              <div className="space-y-3">
                {suggestions.timeline.applicationDeadline && (
                  <div>
                    <strong className="text-gray-700">Application Deadline:</strong>
                    <p className="text-gray-600">{suggestions.timeline.applicationDeadline}</p>
                  </div>
                )}
                {suggestions.timeline.preparationTime && (
                  <div>
                    <strong className="text-gray-700">Preparation Time:</strong>
                    <p className="text-gray-600">{suggestions.timeline.preparationTime}</p>
                  </div>
                )}
                {suggestions.timeline.recommendations && suggestions.timeline.recommendations.length > 0 && (
                  <div>
                    <strong className="text-gray-700">Recommendations:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-600">
                      {suggestions.timeline.recommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          <button
            onClick={() => setSuggestions(null)}
            className="btn-secondary"
          >
            Get New Suggestions
          </button>
        </div>
      )}
    </div>
  )
}

