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
# 1. Rename the standalone package file
cp package.standalone.json package.json

# 2. Install dependencies
npm install

# 3. Copy and fill in env vars
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Start the dev server
npm run dev
```

---

## Building for Production

```bash
npm run build
```

Output is written to `dist/`. This folder is what you deploy.

---

## Deploying to Azure Static Web Apps

### Option A — Azure Portal (manual)

1. Go to [portal.azure.com](https://portal.azure.com) and create a **Static Web App**
2. Connect it to your GitHub repository
3. In the build configuration, set:
   - **App location**: `/` (root of your repo, or the folder containing this project)
   - **Output location**: `dist`
   - **Build command**: `npm run build`
4. Add your environment variables in **Azure Portal → Static Web App → Configuration → Application settings**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Option B — GitHub Actions (auto-generated)

Azure automatically creates a `.github/workflows/azure-static-web-apps-*.yml` workflow file when you link a repo. Make sure the `app_location`, `api_location`, and `output_location` are set correctly in that file:

```yaml
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    app_location: "/"
    api_location: ""
    output_location: "dist"
```

Add your Supabase credentials as **GitHub Secrets** and reference them in the workflow:

```yaml
env:
  VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
  VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

---

## Files to Rename Before Exporting

When exporting just this folder to a standalone GitHub repo, rename two files:

| Action | Original file | Rename to |
|---|---|---|
| Replace monorepo package | `package.standalone.json` | `package.json` |
| Replace monorepo tsconfig | `tsconfig.standalone.json` | `tsconfig.json` |

**Why:** The existing `package.json` and `tsconfig.json` are wired into the Replit monorepo. They reference `@workspace/*` packages and extend base configs that only exist inside the Replit workspace. The `*.standalone.*` versions are fully self-contained.

All other files (`src/`, `index.html`, `vite.azure.config.ts`, `staticwebapp.config.json`, `public/`, `components.json`) are ready to use as-is — no changes needed.

---

## Project Structure

```
travel-survey/
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
├── vite.azure.config.ts        # Vite config for Azure/standalone builds
├── staticwebapp.config.json    # Azure SPA routing config
├── .env.example                # Environment variable template
├── package.standalone.json     # Standalone package.json (rename for export)
├── tsconfig.standalone.json    # Standalone tsconfig (rename for export)
└── README.md
```

---

## License

MIT
