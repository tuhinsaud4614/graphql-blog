"use client";

import * as React from "react";

import { Select } from "@/components";
import { useGetCategoriesByTextWithOffsetLazyQuery } from "@/graphql/generated/schema";

interface Props {
  categories: { name: string; value: string }[];
  setCategories: (categories: { name: string; value: string }[]) => void;
}

export default function CategoriesSuggestion({
  categories,
  setCategories,
}: Readonly<Props>) {
  const id = React.useId();

  const [fetchCategories] = useGetCategoriesByTextWithOffsetLazyQuery({
    notifyOnNetworkStatusChange: true,
  });
  return (
    <Select
      classes={{ root: "mb-4" }}
      id={id}
      name="categories"
      aria-label="Post categories"
      placeholder="Select categories..."
      values={categories}
      loadOptions={async (value) => {
        if (!value) return [];
        try {
          const { data } = await fetchCategories({
            variables: { text: value || "" },
          });
          if (data) {
            return data.categoriesByTextWithOffset.data.map((category) => ({
              name: category.title,
              value: category.id,
            }));
          }
          return [];
        } catch {
          return [];
        }
      }}
      onChangeValues={(val) => setCategories(val)}
      required
    />
  );
}
