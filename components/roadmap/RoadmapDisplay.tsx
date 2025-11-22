'use client'

import React, { useState } from 'react'
import { Download, RotateCcw, Calendar, BookOpen, Award, Briefcase, Target } from 'lucide-react'
import { generatePDF } from '@/utils/pdfGenerator'

interface Roadmap {
  careerTitle: string
  overview: string
  learningPath: any[]
  timeline: any
  internshipRoadmap: any[]
  alternativeCareers: string[]
}

export default function RoadmapDisplay({ roadmap, onReset }: { roadmap: Roadmap; onReset: () => void }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      await generatePDF('roadmap-content', 'Career-Roadmap.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.careerTitle || 'Career Roadmap'}</h2>
          <p className="text-gray-600">{roadmap.overview || 'Your personalized career roadmap'}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            {downloading ? 'Generating...' : 'Download PDF'}
          </button>
          <button onClick={onReset} className="btn-secondary inline-flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            New Roadmap
          </button>
        </div>
      </div>

      <div id="roadmap-content" className="space-y-8">
        {/* Learning Path */}
        {roadmap.learningPath && roadmap.learningPath.length > 0 && (
          <section className="card">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">Learning Path</h3>
            </div>
            <div className="space-y-6">
              {roadmap.learningPath.map((phase: any, index: number) => (
                <div key={index} className="border-l-4 border-primary-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Phase {index + 1}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">{phase.phase || `Phase ${index + 1}`}</h4>
                    {phase.duration && (
                      <span className="text-sm text-gray-500">({phase.duration})</span>
                    )}
                  </div>
                  
                  {phase.subjects && phase.subjects.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-gray-700">Subjects:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {phase.subjects.map((subject: string, i: number) => (
                          <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.courses && phase.courses.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-gray-700">Courses:</strong>
                      <ul className="list-disc list-inside mt-1 text-gray-600">
                        {phase.courses.map((course: string, i: number) => (
                          <li key={i}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.skills && phase.skills.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-gray-700">Skills to Develop:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {phase.skills.map((skill: string, i: number) => (
                          <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {phase.certifications && phase.certifications.length > 0 && (
                    <div className="mb-3">
                      <strong className="text-gray-700">Certifications:</strong>
                      <ul className="list-disc list-inside mt-1 text-gray-600">
                        {phase.certifications.map((cert: string, i: number) => (
                          <li key={i}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.projects && phase.projects.length > 0 && (
                    <div>
                      <strong className="text-gray-700">Projects:</strong>
                      <ul className="list-disc list-inside mt-1 text-gray-600">
                        {phase.projects.map((project: string, i: number) => (
                          <li key={i}>{project}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Timeline */}
        {roadmap.timeline && (
          <section className="card">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">Timeline & Goals</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {roadmap.timeline.shortTerm?.weekly && roadmap.timeline.shortTerm.weekly.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Weekly Goals</h4>
                  <ul className="space-y-2">
                    {roadmap.timeline.shortTerm.weekly.map((goal: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {roadmap.timeline.shortTerm?.monthly && roadmap.timeline.shortTerm.monthly.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Monthly Goals</h4>
                  <ul className="space-y-2">
                    {roadmap.timeline.shortTerm.monthly.map((goal: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {roadmap.timeline.longTerm?.yearly && roadmap.timeline.longTerm.yearly.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Yearly Goals</h4>
                  <ul className="space-y-2">
                    {roadmap.timeline.longTerm.yearly.map((goal: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Internship Roadmap */}
        {roadmap.internshipRoadmap && roadmap.internshipRoadmap.length > 0 && (
          <section className="card">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">Internship Roadmap</h3>
            </div>
            <div className="space-y-4">
              {roadmap.internshipRoadmap.map((internship: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-500">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-primary-600" />
                    <h4 className="font-bold text-gray-900">{internship.year || `Year ${index + 1}`}</h4>
                    {internship.type && (
                      <span className="text-sm text-gray-500">({internship.type})</span>
                    )}
                  </div>
                  {internship.description && (
                    <p className="text-gray-700">{internship.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Alternative Careers */}
        {roadmap.alternativeCareers && roadmap.alternativeCareers.length > 0 && (
          <section className="card">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">Alternative Career Paths</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {roadmap.alternativeCareers.map((career: string, i: number) => (
                <span key={i} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium">
                  {career}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

