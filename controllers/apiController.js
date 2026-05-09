const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const schemesPath = path.join(__dirname, '../models/schemes.json');

const getSchemesData = () => {
  const data = fs.readFileSync(schemesPath);
  return JSON.parse(data);
};

exports.getSchemes = (req, res) => {
  try {
    const schemes = getSchemesData();
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch schemes' });
  }
};

exports.getSchemeById = (req, res) => {
  try {
    const schemes = getSchemesData();
    const scheme = schemes.find(s => s.id === req.params.id);
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ error: 'Scheme not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scheme' });
  }
};

const groq = require("../groq");

exports.checkEligibility = async (req, res) => {
  const userData = req.body;
  
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'AI service configuration missing' });
  }

  const SYSTEM_PROMPT = `
You are SchemeSathi AI — an elite Indian Welfare Intelligence Engine.

MISSION:
Your primary mission is to intelligently detect and recommend BOTH Central Government schemes and State Government schemes specifically based on the user's selected state.

RANKING & PRIORITIZATION ALGORITHM:
You must dynamically analyze the user's profile and prioritize schemes based on:
1. State matches (Highly prioritize schemes specific to their exact state).
2. Demographic match (Gender, Age/Senior Citizen).
3. Socio-economic match (Income, Category, BPL).
4. Professional match (Occupation, Education, Farmer/Student/Business).
5. Geographic match (Rural/Urban).
6. Special match (Disability, Widow).

Assign an "eligibilityScore" (0-100) based on how perfectly the user fits the scheme's core criteria. Sort the output array from highest score to lowest.

RULES:
- Only recommend REAL Indian government schemes that actually exist.
- ALWAYS search for and include schemes from the user's specific state government.
- Never hallucinate or invent fake schemes.
- Always include official government URLs only (schemes.gov.in, india.gov.in, state portals etc.).
- Explain eligibility in simple Hindi-friendly English.
- Return ONLY valid JSON, no extra text.

RESPONSE FORMAT (strict JSON):
{
  "eligibleSchemes": [
    {
      "schemeName": "string",
      "schemeCategory": "string (e.g. 'Central Government' or 'State Government of [State]')",
      "eligibilityScore": 0-100,
      "eligibilityReason": "string",
      "benefits": ["string"],
      "requiredDocuments": ["string"],
      "applicationProcess": "string",
      "officialLink": "string",
      "deadline": "string or null",
      "stateSpecific": boolean,
      "ministry": "string"
    }
  ],
  "totalSchemes": number,
  "summary": "string",
  "priorityScheme": "string"
}`;

  const userPrompt = `
Check eligibility for this Indian citizen and recommend suitable government schemes:

Name: ${userData.fullName}
Age: ${userData.age}
Gender: ${userData.gender}
State: ${userData.state}
Annual Income: ₹${userData.annualIncome}
Occupation: ${userData.occupation}
Category: ${userData.category} (General/OBC/SC/ST)
Education: ${userData.educationLevel || userData.education}
Employment Status: ${userData.employmentStatus}
Is Farmer: ${userData.isFarmer}
Is Student: ${userData.isStudent || 'Unknown'}
Has Disability: ${userData.hasDisability}
Is Minority: ${userData.isMinority}
Is Widow: ${userData.isWidow}
Is Senior Citizen: ${userData.isSeniorCitizen || (userData.age >= 60 ? 'Yes' : 'No')}
Area Type: ${userData.regionType || userData.areaType} (Urban/Rural)
BPL Card Holder: ${userData.isBPL}
Has Aadhaar: ${userData.hasAadhaar}
Is Business Owner: ${userData.isBusinessOwner}
Is Startup Founder: ${userData.isStartupFounder || 'Unknown'}

Find ALL government schemes this person qualifies for. Return JSON only.
`;

  try {
    console.log("Generating eligibility assessment with Groq (llama-3.3-70b-versatile)...");
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const rawResponse = completion.choices[0].message.content;
    const result = JSON.parse(rawResponse);
    
    console.log("Successfully generated eligibility results.");
    res.json(result);

  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(503).json({ 
      error: 'The AI service is currently unavailable. Please try again later.',
      details: error.message 
    });
  }
};
