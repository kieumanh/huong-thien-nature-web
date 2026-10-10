CREATE TABLE IF NOT EXISTS post_daily_view_sources (post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE, day TEXT NOT NULL, source TEXT NOT NULL CHECK(source IN ('nature')), views INTEGER NOT NULL DEFAULT 0 CHECK (views >= 0), PRIMARY KEY(post_id,day,source));
CREATE INDEX IF NOT EXISTS idx_view_sources_day ON post_daily_view_sources(day);
