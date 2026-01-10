import { useState } from "react";
import {
  MessageCircle,
  Heart,
  Share2,
  TrendingUp,
  Image as ImageIcon,
  Video,
  MapPin,
} from "lucide-react";

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "全部动态" },
    { id: "trending", label: "热门" },
    { id: "photos", label: "摄影分享" },
    { id: "questions", label: "问答" },
  ];

  const posts = [
    {
      id: 1,
      author: {
        name: "旅行摄影师小李",
        avatar:
          "https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        verified: true,
      },
      content:
        "刚从圣托里尼回来！这次拍到了最美的日落🌅 分享一些拍摄心得：最佳时间是傍晚7-8点，推荐在Oia城堡位置，记得提前1小时占位置。器材用的是索尼A7M4 + 24-70GM，光圈f/8，ISO 100。",
      images: [
        "https://images.unsplash.com/photo-1664112732671-877dc0030ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBpc2xhbmR8ZW58MXx8fHwxNzY4MDQ4NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "圣托里尼，希腊",
      timestamp: "2 小时前",
      likes: 1234,
      comments: 89,
      shares: 45,
      trending: true,
    },
    {
      id: 2,
      author: {
        name: "美食博主王小厨",
        avatar:
          "https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        verified: false,
      },
      content:
        "东京美食打卡第三天！今天吃了传说中的筑地市场寿司🍣 真的超级新鲜，师傅现场捏制，入口即化。人均消费3000日元左右，性价比超高！推荐早上8点前去，避开人流高峰。",
      images: [
        "https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjgwNDg2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "东京，日本",
      timestamp: "5 小时前",
      likes: 856,
      comments: 67,
      shares: 32,
      trending: true,
    },
    {
      id: 3,
      author: {
        name: "背包客张三",
        avatar:
          "https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        verified: false,
      },
      content:
        "【求助】第一次去巴黎，有什么需要特别注意的事项吗？听说地铁上小偷比较多？大家有推荐的住宿区域吗？预算在每晚500-800元之间。谢谢！",
      images: [],
      location: null,
      timestamp: "昨天 18:30",
      likes: 234,
      comments: 156,
      shares: 12,
      trending: false,
    },
    {
      id: 4,
      author: {
        name: "户外探险家",
        avatar:
          "https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        verified: true,
      },
      content:
        "瑞士阿尔卑斯山徒步第五天！今天的风景真的太震撼了🏔️ 海拔3000米的观景台，360度雪山环绕。虽然很累但完全值得。提醒大家一定要带防晒霜和墨镜，高海拔紫外线很强。",
      images: [
        "https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMG5hdHVyZXxlbnwxfHx8fDE3Njc5ODgxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "少女峰，瑞士",
      timestamp: "昨天 14:20",
      likes: 2341,
      comments: 178,
      shares: 89,
      trending: true,
    },
    {
      id: 5,
      author: {
        name: "城市探索者",
        avatar:
          "https://images.unsplash.com/photo-1678286742832-26543bb49959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Nzk5NDQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        verified: false,
      },
      content:
        "纽约的街头艺术真的太酷了！在布鲁克林区发现了好多涂鸦墙🎨 每一幅都是艺术品。分享几个拍照好去处：Bushwick Collective、DUMBO区域、威廉斯堡大桥下。",
      images: [
        "https://images.unsplash.com/photo-1570304816841-906a17d7b067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwc2t5bGluZXxlbnwxfHx8fDE3Njc5Mzk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      location: "纽约，美国",
      timestamp: "2 天前",
      likes: 567,
      comments: 43,
      shares: 28,
      trending: false,
    },
  ];

  const filteredPosts =
    activeTab === "trending" ? posts.filter((p) => p.trending) : posts;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl text-gray-900 mb-4">旅行社区</h1>
        <p className="text-lg text-gray-600">与全球旅行者分享经验，获取灵感</p>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
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

      {/* Create Post */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
            U
          </div>
          <div className="flex-1">
            <textarea
              placeholder="分享你的旅行故事..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-sm">图片</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Video className="w-5 h-5" />
                  <span className="text-sm">视频</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">位置</span>
                </button>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                发布
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900">{post.author.name}</h3>
                    {post.author.verified && (
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                    {post.trending && (
                      <div className="flex items-center gap-1 text-orange-600 text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>热门</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>{post.timestamp}</span>
                    {post.location && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{post.location}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-4">
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
            </div>

            {/* Post Images */}
            {post.images.length > 0 && (
              <div className="px-6 pb-4">
                <div
                  className={`grid gap-2 ${
                    post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                  }`}
                >
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Post Actions */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
