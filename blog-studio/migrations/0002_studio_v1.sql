-- Hương Thiền Studio 1.0.0 — non-destructive editorial workflow and privacy-first reads
ALTER TABLE posts ADD COLUMN workflow_stage TEXT NOT NULL DEFAULT 'writing' CHECK (workflow_stage IN ('idea','writing','review','published'));
UPDATE posts SET workflow_stage='published' WHERE status='published';
CREATE INDEX IF NOT EXISTS idx_posts_workflow_stage ON posts(workflow_stage,status,updated_at);
CREATE TABLE IF NOT EXISTS post_daily_views (
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0 CHECK (views>=0),
  PRIMARY KEY (post_id,day)
);
CREATE INDEX IF NOT EXISTS idx_post_daily_views_day ON post_daily_views(day);
