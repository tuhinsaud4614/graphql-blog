import TrendingItem from "./Item";

const className = {
  root: "list-none m-0 flex flex-wrap",
};

export default function TrendingItems() {
  return (
    <ul className={className.root}>
      {Array.from({ length: 6 }).map((_, index) => (
        <TrendingItem key={index} index={index + 1} />
      ))}
    </ul>
  );
}
