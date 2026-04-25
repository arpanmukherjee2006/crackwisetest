'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Atom, Beaker, Calculator, Dna, TrendingUp, Zap, BookOpen } from 'lucide-react';

export default function SubjectsPage() {
  const router = useRouter();

  const jeeSubjects = [
    { 
      id: 'physics',
      name: 'Physics', 
      icon: Atom,
      chapters: 14,
      color: 'from-blue-500 to-blue-700',
      description: 'Mechanics, Electromagnetism, Modern Physics'
    },
    { 
      id: 'chemistry',
      name: 'Chemistry', 
      icon: Beaker,
      chapters: 23,
      color: 'from-green-500 to-green-700',
      description: 'Physical, Organic, Inorganic Chemistry'
    },
    { 
      id: 'mathematics',
      name: 'Mathematics', 
      icon: Calculator,
      chapters: 20,
      color: 'from-purple-500 to-purple-700',
      description: 'Calculus, Algebra, Coordinate Geometry'
    },
  ];

  const neetSubjects = [
    { 
      id: 'neet-physics',
      name: 'Physics', 
      icon: Atom,
      chapters: 15,
      color: 'from-blue-500 to-blue-700',
      description: 'Mechanics, Optics, Modern Physics'
    },
    { 
      id: 'neet-chemistry',
      name: 'Chemistry', 
      icon: Beaker,
      chapters: 20,
      color: 'from-green-500 to-green-700',
      description: 'Physical, Organic, Inorganic Chemistry'
    },
    { 
      id: 'neet-biology',
      name: 'Biology', 
      icon: Dna,
      chapters: 25,
      color: 'from-red-500 to-red-700',
      description: 'Botany, Zoology, Human Physiology'
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-2">
            Study Materials
          </h1>
          <p className="text-text-secondary">
            Choose your exam and subject to start studying
          </p>
        </motion.div>

        {/* JEE Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-heading font-bold text-text-primary">JEE</h2>
            <span className="bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full text-sm font-semibold">
              Joint Entrance Examination
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jeeSubjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(`/study/${subject.id}`)}
                  className="bg-bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-accent-orange/40 transition-all group"
                >
                  <div className={`h-32 bg-gradient-to-br ${subject.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <Icon className="text-white relative z-10" size={48} />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold text-text-primary mb-2 group-hover:text-accent-orange transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">{subject.description}</p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-text-secondary">Chapters</span>
                      <span className="text-text-primary font-semibold">{subject.chapters}</span>
                    </div>

                    <button className="w-full bg-accent-orange/10 text-accent-orange hover:bg-accent-orange hover:text-white rounded-lg px-4 py-3 font-semibold transition-all flex items-center justify-center gap-2">
                      <BookOpen size={16} />
                      Start Studying
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* NEET Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-heading font-bold text-text-primary">NEET</h2>
            <span className="bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full text-sm font-semibold">
              National Eligibility Entrance Test
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {neetSubjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => router.push(`/study/${subject.id}`)}
                  className="bg-bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-accent-orange/40 transition-all group"
                >
                  <div className={`h-32 bg-gradient-to-br ${subject.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <Icon className="text-white relative z-10" size={48} />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold text-text-primary mb-2 group-hover:text-accent-orange transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">{subject.description}</p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-text-secondary">Chapters</span>
                      <span className="text-text-primary font-semibold">{subject.chapters}</span>
                    </div>

                    <button className="w-full bg-accent-orange/10 text-accent-orange hover:bg-accent-orange hover:text-white rounded-lg px-4 py-3 font-semibold transition-all flex items-center justify-center gap-2">
                      <BookOpen size={16} />
                      Start Studying
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-accent-orange" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">100%</div>
                <div className="text-sm text-text-secondary">Syllabus Coverage</div>
              </div>
            </div>
          </div>

          <div className="bg-bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                <Zap className="text-accent-orange" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">1000+</div>
                <div className="text-sm text-text-secondary">Practice Problems</div>
              </div>
            </div>
          </div>

          <div className="bg-bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                <BookOpen className="text-accent-orange" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">Detailed</div>
                <div className="text-sm text-text-secondary">Notes & Formulas</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
