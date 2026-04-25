'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  const featuredPost = {
    title: 'Smart Study Plan for JEE & NEET 2026: 6 Months to Success',
    excerpt: 'Master JEE and NEET 2026 with our comprehensive smart study plan. Learn strategic preparation techniques focusing on high-weightage chapters, quality notes, formulas, and practice questions with detailed solutions to maximize your potential in just 6 months.',
    author: 'Arpan Mukherjee',
    date: 'Sep 17, 2025',
    category: 'Study Strategy',
    slug: 'smart-study-plan-2026',
    featured: true,
  }

  const posts = [
    {
      title: 'JEE/NEET 2026: Your 6-Month Preparation Strategy',
      excerpt: 'With just 6 months left for JEE/NEET 2026, it\'s time to optimize your preparation strategy. This comprehensive guide breaks down month-by-month what you should focus on, high-yield topics, and smart study techniques to maximize your score.',
      author: 'Arpan Mukherjee',
      date: 'Sep 7, 2025',
      category: 'Strategy',
      slug: 'jee-neet-2026-strategy',
    },
  ]

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
              CrackWise Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary"
            >
              Expert tips, strategies, and insights for JEE and NEET aspirants
            </motion.p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-orange/40 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-block bg-accent-orange/10 border border-accent-orange rounded-full px-4 py-1 text-sm font-semibold text-accent-orange mb-4 w-fit">
                    <TrendingUp className="inline mr-1" size={14} />
                    Featured
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                    <span className="bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-accent-orange/10 rounded-full flex items-center justify-center">
                      <User className="text-accent-orange" size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary">
                        {featuredPost.author}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3 font-semibold transition-all w-fit"
                  >
                    Read More
                    <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-accent-orange/20 to-orange-700/20 p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-accent-orange mb-4">📚</div>
                    <div className="text-2xl font-heading font-bold text-text-primary">
                      Study Smart
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-20 px-4 bg-bg-secondary">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-heading font-bold text-text-primary mb-4">
                Recent Articles
              </h2>
              <p className="text-text-secondary">
                Latest tips and strategies for your exam preparation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent-orange/40 transition-all group"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                      <span className="bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-text-primary mb-3 group-hover:text-accent-orange transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                      <div className="w-8 h-8 bg-accent-orange/10 rounded-full flex items-center justify-center">
                        <User className="text-accent-orange" size={16} />
                      </div>
                      <div className="text-sm text-text-secondary">
                        {post.author}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-accent-orange hover:gap-3 transition-all font-semibold"
                    >
                      Read Article
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-text-primary mb-4">
                Browse by Category
              </h2>
              <p className="text-text-secondary">
                Find articles that match your interests
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Study Strategy', count: 12, icon: '📚' },
                { name: 'Time Management', count: 8, icon: '⏰' },
                { name: 'Exam Tips', count: 15, icon: '✨' },
                { name: 'Motivation', count: 6, icon: '🎯' },
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-bg-card border border-border rounded-xl p-6 text-center hover:border-accent-orange/40 transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {category.count} articles
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 px-4 bg-gradient-to-r from-accent-orange to-orange-700">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                Never Miss an Update
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Subscribe to get the latest study tips and strategies delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white rounded-lg px-6 py-4 text-bg-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-bg-primary text-white hover:bg-bg-secondary rounded-lg px-8 py-4 font-semibold transition-all whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
