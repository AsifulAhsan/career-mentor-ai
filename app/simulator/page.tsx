'use client'

import { useState } from 'react'
import SimulatorForm from '@/components/simulator/SimulatorForm'
import SimulatorDisplay from '@/components/simulator/SimulatorDisplay'
import { Loader2 } from 'lucide-react'

export default function SimulatorPage() {
  const [simulation, setSimulation] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSimulate = async (career: string) => {
    setLoading(true)
    try {
      const prompt = `Provide a comprehensive career simulation for: ${career}

Please provide detailed information in the following JSON format:
{
  "careerTitle": "${career}",
  "dayInLife": {
    "schedule": [
      {"time": "9:00 AM", "activity": "Activity description"},
      {"time": "10:00 AM", "activity": "Activity description"}
    ],
    "description": "Detailed description of a typical day"
  },
  "dailyTasks": ["Task 1", "Task 2", "Task 3"],
  "complexity": "Medium/High/Low",
  "difficulty": "Description of difficulty level",
  "salary": {
    "local": "$50,000 - $80,000",
    "global": "$60,000 - $100,000",
    "entryLevel": "$40,000 - $60,000",
    "senior": "$100,000 - $150,000"
  },
  "jobDemand": {
    "current": "High/Medium/Low",
    "trend": "Growing/Stable/Declining",
    "statistics": "Specific statistics and data"
  },
  "hiringProbability": "High/Medium/Low with explanation",
  "education": {
    "required": "Degree requirements",
    "alternatives": ["Bootcamp", "Online Learning", "Vocational Training"]
  },
  "pros": ["Pro 1", "Pro 2", "Pro 3"],
  "cons": ["Con 1", "Con 2", "Con 3"],
  "tools": ["Tool 1", "Tool 2", "Tool 3"],
  "software": ["Software 1", "Software 2"],
  "futureOpportunities": "Description of future growth",
  "careerGrowth": [
    {"stage": "Entry Level", "years": "0-2", "salary": "$40k-$60k"},
    {"stage": "Mid Level", "years": "3-5", "salary": "$60k-$90k"},
    {"stage": "Senior", "years": "6-10", "salary": "$90k-$130k"},
    {"stage": "Expert", "years": "10+", "salary": "$130k+"}
  ]
}

Make it realistic, detailed, and informative. Return ONLY valid JSON, no markdown formatting.`

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type: 'simulator' }),
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
      let simulationData
      try {
        // First, try to find JSON in the response
        let jsonText = data.response.trim()
        
        // Remove markdown code blocks if present
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        
        // Try to find JSON object
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          simulationData = JSON.parse(jsonMatch[0])
        } else {
          // If no JSON found, try parsing the whole response
          simulationData = JSON.parse(jsonText)
        }
      } catch (e) {
        console.error('JSON Parse Error:', e)
        console.error('Raw Response:', data.response)
        
        // Fallback: create a structured response from text
        const responseText = data.response
        
        simulationData = {
          careerTitle: career,
          dayInLife: { 
            schedule: [
              { time: '9:00 AM', activity: 'Start of workday' },
              { time: '12:00 PM', activity: 'Lunch break' },
              { time: '5:00 PM', activity: 'End of workday' }
            ], 
            description: responseText.substring(0, 500) + (responseText.length > 500 ? '...' : '')
          },
          dailyTasks: ['Complete assigned tasks', 'Attend meetings', 'Collaborate with team'],
          complexity: 'Medium',
          difficulty: 'Moderate',
          salary: { 
            local: '40,000 - 80,000 BDT/month', 
            global: 'Varies by location',
            entryLevel: '30,000 - 50,000 BDT/month',
            senior: '100,000+ BDT/month'
          },
          jobDemand: { 
            current: 'High', 
            trend: 'Growing',
            statistics: 'Strong demand in Bangladesh market'
          },
          hiringProbability: 'High - Good opportunities available',
          education: { 
            required: 'Bachelor\'s degree or equivalent',
            alternatives: ['Online courses', 'Bootcamps', 'Certifications']
          },
          pros: ['Good career growth', 'Competitive salary', 'Job security'],
          cons: ['May require continuous learning', 'Can be demanding'],
          tools: ['Industry-standard tools'],
          software: ['Relevant software'],
          futureOpportunities: 'Growing field with many opportunities',
          careerGrowth: [
            { stage: 'Entry Level', years: '0-2', salary: '30k-50k BDT/month' },
            { stage: 'Mid Level', years: '3-5', salary: '50k-80k BDT/month' },
            { stage: 'Senior', years: '6-10', salary: '80k-120k BDT/month' },
            { stage: 'Expert', years: '10+', salary: '120k+ BDT/month' }
          ],
          rawResponse: responseText
        }
      }

      // Ensure all required fields exist
      if (!simulationData.careerTitle) {
        simulationData.careerTitle = career
      }
      if (!simulationData.dayInLife) {
        simulationData.dayInLife = { schedule: [], description: 'A typical day in this career' }
      }

      setSimulation(simulationData)
    } catch (error: any) {
      console.error('Error simulating career:', error)
      alert(`Failed to simulate career: ${error.message || 'Unknown error'}. Please check the console for details.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Career Simulator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience a day in the life of any career. Get insights on salary, job demand, 
            required skills, and future opportunities.
          </p>
        </div>

        {!simulation ? (
          <div className="card max-w-4xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <p className="text-gray-600">Simulating career experience...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            ) : (
              <SimulatorForm onSubmit={handleSimulate} />
            )}
          </div>
        ) : (
          <SimulatorDisplay simulation={simulation} onReset={() => setSimulation(null)} />
        )}
      </div>
    </div>
  )
}

