import { Home, CopyPlus, Search, UserIcon, LibraryBig } from "lucide-react";

export const menuItemsData = [
  { to: "/dashboard", label: "Home", Icon: Home },
  { to: "/dashboard/post", label: "Ask Question", Icon: CopyPlus },
  { to: "/dashboard/questions", label: "My Questions", Icon: LibraryBig },
  { to: "/dashboard/discover", label: "Discover", Icon: Search },
  { to: "/dashboard/profile", label: "Profile", Icon: UserIcon },
];
