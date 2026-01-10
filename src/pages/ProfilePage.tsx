import { useState } from "react";
import {
  MapPin,
  Calendar,
  Heart,
  BookOpen,
  Award,
  Camera,
  TrendingUp,
  Users,
} from "lucide-react";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "概览" },
    { id: "favorites", label: "收藏" },
    { id: "trips", label: "旅行记录" },
    { id: "achievements", label: "成就" },
  ];

  const userStats = [
    { label: "访问国家", value: "23", icon: MapPin, color: "blue" },
    { label: "旅行天数", value: "156", icon: Calendar, color: "purple" },
    { label: "收藏目的地", value: "48", icon: Heart, color: "red" },
    { label: "发布攻略", value: "12", icon: BookOpen, color: "green" },
  ];

  const favorites = [
    {
      id: 1,
      name: "巴厘岛",
      location: "印度尼西亚",
      image:
        "https://images.unsplash.com/photo-1714412192114-61dca8f15f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzY4MDA3NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      savedDate: "2026-01-08",
    },
    {
      id: 2,
      name: "圣托里尼",
      location: "希腊",
      image:
        "https://images.unsplash.com/photo-1664112732671-877dc0030ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBpc2xhbmR8ZW58MXx8fHwxNzY4MDQ4NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      savedDate: "2026-01-05",
    },
    {
      id: 3,
      name: "东京",
      location: "日本",
      image:
        "https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjgwNDg2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      savedDate: "2026-01-02",
    },
    {
      id: 4,
      name: "巴黎",
      location: "法国",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2Nzk4MzIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      savedDate: "2025-12-28",
    },
  ];

  const trips = [
    {
      id: 1,
      destination: "东京",
      country: "日本",
      dates: "2025年12月",
      duration: "7天",
      status: "completed",
      images: [
        "https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjgwNDg2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      photos: 234,
    },
    {
      id: 2,
      destination: "巴黎",
      country: "法国",
      dates: "2025年10月",
      duration: "10天",
      status: "completed",
      images: [
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2Nzk4MzIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      photos: 456,
    },
    {
      id: 3,
      destination: "圣托里尼",
      country: "希腊",
      dates: "2026年3月",
      duration: "6天",
      status: "planned",
      images: [
        "https://images.unsplash.com/photo-1664112732671-877dc0030ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBpc2xhbmR8ZW58MXx8fHwxNzY4MDQ4NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      photos: 0,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "探索先锋",
      description: "访问了10个不同的国家",
      icon: MapPin,
      earned: true,
      date: "2025-11-15",
    },
    {
      id: 2,
      title: "摄影达人",
      description: "上传了100张旅行照片",
      icon: Camera,
      earned: true,
      date: "2025-10-20",
    },
    {
      id: 3,
      title: "攻略专家",
      description: "发布了10篇旅行攻略",
      icon: BookOpen,
      earned: true,
      date: "2025-09-08",
    },
    {
      id: 4,
      title: "社区之星",
      description: "获得了1000个点赞",
      icon: TrendingUp,
      earned: true,
      date: "2025-12-01",
    },
    {
      id: 5,
      title: "环球旅行家",
      description: "访问50个国家",
      icon: Award,
      earned: false,
      progress: "23/50",
    },
    {
      id: 6,
      title: "影响力者",
      description: "获得10000个关注者",
      icon: Users,
      earned: false,
      progress: "2.3k/10k",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="User Avatar"
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl text-gray-900 mb-2">旅行者小明</h1>
                  <p className="text-gray-600 mb-2">探索世界，记录美好 ✈️</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>北京，中国</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>加入于 2024年3月</span>
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md">
                  编辑资料
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            purple: "bg-purple-100 text-purple-600",
            red: "bg-red-100 text-red-600",
            green: "bg-green-100 text-green-600",
          };
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  colorClasses[stat.color as keyof typeof colorClasses]
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 text-sm transition-colors relative ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl text-gray-900 mb-4">最近活动</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">收藏了 巴厘岛</p>
                    <p className="text-sm text-gray-500">2 天前</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">发布了攻略《东京美食指南》</p>
                    <p className="text-sm text-gray-500">5 天前</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">获得了成就"社区之星"</p>
                    <p className="text-sm text-gray-500">1 周前</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl text-gray-900 mb-4">个人成就</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">旅行足迹</span>
                    <span className="text-gray-900">23/195 国家</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      style={{ width: "12%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">内容贡献</span>
                    <span className="text-gray-900">12/50 篇攻略</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-600 to-teal-600 rounded-full"
                      style={{ width: "24%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">社区影响力</span>
                    <span className="text-gray-900">2.3k/10k 关注者</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-600 to-pink-600 rounded-full"
                      style={{ width: "23%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.location}</p>
                  <p className="text-xs text-gray-400">
                    收藏于 {item.savedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "trips" && (
          <div className="space-y-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-64 h-48">
                    <img
                      src={trip.images[0]}
                      alt={trip.destination}
                      className="w-full h-full object-cover"
                    />
                    {trip.status === "planned" && (
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                        计划中
                      </div>
                    )}
                    {trip.status === "completed" && trip.photos > 0 && (
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        <span>{trip.photos}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl text-gray-900 mb-2">
                          {trip.destination}
                        </h3>
                        <p className="text-gray-600">{trip.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{trip.dates}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{trip.duration}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      {trip.status === "completed" ? "查看相册" : "查看计划"} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-xl shadow-lg p-6 transition-all ${
                    achievement.earned
                      ? "hover:shadow-xl"
                      : "opacity-60 grayscale"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                      achievement.earned
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        achievement.earned ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {achievement.description}
                  </p>
                  {achievement.earned ? (
                    <p className="text-xs text-gray-500">
                      获得于 {achievement.date}
                    </p>
                  ) : (
                    <div className="text-xs text-gray-500">
                      进度：{achievement.progress}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
