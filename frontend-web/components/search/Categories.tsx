import { NotFoundMessage, TabBox, Tag } from "components";
import { BiChevronDown } from "react-icons/bi";

const className = {
  items: "flex flex-wrap space-x-3 space-y-3 -ml-3",
  item: "!rounded-full first:ml-3 first:mt-3 !border-none bg-accent !text-base-100 hover:bg-accent-focus hover:!text-base-200",
  more: "flex items-center justify-center w-full bg-base-top",
  moreBtn:
    "flex items-center justify-center px-3 py-1 text-accent hover:text-accent-focus active:scale-95",
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
        <Tag
          className={className.item}
          key={index}
          href={`/posts/categories/${index + 1}`}
        >
          category - {index + 1}
        </Tag>
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
