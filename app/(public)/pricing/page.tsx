'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for getting started with your preparation',
      icon: Zap,
      features: [
        'Access to all chapters and topics',
        'First 10 questions per chapter',
        'Basic concept sheets and formulas',
        '10 AI study assistant queries per day',
        '1 chapter test per day',
        'Progress tracking dashboard',
        'Community forum access',
        'Email support',
      ],
      limitations: [
        'Limited AI queries',
        'Limited chapter tests',
        'No full mock tests',
        'No weak area analysis',
      ],
      cta: 'Get Started Free',
      href: '/signup',
      popular: false,
      color: 'gray',
    },
    {
      name: 'Premium',
      price: '₹299',
      period: 'per month',
      yearlyPrice: '₹1,999',
      yearlyNote: 'Save ₹1,589 (44% off)',
      description: 'Everything you need to crack JEE & NEET',
      icon: Crown,
      features: [
        'Everything in Free, plus:',
        'Unlimited questions with detailed solutions',
        'All concept sheets, formulas & notes',
        'Unlimited AI study assistant',
        'Unlimited chapter tests',
        'Full mock tests (JEE Main, JEE Advanced, NEET)',
        'Weak area analysis with AI recommendations',
        'Speed tests for time management',
        'Detailed performance analytics',
        'Chapter-wise progress tracking',
        'Bookmark questions for revision',
        'Download study materials (PDF)',
        'Priority email & chat support',
        'Early access to new features',
      ],
      cta: 'Start Premium',
      href: '/signup?plan=premium',
      popular: true,
      color: 'orange',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-bg-primary to-bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-accent-orange/10 border border-accent-orange rounded-full px-4 py-2 mb-6"
            >
              <span className="text-accent-orange font-semibold">Simple, Transparent Pricing</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-heading font-bold text-text-primary mb-6"
            >
              Choose Your Plan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary"
            >
              Start free, upgrade when you're ready. No hidden fees, cancel anytime.
            </motion.p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-bg-card border rounded-2xl p-8 ${
                    plan.popular
                      ? 'border-accent-orange shadow-2xl shadow-accent-orange/20 lg:scale-105'
                      : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-accent-orange to-orange-700 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                        <Sparkles size={16} />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      plan.popular ? 'bg-accent-orange' : 'bg-accent-gray'
                    }`}>
                      <plan.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-text-primary">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-text-secondary">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-bold text-text-primary">{plan.price}</span>
                      <span className="text-text-secondary">/{plan.period}</span>
                    </div>
                    {plan.yearlyPrice && (
                      <div className="bg-success/10 border border-success rounded-lg p-3">
                        <div className="text-sm text-text-primary font-semibold">
                          Annual Plan: {plan.yearlyPrice}/year
                        </div>
                        <div className="text-xs text-success mt-1">{plan.yearlyNote}</div>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="text-accent-orange flex-shrink-0 mt-0.5" size={20} />
                        <span className={`text-text-secondary ${
                          feature.startsWith('Everything') ? 'font-semibold text-text-primary' : ''
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`block w-full text-center rounded-lg px-6 py-4 font-semibold text-lg transition-all ${
                      plan.popular
                        ? 'bg-accent-orange text-white hover:bg-orange-700 shadow-lg hover:shadow-xl'
                        : 'bg-accent-gray text-text-primary hover:bg-[#3a3a3a]'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 px-4 bg-bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                Detailed Comparison
              </h2>
              <p className="text-xl text-text-secondary">
                See what's included in each plan
              </p>
            </div>

            <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-bg-secondary">
                    <tr>
                      <th className="text-left p-6 text-text-primary font-semibold">Feature</th>
                      <th className="text-center p-6 text-text-primary font-semibold">Free</th>
                      <th className="text-center p-6 text-accent-orange font-semibold">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { feature: 'Access to all chapters', free: true, premium: true },
                      { feature: 'Questions per chapter', free: '10', premium: 'Unlimited' },
                      { feature: 'Concept sheets & formulas', free: 'Basic', premium: 'All' },
                      { feature: 'AI study assistant', free: '10/day', premium: 'Unlimited' },
                      { feature: 'Chapter tests', free: '1/day', premium: 'Unlimited' },
                      { feature: 'Full mock tests', free: false, premium: true },
                      { feature: 'Weak area analysis', free: false, premium: true },
                      { feature: 'Speed tests', free: false, premium: true },
                      { feature: 'Performance analytics', free: 'Basic', premium: 'Detailed' },
                      { feature: 'Download materials', free: false, premium: true },
                      { feature: 'Priority support', free: false, premium: true },
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-bg-secondary/50 transition-colors">
                        <td className="p-6 text-text-primary">{row.feature}</td>
                        <td className="p-6 text-center">
                          {typeof row.free === 'boolean' ? (
                            row.free ? (
                              <Check className="text-success mx-auto" size={20} />
                            ) : (
                              <span className="text-text-secondary">—</span>
                            )
                          ) : (
                            <span className="text-text-secondary">{row.free}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof row.premium === 'boolean' ? (
                            row.premium ? (
                              <Check className="text-accent-orange mx-auto" size={20} />
                            ) : (
                              <span className="text-text-secondary">—</span>
                            )
                          ) : (
                            <span className="text-accent-orange font-semibold">{row.premium}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                Pricing FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Can I switch from Free to Premium anytime?',
                  a: 'Yes! You can upgrade to Premium at any time. Your progress and data will be preserved.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit/debit cards, UPI, net banking, and wallets through Razorpay.'
                },
                {
                  q: 'Is there a refund policy?',
                  a: 'Yes, we offer a 7-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.'
                },
                {
                  q: 'Can I cancel my Premium subscription?',
                  a: 'Yes, you can cancel anytime. You\'ll continue to have Premium access until the end of your billing period.'
                },
                {
                  q: 'Do you offer student discounts?',
                  a: 'Our annual plan already offers 44% savings. We occasionally run special promotions - follow us on social media!'
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-bg-card border border-border rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{faq.q}</h3>
                  <p className="text-text-secondary">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-bg-secondary">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-text-secondary mb-8">
                Join thousands of students preparing smarter with CrackWise
              </p>
              <Link
                href="/signup"
                className="inline-block bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-8 py-4 font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
