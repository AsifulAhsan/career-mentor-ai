'use client'

import { useState } from 'react'
import RoadmapForm from '@/components/roadmap/RoadmapForm'
import RoadmapDisplay from '@/components/roadmap/RoadmapDisplay'
import { Loader2 } from 'lucide-react'

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (formData: any) => {
    setLoading(true)
    try {
      const prompt = `Generate a comprehensive career roadmap for a Bangladeshi student with the following details:

Current Enrolled Class: ${formData.currentClass}
Career Interests: ${formData.interests}
Academic Results: ${formData.currentClass === 'Class 6-8' ? `Current Performance: ${formData.sscGPA}` : `SSC GPA ${formData.sscGPA}, HSC GPA ${formData.hscGPA}`}, Subject Grades: ${formData.grades}, Test Scores: ${formData.testScores}, Strengths: ${formData.strengths}
Preferred Country/Region: ${formData.country}
Financial Capability: ${formData.financial}
Work Style Preference: ${formData.workStyle}
Personal Skills: ${formData.skills}
Hobbies: ${formData.hobbies}

Note: This is a Bangladeshi student currently in ${formData.currentClass}. 
- Class 6-8: Junior Secondary level (preparing for SSC)
- Class 9-10: Secondary level (SSC preparation)
- Class 11-12: Higher Secondary level (HSC preparation)
- SSC (Secondary School Certificate) and HSC (Higher Secondary Certificate) are the main academic qualifications. GPA is out of 5.00 (A+ = 5.0, A = 4.0, A- = 3.5, B = 3.0, C = 2.0, D = 1.0, F = 0.0).

Tailor the roadmap according to their current class level. For Class 6-8, focus on foundation building. For Class 9-10, focus on SSC preparation and subject selection. For Class 11-12, focus on HSC preparation, university admission, and career planning.

Please provide a detailed roadmap in the following JSON format:
{
  "careerTitle": "Career name",
  "overview": "Brief overview",
  "learningPath": [
    {
      "phase": "Phase name (e.g., Foundation, Intermediate, Advanced)",
      "duration": "Time period",
      "subjects": ["Subject 1", "Subject 2"],
      "courses": ["Course 1", "Course 2"],
      "skills": ["Skill 1", "Skill 2"],
      "certifications": ["Cert 1", "Cert 2"],
      "projects": ["Project 1", "Project 2"]
    }
  ],
  "timeline": {
    "shortTerm": {
      "weekly": ["Goal 1", "Goal 2"],
      "monthly": ["Goal 1", "Goal 2"]
    },
    "longTerm": {
      "yearly": ["Goal 1", "Goal 2"]
    }
  },
  "internshipRoadmap": [
    {
      "year": "Year/Stage",
      "type": "Internship type",
      "description": "Description"
    }
  ],
  "alternativeCareers": ["Career 1", "Career 2", "Career 3"]
}

Make it realistic, actionable, and tailored to the student's profile. Return ONLY valid JSON, no markdown formatting.`

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type: 'roadmap' }),
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
      let roadmapData
      try {
        // First, try to find JSON in the response
        let jsonText = data.response.trim()
        
        // Remove markdown code blocks if present
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        
        // Try to find JSON object
        const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          roadmapData = JSON.parse(jsonMatch[0])
        } else {
          // If no JSON found, try parsing the whole response
          roadmapData = JSON.parse(jsonText)
        }
      } catch (e) {
        console.error('JSON Parse Error:', e)
        console.error('Raw Response:', data.response)
        
        // Fallback: create a structured response from text
        // Try to extract information from the text response
        const responseText = data.response
        
        roadmapData = {
          careerTitle: formData.interests || 'Career Path',
          overview: responseText.substring(0, 500) + (responseText.length > 500 ? '...' : ''),
          learningPath: [
            {
              phase: 'Foundation Phase',
              duration: '6-12 months',
              subjects: ['Core subjects based on your interests'],
              courses: ['Relevant courses'],
              skills: ['Essential skills'],
              certifications: ['Recommended certifications'],
              projects: ['Starter projects']
            }
          ],
          timeline: { 
            shortTerm: { 
              weekly: ['Focus on current studies', 'Build foundational skills'],
              monthly: ['Complete monthly goals', 'Track progress']
            }, 
            longTerm: { 
              yearly: ['Complete academic goals', 'Prepare for next level']
            } 
          },
          internshipRoadmap: [
            {
              year: 'After HSC',
              type: 'Entry-level internship',
              description: 'Gain practical experience in your field of interest'
            }
          ],
          alternativeCareers: ['Related career options'],
          rawResponse: responseText // Include raw response for debugging
        }
      }

      // Ensure all required fields exist
      if (!roadmapData.careerTitle) {
        roadmapData.careerTitle = formData.interests || 'Career Path'
      }
      if (!roadmapData.overview) {
        roadmapData.overview = 'Your personalized career roadmap based on your profile.'
      }
      if (!roadmapData.learningPath) {
        roadmapData.learningPath = []
      }
      if (!roadmapData.timeline) {
        roadmapData.timeline = { shortTerm: { weekly: [], monthly: [] }, longTerm: { yearly: [] } }
      }

      setRoadmap(roadmapData)
    } catch (error: any) {
      console.error('Error generating roadmap:', error)
      alert(`Failed to generate roadmap: ${error.message || 'Unknown error'}. Please check the console for details.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Career Roadmap Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a personalized, step-by-step career roadmap tailored to your unique profile, 
            interests, and goals.
          </p>
        </div>

        {!roadmap ? (
          <div className="card max-w-4xl mx-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <p className="text-gray-600">Generating your personalized roadmap...</p>
                <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
              </div>
            ) : (
              <RoadmapForm onSubmit={handleGenerate} />
            )}
          </div>
        ) : (
          <RoadmapDisplay roadmap={roadmap} onReset={() => setRoadmap(null)} />
        )}
      </div>
    </div>
  )
}

