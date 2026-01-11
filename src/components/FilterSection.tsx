import { SlidersHorizontal } from "lucide-react";

interface FilterSectionProps {
  selectedFilters: {
    tripType: string;
    budget: string;
    duration: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

export function FilterSection({
  selectedFilters,
  onFilterChange,
}: FilterSectionProps) {
  const tripTypes = [
    { value: "all", label: "全部类型" },
    { value: "beach", label: "海滩度假" },
    { value: "city", label: "城市探索" },
    { value: "nature", label: "自然风光" },
    { value: "adventure", label: "探险冒险" },
    { value: "cultural", label: "文化之旅" },
  ];

  const budgets = [
    { value: "all", label: "全部预算" },
    { value: "budget", label: "经济实惠" },
    { value: "moderate", label: "中等消费" },
    { value: "luxury", label: "豪华体验" },
  ];

  const durations = [
    { value: "all", label: "全部时长" },
    { value: "short", label: "3-5 天" },
    { value: "medium", label: "6-9 天" },
    { value: "long", label: "10+ 天" },
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
        <h3 className="text-gray-900">筛选条件</h3>
      </div>

      <div className="space-y-4">
        {/* Trip Type */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">旅行类型</label>
          <div className="flex flex-wrap gap-2">
            {tripTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => onFilterChange("tripType", type.value)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedFilters.tripType === type.value
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">预算范围</label>
          <div className="flex flex-wrap gap-2">
            {budgets.map((budget) => (
              <button
                key={budget.value}
                onClick={() => onFilterChange("budget", budget.value)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedFilters.budget === budget.value
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {budget.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-sm text-gray-600 mb-2 block">行程时长</label>
          <div className="flex flex-wrap gap-2">
            {durations.map((duration) => (
              <button
                key={duration.value}
                onClick={() => onFilterChange("duration", duration.value)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedFilters.duration === duration.value
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {duration.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
