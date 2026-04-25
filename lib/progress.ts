// Progress tracking utilities

export interface ChapterProgress {
  chapterId: string;
  subjectId: string;
  completed: boolean;
  completedAt?: string;
}

export interface TestAttempt {
  testId: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface DailyActivity {
  date: string;
  chaptersCompleted: number;
  questionsAttempted: number;
}

// Chapter Progress Functions
export function getCompletedChapters(): ChapterProgress[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('completedChapters');
  return stored ? JSON.parse(stored) : [];
}

export function markChapterComplete(subjectId: string, chapterId: string): void {
  const completed = getCompletedChapters();
  
  const exists = completed.find(
    (c) => c.chapterId === chapterId && c.subjectId === subjectId
  );
  
  if (!exists) {
    completed.push({
      chapterId,
      subjectId,
      completed: true,
      completedAt: new Date().toISOString(),
    });
    
    localStorage.setItem('completedChapters', JSON.stringify(completed));
    
    // Update daily activity
    updateDailyActivity('chapter');
  }
}

export function markChapterIncomplete(subjectId: string, chapterId: string): void {
  const completed = getCompletedChapters();
  const filtered = completed.filter(
    (c) => !(c.chapterId === chapterId && c.subjectId === subjectId)
  );
  
  localStorage.setItem('completedChapters', JSON.stringify(filtered));
}

export function isChapterComplete(subjectId: string, chapterId: string): boolean {
  const completed = getCompletedChapters();
  return completed.some(
    (c) => c.chapterId === chapterId && c.subjectId === subjectId && c.completed
  );
}

export function getSubjectProgress(subjectId: string, totalChapters: number): number {
  const completed = getCompletedChapters();
  const subjectCompleted = completed.filter((c) => c.subjectId === subjectId).length;
  return totalChapters > 0 ? (subjectCompleted / totalChapters) * 100 : 0;
}

export function getTotalProgress(): { completed: number; total: number } {
  const completed = getCompletedChapters();
  return {
    completed: completed.length,
    total: completed.length,
  };
}

// Test Attempts Functions
export function saveTestAttempt(attempt: TestAttempt): void {
  if (typeof window === 'undefined') return;
  
  const attempts = getTestAttempts();
  attempts.push(attempt);
  localStorage.setItem('testAttempts', JSON.stringify(attempts));
  
  // Update daily activity
  updateDailyActivity('test');
}

export function getTestAttempts(): TestAttempt[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('testAttempts');
  return stored ? JSON.parse(stored) : [];
}

export function getAccuracy(): number {
  const attempts = getTestAttempts();
  if (attempts.length === 0) return 0;
  
  const totalCorrect = attempts.reduce((sum, a) => sum + a.correctAnswers, 0);
  const totalQuestions = attempts.reduce((sum, a) => sum + a.totalQuestions, 0);
  
  return totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
}

export function getTotalTestsTaken(): number {
  return getTestAttempts().length;
}

// Daily Activity & Streak Functions
export function updateDailyActivity(type: 'chapter' | 'test' | 'ai_query'): void {
  if (typeof window === 'undefined') return;
  
  const today = new Date().toISOString().split('T')[0];
  const activities = getDailyActivities();
  
  const todayActivity = activities.find((a) => a.date === today);
  
  if (todayActivity) {
    if (type === 'chapter') {
      todayActivity.chaptersCompleted++;
    } else if (type === 'test') {
      todayActivity.questionsAttempted++;
    } else if (type === 'ai_query') {
      // AI query also counts as activity for streak
      if (!todayActivity.chaptersCompleted && !todayActivity.questionsAttempted) {
        todayActivity.questionsAttempted = 1;
      }
    }
  } else {
    activities.push({
      date: today,
      chaptersCompleted: type === 'chapter' ? 1 : 0,
      questionsAttempted: type === 'test' || type === 'ai_query' ? 1 : 0,
    });
  }
  
  localStorage.setItem('dailyActivities', JSON.stringify(activities));
}

export function getDailyActivities(): DailyActivity[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('dailyActivities');
  return stored ? JSON.parse(stored) : [];
}

export function getCurrentStreak(): number {
  const activities = getDailyActivities();
  if (activities.length === 0) return 0;
  
  // Sort by date descending
  const sorted = activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < sorted.length; i++) {
    const activityDate = new Date(sorted[i].date);
    activityDate.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);
    
    if (activityDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function getQuestionsAttempted(): number {
  const attempts = getTestAttempts();
  return attempts.reduce((sum, a) => sum + a.totalQuestions, 0);
}
