import { useState } from "react";
import { BookOpen, Clock, User, Search, TrendingUp } from "lucide-react";

export function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "全部攻略" },
    { id: "destination", label: "目的地指南" },
    { id: "tips", label: "旅行技巧" },
    { id: "food", label: "美食推荐" },
    { id: "budget", label: "省钱攻略" },
  ];

  const guides = [
    {
      id: 1,
      title: "巴黎七日深度游攻略",
      description:
        "从卢浮宫到埃菲尔铁塔，带你探索巴黎最经典的景点和隐藏的小众咖啡馆，体验地道的法式浪漫",
      author: "旅行达人小王",
      readTime: "15 分钟",
      publishDate: "2026-01-05",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2Nzk4MzIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["欧洲", "城市游", "文化"],
      views: 12453,
      likes: 856,
      featured: true,
    },
    {
      id: 2,
      title: "东京美食终极指南",
      description:
        "从米其林餐厅到街头小吃，一网打尽东京必吃美食。包含详细地址、价格区间和最佳用餐时间",
      author: "美食探索者",
      readTime: "12 分钟",
      publishDate: "2026-01-03",
      image:
        "https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjgwNDg2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["日本", "美食", "攻略"],
      views: 9876,
      likes: 723,
      featured: true,
    },
    {
      id: 3,
      title: "瑞士阿尔卑斯滑雪完全攻略",
      description:
        "最佳滑雪季节、雪场选择、装备租赁、住宿推荐，以及新手入门指南，让你的滑雪之旅完美无缺",
      author: "户外运动家",
      readTime: "18 分钟",
      publishDate: "2025-12-28",
      image:
        "https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMG5hdHVyZXxlbnwxfHx8fDE3Njc5ODgxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["瑞士", "冬季", "滑雪"],
      views: 7654,
      likes: 543,
      featured: false,
    },
    {
      id: 4,
      title: "圣托里尼拍照指南",
      description:
        "最佳拍照时间、经典机位推荐、如何避开人群，以及后期调色技巧，助你拍出ins风大片",
      author: "摄影师李明",
      readTime: "10 分钟",
      publishDate: "2025-12-25",
      image:
        "https://images.unsplash.com/photo-1664112732671-877dc0030ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBpc2xhbmR8ZW58MXx8fHwxNzY4MDQ4NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["希腊", "摄影", "海岛"],
      views: 15234,
      likes: 1234,
      featured: true,
    },
    {
      id: 5,
      title: "伦敦省钱旅行攻略",
      description:
        "如何在预算有限的情况下玩转伦敦？免费景点、平价美食、交通省钱技巧全攻略",
      author: "穷游达人",
      readTime: "14 分钟",
      publishDate: "2025-12-20",
      image:
        "https://images.unsplash.com/photo-1745016176874-cd3ed3f5bfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBiaWclMjBiZW58ZW58MXx8fHwxNzY4MDU1NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["英国", "省钱", "城市游"],
      views: 11234,
      likes: 891,
      featured: false,
    },
    {
      id: 6,
      title: "迪拜奢华体验指南",
      description:
        "从帆船酒店到棕榈岛，探索迪拜最顶级的奢华体验。包含高端购物、米其林餐厅推荐",
      author: "奢旅专家",
      readTime: "16 分钟",
      publishDate: "2025-12-18",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmV8ZW58MXx8fHwxNzY3OTcxOTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["迪拜", "奢华", "购物"],
      views: 8765,
      likes: 654,
      featured: false,
    },
  ];

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      searchQuery === "" ||
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl text-gray-900 mb-4">旅行攻略</h1>
        <p className="text-lg text-gray-600">
          探索世界各地的旅行经验和实用建议
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索攻略标题、目的地或关键词..."
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Guides */}
      {selectedCategory === "all" && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl text-gray-900">热门推荐</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredGuides
              .filter((g) => g.featured)
              .slice(0, 2)
              .map((guide) => (
                <div
                  key={guide.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-64">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {guide.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/90 text-gray-800 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{guide.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{guide.readTime}</span>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        阅读全文 →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* All Guides */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl text-gray-900">全部攻略</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {guide.featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs">
                    热门
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {guide.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{guide.views.toLocaleString()} 阅读</span>
                    <span>{guide.likes} 点赞</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
