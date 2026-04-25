'use client'

import { motion } from 'framer-motion'
import { UserPlus, BookMarked, GraduationCap } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: UserPlus,
    title: 'Sign Up & Choose',
    description: 'Create your account and select your target exam (JEE or NEET) to get personalized content.',
  },
  {
    number: '2',
    icon: BookMarked,
    title: 'Access Materials',
    description: 'Browse through curated study materials organized by weightage and difficulty level.',
  },
  {
    number: '3',
    icon: GraduationCap,
    title: 'Study Smart',
    description: 'Use concept sheets, practice problems, and track your progress to maximize efficiency.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-xl text-text-secondary">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-bg-card border border-border rounded-xl p-8 hover:border-accent-orange/40 transition-all">
                <div className="w-16 h-16 bg-accent-orange rounded-full flex items-center justify-center text-2xl font-bold text-white mb-6">
                  {step.number}
                </div>
                <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="text-accent-orange" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
