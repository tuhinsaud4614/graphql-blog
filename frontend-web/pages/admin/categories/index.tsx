import classNames from "classnames";
import { BiExpandVertical, BiPencil, BiSearch, BiTrash } from "react-icons/bi";

import { Button, CheckInput } from "@component";
import STYLES from "@styles";
import { AdminLayout } from "components/Layout";
import { FormControl } from "components/account";
import { AdminCreateCategory } from "components/admin-categories";

const className = {
  table:
    "relative [&_th]:text-neutral dark:[&_th]:text-neutral-dark [&_td]:text-neutral dark:[&_td]:text-neutral-dark table text-left [&_th:first-child]:sticky [&_th:first-child]:left-0 [&_th:first-child]:z-10 [&_td]:whitespace-nowrap [&_td]:p-4 [&_td]:align-middle [&_tfoot_td]:bg-base-200 [&_tfoot_td]:text-sm [&_tfoot_td]:font-bold [&_tfoot_td]:uppercase dark:[&_tfoot_td]:bg-base-dark-200 [&_tfoot_th]:bg-base-200 [&_tfoot_th]:text-sm [&_tfoot_th]:font-bold [&_tfoot_th]:uppercase dark:[&_tfoot_th]:bg-base-dark-200 [&_th]:whitespace-nowrap [&_th]:p-4 [&_th]:align-middle [&_thead_td]:bg-base-200 [&_thead_td]:text-sm [&_thead_td]:font-bold [&_thead_td]:uppercase dark:[&_thead_td]:bg-base-dark-200 [&_thead_th]:bg-base-200 [&_thead_th]:text-sm [&_thead_th]:font-bold [&_thead_th]:uppercase dark:[&_thead_th]:bg-base-dark-200",
  tBody:
    "[&_td]:bg-base-100 dark:[&_td]:bg-base-dark-100 [&_th]:bg-base-100 dark:[&_th]:bg-base-dark-100 [&_tr:not(:last-child)_th]:border-b [&_tr:not(:last-child)_th]:border-base-200 dark:[&_tr:not(:last-child)_th]:border-base-dark-200 [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-base-200 dark:[&_tr:not(:last-child)_td]:border-base-dark-200",
};

export default function Categories() {
  return (
    <AdminLayout>
      <h1 className="mb-4 text-xl font-bold text-neutral dark:text-neutral-dark">
        Categories
      </h1>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <FormControl
            leftIcon={<BiSearch className="shrink-0 [&_path]:stroke-current" />}
            classes={{ box: "gap-2" }}
            className="!text-left"
            placeholder="Search Categories..."
          />
        </div>
        <AdminCreateCategory />
      </div>
      <div className="overflow-x-auto rounded-2xl bg-base-100 shadow-mui dark:bg-base-dark-200">
        <table className={classNames(className.table, "w-full")}>
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <CheckInput classes={{ label: "!p-0" }} />
                </label>
              </th>
              <th>
                <Button mode="text" className="-ml-4 gap-2">
                  ID
                  <BiExpandVertical />
                </Button>
              </th>
              <th>
                <Button mode="text" className="-ml-4 gap-2">
                  Name <BiExpandVertical />
                </Button>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={classNames(className.tBody)}>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <th>
                  <CheckInput classes={{ label: "!p-0" }} />
                </th>
                <td>{index + 1}</td>
                <td>Purple</td>
                <th className="flex items-center gap-2">
                  <Button variant="warning" className={STYLES.btn.circle}>
                    <BiPencil />
                  </Button>
                  <Button variant="error" className={STYLES.btn.circle}>
                    <BiTrash />
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
