const className = {
  root: "flex",
  left: "flex flex-col min-w-0 flex-auto pr-5",
  top: "flex items-center",
  avatar: "w-5 h-5 animate-pulse bg-neutral/20 rounded-full",
  img: "w-32 h-32 animate-pulse bg-neutral/20 block",
  bar1: "h-4 w-[40%] animate-pulse bg-neutral/20 ml-4",
  bar2: "h-5 w-[80%] mt-4 animate-pulse bg-neutral/20",
};

export default function PostItemSkeleton() {
  return (
    <li className={className.root}>
      <section className={className.left}>
        <div className={className.top}>
          <span className={className.avatar} />
          <span className={className.bar1} />
        </div>
        <div className={className.bar2} />
        <div className={className.bar2} />
      </section>
      <div className={className.img} />
    </li>
  );
}
