import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [travelers, setTravelers] = useState('2 位成人');

  const handleSearch = () => {
    onSearch(destination);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 -mt-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">目的地</label>
            <input
              type="text"
              placeholder="你想去哪里？"
              className="bg-transparent border-none outline-none text-gray-900 w-full placeholder:text-gray-400"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">出行日期</label>
            <input
              type="text"
              placeholder="选择日期"
              className="bg-transparent border-none outline-none text-gray-900 w-full placeholder:text-gray-400"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">旅行人数</label>
            <select
              className="bg-transparent border-none outline-none text-gray-900 w-full cursor-pointer"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
            >
              <option>1 位成人</option>
              <option>2 位成人</option>
              <option>3-4 位成人</option>
              <option>5+ 位成人</option>
              <option>家庭出行</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl p-4"
        >
          <Search className="w-5 h-5" />
          <span>搜索</span>
        </button>
      </div>
    </div>
  );
}
