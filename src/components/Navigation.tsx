import { Compass, Heart, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Navigation() {
  const navItems = [
    { to: "/explore", label: "探索" },
    { to: "/guides", label: "攻略" },
    { to: "/community", label: "社区" },
    { to: "/about", label: "关于" },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-gray-900">AI 旅行助手</span>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `p-2 rounded-lg transition-colors ${
                  isActive ? "bg-blue-50" : "hover:bg-gray-100"
                }`
              }
            >
              <Heart
                className={`w-5 h-5 ${
                  location.pathname === "/favorites"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              />
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `p-2 rounded-lg transition-colors ${
                  isActive ? "bg-blue-50" : "hover:bg-gray-100"
                }`
              }
            >
              <Settings
                className={`w-5 h-5 ${
                  location.pathname === "/settings"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              />
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `p-2 rounded-lg transition-colors ${
                  isActive ? "bg-blue-50" : "hover:bg-gray-100"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-5 h-5 ${
                  location.pathname === "/profile"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
