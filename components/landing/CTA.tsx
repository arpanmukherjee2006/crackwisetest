'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-accent-orange to-orange-700 rounded-2xl p-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Ready to Start Your Smart Preparation?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already studying smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-accent-orange hover:bg-gray-100 rounded-lg px-8 py-4 font-semibold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg px-8 py-4 font-semibold text-lg transition-all"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
