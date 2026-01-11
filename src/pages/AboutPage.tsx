import { useState, useEffect } from "react";
import {
  Sparkles,
  Target,
  Users,
  Globe,
  Mail,
  MapPin,
  Phone,
  Compass,
} from "lucide-react";
import { teamService, type TeamMember } from "../services/content";

export function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const data = await teamService.getAll();
        setTeam(data);
      } catch (err) {
        setError("Failed to fetch team members");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "AI 智能推荐",
      description:
        "基于深度学习算法，为您量身定制旅行方案，精准匹配您的偏好和需求",
    },
    {
      icon: Globe,
      title: "全球覆盖",
      description:
        "覆盖全球200+国家和地区，10000+精选目的地，带您探索世界每一个角落",
    },
    {
      icon: Users,
      title: "社区互动",
      description: "连接全球旅行者，分享真实体验，获取第一手旅行资讯和建议",
    },
    {
      icon: Target,
      title: "精准匹配",
      description:
        "多维度筛选系统，从预算、时间、兴趣等角度为您找到完美的旅行目的地",
    },
  ];

  const stats = [
    { label: "注册用户", value: "500万+" },
    { label: "目的地", value: "10000+" },
    { label: "用户评价", value: "100万+" },
    { label: "合作伙伴", value: "5000+" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
          <Compass className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl text-gray-900 mb-6">
          关于 AI 旅行助手
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          我们致力于用人工智能技术重新定义旅行规划体验，让每一次旅行都成为完美的冒险
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 mb-20 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-6">我们的使命</h2>
          <p className="text-lg leading-relaxed opacity-90">
            通过先进的人工智能技术，为每一位旅行者提供个性化、智能化的旅行规划服务。
            我们相信，旅行不仅仅是到达目的地，更是发现自我、探索世界的过程。
            让技术成为连接梦想与现实的桥梁，让每一次出发都充满期待。
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mb-20">
        <h2 className="text-3xl text-gray-900 text-center mb-12">核心优势</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <h2 className="text-3xl text-gray-900 text-center mb-12">核心团队</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-lg text-center"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.avatar || ""}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl text-gray-900 mb-1">{member.name}</h3>
                <div className="text-blue-600 mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">
                  {member.description || ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl shadow-lg p-12">
        <h2 className="text-3xl text-gray-900 text-center mb-12">联系我们</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">邮箱</h3>
            <p className="text-gray-600">contact@ai-travel.com</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">电话</h3>
            <p className="text-gray-600">400-888-8888</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-gray-900 mb-2">地址</h3>
            <p className="text-gray-600">北京市朝阳区 AI 科技园</p>
          </div>
        </div>
      </div>
    </div>
  );
}
