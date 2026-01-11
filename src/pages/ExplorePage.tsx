import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { FilterSection } from "../components/FilterSection";
import { DestinationCard } from "../components/DestinationCard";
import { Hero } from "../components/Hero";
import { DestinationDetailModal } from "../components/DestinationDetailModal";

// 定义 Destination 类型
interface Destination {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  tags: string[];
  rating: number;
  reviews: number;
  recommended: boolean;
}

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    tripType: "all",
    budget: "all",
    duration: "all",
  });

  // 弹窗状态管理
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const destinations: Destination[] = [
    {
      id: 1,
      name: "巴厘岛",
      location: "印度尼西亚",
      description:
        "体验热带天堂的魅力，享受私人海滩和豪华度假村，探索古老寺庙和稻田美景",
      image:
        "https://images.unsplash.com/photo-1714412192114-61dca8f15f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzY4MDA3NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "¥4,500",
      duration: "7天6晚",
      tags: ["海滩", "度假", "文化"],
      rating: 4.8,
      reviews: 1240,
      recommended: true,
    },
    {
      id: 2,
      name: "巴黎",
      location: "法国",
      description:
        "漫步在浪漫之都的街头，参观埃菲尔铁塔、卢浮宫，品尝正宗法式美食",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2Nzk4MzIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "¥8,800",
      duration: "10天9晚",
      tags: ["城市", "文化", "美食"],
      rating: 4.9,
      reviews: 2156,
      recommended: true,
    },
    {
      id: 3,
      name: "东京",
      location: "日本",
      description:
        "探索现代科技与传统文化完美融合的国际大都市，体验独特的日本风情",
      image:
        "https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjgwNDg2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "¥6,200",
      duration: "6天5晚",
      tags: ["城市", "购物", "美食"],
      rating: 4.7,
      reviews: 1890,
      recommended: false,
    },
    {
      id: 4,
      name: "瑞士阿尔卑斯",
      location: "瑞士",
      description:
        "在壮观的雪山景色中度假，体验滑雪、徒步等户外活动，享受纯净自然",
      image:
        "https://images.unsplash.com/photo-1597434429739-2574d7e06807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMG5hdHVyZXxlbnwxfHx8fDE3Njc5ODgxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "¥12,000",
      duration: "8天7晚",
      tags: ["自然", "冒险", "滑雪"],
      rating: 4.9,
      reviews: 987,
      recommended: false,
    },
    {
      id: 5,
      name: "圣托里尼",
      location: "希腊",
      description: "欣赏爱琴海的绝美日落，漫步白色小镇，享受浪漫的地中海风情",
      image:
        "https://images.unsplash.com/photo-1664112732671-877dc0030ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBpc2xhbmR8ZW58MXx8fHwxNzY4MDQ4NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "¥7,600",
      duration: "7天6晚",
      tags: ["海岛", "浪漫", "摄影"],
      rating: 4.8,
      reviews: 1567,
      recommended: true,
    },
    {
      id: 6,
      name: "纽约",
      location: "美国",
      description:
        "体验不夜城的繁华魅力，参观自由女神像、时代广场、中央公园等地标",
      image:
        "https://images.unsplash.com/photo-1570304816841-906a17d7b067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwc2t5bGluZXxlbnwxfHx8fDE3Njc5Mzk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "¥9,500",
      duration: "9天8晚",
      tags: ["城市", "购物", "艺术"],
      rating: 4.6,
      reviews: 2341,
      recommended: false,
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      searchQuery === "" ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsDetailModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar onSearch={handleSearch} />
        <FilterSection
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Results Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900 mb-2">AI 为您推荐</h2>
              <p className="text-gray-600">
                基于您的偏好，我们精选了 {filteredDestinations.length} 个目的地
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onViewDetails={handleDestinationClick}
              />
            ))}
          </div>
        </div>
      </div>

      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={isDetailModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
