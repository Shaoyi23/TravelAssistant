# HereWeGo - AI旅行规划助手

一个使用React + TypeScript + Vite开发的智能旅行规划应用，集成了OpenAI API和shadcn/ui组件库。

## 功能特性

- 🎯 智能旅行规划：输入目的地、预算、天数和兴趣，AI自动生成详细旅行计划
- 🤖 AI Agent任务分解：自动分解规划任务并逐步执行
- 💬 对话式交互：与AI助手实时对话，获取旅行建议
- 📱 现代化UI：使用shadcn/ui构建的美观界面
- 📄 计划导出：支持下载旅行计划文档

## 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite
- **UI组件库**: shadcn/ui + Tailwind CSS
- **状态管理**: Zustand
- **表单处理**: React Hook Form
- **AI服务**: 支持 Groq（免费）、DeepSeek、OpenAI 等多种AI提供商
- **数据库**: Supabase (可选)

## 开始使用

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

#### 其他配置（可选）
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

## 项目结构

```
src/
├── components/          # React组件
│   ├── ui/            # shadcn/ui基础组件
│   ├── TripForm.tsx   # 旅行需求表单
│   ├── TaskProgress.tsx # 任务进度显示
│   ├── ConversationHistory.tsx # 对话历史
│   └── TripPlanDocument.tsx # 旅行计划文档
├── pages/             # 页面组件
│   └── Home.tsx       # 主页
├── store/             # 状态管理
│   └── tripStore.ts   # Zustand store
├── utils/             # 工具函数
│   ├── aiService.ts   # AI服务（支持Groq/DeepSeek/OpenAI）
│   └── supabaseClient.ts # Supabase客户端
└── lib/               # 库文件
    └── utils.ts       # 工具函数（cn等）
```

## 主要功能说明

### 1. 旅行规划表单
用户输入旅行需求：
- 目的地
- 预算（元）
- 旅行天数
- 兴趣爱好（多选）

### 2. AI Agent任务执行
系统自动分解并执行以下任务：
1. 查询目的地天气
2. 搜索推荐景点
3. 规划旅行路线
4. 推荐住宿
5. 生成完整旅行计划

### 3. 对话交互
生成计划后，用户可以：
- 查看对话历史
- 向AI提问
- 获取个性化建议

### 4. 计划展示
展示包含以下内容的详细计划：
- 天气情况
- 推荐景点
- 每日行程安排
- 住宿推荐
- 旅行小贴士

## 开发说明

### TypeScript配置
项目已完全迁移到TypeScript，所有组件和工具函数都有完整的类型定义。

### shadcn/ui组件
项目使用shadcn/ui组件库，所有UI组件位于 `src/components/ui/` 目录。

### 样式系统
- 使用Tailwind CSS进行样式设计
- 支持CSS变量主题系统
- 响应式设计，支持移动端和桌面端

## 许可证

MIT
