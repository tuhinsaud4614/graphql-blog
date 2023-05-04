import React from "react";

import { flexRender, type HeaderGroup } from "@tanstack/react-table";

import TSort from "./Sort";

interface Props<TData extends {}> {
  headers: HeaderGroup<TData>[];
}

export default function THead<TData extends {}>({ headers }: Props<TData>) {
  return (
    <thead className="[&_td]:bg-base-200 [&_td]:text-sm [&_td]:font-bold [&_td]:uppercase dark:[&_td]:bg-base-dark-200 [&_th]:bg-base-200 [&_th]:text-sm [&_th]:font-bold [&_th]:uppercase dark:[&_th]:bg-base-dark-200">
      {headers.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id}>
              <TSort
                className="gap-2"
                mode="text"
                onClick={header.column.getToggleSortingHandler()}
                sorted={header.column.getIsSorted()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TSort>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
