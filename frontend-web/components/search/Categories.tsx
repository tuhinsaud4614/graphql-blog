import { BiChevronDown } from "react-icons/bi";

import { LinkButton, NotFoundMessage, TabBox } from "@/components";
import { ROUTES } from "@/utils/constants";

const className = {
  items: "flex flex-wrap space-x-3 space-y-3 -ml-3",
  item: "first:ml-3 first:mt-3",
  more: "flex items-center justify-center w-full bg-base-top dark:bg-base-dark-top",
  moreBtn:
    "flex items-center justify-center px-3 py-1 text-accent dark:text-accent-dark hover:text-accent-focus dark:hover:text-accent active:scale-95",
};

let isTrue = false;

interface Props {
  link: string;
  linkText: string;
}

export default function Categories({ link, linkText }: Props) {
  return (
    <TabBox
      notFound={
        isTrue && (
          <NotFoundMessage
            title="Categories for the search will appear here."
            goto={link}
            gotoText={linkText}
          />
        )
      }
      classes={{ items: className.items }}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <li key={index} className={className.item}>
          <LinkButton
            className="block"
            href={ROUTES.postsByCategory((index + 1).toString())}
            passHref
          >
            category - {index + 1}
          </LinkButton>
        </li>
      ))}
      <li className={className.more}>
        <button
          type="button"
          aria-label="Show more"
          className={className.moreBtn}
        >
          Show more
          <BiChevronDown size={24} />
        </button>
      </li>
    </TabBox>
  );
}
