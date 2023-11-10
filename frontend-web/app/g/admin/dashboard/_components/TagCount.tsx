import { Tag } from "lucide-react";

import AdminDashboardCard from "./Card";

export default function AdminDashboardTagCount() {
  return (
    <AdminDashboardCard
      icon={<Tag className="h-8 w-8 text-primary" />}
      title="Tags"
      value={100}
    />
  );
}
