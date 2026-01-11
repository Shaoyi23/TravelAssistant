import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI 驱动的智能旅行规划</span>
          </div>

          <h1 className="text-4xl md:text-6xl mb-6">探索世界，从这里开始</h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            让 AI
            为您量身定制完美的旅行计划，发现最适合您的目的地，创造难忘的回忆
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
              开始规划
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/30">
              了解更多
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl"></div>
    </div>
  );
}
