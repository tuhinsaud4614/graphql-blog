import { Metadata } from "next";

import Title from "../_components/Title";
import AdminCategories from "./_components/Categories";

export const metadata: Metadata = {
  title: "The RAT Diary | Categories",
};

export default function AdminCategory() {
  return (
    <>
      <Title className="mb-4 text-primary selection:bg-primary selection:text-primary-foreground">
        Categories
      </Title>
      <AdminCategories />
    </>
  );
}
