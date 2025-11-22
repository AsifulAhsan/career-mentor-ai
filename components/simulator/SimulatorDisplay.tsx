'use client'

import React, { useState } from 'react'
import { Download, RotateCcw, Clock, DollarSign, TrendingUp, Briefcase, GraduationCap, CheckCircle, XCircle, Code, BarChart3 } from 'lucide-react'
import { generatePDF } from '@/utils/pdfGenerator'

interface Simulation {
  careerTitle: string
  dayInLife: any
  dailyTasks: string[]
  complexity: string
  difficulty: string
  salary: any
  jobDemand: any
  hiringProbability: string
  education: any
  pros: string[]
  cons: string[]
  tools: string[]
  software: string[]
  futureOpportunities: string
  careerGrowth: any[]
}

export default function SimulatorDisplay({ simulation, onReset }: { simulation: Simulation; onReset: () => void }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    setDownloading(true)
    try {
      await generatePDF('simulation-content', `${simulation.careerTitle}-Simulation.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const growthChartData = simulation.careerGrowth?.map((stage: any) => ({
    stage: stage.stage || 'Stage',
    salary: stage.salary || 'N/A',
    years: stage.years || 'N/A'
  })) || []

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{simulation.careerTitle}</h2>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              simulation.complexity === 'High' ? 'bg-red-100 text-red-700' :
              simulation.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              Complexity: {simulation.complexity || 'Medium'}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              Demand: {simulation.jobDemand?.current || 'Medium'}
            </span>
          </div>
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
            New Simulation
          </button>
        </div>
      </div>

      <div id="simulation-content" className="space-y-8">
        {/* Day in the Life */}
        {simulation.dayInLife && (
          <section className="card">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">A Day in the Life</h3>
            </div>
            {simulation.dayInLife.description && (
              <p className="text-gray-700 mb-6 leading-relaxed">{simulation.dayInLife.description}</p>
            )}
            {simulation.dayInLife.schedule && simulation.dayInLife.schedule.length > 0 && (
              <div className="space-y-3">
                {simulation.dayInLife.schedule.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold min-w-[100px] text-center">
                      {item.time}
                    </div>
                    <p className="text-gray-700 flex-1 pt-2">{item.activity}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Daily Tasks */}
        {simulation.dailyTasks && simulation.dailyTasks.length > 0 && (
          <section className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Daily Tasks</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {simulation.dailyTasks.map((task: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Salary & Job Market */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">Salary Range</h3>
            </div>
            <div className="space-y-3">
              {simulation.salary?.local && (
                <div>
                  <span className="text-sm text-gray-600">Local Market:</span>
                  <p className="text-xl font-bold text-gray-900">{simulation.salary.local}</p>
                </div>
              )}
              {simulation.salary?.global && (
                <div>
                  <span className="text-sm text-gray-600">Global Market:</span>
                  <p className="text-xl font-bold text-gray-900">{simulation.salary.global}</p>
                </div>
              )}
              {simulation.salary?.entryLevel && (
                <div>
                  <span className="text-sm text-gray-600">Entry Level:</span>
                  <p className="text-lg font-semibold text-gray-800">{simulation.salary.entryLevel}</p>
                </div>
              )}
              {simulation.salary?.senior && (
                <div>
                  <span className="text-sm text-gray-600">Senior Level:</span>
                  <p className="text-lg font-semibold text-gray-800">{simulation.salary.senior}</p>
                </div>
              )}
            </div>
          </section>

          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">Job Market</h3>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Current Demand:</span>
                <p className="text-xl font-bold text-gray-900 capitalize">{simulation.jobDemand?.current || 'Medium'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Trend:</span>
                <p className="text-lg font-semibold text-gray-800 capitalize">{simulation.jobDemand?.trend || 'Stable'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Hiring Probability:</span>
                <p className="text-lg font-semibold text-gray-800">{simulation.hiringProbability || 'Medium'}</p>
              </div>
              {simulation.jobDemand?.statistics && (
                <div>
                  <span className="text-sm text-gray-600">Statistics:</span>
                  <p className="text-gray-700 mt-1">{simulation.jobDemand.statistics}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Education & Requirements */}
        <section className="card">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-primary-600" />
            <h3 className="text-2xl font-bold text-gray-900">Education & Requirements</h3>
          </div>
          <div className="space-y-4">
            {simulation.education?.required && (
              <div>
                <span className="text-sm font-semibold text-gray-700">Required Education:</span>
                <p className="text-gray-700 mt-1">{simulation.education.required}</p>
              </div>
            )}
            {simulation.education?.alternatives && simulation.education.alternatives.length > 0 && (
              <div>
                <span className="text-sm font-semibold text-gray-700">Alternative Paths:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {simulation.education.alternatives.map((alt: string, i: number) => (
                    <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {simulation.difficulty && (
              <div>
                <span className="text-sm font-semibold text-gray-700">Difficulty Level:</span>
                <p className="text-gray-700 mt-1">{simulation.difficulty}</p>
              </div>
            )}
          </div>
        </section>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-6">
          {simulation.pros && simulation.pros.length > 0 && (
            <section className="card">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Pros</h3>
              </div>
              <ul className="space-y-2">
                {simulation.pros.map((pro: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {simulation.cons && simulation.cons.length > 0 && (
            <section className="card">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-2xl font-bold text-gray-900">Cons</h3>
              </div>
              <ul className="space-y-2">
                {simulation.cons.map((con: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{con}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Tools & Software */}
        {(simulation.tools?.length > 0 || simulation.software?.length > 0) && (
          <section className="card">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">Tools & Software</h3>
            </div>
            <div className="space-y-4">
              {simulation.tools && simulation.tools.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700">Tools:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {simulation.tools.map((tool: string, i: number) => (
                      <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {simulation.software && simulation.software.length > 0 && (
                <div>
                  <span className="text-sm font-semibold text-gray-700">Software:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {simulation.software.map((soft: string, i: number) => (
                      <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                        {soft}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Career Growth Chart */}
        {simulation.careerGrowth && simulation.careerGrowth.length > 0 && (
          <section className="card">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-primary-600" />
              <h3 className="text-2xl font-bold text-gray-900">Career Growth & Progression</h3>
            </div>
            <div className="space-y-4">
              {simulation.careerGrowth.map((stage: any, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{stage.stage || `Stage ${index + 1}`}</h4>
                    <span className="text-sm text-gray-600">{stage.years || 'N/A'}</span>
                  </div>
                  <p className="text-primary-600 font-semibold">{stage.salary || 'N/A'}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Future Opportunities */}
        {simulation.futureOpportunities && (
          <section className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Future Opportunities & Growth</h3>
            <p className="text-gray-700 leading-relaxed">{simulation.futureOpportunities}</p>
          </section>
        )}
      </div>
    </div>
  )
}

