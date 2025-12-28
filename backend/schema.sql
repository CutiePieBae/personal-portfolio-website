-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  published INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Create index on published for filtering
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);

-- Insert some sample blog posts
INSERT INTO posts (title, slug, content, excerpt, published) VALUES
  ('Getting Started with Cloudflare Workers', 
   'getting-started-with-cloudflare-workers', 
   'Cloudflare Workers is a serverless platform that lets you run JavaScript, TypeScript, and WebAssembly at the edge. This means your code runs in data centers around the world, close to your users, resulting in incredibly fast response times.',
   'Learn how to build serverless applications with Cloudflare Workers.',
   1),
  ('Building APIs with Hono', 
   'building-apis-with-hono', 
   'Hono is a small, simple, and ultrafast web framework for Cloudflare Workers, Deno, Bun, and Node.js. It provides a familiar Express-like API while being optimized for edge computing environments.',
   'A guide to building fast APIs using the Hono framework.',
   1),
  ('Using D1 Database with TypeScript', 
   'using-d1-database-with-typescript', 
   'Cloudflare D1 is a serverless SQL database built on SQLite. It integrates seamlessly with Cloudflare Workers and provides a simple way to add persistent storage to your edge applications.',
   'How to use Cloudflare D1 database in your Workers projects.',
   1);

