import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = 'AIzaSyBjs51lpLT_LqafRWB7tCSsst_Ux79yy0k'

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    
    // Try different model names in order of preference
    const modelsToTry = ['gemini-2.0-flash-exp', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro']
    let lastError: any = null
    let text = ''

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        const result = await model.generateContent(prompt)
        const response = await result.response
        text = response.text()
        
        if (text && text.trim().length > 0) {
          console.log(`Successfully used model: ${modelName}`)
          break
        }
      } catch (error: any) {
        console.warn(`Model ${modelName} failed:`, error.message)
        lastError = error
        continue
      }
    }

    if (!text || text.trim().length === 0) {
      throw lastError || new Error('All models failed to generate response')
    }

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Empty response from AI' },
        { status: 500 }
      )
    }

    return NextResponse.json({ response: text, success: true })
  } catch (error: any) {
    console.error('Gemini API Error:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to generate response',
        details: error.toString()
      },
      { status: 500 }
    )
  }
}

