-- Subjects
create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  exam_type text check (exam_type in ('JEE', 'NEET', 'BOTH')) default 'BOTH',
  icon text,
  created_at timestamptz default now()
);

-- Chapters
create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references subjects(id) on delete cascade,
  name text not null,
  weightage_percent numeric(5,2),
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard')),
  is_trending boolean default false,
  created_at timestamptz default now()
);

-- Questions
create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid references chapters(id) on delete cascade,
  type text check (type in ('MCQ', 'MULTI_CORRECT', 'INTEGER', 'ASSERTION_REASON')),
  content text not null,
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard')),
  year_asked integer,
  created_at timestamptz default now()
);

-- Options
create table if not exists options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id) on delete cascade,
  content text not null,
  is_correct boolean default false
);

-- Solutions
create table if not exists solutions (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id) on delete cascade,
  explanation text not null,
  steps jsonb
);

-- Concept Sheets
create table if not exists concept_sheets (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid references chapters(id) on delete cascade,
  content_mdx text,
  key_formulas jsonb
);

-- User Profiles
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  target_exam text check (target_exam in ('JEE_MAIN', 'JEE_ADVANCED', 'NEET')),
  target_year integer,
  plan text check (plan in ('free', 'premium')) default 'free',
  streak_count integer default 0,
  ai_queries_today integer default 0,
  ai_queries_reset_date date default current_date,
  last_active date,
  created_at timestamptz default now()
);

-- Mock / Test Series
create table if not exists mock_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  type text check (type in ('FULL_MOCK', 'CHAPTER_TEST', 'WEAK_AREA', 'SPEED_TEST')),
  exam_type text,
  generated_by text default 'gemini',
  started_at timestamptz,
  completed_at timestamptz,
  score numeric(6,2),
  total_questions integer,
  correct_count integer,
  questions_snapshot jsonb,
  created_at timestamptz default now()
);

-- Mock Responses
create table if not exists mock_responses (
  id uuid primary key default gen_random_uuid(),
  mock_test_id uuid references mock_tests(id) on delete cascade,
  question_id uuid references questions(id),
  selected_option_id uuid references options(id),
  is_correct boolean,
  time_taken_seconds integer
);

-- AI Conversations
create table if not exists ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  chapter_id uuid references chapters(id),
  messages jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bookmarks
create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  question_id uuid references questions(id),
  created_at timestamptz default now()
);

-- Subscriptions
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  plan text,
  start_date date,
  end_date date,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text check (status in ('active', 'expired', 'cancelled')) default 'active',
  created_at timestamptz default now()
);

-- RLS Policies
alter table profiles enable row level security;
alter table mock_tests enable row level security;
alter table mock_responses enable row level security;
alter table ai_conversations enable row level security;
alter table bookmarks enable row level security;
alter table subscriptions enable row level security;

create policy "Users manage own profile" on profiles for all using (auth.uid() = id);
create policy "Users manage own mock tests" on mock_tests for all using (auth.uid() = user_id);
create policy "Users manage own responses" on mock_responses for all using (
  auth.uid() = (select user_id from mock_tests where id = mock_test_id)
);
create policy "Users manage own conversations" on ai_conversations for all using (auth.uid() = user_id);
create policy "Users manage own bookmarks" on bookmarks for all using (auth.uid() = user_id);
create policy "Users view own subscriptions" on subscriptions for select using (auth.uid() = user_id);

-- Public read access for content tables
alter table subjects enable row level security;
alter table chapters enable row level security;
alter table questions enable row level security;
alter table options enable row level security;
alter table solutions enable row level security;
alter table concept_sheets enable row level security;

create policy "Public read subjects" on subjects for select using (true);
create policy "Public read chapters" on chapters for select using (true);
create policy "Public read questions" on questions for select using (true);
create policy "Public read options" on options for select using (true);
create policy "Public read solutions" on solutions for select using (true);
create policy "Public read concept_sheets" on concept_sheets for select using (true);
