import { AdminLayout } from "components/Layout";
import { AdminCreateCategory } from "components/admin-categories";

export default function Categories() {
  return (
    <AdminLayout>
      <h1 className="mb-4 text-xl font-bold text-neutral dark:text-neutral-dark">
        Categories
      </h1>
      <div className="mb-4 flex flex-wrap items-center justify-between">
        Search
        <AdminCreateCategory />
      </div>
      <div className="rounded-2xl bg-base-100 shadow-mui dark:bg-base-dark-200">
        new
      </div>
    </AdminLayout>
  );
}
