-- Test Series Database Schema for Supabase

-- Test Results Table
CREATE TABLE IF NOT EXISTS test_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    test_id TEXT NOT NULL,
    exam TEXT NOT NULL CHECK (exam IN ('JEE', 'NEET')),
    total_score INTEGER NOT NULL DEFAULT 0,
    max_score INTEGER NOT NULL DEFAULT 0,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    incorrect_answers INTEGER NOT NULL DEFAULT 0,
    unattempted INTEGER NOT NULL DEFAULT 0,
    accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
    time_taken INTEGER NOT NULL DEFAULT 0, -- in seconds
    subject_scores JSONB NOT NULL DEFAULT '{}',
    user_answers JSONB NOT NULL DEFAULT '{}',
    marked_questions INTEGER[] DEFAULT '{}',
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(user_id, test_id)
);

-- Test Sessions Table (for tracking ongoing tests)
CREATE TABLE IF NOT EXISTS test_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    test_id TEXT NOT NULL,
    exam TEXT NOT NULL CHECK (exam IN ('JEE', 'NEET')),
    current_question INTEGER NOT NULL DEFAULT 0,
    current_subject TEXT NOT NULL DEFAULT 'physics',
    time_remaining INTEGER NOT NULL DEFAULT 10800, -- 3 hours in seconds
    user_answers JSONB NOT NULL DEFAULT '{}',
    marked_questions INTEGER[] DEFAULT '{}',
    visited_questions INTEGER[] DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    UNIQUE(user_id, test_id)
);

-- Test Analytics Table (for performance tracking)
CREATE TABLE IF NOT EXISTS test_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    exam TEXT NOT NULL CHECK (exam IN ('JEE', 'NEET')),
    total_tests_taken INTEGER NOT NULL DEFAULT 0,
    average_score DECIMAL(5,2) NOT NULL DEFAULT 0,
    best_score INTEGER NOT NULL DEFAULT 0,
    average_accuracy DECIMAL(5,2) NOT NULL DEFAULT 0,
    total_time_spent INTEGER NOT NULL DEFAULT 0, -- in seconds
    subject_performance JSONB NOT NULL DEFAULT '{}',
    improvement_trend JSONB NOT NULL DEFAULT '{}',
    last_test_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    UNIQUE(user_id, exam)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_test_results_user_exam ON test_results(user_id, exam);
CREATE INDEX IF NOT EXISTS idx_test_results_completed_at ON test_results(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_test_sessions_user_active ON test_sessions(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_test_analytics_user_exam ON test_analytics(user_id, exam);

-- Row Level Security (RLS) Policies
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for test_results
CREATE POLICY "Users can view their own test results" ON test_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test results" ON test_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test results" ON test_results
    FOR UPDATE USING (auth.uid() = user_id);

-- Policies for test_sessions
CREATE POLICY "Users can view their own test sessions" ON test_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test sessions" ON test_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test sessions" ON test_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own test sessions" ON test_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for test_analytics
CREATE POLICY "Users can view their own test analytics" ON test_analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test analytics" ON test_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test analytics" ON test_analytics
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions for automatic analytics updates
CREATE OR REPLACE FUNCTION update_test_analytics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update or insert analytics when a test result is added/updated
    INSERT INTO test_analytics (
        user_id, 
        exam, 
        total_tests_taken, 
        average_score, 
        best_score, 
        average_accuracy,
        total_time_spent,
        last_test_date
    )
    SELECT 
        NEW.user_id,
        NEW.exam,
        COUNT(*),
        AVG(total_score),
        MAX(total_score),
        AVG(accuracy),
        SUM(time_taken),
        MAX(completed_at)
    FROM test_results 
    WHERE user_id = NEW.user_id AND exam = NEW.exam
    GROUP BY user_id, exam
    ON CONFLICT (user_id, exam) 
    DO UPDATE SET
        total_tests_taken = EXCLUDED.total_tests_taken,
        average_score = EXCLUDED.average_score,
        best_score = EXCLUDED.best_score,
        average_accuracy = EXCLUDED.average_accuracy,
        total_time_spent = EXCLUDED.total_time_spent,
        last_test_date = EXCLUDED.last_test_date,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update analytics
CREATE TRIGGER trigger_update_test_analytics
    AFTER INSERT OR UPDATE ON test_results
    FOR EACH ROW
    EXECUTE FUNCTION update_test_analytics();

-- Function to clean up old test sessions (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_old_test_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM test_sessions 
    WHERE last_activity < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE test_results IS 'Stores completed test results for users';
COMMENT ON TABLE test_sessions IS 'Tracks ongoing test sessions for resume functionality';
COMMENT ON TABLE test_analytics IS 'Aggregated analytics and performance metrics for users';

COMMENT ON COLUMN test_results.subject_scores IS 'JSON object containing score breakdown by subject';
COMMENT ON COLUMN test_results.user_answers IS 'JSON object mapping question indices to selected answers';
COMMENT ON COLUMN test_results.marked_questions IS 'Array of question indices marked for review';
COMMENT ON COLUMN test_sessions.time_remaining IS 'Remaining time in seconds for the test';
COMMENT ON COLUMN test_analytics.subject_performance IS 'JSON object with performance metrics by subject';
COMMENT ON COLUMN test_analytics.improvement_trend IS 'JSON object tracking score improvements over time';