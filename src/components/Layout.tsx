import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navigation />
      <Outlet />
    </div>
  );
}
