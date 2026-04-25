'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rahul Sharma',
    exam: 'JEE Main 2025',
    rating: 5,
    text: 'CrackWise helped me focus on high-weightage topics. The AI assistant is like having a personal tutor available 24/7!',
  },
  {
    name: 'Priya Patel',
    exam: 'NEET 2025',
    rating: 5,
    text: 'The concept sheets are amazing for quick revision. I improved my mock test scores by 40 marks in just 2 months.',
  },
  {
    name: 'Arjun Kumar',
    exam: 'JEE Advanced 2025',
    rating: 5,
    text: 'Best platform for smart preparation. The adaptive mock tests helped me identify and work on my weak areas effectively.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            What Students Say
          </h2>
          <p className="text-xl text-text-secondary">
            Join thousands of successful aspirants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent-orange/40 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-accent-orange fill-accent-orange" size={20} />
                ))}
              </div>
              <p className="text-text-primary mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-text-primary">{testimonial.name}</div>
                <div className="text-sm text-text-secondary">{testimonial.exam}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
