# Travel Preferences Survey

A clean, modern travel survey web app built with React, Vite, Tailwind CSS, and Supabase. Survey responses are stored directly in a Supabase database.

## Features

- Radio button question: travel frequency per year
- Dropdown question: preferred destination type
- Checkbox question: factors that matter when choosing a trip
- Text input question: ideal vacation description
- Thank-you confirmation page after submission
- Responses saved to Supabase in real time

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI) |
| Database | Supabase (PostgreSQL) |
| Routing | Wouter |

---

## Supabase Setup

Before running or deploying, create the `survey_responses` table in your Supabase project.

Go to **Supabase Dashboard → SQL Editor** and run:

```sql
create table survey_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  travel_frequency text not null,
  destination_type text not null,
  trip_factors text[] not null,
  ideal_vacation text not null
);
```

Then enable anonymous inserts via Row Level Security (RLS):

```sql
alter table survey_responses enable row level security;

create policy "Allow anonymous inserts"
  on survey_responses
  for insert
  to anon
  with check (true);
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

> These are `VITE_` prefixed so Vite embeds them into the client bundle at build time. They are safe to use in a frontend app as long as you lock down your Supabase table with RLS policies.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in env vars
cp .env.example .env
# Edit .env with your Supabase credentials

# 3. Start the dev server
npm run dev
```

---

## Building for Production

```bash
npm run build
```

Output is written to `dist/`. This is the folder Azure deploys.

---

## Deploying to Azure Static Web Apps

### Azure configuration

| Setting | Value |
|---|---|
| App location | `/` |
| API location | *(leave empty)* |
| Output location | `dist` |
| Build command | `npm run build` |

### Environment variables

Add these in **Azure Portal → Static Web App → Configuration → Application settings**:

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |

### GitHub Actions workflow

Azure auto-generates a workflow file. Make sure the values match:

```yaml
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    app_location: "/"
    api_location: ""
    output_location: "dist"
```

Add your Supabase credentials as **GitHub Secrets** and pass them into the build:

```yaml
env:
  VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
  VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

---

## Project Structure

```
/                               <- repository root
├── src/
│   ├── pages/
│   │   ├── survey.tsx          # Main survey form
│   │   └── thank-you.tsx       # Confirmation page
│   ├── lib/
│   │   └── supabase.ts         # Supabase client (reads env vars)
│   ├── components/ui/          # shadcn/ui component library
│   ├── App.tsx                 # Router setup
│   ├── main.tsx                # App entry point
│   └── index.css               # Tailwind + theme variables
├── public/
│   └── favicon.svg
├── index.html                  # Main HTML entry point (Vite root)
├── vite.config.ts              # Vite build configuration
├── staticwebapp.config.json    # Azure SPA routing config
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variable template
└── README.md
```

---

## License

MIT
