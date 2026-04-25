'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { 
  Search, 
  TrendingUp, 
  Flame, 
  BookOpen, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export default function StudySubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subject as string;

  const [chapters, setChapters] = useState<any[]>([]);
  const [subjectName, setSubjectName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjectData();
  }, [subjectId]);

  const loadSubjectData = async () => {
    try {
      let dataFile = '';
      let displayName = '';
      let dataVarName = '';
      
      switch(subjectId) {
        case 'physics':
          dataFile = '/study-data.js';
          displayName = 'Physics (JEE)';
          dataVarName = 'STUDY_DATA';
          break;
        case 'chemistry':
          dataFile = '/chemistry-data.js';
          displayName = 'Chemistry (JEE)';
          dataVarName = 'CHEMISTRY_DATA';
          break;
        case 'mathematics':
          dataFile = '/mathematics-data.js';
          displayName = 'Mathematics (JEE)';
          dataVarName = 'MATHEMATICS_DATA';
          break;
        case 'neet-physics':
          dataFile = '/neet-physics-data.js';
          displayName = 'Physics (NEET)';
          dataVarName = 'NEET_PHYSICS_DATA';
          break;
        case 'neet-chemistry':
          dataFile = '/neet-chemistry-data.js';
          displayName = 'Chemistry (NEET)';
          dataVarName = 'NEET_CHEMISTRY_DATA';
          break;
        case 'neet-biology':
          dataFile = '/neet-biology-data.js';
          displayName = 'Biology (NEET)';
          dataVarName = 'NEET_BIOLOGY_DATA';
          break;
        default:
          router.push('/subjects');
          return;
      }

      setSubjectName(displayName);
      
      const response = await fetch(dataFile);
      const text = await response.text();
      
      // Execute the JS file to get the data
      try {
        // Create a function that executes the code and returns the data
        const returnStatement = '; return ' + dataVarName + ';';
        const func = new Function(text + returnStatement);
        const data = func();
        
        // Convert object to array of chapters
        const chaptersList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        
        setChapters(chaptersList);
      } catch (evalError) {
        console.error('Error evaluating data:', evalError);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const filteredChapters = chapters.filter(chapter =>
    chapter.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyFromWeightage = (weightage: string) => {
    if (!weightage) return 'Medium';
    const percent = parseInt(weightage.split('–')[0] || weightage.split('-')[0]);
    if (percent >= 8) return 'High';
    if (percent >= 5) return 'Medium';
    return 'Low';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'High': return 'text-error bg-error/10';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'Low': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => router.push('/subjects')}
            className="flex items-center gap-2 text-text-secondary hover:text-accent-orange mb-4 transition-colors text-sm md:text-base"
          >
            <ArrowLeft size={18} className="md:w-5 md:h-5" />
            Back to Subjects
          </button>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-2"
          >
            {subjectName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-text-secondary"
          >
            {chapters.length} chapters available
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input
              type="text"
              placeholder="Search chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-card border border-border rounded-lg pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange"
            />
          </div>
        </motion.div>

        {/* Chapters List */}
        <div className="space-y-3 md:space-y-4">
          {filteredChapters.map((chapter, index) => {
            const difficulty = getDifficultyFromWeightage(chapter.weightage);
            const isTrending = index < 3; // Mark first 3 as trending
            
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => router.push(`/study/${subjectId}/${chapter.id}`)}
                className="bg-bg-card border border-border rounded-xl p-4 md:p-5 cursor-pointer hover:border-accent-orange/40 transition-all group"
              >
                {/* Tags Row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {isTrending && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-accent-orange bg-accent-orange/10 px-2 py-1 rounded-full">
                      <Flame size={12} />
                      Trending
                    </span>
                  )}
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(difficulty)}`}>
                    {difficulty} Weightage
                  </span>
                  {chapter.weightage && (
                    <span className="text-xs text-text-secondary">
                      {chapter.weightage}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-heading font-bold text-text-primary mb-2 group-hover:text-accent-orange transition-colors">
                  {chapter.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-text-secondary line-clamp-2 mb-3 md:mb-4">
                  {chapter.introduction}
                </p>

                {/* Stats and Button Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-text-secondary">
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={14} className="md:w-4 md:h-4" />
                      <span>{chapter.topics?.length || 0} Topics</span>
                    </div>
                    {chapter.problems && (
                      <div className="flex items-center gap-1.5">
                        <TrendingUp size={14} className="md:w-4 md:h-4" />
                        <span>{chapter.problems.length} Problems</span>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/study/${subjectId}/${chapter.id}`);
                    }}
                    className="bg-accent-orange/10 text-accent-orange hover:bg-accent-orange hover:text-white rounded-lg px-4 md:px-5 py-2 md:py-2.5 font-semibold transition-all flex items-center gap-1.5 text-sm md:text-base shrink-0"
                  >
                    Study
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredChapters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No chapters found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
