import classNames from "classnames";

const className = {
  root: "flex",
  left: "flex flex-col min-w-0 flex-auto pr-5",
  top: "flex items-center",
  common: "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20",
  avatar: "w-5 h-5 rounded-full",
  img: "w-32 h-32 block",
  bar1: "h-4 w-[40%] ml-4",
  bar2: "h-5 w-[80%] mt-4",
};

export default function PostItemSkeleton() {
  return (
    <li className={className.root}>
      <section className={className.left}>
        <div className={className.top}>
          <span className={classNames(className.avatar, className.common)} />
          <span className={classNames(className.bar1, className.common)} />
        </div>
        <div className={classNames(className.bar2, className.common)} />
        <div className={classNames(className.bar2, className.common)} />
      </section>
      <div className={classNames(className.img, className.common)} />
    </li>
  );
}
