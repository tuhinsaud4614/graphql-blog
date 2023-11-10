import { Users } from "lucide-react";

import AdminDashboardCard from "./Card";

export default function AdminDashboardUserCount() {
  return (
    <AdminDashboardCard
      icon={<Users className="h-8 w-8 text-primary" />}
      title="Users"
      value={100}
    />
  );
}
