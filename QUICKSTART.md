# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

That's it! The app is ready to use.

## 📋 What You Can Do

### 1. Generate Career Roadmap
- Go to **Roadmap** page
- Fill in your details (interests, GPA, country, etc.)
- Get a personalized AI-generated roadmap
- Download as PDF

### 2. Simulate a Career
- Go to **Simulator** page
- Select or type a career
- Explore day-in-the-life, salary, job demand, and more
- Download as PDF

### 3. Find Universities
- Go to **Admissions** page
- **Search**: Find universities by name, program, country
- **Compare**: Side-by-side comparison of 2-3 universities
- **AI Suggestions**: Get personalized admission recommendations

## 🔧 Troubleshooting

**Port 3000 already in use?**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API errors?**
- Check your internet connection
- Verify Gemini API key is valid (currently hardcoded for testing)
- Check browser console for detailed errors

## 📱 Mobile Testing

The app is fully responsive. Test on mobile by:
1. Opening DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js`
- **University Data**: Edit `data/universities.json`
- **API Key**: Edit `app/api/gemini/route.ts` (or use env variable)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy

### Vercel (Easiest)
1. Push to GitHub
2. Import to Vercel
3. Deploy (automatic)

### Other Platforms
- Netlify
- Railway
- AWS Amplify
- Any platform supporting Next.js

## 💡 Tips

- All data is stored client-side (no database needed)
- University data is in JSON format (easy to expand)
- PDF generation works best in Chrome/Edge
- AI responses may take 5-10 seconds

## 🆘 Need Help?

Check the main README.md for detailed documentation.

