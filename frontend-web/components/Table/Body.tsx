import { flexRender, type RowModel } from "@tanstack/react-table";

interface Props<TData extends {}> {
  rowModel: RowModel<TData>;
}

export default function TBody<TData extends {}>({ rowModel }: Props<TData>) {
  return (
    <tbody className="[&_td]:bg-base-100 dark:[&_td]:bg-base-dark-100 [&_th]:bg-base-100 dark:[&_th]:bg-base-dark-100 [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-base-200 dark:[&_tr:not(:last-child)_td]:border-base-dark-200 [&_tr:not(:last-child)_th]:border-b [&_tr:not(:last-child)_th]:border-base-200 dark:[&_tr:not(:last-child)_th]:border-base-dark-200">
      {rowModel.rows.map((row, i) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell, index) => {
              if (index === 0) {
                return (
                  <th key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </th>
                );
              }
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
