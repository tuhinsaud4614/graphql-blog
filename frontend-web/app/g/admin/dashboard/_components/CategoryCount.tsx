import CategoryIcon from "@/components/svg/Category";

import AdminDashboardCard from "./Card";

export default function AdminDashboardCategoryCount() {
  return (
    <AdminDashboardCard
      icon={<CategoryIcon className="h-8 w-8 text-primary" />}
      title="Categories"
      value={100}
    />
  );
}
