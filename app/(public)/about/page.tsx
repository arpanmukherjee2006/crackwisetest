'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { Target, CheckCircle, Users, TrendingUp, Sparkles, BookOpen } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-bg-primary to-bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-6"
            >
              About CrackWise
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary max-w-3xl mx-auto"
            >
              Empowering JEE and NEET aspirants with AI-powered study tools, high-weightage content, and smart preparation strategies to achieve their dreams.
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-bg-card border border-border rounded-xl p-8"
              >
                <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="text-accent-orange" size={32} />
                </div>
                <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                  Our Mission
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  To democratize quality education and make JEE/NEET preparation accessible, efficient, and effective for every student. We leverage advanced AI technology to provide personalized learning experiences, instant doubt resolution, unlimited practice tests, and comprehensive progress tracking - all designed to maximize your exam performance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-bg-card border border-border rounded-xl p-8"
              >
                <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="text-accent-orange" size={32} />
                </div>
                <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                  Why CrackWise?
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Traditional coaching focuses on covering everything. We focus on what actually matters. Our AI-powered platform provides instant doubt solving, generates unlimited practice tests at JEE/NEET level, tracks your complete learning history, and offers personalized insights. With features like chapter-wise notes, AI chat history, and detailed test analysis, you get a complete preparation ecosystem. Study smarter, not harder - that's the CrackWise way.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 px-4 bg-bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                What We Offer
              </h2>
              <p className="text-xl text-text-secondary">
                Comprehensive tools and resources for effective exam preparation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'AI Study Assistant',
                  description: 'Get instant answers to your doubts with our advanced AI assistant. Chat history is automatically saved for every chapter, so you can review past conversations anytime.',
                  features: ['24/7 AI-powered doubt solving', 'Chapter-wise chat history', 'Step-by-step explanations']
                },
                {
                  icon: BookOpen,
                  title: 'Smart Study Materials',
                  description: 'High-weightage topics prioritized with structured learning paths, concept sheets, formulas, and personal note-taking features for effective revision.',
                  features: ['High-weightage content first', 'Personal notes for each chapter', 'Quick access note-taking']
                },
                {
                  icon: TrendingUp,
                  title: 'AI Mock Tests',
                  description: 'Unlimited AI-generated practice tests at JEE/NEET level with detailed analysis. View complete test history with question-wise review and performance insights.',
                  features: ['AI-generated unique questions', 'Detailed test history & analysis', 'Speed, chapter & full mock tests']
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-bg-card border border-border rounded-xl p-8"
                >
                  <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="text-accent-orange" size={24} />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.features.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                Our Impact
              </h2>
              <p className="text-xl text-text-secondary">
                Numbers that reflect our commitment to student success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '10,000+', label: 'Students Trust CrackWise' },
                { number: 'Unlimited', label: 'AI-Generated Practice Questions' },
                { number: '100+', label: 'High-Weightage Chapters with AI Support' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl font-bold text-accent-orange mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                Our Values
              </h2>
              <p className="text-xl text-text-secondary">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'Quality First',
                  description: 'We prioritize quality content over quantity, ensuring every resource adds real value to your preparation.'
                },
                {
                  icon: Users,
                  title: 'Student-Centric',
                  description: 'Every feature and decision is made with student success in mind, focusing on what truly helps you learn.'
                },
                {
                  icon: TrendingUp,
                  title: 'Continuous Innovation',
                  description: 'We constantly evolve our platform based on student feedback and the latest educational research.'
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-accent-orange" size={28} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-secondary">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-accent-orange to-orange-700 rounded-2xl p-12 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                Ready to Transform Your Preparation?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join the CrackWise community and experience a smarter way to prepare for JEE and NEET.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/signup"
                  className="bg-white text-accent-orange hover:bg-gray-100 rounded-lg px-8 py-4 font-semibold text-lg transition-all"
                >
                  Get Started
                </a>
                <a
                  href="/contact"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg px-8 py-4 font-semibold text-lg transition-all"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
