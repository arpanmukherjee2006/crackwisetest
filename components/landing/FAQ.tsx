'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What makes CrackWise different from other platforms?',
    answer: 'CrackWise focuses on high-weightage topics first, uses AI-powered personalization, and provides adaptive mock tests that learn from your performance. We prioritize quality over quantity.',
  },
  {
    question: 'How does the AI study assistant work?',
    answer: 'Our AI assistant provides chapter-specific help, explains concepts step-by-step, generates practice problems, and answers your doubts 24/7. Free users get 10 queries per day, Premium users get unlimited access.',
  },
  {
    question: 'Can I use CrackWise for both JEE and NEET?',
    answer: 'Yes! CrackWise supports both JEE (Main & Advanced) and NEET preparation with dedicated content for each exam. You can switch between exams anytime.',
  },
  {
    question: 'What is included in the free plan?',
    answer: 'The free plan includes access to all chapters, first 10 questions per chapter, basic concept sheets, 10 AI queries per day, 1 chapter test per day, and progress tracking.',
  },
  {
    question: 'How are mock tests generated?',
    answer: 'Our AI analyzes your performance history and weak areas to generate personalized mock tests. Tests include questions from our curated database, intelligently selected to match exam patterns.',
  },
  {
    question: 'Can I cancel my Premium subscription anytime?',
    answer: 'Yes, you can cancel your Premium subscription at any time. You\'ll continue to have access until the end of your billing period.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary">
            Everything you need to know
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bg-secondary transition-colors"
              >
                <span className="font-semibold text-text-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-accent-orange flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''
                    }`}
                  size={20}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-text-secondary">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
