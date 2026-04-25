'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Access to all chapters',
      'First 10 questions per chapter',
      'Basic concept sheets',
      '10 AI queries per day',
      '1 chapter test per day',
      'Progress tracking',
    ],
    cta: 'Get Started',
    href: '/signup',
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹299',
    period: 'per month',
    yearlyPrice: '₹1,999',
    description: 'Everything you need to crack exams',
    features: [
      'Unlimited questions',
      'All concept sheets & formulas',
      'Unlimited AI study assistant',
      'Unlimited chapter tests',
      'Full mock tests (JEE/NEET)',
      'Weak area analysis',
      'Speed tests',
      'Detailed analytics',
      'Priority support',
    ],
    cta: 'Start Premium',
    href: '/pricing',
    popular: true,
  },
]

export default function PricingCards() {
  return (
    <section className="py-20 px-4 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-text-secondary">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-bg-card border rounded-xl p-8 ${
                plan.popular
                  ? 'border-accent-orange shadow-lg shadow-accent-orange/20'
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-accent-orange text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles size={16} />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="text-text-secondary text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary">/{plan.period}</span>
                </div>
                {plan.yearlyPrice && (
                  <div className="mt-2 text-sm text-text-secondary">
                    or {plan.yearlyPrice}/year{' '}
                    <span className="text-accent-orange font-semibold">(Save 44%)</span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="text-accent-orange flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center rounded-lg px-6 py-3 font-semibold transition-all ${
                  plan.popular
                    ? 'bg-accent-orange text-white hover:bg-orange-700'
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
  )
}
