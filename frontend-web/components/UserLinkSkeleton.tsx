import classNames from "classnames";

const className = {
  root: "flex items-center",
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  img: "rounded-full w-5 h-5",
  text: "ml-2 w-1/2 h-5",
};

export default function UserLinkSkeleton() {
  return (
    <div className={className.root}>
      <span className={classNames(className.common, className.img)} />
      <span className={classNames(className.common, className.text)} />
    </div>
  );
}
