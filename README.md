# Personal Portfolio Website

A full-stack portfolio website hosted entirely on Cloudflare for FREE.

## Tech Stack

| Component | Technology | Hosting |
|-----------|------------|---------|
| Frontend | React + Vite + Tailwind | Cloudflare Pages |
| Backend | TypeScript + Hono | Cloudflare Workers |
| Database | SQLite | Cloudflare D1 |

## Project Structure

```
personal-portfolio-website/
├── frontend/           # React + Vite application
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/            # Cloudflare Workers API
│   ├── src/
│   │   └── index.ts    # API routes
│   ├── schema.sql      # Database schema
│   ├── wrangler.toml   # Cloudflare config
│   └── package.json
│
└── README.md
```

## Local Development

### 1. Start the Backend

```bash
cd backend

# Initialize the local D1 database
npm run db:init

# Start the Workers dev server
npm run dev
```

The API will be available at `http://localhost:8787`

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/posts` | List all published posts |
| GET | `/api/posts/:slug` | Get a single post by slug |

## Deployment

### Backend (Cloudflare Workers)

```bash
cd backend

# Create the D1 database (first time only)
npm run db:create

# Update wrangler.toml with the database ID from the output

# Initialize the remote database
npm run db:init:remote

# Deploy the worker
npm run deploy
```

### Frontend (Cloudflare Pages)

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set build output directory: `dist`
5. Set root directory: `frontend`

## Free Tier Limits

| Resource | Limit |
|----------|-------|
| Workers requests | 100,000/day |
| D1 reads | 5 million/day |
| D1 writes | 100,000/day |
| D1 storage | 5 GB |
| Pages bandwidth | Unlimited |
