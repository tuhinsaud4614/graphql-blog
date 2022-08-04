import { FollowItem } from "components";

const className = {
  root: "mt-6",
  title: "font-medium text-neutral dark:text-neutral-dark",
  items: "list-none my-6 flex flex-col space-y-3",
};

export default function Suggestions() {
  return (
    <div className={className.root}>
      <h2 className={className.title}>Who to follow</h2>
      <ul className={className.items}>
        {Array.from({ length: 5 }).map((_, index) => (
          <FollowItem key={index} />
        ))}
      </ul>
    </div>
  );
}
