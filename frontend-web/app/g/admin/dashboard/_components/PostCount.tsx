import { FileText } from "lucide-react";

import AdminDashboardCard from "./Card";

export default function AdminDashboardPostCount() {
  return (
    <AdminDashboardCard
      icon={<FileText className="h-8 w-8 text-primary" />}
      title="Posts"
      value={100}
    />
  );
}
