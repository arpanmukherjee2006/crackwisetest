'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  BookOpen, 
  FileText, 
  Calculator,
  ArrowLeft,
  CheckCircle,
  X,
  Check
} from 'lucide-react';
import { isChapterComplete, markChapterComplete, markChapterIncomplete } from '@/lib/progress';
import AIAssistant from '@/components/AIAssistant';

export default function ChapterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subject as string;
  const chapterId = params.chapter as string;

  const [chapterData, setChapterData] = useState<any>(null);
  const [subjectName, setSubjectName] = useState('');
  const [activeTab, setActiveTab] = useState('notes');
  const [currentProblem, setCurrentProblem] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [personalNotes, setPersonalNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  useEffect(() => {
    loadChapterData();
  }, [subjectId, chapterId]);

  useEffect(() => {
    // Check if chapter is completed
    if (subjectId && chapterId) {
      setIsComplete(isChapterComplete(subjectId, chapterId));
      
      // Load personal notes
      const notesKey = `chapter-notes-${subjectId}-${chapterId}`;
      const saved = localStorage.getItem(notesKey);
      if (saved) {
        setPersonalNotes(saved);
      }
    }
  }, [subjectId, chapterId]);

  const handleSaveNotes = () => {
    const notesKey = `chapter-notes-${subjectId}-${chapterId}`;
    localStorage.setItem(notesKey, personalNotes);
    setIsEditingNotes(false);
    alert('Notes saved successfully!');
  };

  const handleToggleComplete = () => {
    if (isComplete) {
      markChapterIncomplete(subjectId, chapterId);
      setIsComplete(false);
    } else {
      markChapterComplete(subjectId, chapterId);
      setIsComplete(true);
    }
  };

  const loadChapterData = async () => {
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
      
      try {
        // Execute the JS file to get the data
        const returnStatement = '; return ' + dataVarName + ';';
        const func = new Function(text + returnStatement);
        const data = func();
        
        if (data[chapterId]) {
          setChapterData(data[chapterId]);
        }
      } catch (evalError) {
        console.error('Error evaluating data:', evalError);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  const nextProblem = () => {
    if (chapterData?.problems && currentProblem < chapterData.problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setShowSolution(false);
    }
  };

  const prevProblem = () => {
    if (currentProblem > 0) {
      setCurrentProblem(currentProblem - 1);
      setShowSolution(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Chapter Not Found</h1>
          <button
            onClick={() => router.push('/subjects')}
            className="bg-accent-orange text-white px-6 py-3 rounded-lg"
          >
            Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  const currentProb = chapterData.problems?.[currentProblem];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-text-secondary mb-6">
          <button onClick={() => router.push('/subjects')} className="hover:text-accent-orange">
            Subjects
          </button>
          <ChevronRight size={16} />
          <button onClick={() => router.push(`/study/${subjectId}`)} className="hover:text-accent-orange">
            {subjectName}
          </button>
          <ChevronRight size={16} />
          <span className="text-text-primary">{chapterData.title}</span>
        </div>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-2"
              >
                {chapterData.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm md:text-base text-text-secondary"
              >
                {chapterData.introduction}
              </motion.p>
            </div>
            
            {/* Buttons Container */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              {/* Mark as Complete Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={handleToggleComplete}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap justify-center ${
                  isComplete
                    ? 'bg-success text-white hover:bg-success/80'
                    : 'bg-accent-orange text-white hover:bg-orange-700'
                }`}
              >
                {isComplete ? (
                  <>
                    <Check size={20} />
                    Completed
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Mark Complete
                  </>
                )}
              </motion.button>
              
              {/* My Notes Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setActiveTab('notes');
                  setTimeout(() => {
                    const notesSection = document.getElementById('personal-notes-section');
                    notesSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 100);
                }}
                className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap justify-center bg-accent-orange text-white hover:bg-orange-700"
              >
                <FileText size={20} />
                My Notes
              </motion.button>
            </div>
          </div>
          
          {chapterData.weightage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-3"
            >
              <span className="bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full text-sm font-semibold">
                Weightage: {chapterData.weightage}
              </span>
            </motion.div>
          )}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <div className="grid grid-cols-3 gap-2 md:flex md:gap-1 bg-bg-card border border-border rounded-lg p-1">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-6 py-2 md:py-3 rounded-md font-semibold transition-all text-xs md:text-base ${
                activeTab === 'notes'
                  ? 'bg-accent-orange text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <BookOpen size={18} className="md:w-5 md:h-5" />
              <span>Notes</span>
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-6 py-2 md:py-3 rounded-md font-semibold transition-all text-xs md:text-base ${
                activeTab === 'formulas'
                  ? 'bg-accent-orange text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Calculator size={18} className="md:w-5 md:h-5" />
              <span>Formulas</span>
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-2 md:px-6 py-2 md:py-3 rounded-md font-semibold transition-all text-xs md:text-base ${
                activeTab === 'problems'
                  ? 'bg-accent-orange text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <FileText size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Problems ({chapterData.problems?.length || 0})</span>
              <span className="sm:hidden">({chapterData.problems?.length || 0})</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* Chapter Content */}
              <div className="bg-bg-card border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">Topics Covered</h2>
                <div className="space-y-8">
                  {chapterData.topics?.map((topic: any, index: number) => (
                    <div key={index} className="border-l-4 border-accent-orange pl-6">
                      <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                        {topic.name}
                      </h3>
                      <p className="text-text-secondary mb-4">{topic.description}</p>
                    
                    {topic.subtopics && (
                      <div className="space-y-4">
                        {topic.subtopics.map((subtopic: any, subIndex: number) => (
                          <div key={subIndex} className="bg-bg-secondary rounded-lg p-4">
                            <h4 className="font-semibold text-text-primary mb-2">{subtopic.name}</h4>
                            <p className="text-sm text-text-secondary">{subtopic.explanation}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
              
              {/* Personal Notes Section */}
              <div id="personal-notes-section" className="bg-bg-card border border-border rounded-xl p-6 md:p-8 scroll-mt-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-heading font-bold text-text-primary flex items-center gap-2">
                    <FileText size={24} />
                    My Personal Notes
                  </h2>
                  {!isEditingNotes && (
                    <button
                      onClick={() => setIsEditingNotes(true)}
                      className="text-accent-orange hover:text-orange-700 font-semibold text-sm flex items-center gap-1"
                    >
                      <Calculator size={16} />
                      {personalNotes ? 'Edit' : 'Add Notes'}
                    </button>
                  )}
                </div>
                
                {isEditingNotes ? (
                  <div className="space-y-4">
                    <textarea
                      value={personalNotes}
                      onChange={(e) => setPersonalNotes(e.target.value)}
                      placeholder="Write your personal notes, formulas, tips, or anything you want to remember about this chapter..."
                      rows={10}
                      className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-orange resize-none"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveNotes}
                        className="bg-accent-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-all"
                      >
                        Save Notes
                      </button>
                      <button
                        onClick={() => setIsEditingNotes(false)}
                        className="bg-bg-secondary text-text-primary px-6 py-2 rounded-lg font-semibold hover:bg-accent-gray transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {personalNotes ? (
                      <div className="bg-bg-secondary rounded-lg p-4 whitespace-pre-wrap text-text-primary">
                        {personalNotes}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-text-secondary">
                        <FileText className="mx-auto mb-3 opacity-50" size={48} />
                        <p>No personal notes yet. Click "Add Notes" to start writing.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'formulas' && (
            <div className="bg-bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">Important Formulas</h2>
              {chapterData.formulas ? (
                <div className="space-y-6">
                  {Object.keys(chapterData.formulas).map((category, catIndex) => (
                    <div key={catIndex}>
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {chapterData.formulas[category].map((formula: any, index: number) => (
                          <div key={index} className="bg-accent-orange/10 border border-accent-orange/20 rounded-lg p-4">
                            <div className="text-sm font-semibold text-accent-orange mb-2">{formula.name}</div>
                            <div className="font-mono text-text-primary bg-bg-secondary rounded px-3 py-2 mb-2">
                              {formula.expression}
                            </div>
                            <div className="text-xs text-text-secondary">{formula.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary">No formulas available for this chapter.</p>
              )}
            </div>
          )}

          {activeTab === 'problems' && (
            <div className="max-w-4xl mx-auto">
              {chapterData.problems && chapterData.problems.length > 0 ? (
                <div className="bg-bg-card border border-border rounded-xl p-8">
                  {/* Problem Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-text-secondary">
                        Problem {currentProblem + 1} of {chapterData.problems.length}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        currentProb.difficulty === 'easy' ? 'text-success bg-success/10' :
                        currentProb.difficulty === 'medium' ? 'text-yellow-500 bg-yellow-500/10' :
                        'text-error bg-error/10'
                      }`}>
                        {currentProb.difficulty?.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Problem Statement */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-4">{currentProb.problem}</h3>
                    
                    {!showSolution && (
                      <button
                        onClick={() => setShowSolution(true)}
                        className="bg-accent-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                      >
                        Show Solution
                      </button>
                    )}
                  </div>

                  {/* Solution */}
                  {showSolution && currentProb.solution && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-bg-secondary border border-border rounded-lg p-6 mb-6"
                    >
                      <h4 className="text-lg font-semibold text-text-primary mb-4">Solution</h4>
                      
                      {currentProb.solution.given && (
                        <div className="mb-4">
                          <div className="font-semibold text-text-primary mb-2">Given:</div>
                          <ul className="list-disc list-inside space-y-1 text-text-secondary">
                            {currentProb.solution.given.map((item: string, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {currentProb.solution.find && (
                        <div className="mb-4">
                          <div className="font-semibold text-text-primary mb-2">Find:</div>
                          <p className="text-text-secondary">{currentProb.solution.find}</p>
                        </div>
                      )}

                      {currentProb.solution.formula && (
                        <div className="mb-4">
                          <div className="font-semibold text-text-primary mb-2">Formula:</div>
                          <div className="bg-accent-orange/10 rounded px-4 py-2 font-mono text-accent-orange">
                            {currentProb.solution.formula}
                          </div>
                        </div>
                      )}

                      {currentProb.solution.steps && (
                        <div className="mb-4">
                          <div className="font-semibold text-text-primary mb-3">Steps:</div>
                          <div className="space-y-3">
                            {currentProb.solution.steps.map((step: any, i: number) => (
                              <div key={i} className="flex gap-3">
                                <span className="w-6 h-6 bg-accent-orange text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                  {i + 1}
                                </span>
                                <div className="flex-1">
                                  {step.step && <div className="font-semibold text-text-primary mb-1">{step.step}</div>}
                                  {step.work && <div className="text-text-secondary mb-1">{step.work}</div>}
                                  {step.result && <div className="text-accent-orange font-mono">{step.result}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentProb.solution.answer && (
                        <div className="bg-accent-orange/10 border border-accent-orange/20 rounded-lg p-4">
                          <div className="font-semibold text-accent-orange mb-1">Final Answer:</div>
                          <div className="text-text-primary font-semibold">{currentProb.solution.answer}</div>
                        </div>
                      )}

                      {currentProb.solution.concept && (
                        <div className="mt-4 text-sm text-text-secondary italic">
                          💡 {currentProb.solution.concept}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <button
                      onClick={prevProblem}
                      disabled={currentProblem === 0}
                      className="flex items-center gap-2 px-6 py-3 bg-accent-gray text-text-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3a3a3a] transition-colors"
                    >
                      <ArrowLeft size={20} />
                      Previous
                    </button>
                    <button
                      onClick={nextProblem}
                      disabled={currentProblem === chapterData.problems.length - 1}
                      className="flex items-center gap-2 px-6 py-3 bg-accent-orange text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700 transition-colors"
                    >
                      Next
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-bg-card border border-border rounded-xl">
                  <FileText className="mx-auto text-text-secondary mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">No Problems Available</h3>
                  <p className="text-text-secondary">Practice problems will be added soon.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
      
      {/* AI Assistant */}
      <AIAssistant 
        chapterTitle={chapterData.title}
        chapterContext={chapterData.introduction}
        chapterId={`${subjectId}-${chapterId}`}
      />
    </div>
  );
}
