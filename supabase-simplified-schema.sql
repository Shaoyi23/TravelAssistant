-- ============================================
-- Supabase Database Schema for HereWeGo
-- Simplified version for direct execution in Supabase Console
-- ============================================

-- ============================================
-- Add missing columns to existing destinations table
-- ============================================
DO $$
BEGIN
    -- Add missing columns if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'destinations' AND column_name = 'is_active'
    ) THEN
        ALTER TABLE destinations ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'destinations' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE destinations ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'destinations' AND column_name = 'recommended'
    ) THEN
        ALTER TABLE destinations ADD COLUMN recommended BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- ============================================
-- 1. Guides Table (旅行攻略)
-- ============================================
CREATE TABLE IF NOT EXISTS guides (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    author_id BIGINT,
    read_time VARCHAR(50) NOT NULL,
    publish_date DATE NOT NULL,
    cover_image TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for guides
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to guides" 
ON guides FOR SELECT 
USING (is_published = true);

-- ============================================
-- 2. Community Posts Table (社区动态)
-- ============================================
CREATE TABLE IF NOT EXISTS community_posts (
    id BIGSERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    author_avatar TEXT,
    author_verified BOOLEAN DEFAULT FALSE,
    author_id BIGINT,
    content TEXT NOT NULL,
    location VARCHAR(200),
    images TEXT[] NOT NULL DEFAULT '{}',
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    trending BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for community posts
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to posts" 
ON community_posts FOR SELECT 
USING (is_active = true);

-- ============================================
-- 3. Team Members Table (团队成员)
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    avatar TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for team
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to team" 
ON team_members FOR SELECT 
USING (is_active = true);

-- ============================================
-- 4. Site Features Table (网站特性)
-- ============================================
CREATE TABLE IF NOT EXISTS site_features (
    id BIGSERIAL PRIMARY KEY,
    icon VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for features
ALTER TABLE site_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to features" 
ON site_features FOR SELECT 
USING (is_active = true);

-- ============================================
-- 5. User Favorites Table (用户收藏)
-- ============================================
CREATE TABLE IF NOT EXISTS user_favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    destination_id BIGINT NOT NULL REFERENCES destinations(id),
    destination_name VARCHAR(200) NOT NULL,
    destination_location VARCHAR(200),
    destination_image TEXT,
    saved_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, destination_id)
);

-- Enable RLS for user favorites
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites" 
ON user_favorites FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own favorites" 
ON user_favorites FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own favorites" 
ON user_favorites FOR DELETE 
USING (auth.uid()::text = user_id::text);

-- ============================================
-- 6. User Trips Table (用户旅行记录)
-- ============================================
CREATE TABLE IF NOT EXISTS user_trips (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    destination VARCHAR(200) NOT NULL,
    country VARCHAR(100) NOT NULL,
    start_date DATE,
    end_date DATE,
    duration VARCHAR(50),
    status VARCHAR(20) DEFAULT 'planned',
    photos_count INTEGER DEFAULT 0,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for user trips
ALTER TABLE user_trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trips" 
ON user_trips FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own trips" 
ON user_trips FOR ALL 
USING (auth.uid()::text = user_id::text);

-- ============================================
-- 7. User Achievements Table (用户成就)
-- ============================================
CREATE TABLE IF NOT EXISTS user_achievements (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon VARCHAR(100) NOT NULL,
    earned BOOLEAN DEFAULT FALSE,
    earned_date DATE,
    progress VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for achievements
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements" 
ON user_achievements FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own achievements" 
ON user_achievements FOR ALL 
USING (auth.uid()::text = user_id::text);

-- ============================================
-- Helper Views
-- ============================================

-- View for featured destinations
CREATE OR REPLACE VIEW featured_destinations AS
SELECT * FROM destinations 
WHERE recommended = true AND is_active = true
ORDER BY rating DESC, reviews DESC
LIMIT 6;

-- View for featured guides
CREATE OR REPLACE VIEW featured_guides AS
SELECT * FROM guides 
WHERE featured = true AND is_published = true
ORDER BY views DESC
LIMIT 2;

-- View for trending posts
CREATE OR REPLACE VIEW trending_posts AS
SELECT * FROM community_posts 
WHERE trending = true AND is_active = true
ORDER BY likes DESC
LIMIT 10;

-- ============================================
-- Seed Data (Manual Insert)
-- ============================================

-- Insert guides (run manually)
-- INSERT INTO guides (id, title, description, author, read_time, publish_date, cover_image, tags, views, likes, featured)
-- VALUES
-- (1, '巴黎七日深度游攻略', '从卢浮宫到埃菲尔铁塔，带你探索巴黎最经典的景点和隐藏的小众咖啡馆，体验地道的法式浪漫', '旅行达人小王', '15 分钟', '2026-01-05', 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2Nzk4MzIyNnww&ixlib=rb-4.1.0&q=80&w=1080', ARRAY['欧洲', '城市游', '文化'], 12453, 856, true),
-- (2, '东京美食终极指南', '从米其林餐厅到街头小吃，一网打尽东京必吃美食。包含详细地址、价格区间和最佳用餐时间', '美食探索者', '12 分钟', '2026-01-03', 'https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjgwNDg2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080', ARRAY['日本', '美食', '攻略'], 9876, 723, true)
-- ON CONFLICT (id) DO NOTHING;

-- Insert community posts (run manually)
-- INSERT INTO community_posts (id, author_name, author_avatar, author_verified, content, location, images, likes, comments, shares, trending)
-- VALUES
-- (1, '旅行摄影师小李', 'https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080', true, '刚从圣托里尼回来！这次拍到了最美的日落。分享一些拍摄心得：最佳时间是傍晚7-8点，推荐在Oia城堡位置，记得提前1小时占位置。', '圣托里尼，希腊', ARRAY['https://images.unsplash.com/photo-1664112732671-877dc0030ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBpc2xhbmR8ZW58MXx8fHwxNzY4MDQ4NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080'], 1234, 89, 45, true),
-- (2, '美食博主王小厨', 'https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080', false, '东京美食打卡第三天！今天吃了传说中的筑地市场寿司，真的超级新鲜，师傅现场捏制，入口即化。人均消费3000日元左右，性价比超高！', '东京，日本', ARRAY['https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjgwNDg2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080'], 856, 67, 32, true),
-- (3, '背包客张三', 'https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080', false, '【求助】第一次去巴黎，有什么需要特别注意的事项吗？听说地铁上小偷比较多？大家有推荐的住宿区域吗？预算在每晚500-800元之间。谢谢！', NULL, ARRAY[]::TEXT[], 234, 156, 12, false)
-- ON CONFLICT (id) DO NOTHING;

-- Insert team members (run manually)
-- INSERT INTO team_members (id, name, role, avatar, description, display_order)
-- VALUES
-- (1, '张明', '创始人 & CEO', 'https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080', '前Google AI研究员，15年旅游行业经验', 1),
-- (2, '李华', 'CTO', 'https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080', '技术专家，专注于AI与大数据应用', 2),
-- (3, '王芳', '产品总监', 'https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080', '资深旅行达人，走遍全球80+国家', 3)
-- ON CONFLICT (id) DO NOTHING;

-- Insert site features (run manually)
-- INSERT INTO site_features (id, icon, title, description, display_order)
-- VALUES
-- (1, 'Sparkles', 'AI 智能推荐', '基于深度学习算法，为您量身定制旅行方案，精准匹配您的偏好和需求', 1),
-- (2, 'Globe', '全球覆盖', '覆盖全球200+国家和地区，10000+精选目的地，带您探索世界每一个角落', 2),
-- (3, 'Users', '社区互动', '连接全球旅行者，分享真实体验，获取第一手旅行资讯和建议', 3),
-- (4, 'Target', '精准匹配', '多维度筛选系统，从预算、时间、兴趣等角度为您找到完美的旅行目的地', 4)
-- ON CONFLICT (id) DO NOTHING;
