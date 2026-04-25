// AI API helper functions
// Uses Groq for chat/assistant (fast responses)
// Uses Gemini for test generation (better structured output)

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Groq API for chat/assistant (fast, conversational)
async function generateWithGroq(prompt: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not found');
  }

  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are CrackWise AI assistant for JEE and NEET students. Respond in the SAME LANGUAGE as the user\'s question. Provide clear step-by-step explanations. Write formulas in plain text (not LaTeX). Be concise and exam-focused.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Groq API error:', errorText);
    throw new Error('GROQ_ERROR');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated';
}

// Gemini API for test generation (better structured output)
async function generateWithGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    
    if (response.status === 429 || errorText.includes('quota')) {
      throw new Error('QUOTA_EXCEEDED');
    }
    
    throw new Error('GEMINI_ERROR');
  }

  const data = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
}

// Main function - routes to appropriate API
export async function generateContent(prompt: string, useGemini: boolean = false): Promise<string> {
  try {
    console.log(`Using ${useGemini ? 'Gemini' : 'Groq'} API...`);
    
    if (useGemini) {
      return await generateWithGemini(prompt);
    } else {
      return await generateWithGroq(prompt);
    }
  } catch (error: any) {
    console.error('Error calling AI API:', error);
    
    // Fallback to other API if one fails
    if (error.message === 'GROQ_ERROR' && GEMINI_API_KEY) {
      console.log('Groq failed, trying Gemini as fallback...');
      return await generateWithGemini(prompt);
    } else if (error.message === 'GEMINI_ERROR' && GROQ_API_KEY) {
      console.log('Gemini failed, trying Groq as fallback...');
      return await generateWithGroq(prompt);
    }
    
    throw error;
  }
}

export async function generateMockTest(subject: string, topic: string, difficulty: string, numQuestions: number) {
  console.log('Generating mock test:', { subject, topic, difficulty, numQuestions });
  
  // If more than 10 questions, split into smaller batches
  if (numQuestions > 10) {
    console.log('Splitting into batches for better reliability...');
    const batchSize = 5; // Smaller batches for better JSON parsing
    const batches = Math.ceil(numQuestions / batchSize);
    const allQuestions: any[] = [];
    const seenQuestions = new Set<string>(); // Track unique questions
    
    for (let i = 0; i < batches; i++) {
      const questionsInBatch = Math.min(batchSize, numQuestions - (i * batchSize));
      console.log(`Generating batch ${i + 1}/${batches} with ${questionsInBatch} questions`);
      
      // Add delay between batches to avoid rate limit (3 seconds)
      if (i > 0) {
        console.log('Waiting 3 seconds to avoid rate limit...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      try {
        const batchQuestions = await generateQuestionBatch(subject, topic, difficulty, questionsInBatch);
        
        // Filter out duplicate questions
        const uniqueQuestions = batchQuestions.filter((q: any) => {
          const questionKey = q.question.toLowerCase().trim();
          if (seenQuestions.has(questionKey)) {
            console.log('Duplicate question detected, skipping:', q.question.substring(0, 50));
            return false;
          }
          seenQuestions.add(questionKey);
          return true;
        });
        
        allQuestions.push(...uniqueQuestions);
      } catch (error) {
        console.error(`Batch ${i + 1} failed, retrying once...`);
        // Retry once
        await new Promise(resolve => setTimeout(resolve, 2000));
        const batchQuestions = await generateQuestionBatch(subject, topic, difficulty, questionsInBatch);
        
        // Filter duplicates on retry too
        const uniqueQuestions = batchQuestions.filter((q: any) => {
          const questionKey = q.question.toLowerCase().trim();
          if (seenQuestions.has(questionKey)) {
            return false;
          }
          seenQuestions.add(questionKey);
          return true;
        });
        
        allQuestions.push(...uniqueQuestions);
      }
    }
    
    console.log('Successfully generated', allQuestions.length, 'unique questions in batches');
    
    // If we got fewer questions due to duplicates, generate more
    if (allQuestions.length < numQuestions) {
      const remaining = numQuestions - allQuestions.length;
      console.log(`Need ${remaining} more questions to reach target`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const extraQuestions = await generateQuestionBatch(subject, topic, difficulty, remaining);
      
      const uniqueExtra = extraQuestions.filter((q: any) => {
        const questionKey = q.question.toLowerCase().trim();
        if (seenQuestions.has(questionKey)) {
          return false;
        }
        seenQuestions.add(questionKey);
        return true;
      });
      
      allQuestions.push(...uniqueExtra);
    }
    
    return allQuestions;
  }
  
  // For 10 or fewer questions, generate in one go
  return await generateQuestionBatch(subject, topic, difficulty, numQuestions);
}

async function generateQuestionBatch(subject: string, topic: string, difficulty: string, numQuestions: number) {
  // For mixed difficulty, distribute questions across difficulty levels
  let difficultyPrompt = '';
  if (difficulty === 'Mixed') {
    const easyCount = Math.floor(numQuestions * 0.3);
    const mediumCount = Math.floor(numQuestions * 0.4);
    const hardCount = numQuestions - easyCount - mediumCount;
    difficultyPrompt = `Generate questions with mixed difficulty: ${easyCount} Easy (JEE Main/NEET level), ${mediumCount} Medium (JEE Main/Advanced level), and ${hardCount} Hard (JEE Advanced level) questions.`;
  } else {
    difficultyPrompt = `Generate all questions at ${difficulty} difficulty level for JEE/NEET competitive exams.`;
  }
  
  const prompt = `You are an expert JEE/NEET question paper setter. Generate EXACTLY ${numQuestions} UNIQUE multiple choice questions for ${subject} - ${topic}.

IMPORTANT REQUIREMENTS:
1. Each question MUST be COMPLETELY DIFFERENT and UNIQUE - NO repetition or similar questions
2. Questions must be at JEE Main/Advanced or NEET competitive exam level
3. Include numerical problems, conceptual questions, and application-based questions
4. Use proper scientific notation and units where applicable
5. Make questions challenging and exam-realistic
6. Ensure all 4 options are plausible to test understanding

${difficultyPrompt}

CRITICAL: Return ONLY a valid JSON array. No text before or after. No markdown formatting.

Required JSON format (STRICT):
[
  {
    "question": "Clear, specific question text with proper units",
    "options": {
      "A": "First option",
      "B": "Second option", 
      "C": "Third option",
      "D": "Fourth option"
    },
    "correctAnswer": "A",
    "explanation": "Brief explanation of why this answer is correct",
    "difficulty": "Easy|Medium|Hard",
    "subject": "${subject}",
    "topic": "${topic}"
  }
]

Example for Physics:
[
  {
    "question": "A particle moves with velocity v = (3t² + 2t) m/s. What is its acceleration at t = 2s?",
    "options": {
      "A": "14 m/s²",
      "B": "10 m/s²",
      "C": "8 m/s²",
      "D": "6 m/s²"
    },
    "correctAnswer": "A",
    "explanation": "Acceleration a = dv/dt = 6t + 2. At t=2s, a = 6(2) + 2 = 14 m/s²",
    "difficulty": "Medium",
    "subject": "Physics",
    "topic": "Kinematics"
  }
]

Generate ${numQuestions} COMPLETELY UNIQUE questions now. Return ONLY the JSON array.`;

  try {
    console.log('Calling Gemini for test generation...');
    const response = await generateContent(prompt, true); // Use Gemini for tests
    console.log('Got response, length:', response.length);
    console.log('Response preview:', response.substring(0, 300));
    
    // Extract JSON from response (handle markdown code blocks and extra text)
    let jsonStr = response.trim();
    
    // Remove markdown code blocks if present
    jsonStr = jsonStr.replace(/```json\n?/gi, '').replace(/```\n?/g, '');
    
    // Remove any text before the first [
    const startIndex = jsonStr.indexOf('[');
    if (startIndex > 0) {
      jsonStr = jsonStr.substring(startIndex);
    }
    
    // Remove any text after the last ]
    const endIndex = jsonStr.lastIndexOf(']');
    if (endIndex > 0 && endIndex < jsonStr.length - 1) {
      jsonStr = jsonStr.substring(0, endIndex + 1);
    }
    
    // Fix common JSON issues
    jsonStr = jsonStr
      .replace(/\n/g, ' ')  // Remove newlines
      .replace(/\r/g, '')   // Remove carriage returns
      .replace(/\t/g, ' ')  // Replace tabs with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    console.log('Cleaned response preview:', jsonStr.substring(0, 300));
    
    // Try to parse JSON
    try {
      const questions = JSON.parse(jsonStr);
      
      if (!Array.isArray(questions)) {
        console.error('Response is not an array:', typeof questions);
        throw new Error('Response is not an array');
      }
      
      if (questions.length === 0) {
        throw new Error('No questions generated');
      }
      
      // Validate question structure
      const validQuestions = questions.filter(q => 
        q.question && 
        q.options && 
        q.correctAnswer && 
        q.explanation
      );
      
      if (validQuestions.length === 0) {
        throw new Error('No valid questions found in response');
      }
      
      console.log('Successfully parsed', validQuestions.length, 'valid questions');
      return validQuestions;
    } catch (parseError: any) {
      console.error('JSON parse error:', parseError.message);
      console.error('Failed to parse JSON. First 500 chars:', jsonStr.substring(0, 500));
      
      // Try to extract and log the problematic part
      const errorMatch = parseError.message.match(/position (\d+)/);
      if (errorMatch) {
        const pos = parseInt(errorMatch[1]);
        console.error('Error near:', jsonStr.substring(Math.max(0, pos - 50), pos + 50));
      }
      
      throw new Error('AI returned invalid JSON format. Please try again with fewer questions or a different topic.');
    }
  } catch (error: any) {
    console.error('Error in generateMockTest:', error);
    throw new Error(error.message || 'Failed to generate questions. Please try again.');
  }
}

export async function getStudyHelp(question: string, context?: string) {
  const prompt = context 
    ? `Context: ${context}\n\nStudent Question: ${question}\n\nProvide a clear, exam-focused answer with step-by-step explanations. Use plain text for formulas.`
    : `Student Question: ${question}\n\nProvide a clear, exam-focused answer with step-by-step explanations. Use plain text for formulas.`;

  return await generateContent(prompt, false); // Use Groq for chat
}

export async function explainConcept(concept: string, subject: string) {
  const prompt = `Explain "${concept}" in ${subject} for JEE/NEET students. Include definition, key points, formulas (plain text), and examples. Keep it concise.`;

  return await generateContent(prompt, false); // Use Groq for chat
}

export async function analyzeMistakes(incorrectQuestions: any[]) {
  const questionsText = incorrectQuestions.map((q, i) => 
    `${i + 1}. ${q.question}\nYour answer: ${q.userAnswer}\nCorrect answer: ${q.correctAnswer}`
  ).join('\n\n');

  const prompt = `Analyze these incorrect answers and provide actionable advice in plain text:

${questionsText}

Provide:
1. Common patterns in mistakes
2. Topics needing practice
3. Study recommendations
4. Tips to avoid similar mistakes

Use plain text, no LaTeX, be encouraging.`;

  return await generateContent(prompt, false); // Use Groq for analysis
}
