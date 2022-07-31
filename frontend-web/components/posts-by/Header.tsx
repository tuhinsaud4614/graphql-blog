import { TagIcon } from "components/svg";
const className = {
  header: "flex items-center",
  tag: "w-7 h-7 bg-base-200 dark:bg-base-dark-200 flex items-center justify-center rounded-full",
  icon: "w-[1.3125rem] h-[1.3125rem] text-neutral dark:text-neutral-dark",
  title:
    "text-[1.375rem] sm:text-[2rem] line-clamp-1 text-ellipsis text-neutral dark:text-neutral-dark font-bold ml-2",
};

interface Props {
  title: string;
}
export default function Header({ title }: Props) {
  return (
    <div className={className.header}>
      <span className={className.tag}>
        <TagIcon className={className.icon} />
      </span>
      <h1 className={className.title}>{title}</h1>
    </div>
  );
}
