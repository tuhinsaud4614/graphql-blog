import AdminDashboardCategoryCount from "./CategoryCount";
import AdminDashboardPostCount from "./PostCount";
import AdminDashboardTagCount from "./TagCount";
import AdminDashboardUserCount from "./UserCount";

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
