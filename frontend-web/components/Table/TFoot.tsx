import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export default function TFoot({ children }: Props) {
  return (
    <tfoot>
      <tr>
        <td colSpan={4}>
          <div className="flex items-center justify-end gap-3">{children}</div>
        </td>
      </tr>
    </tfoot>
  );
}
