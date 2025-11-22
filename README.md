# CareerMentor AI

A fully functional, professional, and modern web application for students (grades 6–12 and university) to get AI-powered career guidance, simulate careers, and find the perfect university.

## Features

### 🎯 AI Career Roadmap Generator
- Personalized step-by-step career roadmaps
- Learning paths with subjects, courses, and certifications
- Timeline with weekly, monthly, and yearly goals
- Internship roadmap
- Alternative career paths
- PDF download functionality

### 🏢 AI Career Simulator
- Experience a day in the life of any career
- Daily tasks and schedule
- Salary ranges (local and global)
- Job demand statistics
- Education requirements and alternative paths
- Pros & cons analysis
- Tools and software used
- Career growth progression
- PDF download functionality

### 🎓 Admission Hub & University Comparison
- **Searchable Program Finder**: Search universities by name, program, country, fees, and ranking
- **Side-by-Side Comparison**: Compare 2-3 universities with detailed metrics
- **AI-Powered Suggestions**: Get personalized admission recommendations based on your profile
- Realistic admission probabilities
- Scholarship opportunities
- Required documents checklist
- Application timeline

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **Charts**: Recharts
- **PDF Generation**: jsPDF + html2canvas
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "career Planer"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
career-mentor-ai/
├── app/
│   ├── api/
│   │   └── gemini/
│   │       └── route.ts          # Gemini API integration
│   ├── admissions/
│   │   └── page.tsx             # Admission Hub page
│   ├── roadmap/
│   │   └── page.tsx             # Career Roadmap page
│   ├── simulator/
│   │   └── page.tsx             # Career Simulator page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/
│   ├── admissions/
│   │   ├── AdmissionSuggestions.tsx
│   │   ├── UniversityComparison.tsx
│   │   └── UniversitySearch.tsx
│   ├── roadmap/
│   │   ├── RoadmapDisplay.tsx
│   │   └── RoadmapForm.tsx
│   ├── simulator/
│   │   ├── SimulatorDisplay.tsx
│   │   └── SimulatorForm.tsx
│   └── Navigation.tsx
├── data/
│   └── universities.json        # Static university database
├── utils/
│   └── pdfGenerator.ts          # PDF generation utility
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Usage

### Career Roadmap Generator
1. Navigate to the "Roadmap" page
2. Fill in your career interests, academic results, preferred country, financial capability, work style, skills, and hobbies
3. Click "Generate Roadmap"
4. Review your personalized roadmap
5. Download as PDF if needed

### Career Simulator
1. Navigate to the "Simulator" page
2. Select a career from the popular options or type a custom career
3. Click "Simulate Career"
4. Explore the comprehensive career simulation
5. Download as PDF if needed

### Admission Hub
1. Navigate to the "Admissions" page
2. Use one of three tabs:
   - **Search**: Find universities by various criteria
   - **Compare**: Select 2-3 universities to compare side-by-side
   - **AI Suggestions**: Fill in your profile to get AI-powered admission recommendations

## API Configuration

The Gemini API key is currently hardcoded in `app/api/gemini/route.ts` for testing purposes. 

**⚠️ Important**: Before publishing to production, you should:
1. Move the API key to an environment variable
2. Create a `.env.local` file:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
3. Update `app/api/gemini/route.ts` to use:
   ```typescript
   const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
   ```
4. Add `.env.local` to `.gitignore`

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project to Vercel
3. Add environment variables if needed
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Features Overview

- ✅ No login/signup required
- ✅ No database setup needed
- ✅ Fully client-side with API routes
- ✅ Responsive design (mobile-friendly)
- ✅ Modern, clean UI
- ✅ PDF download functionality
- ✅ AI-powered recommendations
- ✅ Static university database
- ✅ Smooth animations and transitions

## Notes

- The university database (`data/universities.json`) contains sample data. You can expand it with more universities as needed.
- All AI features use the Gemini API, which requires an active internet connection.
- The app is designed to work entirely without a backend database - all data is either static (JSON files) or generated via API calls.

## Troubleshooting

### API Errors
- Ensure you have a valid Gemini API key
- Check your internet connection
- Verify the API key has sufficient quota

### Build Errors
- Clear `.next` folder and `node_modules`
- Run `npm install` again
- Check Node.js version (should be 18+)

### PDF Generation Issues
- Ensure you're using a modern browser
- Some browsers may block PDF downloads - check browser settings

## License

This project is for educational and personal use.

## Support

For issues or questions, please check the code comments or refer to the Next.js and Gemini API documentation.

