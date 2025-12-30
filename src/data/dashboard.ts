import { CubeIcon, HomeIcon, PlusIcon } from "@heroicons/react/24/outline";

export const DashboardTabs = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: HomeIcon,
  },
  {
    label: "Products",
    link: "/dashboard/my-products",
    icon: CubeIcon,
  },
  {
    label: "Add Product",
    link: "/dashboard/new",
    icon: PlusIcon,
  },
];
