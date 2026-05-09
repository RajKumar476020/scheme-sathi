# SchemeSathi

SchemeSathi is a modern, premium, fully responsive full-stack web application designed for India. It helps users discover which Indian government schemes they are eligible for based on a detailed profile questionnaire. The platform utilizes AI (via OpenRouter) to provide accurate, personalized matching and clearly formatted results.

## Features

- **Smart Eligibility Form:** Captures 20+ user data points to accurately determine eligibility.
- **AI-Powered Matching:** Securely calls the Google Gemini API (`gemini-1.5-flash`) to analyze user data and recommend real Indian government schemes.
- **Premium UI:** Designed with HTML5, Vanilla JS, and Tailwind CSS. Features glassmorphism, dynamic animations, tricolor gradients, and full responsiveness across mobile, tablet, and desktop.
- **Dark/Light Mode:** Toggleable color themes stored in `localStorage`.
- **PDF Download & Sharing:** Export your eligibility report as a perfectly formatted PDF.
- **Auto-save & Caching:** Prevents data loss during form filling by saving drafts.
- **Robust Backend:** Built with Node.js and Express, complete with rate-limiting, CORS, Helmet security headers, and an internal JSON database of popular schemes.

## Project Structure

```
d:\Web app\Scheme Sathi\
  ├── package.json
  ├── server.js          # Express app entry point
  ├── routes/            # API routing logic
  ├── controllers/       # Controller logic including the AI API prompt engineering
  ├── models/            # Database storage (JSON for schemes)
  └── public/            # Frontend static files served by Express
       ├── index.html    # Main HTML layout
       ├── styles/       # CSS (Tailwind config + custom glassmorphism styles)
       └── scripts/      # Vanilla JS for form logic, UI, and API integration
```

## Environment Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Running Locally

To run the application in development mode (requires nodemon):
```bash
npm run dev
```

To run in production mode:
```bash
npm start
```
The app will be available at `http://localhost:3000`.

## Deployment Guide

### Deploying the Backend (Render / Railway)
1. Push your code to GitHub.
2. Sign in to Render or Railway and create a new Web Service.
3. Connect your GitHub repository.
4. Set the Build Command to `npm install` and the Start Command to `npm start`.
5. Add the `GEMINI_API_KEY` to the Environment Variables section.
6. Deploy the service.

*(For a separated frontend and backend architecture, you could deploy the `public` folder to Vercel/Netlify, and the backend to Render. In this unified approach, Render/Railway handles both).*

## Security Features
- **Helmet.js** protects against well-known web vulnerabilities.
- **Express Rate Limit** protects API routes against brute force/DDoS.
- **Environment Variables** keep the AI API key fully secure on the backend, hidden from the browser.
- **CORS** restricts the domains that can call the API.

## About the AI Integration
The AI integration uses a powerful internal prompt ensuring it:
1. Recommends only real, verified Indian schemes.
2. Provides structured JSON with benefits, documents, and application processes.
3. Strictly refrains from hallucinating or sharing fake portals.
