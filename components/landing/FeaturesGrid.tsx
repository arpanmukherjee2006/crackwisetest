'use client'

import { motion } from 'framer-motion'
import { Target, BookOpen, Brain, TrendingUp, Sparkles, FileText, History, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'High-Weightage First',
    description: 'Chapters sorted by real exam weightage so you focus on topics that matter most for your score.',
  },
  {
    icon: Sparkles,
    title: 'AI Study Assistant',
    description: 'Get instant answers to your doubts with AI-powered explanations. Chat history saved for every chapter.',
  },
  {
    icon: Brain,
    title: 'AI-Generated Tests',
    description: 'Unlimited practice with AI-generated mock tests at JEE/NEET level. Speed tests, chapter tests, and full mocks.',
  },
  {
    icon: FileText,
    title: 'My Personal Notes',
    description: 'Take chapter-wise notes that sync across devices. Quick access button for easy note-taking during study.',
  },
  {
    icon: History,
    title: 'Test History & Analysis',
    description: 'View detailed results of all your tests with AI analysis, question-wise review, and performance insights.',
  },
  {
    icon: BookOpen,
    title: 'Concept Sheets',
    description: 'Concise formula sheets and key concepts organized for quick revision and better retention.',
  },
  {
    icon: MessageCircle,
    title: 'Practice Problems',
    description: 'Curated practice questions with detailed step-by-step solutions to reinforce your understanding.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed analytics, streak tracking, and personalized insights.',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            Why Choose CrackWise?
          </h2>
          <p className="text-xl text-text-secondary">
            Smart features designed to maximize your exam performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent-orange/40 transition-all"
            >
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-accent-orange" size={24} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
