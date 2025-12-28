import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Define the environment bindings
type Bindings = {
  DB: D1Database;
  ENVIRONMENT: string;
};

// Define the Post type
interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: number; // SQLite uses 0/1 for boolean
  created_at: string;
  updated_at: string;
}

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for all routes
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    message: 'API is running on Cloudflare Workers',
    environment: c.env.ENVIRONMENT,
  });
});

// List all published posts
app.get('/api/posts', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC'
    ).all<Post>();

    return c.json(results || []);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return c.json({ error: 'Failed to fetch posts' }, 500);
  }
});

// Get a single post by slug
app.get('/api/posts/:slug', async (c) => {
  const slug = c.req.param('slug');

  try {
    const post = await c.env.DB.prepare(
      'SELECT * FROM posts WHERE slug = ? AND published = 1'
    ).bind(slug).first<Post>();

    if (!post) {
      return c.json({ error: 'Post not found' }, 404);
    }

    return c.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return c.json({ error: 'Failed to fetch post' }, 500);
  }
});

// 404 handler for unmatched routes
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;

