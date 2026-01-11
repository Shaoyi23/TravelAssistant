import { useState, useEffect } from "react";
import { Hero } from "../components/Hero";
import { SearchBar } from "../components/SearchBar";
import { FilterSection } from "../components/FilterSection";
import { DestinationCard } from "../components/DestinationCard";
import {
  destinationsService,
  type Destination,
} from "../services/destinations";
import { DestinationDetailModal } from "../components/DestinationDetailModal";

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    tripType: "all",
    budget: "all",
    duration: "all",
  });
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await destinationsService.getAll();
      setDestinations(data);
    } catch (err) {
      console.error("Failed to fetch destinations:", err);
      setError("加载目的地数据失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

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

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600">加载中...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchDestinations}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              重试
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-2">AI 为您推荐</h2>
                <p className="text-gray-600">
                  基于您的偏好，我们精选了 {filteredDestinations.length}{" "}
                  个目的地
                </p>
              </div>
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">没有找到匹配的目的地</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onViewDetails={handleDestinationClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <DestinationDetailModal
        destination={selectedDestination}
        isOpen={isDetailModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
}
