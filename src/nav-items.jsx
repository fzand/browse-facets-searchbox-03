import { HomeIcon, SearchIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import SearchPage from "./pages/SearchPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Search",
    to: "/search",
    icon: <SearchIcon className="h-4 w-4" />,
    page: <SearchPage />,
  },
];
