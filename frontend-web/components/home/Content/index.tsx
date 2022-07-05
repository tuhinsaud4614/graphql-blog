import PostItem from "./Item";
import PostItemSkeleton from "./ItemSkeleton";
import Sidebar from "./Sidebar";

const className = {
  root: "flex flex-col md1:flex-row-reverse sm:mx-auto max-w-5xl pt-0 md1:pt-10",
  items:
    "md1:basis-full px-4 list-none m-0 pt-10 md1:pt-3 pb-3 flex flex-col space-y-12",
};

export default function Content() {
  return (
    <section className={className.root}>
      <Sidebar />
      <ul className={className.items}>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostItem key={index} />
        ))}
        <PostItemSkeleton />
        <PostItemSkeleton />
      </ul>
    </section>
  );
}
