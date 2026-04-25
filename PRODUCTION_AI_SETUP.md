# Production AI Setup Guide

## Problem
Gemini AI free tier has a limit of 20 requests per day, which is not suitable for production use.

## Solutions for Production

### Option 1: Multiple API Keys Rotation (Current Implementation)
**Cost:** Free (but requires multiple Google accounts)
**Effort:** Low

The code now supports multiple API keys that rotate automatically:

1. Create multiple Google accounts
2. Get API key from each account: https://aistudio.google.com/app/apikey
3. Add keys to `lib/gemini.ts`:

```typescript
const API_KEYS = [
  'YOUR_FIRST_API_KEY',
  'YOUR_SECOND_API_KEY',
  'YOUR_THIRD_API_KEY',
  'YOUR_FOURTH_API_KEY',
  // Add more keys...
];
```

**Capacity:** 20 requests × number of keys per day
- 5 keys = 100 requests/day
- 10 keys = 200 requests/day

---

### Option 2: Upgrade to Gemini API Paid Plan (Recommended)
**Cost:** Pay-as-you-go (very cheap)
**Effort:** Low

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Enable billing for your project
3. Gemini API Pricing:
   - **Gemini 1.5 Flash:** $0.075 per 1M input tokens, $0.30 per 1M output tokens
   - **Gemini 1.5 Pro:** $1.25 per 1M input tokens, $5.00 per 1M output tokens

**Example Cost Calculation:**
- Average question: ~500 tokens input + 1000 tokens output
- Cost per question: ~$0.0004 (Flash model)
- 1000 questions = ~$0.40
- 10,000 questions = ~$4.00

**Setup:**
1. Create Google Cloud project
2. Enable Gemini API
3. Add billing account
4. Use the same API key (no code changes needed)

---

### Option 3: Use OpenAI API Instead
**Cost:** Pay-as-you-go
**Effort:** Medium (requires code changes)

OpenAI GPT-4 Turbo pricing:
- Input: $0.01 per 1K tokens
- Output: $0.03 per 1K tokens

**Setup:**
1. Get API key from: https://platform.openai.com/api-keys
2. Update `lib/gemini.ts` to use OpenAI API
3. Change API endpoint and request format

---

### Option 4: Self-Hosted Open Source Models
**Cost:** Server costs only
**Effort:** High

Use models like:
- **Llama 3** (Meta)
- **Mistral** (Mistral AI)
- **Phi-3** (Microsoft)

**Requirements:**
- GPU server (AWS, GCP, or local)
- Model hosting (Ollama, vLLM, or HuggingFace)
- API wrapper

**Estimated Cost:**
- AWS g4dn.xlarge: ~$0.50/hour = ~$360/month
- Or use serverless: Modal, Replicate, etc.

---

### Option 5: Hybrid Approach (Best for Production)
**Cost:** Variable
**Effort:** Medium

Combine multiple solutions:

1. **Free tier for testing:** Use Gemini free tier for development
2. **Paid API for production:** Use Gemini paid or OpenAI for live users
3. **Caching:** Cache common questions/answers to reduce API calls
4. **Rate limiting:** Limit users to X queries per day

**Implementation:**
```typescript
// Check if user is premium
if (user.plan === 'premium') {
  // Use paid API (unlimited)
  response = await callPaidAPI(question);
} else {
  // Use free tier with daily limit
  if (userQueries < 10) {
    response = await callFreeAPI(question);
  } else {
    throw new Error('Daily limit reached. Upgrade to Premium!');
  }
}
```

---

## Recommended Solution for CrackWise

### For MVP/Testing:
✅ **Option 1:** Multiple API keys rotation (5-10 keys = 100-200 requests/day)

### For Production Launch:
✅ **Option 2:** Upgrade to Gemini API paid plan
- Very cheap (~$4 for 10,000 questions)
- No code changes needed
- Reliable and fast
- Official Google support

### For Scale (1000+ users):
✅ **Option 5:** Hybrid approach
- Free users: 10 queries/day (cached + rate limited)
- Premium users: Unlimited (paid API)
- Common questions cached in database
- Reduces API costs by 70-80%

---

## Implementation Steps

### Step 1: Add Multiple Keys (Immediate)
Already implemented! Just add more keys to `lib/gemini.ts`

### Step 2: Add Caching (Recommended)
```typescript
// Cache common questions
const cache = new Map();

async function getCachedResponse(question: string) {
  const cached = cache.get(question);
  if (cached) return cached;
  
  const response = await generateContent(question);
  cache.set(question, response);
  return response;
}
```

### Step 3: Upgrade to Paid (Before Launch)
1. Go to Google Cloud Console
2. Enable billing
3. Done! Same API key works

---

## Current Status
✅ Multiple API key rotation implemented
⏳ Need to add more API keys
⏳ Consider upgrading to paid plan before production launch

## Questions?
Contact Google Cloud support or check: https://ai.google.dev/pricing
