import dynamic from "next/dynamic";

import AdminDashboardCardSkeleton from "./CardSkeleton";

const AdminDashboardCategoryCount = dynamic(() => import("./CategoryCount"), {
  ssr: false,
  loading: () => <AdminDashboardCardSkeleton />,
});
const AdminDashboardPostCount = dynamic(() => import("./PostCount"), {
  ssr: false,
  loading: () => <AdminDashboardCardSkeleton />,
});
const AdminDashboardTagCount = dynamic(() => import("./TagCount"), {
  ssr: false,
  loading: () => <AdminDashboardCardSkeleton />,
});

const AdminDashboardUserCount = dynamic(() => import("./UserCount"), {
  ssr: false,
  loading: () => <AdminDashboardCardSkeleton />,
});

export default function AdminDashboardCardGroups() {
  return (
    <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2 lg:grid-cols-4">
      <AdminDashboardCategoryCount />
      <AdminDashboardTagCount />
      <AdminDashboardUserCount />
      <AdminDashboardPostCount />
    </div>
  );
}
