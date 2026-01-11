# Backyard Builders

A modern construction and landscaping estimation platform built with Next.js, Firebase, and Supabase.

![Backyard Builders Preview](apps/web/public/window.svg)

## 🚀 Features

- **Authentication**: Firebase Auth integration (Google Sign-in) with a robust "Demo Mode" for development.
- **Onboarding Flow**: Zip code validation, service area checking, and multi-step account creation.
- **Project Gallery**: Filterable portfolio of completed projects with detailed views.
- **Estimate Wizard**: Interactive tool to configure outdoor projects (patios, decks, etc.) and get real-time price estimates.
- **Dashboard**: User dashboard for managing properties and estimates.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Monorepo Tooling**: [Turborepo](https://turbo.build/)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sundeep8967/backyard-builders.git
   cd backyard-builders
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Copy the example environment file in `apps/web`:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```
   *Note: The app works in "Demo Mode" without valid API keys.*

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

Run the unit test suite:

```bash
pnpm test
```

To run in watch mode:

```bash
pnpm test:watch
```

## 📂 Project Structure

```
├── apps/
│   └── web/                 # Next.js application
│       ├── app/             # App Router pages & API routes
│       ├── components/      # React components
│       ├── lib/             # Utilities, hooks, context
│       └── supabase/        # Database migrations
├── packages/                # Shared packages (future use)
└── ...
```

## 🔒 Security & Data

- **Client-side**: Firebase Auth handles user identity.
- **Server-side**: Next.js API routes verify Firebase tokens before accessing Supabase.
- **Database**: Row Level Security (RLS) policies should be applied in Supabase (see `apps/web/supabase/migrations`).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
