# HereWeGo - 智能旅行应用

一个使用React + TypeScript + Vite开发的现代化智能旅行应用，集成了AI旅行规划功能、目的地探索、社区分享等功能。

## 🌟 核心功能

### 智能旅行规划
- 🎯 AI生成详细旅行计划：输入目的地、预算、天数和兴趣，AI自动生成个性化旅行方案
- 🤖 AI Agent任务分解：自动分解规划任务并逐步执行
- 💬 对话式交互：与AI助手实时对话，获取旅行建议

### 目的地探索
- 🏖️ 丰富的目的地库：探索全球精选旅行目的地
- � 智能搜索与筛选：根据兴趣、预算、时长等条件筛选目的地
- 📸 高清目的地图片：详细的目的地介绍与图片展示
- 💫 个性化推荐：基于用户偏好的AI推荐

### 社区功能
- 👥 用户社区：分享旅行经历，交流旅行心得
- 📝 旅行攻略：查看和分享详细的旅行指南
- 💬 互动交流：点赞、评论、分享旅行内容

### 个人中心
- �📱 个人资料：管理个人信息
- 💾 收藏功能：收藏喜欢的目的地
- 📊 旅行统计：查看旅行记录与成就

### 现代化体验
- 🎨 精美的UI设计：使用shadcn/ui构建的现代化界面
- � 响应式布局：完美适配桌面端和移动端
- ⚡ 快速加载：优化的性能与用户体验

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite
- **UI组件库**: shadcn/ui + Tailwind CSS
- **路由管理**: React Router v7
- **状态管理**: Zustand
- **表单处理**: React Hook Form
- **AI服务**: 支持 Groq（免费）、DeepSeek、OpenAI 等多种AI提供商
- **数据库**: Supabase
- **图片处理**: 响应式图片加载与优化

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

> 注意：本项目使用 pnpm 作为包管理器。如果还没有安装 pnpm，可以通过以下方式安装：
> ```bash
> npm install -g pnpm
> # 或
> curl -fsSL https://get.pnpm.io/install.sh | sh -
> ```

### 环境变量配置

创建 `.env` 文件并配置以下变量：

#### AI服务配置（三选一）

**推荐：Groq（免费，速度快）**
```env
# 设置AI提供商为groq（默认）
VITE_AI_PROVIDER=groq
# 获取免费API密钥: https://console.groq.com
VITE_GROQ_API_KEY=your_groq_api_key
```

**备选：DeepSeek（价格便宜，中文支持好）**
```env
# 设置AI提供商为deepseek
VITE_AI_PROVIDER=deepseek
# 获取API密钥: https://platform.deepseek.com
VITE_DEEPSEEK_API_KEY=your_deepseek_api_key
```

**备选：OpenAI（需要付费）**
```env
# 设置AI提供商为openai
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=your_openai_api_key
```

#### 数据库配置
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **推荐使用 Groq**：完全免费，速度快，API兼容OpenAI，无需修改代码即可使用。
> 获取API密钥：访问 https://console.groq.com 注册账号即可免费获取。

### 运行开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

## 📁 项目结构

```
src/
├── assets/            # 静态资源
├── components/        # React组件
│   ├── ui/           # shadcn/ui基础组件
│   ├── DestinationCard.tsx      # 目的地卡片
│   ├── DestinationDetailModal.tsx # 目的地详情模态框
│   ├── FilterSection.tsx        # 筛选区域
│   ├── Hero.tsx                 # 英雄区域
│   ├── Layout.tsx               # 布局组件
│   ├── Navigation.tsx           # 导航组件
│   ├── SearchBar.tsx            # 搜索栏
│   ├── TaskProgress.tsx         # 任务进度
│   ├── TripForm.tsx             # 旅行规划表单
│   └── TripPlanDocument.tsx     # 旅行计划文档
├── pages/             # 页面组件
│   ├── AboutPage.tsx            # 关于我们
│   ├── CommunityPage.tsx        # 社区页面
│   ├── ExplorePage.tsx          # 探索页面
│   ├── GuidesPage.tsx           # 旅行攻略
│   ├── Home.tsx                 # 主页
│   ├── ProfilePage.tsx          # 个人中心
│   └── SettingsPage.tsx         # 设置页面
├── services/          # 数据服务
│   ├── content.ts     # 内容服务（社区、攻略等）
│   └── destinations.ts # 目的地服务
├── store/             # 状态管理
│   └── tripStore.ts   # 旅行计划状态
├── styles/            # 样式文件
├── utils/             # 工具函数
├── router.tsx         # 路由配置
└── main.tsx           # 应用入口
```

## 📸 应用截图

### 主页
<a target="_blank" href=""><img src="https://mmuvuzbnrosbqjmmblhh.supabase.co/storage/v1/object/sign/Images/homepagescreenshot.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZWU3N2Q1Zi1mM2E5LTRlM2UtODVhNS05YjcxZTljYmJlOWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvaG9tZXBhZ2VzY3JlZW5zaG90LnBuZyIsImlhdCI6MTc2ODExNTQxMiwiZXhwIjoxNzk5NjUxNDEyfQ.DIQQR7brifHTK-zzZ6-6Q7t9SiAbtoPCl7E5O5ejhEo" width=850></img></a>

### 社区功能
<a target="_blank" href=""><img src="https://mmuvuzbnrosbqjmmblhh.supabase.co/storage/v1/object/sign/Images/commiunityScreenshot.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZWU3N2Q1Zi1mM2E5LTRlM2UtODVhNS05YjcxZTljYmJlOWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvY29tbWl1bml0eVNjcmVlbnNob3QucG5nIiwiaWF0IjoxNzY4MTE1MjAzLCJleHAiOjE3OTk2NTEyMDN9.zkVjOV3e1mdiDQBS2QZVDZj-k9-PRZEs7hn8974G3L0" width=850></img></a>

### 旅行攻略
<a target="_blank" href=""><img src="https://mmuvuzbnrosbqjmmblhh.supabase.co/storage/v1/object/sign/Images/guideScreenshot.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82ZWU3N2Q1Zi1mM2E5LTRlM2UtODVhNS05YjcxZTljYmJlOWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJJbWFnZXMvZ3VpZGVTY3JlZW5zaG90LnBuZyIsImlhdCI6MTc2ODExNTM5MSwiZXhwIjoxNzk5NjUxMzkxfQ.ulqvxXKC3YYAqMReMcjuVbbVQpVtCdcK43MT8GRRqy0" width=850></img></a>

## 📚 主要功能模块

### 1. AI旅行规划
用户输入旅行需求（目的地、预算、天数、兴趣），AI自动生成详细的旅行计划，包括每日行程、景点推荐、住宿建议等。

### 2. 目的地浏览
用户可以浏览全球精选目的地，查看详细信息、图片和用户评价，支持搜索和筛选功能。

### 3. 社区分享
用户可以在社区中分享旅行经历，查看他人的旅行攻略，进行互动交流。

### 4. 个人中心
用户可以管理个人资料，查看旅行记录，收藏喜欢的目的地，追踪旅行成就。

## 🎨 设计特点

- **现代化UI**: 使用shadcn/ui和Tailwind CSS构建的精美界面
- **响应式设计**: 完美适配各种屏幕尺寸
- **流畅动画**: 精心设计的过渡动画和交互效果
- **直观导航**: 清晰的信息架构和导航系统

## 🔧 开发说明

### 组件开发
项目采用组件化开发模式，所有UI组件位于`src/components`目录，可复用组件优先考虑封装成独立组件。

### 数据服务
所有数据访问通过`src/services`目录下的服务函数进行，支持Supabase和其他数据源。

### 路由管理
使用React Router v7进行路由管理，配置文件位于`src/router.tsx`。

### 样式开发
- 使用Tailwind CSS进行样式设计
- 自定义样式位于`src/styles`目录
- 组件样式优先使用Tailwind工具类

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交Issue和Pull Request，共同改进这个项目！

---

**HereWeGo** - 让旅行更智能，让探索更有趣！