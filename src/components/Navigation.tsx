import { Compass, User, Heart, Settings } from "lucide-react";

export function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900">AI 旅行助手</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              探索
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              攻略
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              社区
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              关于
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
