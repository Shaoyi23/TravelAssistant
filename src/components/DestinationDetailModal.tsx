import React from "react";
import {
  X,
  MapPin,
  Calendar,
  Star,
  Heart,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

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
  recommended?: boolean;
}

interface DestinationDetailModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DestinationDetailModal({
  destination,
  isOpen,
  onClose,
}: DestinationDetailModalProps) {
  // 阻止背景滚动
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC 键关闭
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !destination) return null;

  // 扩展的详情数据（实际项目中应该从 API 获取）
  const detailData = {
    highlights: [
      "专业中文导游全程陪同",
      "豪华酒店住宿，含早餐",
      "包含所有景点门票",
      "24小时客服支持",
      "免费接送机服务",
    ],
    itinerary: [
      {
        day: 1,
        title: "抵达 & 市区观光",
        description: "接机后前往酒店休息，下午市区自由活动",
      },
      {
        day: 2,
        title: "经典景点游览",
        description: "参观主要景点，体验当地文化",
      },
      {
        day: 3,
        title: "自然风光探索",
        description: "前往自然景区，享受户外活动",
      },
      {
        day: 4,
        title: "美食 & 购物",
        description: "品尝当地特色美食，购物街自由行",
      },
    ],
    notes: [
      "请提前办理签证，建议至少提前30天申请",
      "建议购买旅行保险",
      "请携带防晒用品和舒适的鞋子",
      "部分景点需要提前预约",
    ],
    reviews: [
      {
        user: "旅行达人小王",
        rating: 5,
        comment: "行程安排很合理，导游非常专业，酒店也很棒！",
        date: "2026-01-05",
      },
      {
        user: "摄影爱好者",
        rating: 5,
        comment: "风景太美了，拍了很多好照片，强烈推荐！",
        date: "2026-01-03",
      },
      {
        user: "家庭出游",
        rating: 4,
        comment: "整体很满意，适合带小孩，就是购物时间有点紧张。",
        date: "2025-12-28",
      },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* 弹窗容器 */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - 固定在顶部 */}
        <div className="relative">
          {/* 大图 */}
          <div className="relative h-72 rounded-t-2xl overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            {/* 推荐标签 */}
            {destination.recommended && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">AI 推荐</span>
              </div>
            )}

            {/* 标题信息 */}
            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-3xl text-white mb-2">{destination.name}</h2>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{destination.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content - 可滚动区域 */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {/* 价格和信息卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
              <div className="text-sm text-gray-600 mb-1">起价</div>
              <div className="text-2xl text-gray-900">{destination.price}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="text-sm text-gray-600 mb-1">行程时长</div>
              <div className="text-2xl text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                {destination.duration}
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-100">
              <div className="text-sm text-gray-600 mb-1">用户评分</div>
              <div className="text-2xl text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                {destination.rating} ({destination.reviews})
              </div>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {destination.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 描述 */}
          <div className="mb-8">
            <h3 className="text-xl text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              行程介绍
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* 特色亮点 */}
          <div className="mb-8">
            <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              特色亮点
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {detailData.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 行程安排 */}
          <div className="mb-8">
            <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              行程安排
            </h3>
            <div className="space-y-4">
              {detailData.itinerary.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    Day {item.day}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 注意事项 */}
          <div className="mb-8">
            <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              注意事项
            </h3>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="space-y-2">
                {detailData.notes.map((note, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 用户评价 */}
          <div className="mb-6">
            <h3 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              用户评价
            </h3>
            <div className="space-y-4">
              {detailData.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                        {review.user[0]}
                      </div>
                      <div>
                        <div className="text-gray-900">{review.user}</div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 text-yellow-500 fill-yellow-500"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - 固定在底部 */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-3">
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors"
              >
                稍后再看
              </button>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                立即预订
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
