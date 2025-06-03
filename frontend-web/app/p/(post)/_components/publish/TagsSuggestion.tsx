"use client";

import * as React from "react";

import { Select } from "@/components";
import { useGetTagsByTextWithOffsetLazyQuery } from "@/graphql/generated/schema";

interface Props {
  tags: { name: string; value: string }[];
  setTags: (tags: { name: string; value: string }[]) => void;
}

export default function TagsSuggestion({ tags, setTags }: Readonly<Props>) {
  const id = React.useId();

  const [fetchTags] = useGetTagsByTextWithOffsetLazyQuery({
    notifyOnNetworkStatusChange: true,
  });
  return (
    <Select
      classes={{ root: "mb-4" }}
      id={id}
      name="tags"
      aria-label="Post tags"
      placeholder="Select tags..."
      values={tags}
      loadOptions={async (value) => {
        if (!value) return [];
        try {
          const { data } = await fetchTags({
            variables: { text: value || "" },
          });
          if (data) {
            return data.tagsByTextWithOffset.results.map((tag) => ({
              name: tag.title,
              value: tag.id,
            })) as { name: string; value: string }[];
          }
          return [];
        } catch {
          return [];
        }
      }}
      onChangeValues={(val) => setTags(val)}
      required
    />
  );
}
