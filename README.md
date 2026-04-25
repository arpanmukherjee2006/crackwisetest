# CrackWise v2.0 - Next.js Migration

AI-Powered JEE & NEET Preparation Platform with Gemini AI Integration

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
crackwise/
├── app/                    # Next.js 14 App Router
│   ├── (public)/          # Public pages (landing, pricing)
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Protected pages (dashboard, study)
│   ├── api/               # API routes (AI chat, test generation)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn components
│   ├── landing/          # Landing page sections
│   ├── chapter/          # Chapter study components
│   ├── ai/               # AI chat components
│   ├── mock/             # Mock test components
│   └── shared/           # Shared components (Navbar, Footer)
├── lib/                   # Utilities
│   ├── supabase/         # Supabase clients
│   ├── gemini.ts         # Gemini AI setup
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
├── scripts/              # Migration scripts
└── supabase-schema.sql   # Database schema
```

## 🎨 Design System

### Colors
- **Background**: `#0A0A0A` (primary), `#111111` (secondary), `#1A1A1A` (card)
- **Accent**: `#E8600A` (orange), `#4A4A4A` (gray)
- **Text**: `#F5F5F5` (primary), `#888888` (secondary)
- **Border**: `#2C2C2C`

### Fonts
- **Headings**: Syne
- **Body**: DM Sans
- **Code/Math**: JetBrains Mono

### Buttons
```tsx
// Primary
className="bg-accent-orange text-white hover:bg-orange-700 rounded-lg px-6 py-3"

// Secondary
className="bg-accent-gray text-text-primary hover:bg-[#3a3a3a] rounded-lg px-6 py-3"

// Ghost
className="border border-border text-text-primary hover:bg-bg-card rounded-lg px-6 py-3"
```

## 🗄️ Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the contents of `supabase-schema.sql`
4. Verify all tables are created with RLS policies

## 🔑 Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

GEMINI_API_KEY=your_gemini_api_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📊 Data Migration

The old codebase contains:
- **JEE**: Physics (3 chapters), Chemistry (23 chapters), Mathematics (Calculus)
- **NEET**: Physics (Modern Physics), Chemistry (23 chapters), Biology (1 chapter)
- **Total**: ~50+ chapters, 1000+ questions

To migrate:
```bash
pnpm tsx scripts/migrate.ts
```

## 🤖 AI Features

### 1. Study Assistant (`/api/ai/chat`)
- Chapter-specific AI tutor using Gemini 2.0 Flash
- Streaming responses
- Rate limiting: 10 queries/day for free users
- LaTeX formula rendering

### 2. Test Generator (`/api/ai/generate-test`)
- Intelligent question selection from database
- Adaptive difficulty based on user performance
- 4 test types: Full Mock, Chapter Test, Weak Area, Speed Test

### 3. Performance Analysis (`/api/ai/analyze-result`)
- Post-test AI analysis
- Personalized recommendations
- Weak area identification

## 🎯 Access Control

| Feature | Logged Out | Free | Premium |
|---------|-----------|------|---------|
| Browse Chapters | ✅ | ✅ | ✅ |
| First 10 Questions | ✅ | ✅ | ✅ |
| All Questions | ❌ | ✅ | ✅ |
| AI Assistant | ❌ | 10/day | Unlimited |
| Chapter Test | ❌ | 1/day | Unlimited |
| Full Mock | ❌ | ❌ | ✅ |
| Analytics | ❌ | ❌ | ✅ |

## 🚧 Current Status

✅ **Completed:**
- Next.js 14 setup with TypeScript
- Tailwind CSS with dark theme
- Supabase integration (client + server)
- Database schema with RLS
- Gemini AI client setup
- Middleware for auth protection
- Type definitions

🔄 **In Progress:**
- Landing page components
- Auth pages (login/signup)
- Dashboard layout
- Study interface with AI chat
- Mock test system
- Data migration script

⏳ **Pending:**
- Payment integration (Razorpay)
- Email notifications
- Analytics dashboard
- Mobile app (future)

## 📝 Development Notes

- Use `createClient()` from `lib/supabase/client.ts` in Client Components
- Use `createClient()` from `lib/supabase/server.ts` in Server Components
- All protected routes automatically redirect to `/login` via middleware
- AI queries are rate-limited per user (stored in `profiles.ai_queries_today`)
- Mock test questions are stored as JSONB snapshot for historical accuracy

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
pnpm dev
```

**Supabase connection issues:**
- Verify `.env.local` has correct credentials
- Check Supabase project is not paused
- Ensure RLS policies are enabled

**Build errors:**
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

## 📚 Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Gemini AI Docs](https://ai.google.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contributing

This is a migration project. Original content from the HTML/CSS/JS version is being preserved and enhanced with:
- Modern React architecture
- AI-powered features
- Better performance
- Mobile responsiveness
- Type safety

---

Built with ❤️ for JEE & NEET aspirants
