'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { Mail, MessageSquare, Users, HelpCircle } from 'lucide-react'

export default function ContactPage() {
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
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary"
            >
              Have questions, feedback, or need support? We'd love to hear from you and help you succeed.
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">
                  Let's Connect
                </h2>
                <p className="text-text-secondary mb-8">
                  We're here to support your learning journey. Reach out to us through any of these channels.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      title: 'Email',
                      content: 'contact.crackwise@gmail.com',
                      note: 'We typically respond within 24 hours'
                    },
                    {
                      icon: MessageSquare,
                      title: 'Twitter',
                      content: '@CrackWisein',
                      note: 'Follow us for updates and tips',
                      link: 'https://x.com/CrackWisein'
                    },
                    {
                      icon: Users,
                      title: 'Community',
                      content: 'Reddit Community',
                      note: 'Join discussions with fellow students',
                      link: 'https://www.reddit.com/r/CrackWise/'
                    }
                  ].map((method, index) => (
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-bg-card border border-border rounded-xl p-6 hover:border-accent-orange/40 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <method.icon className="text-accent-orange" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-text-primary mb-1">
                            {method.title}
                          </h3>
                          {method.link ? (
                            <a
                              href={method.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent-orange hover:underline"
                            >
                              {method.content}
                            </a>
                          ) : (
                            <p className="text-text-primary">{method.content}</p>
                          )}
                          <p className="text-sm text-text-secondary mt-1">{method.note}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 bg-accent-orange/10 border border-accent-orange rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="text-accent-orange flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        Quick Response
                      </h3>
                      <p className="text-text-secondary">
                        We usually reply within 24-48 hours during business days.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Google Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-bg-card border border-border rounded-xl p-8"
              >
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-6">
                  Send us a Message
                </h3>
                <div className="aspect-[9/16] w-full">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSc_9ItCmbrRzz1tX61wenvD3DaxSelBtVfLKEO0QgY1xOSZDg/viewform?embedded=true"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    className="rounded-lg"
                  >
                    Loading…
                  </iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Support Features */}
        <section className="py-20 px-4 bg-bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                How We Can Help
              </h2>
              <p className="text-xl text-text-secondary">
                We're committed to supporting your learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: HelpCircle,
                  title: 'Technical Support',
                  description: 'Having trouble with the platform? Our technical team is here to help you resolve any issues quickly.'
                },
                {
                  icon: MessageSquare,
                  title: 'Study Guidance',
                  description: 'Need help with your study strategy? We provide personalized guidance to help you make the most of our platform.'
                },
                {
                  icon: Users,
                  title: 'Feature Requests',
                  description: 'Have ideas for new features? We value your feedback and continuously improve based on student needs.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-bg-card border border-border rounded-xl p-8 hover:border-accent-orange/40 transition-all"
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
      </main>
      <Footer />
    </>
  )
}
