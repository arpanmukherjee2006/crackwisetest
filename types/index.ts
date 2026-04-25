export interface User {
  id: string
  email: string
  full_name?: string
  target_exam?: 'JEE_MAIN' | 'JEE_ADVANCED' | 'NEET'
  target_year?: number
  plan?: 'free' | 'premium'
  streak_count?: number
  ai_queries_today?: number
  ai_queries_reset_date?: string
  last_active?: string
  created_at?: string
}

export interface Subject {
  id: string
  name: string
  exam_type: 'JEE' | 'NEET' | 'BOTH'
  icon?: string
  created_at?: string
}

export interface Chapter {
  id: string
  subject_id: string
  name: string
  weightage_percent?: number
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  is_trending?: boolean
  created_at?: string
}

export interface Question {
  id: string
  chapter_id: string
  type: 'MCQ' | 'MULTI_CORRECT' | 'INTEGER' | 'ASSERTION_REASON'
  content: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  year_asked?: number
  created_at?: string
  options?: Option[]
  solution?: Solution
}

export interface Option {
  id: string
  question_id: string
  content: string
  is_correct: boolean
}

export interface Solution {
  id: string
  question_id: string
  explanation: string
  steps?: any
}

export interface ConceptSheet {
  id: string
  chapter_id: string
  content_mdx?: string
  key_formulas?: any
}

export interface MockTest {
  id: string
  user_id: string
  type: 'FULL_MOCK' | 'CHAPTER_TEST' | 'WEAK_AREA' | 'SPEED_TEST'
  exam_type?: string
  generated_by?: string
  started_at?: string
  completed_at?: string
  score?: number
  total_questions?: number
  correct_count?: number
  questions_snapshot?: any
  created_at?: string
}

export interface AIConversation {
  id: string
  user_id: string
  chapter_id?: string
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
  created_at?: string
  updated_at?: string
}
