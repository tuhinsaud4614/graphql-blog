import { PostItem, TabBox } from "components";

const className = {
  item: "border-b last:border-none py-5 last:pb-0",
  notFoundRoot: "py-[1.875rem] flex flex-col items-center",
  notFoundTitle: "text-neutral text-sm font-normal text-center mb-6",
};

const isTrue = false;

export default function HomeTab() {
  return (
    <TabBox
      notFound={
        isTrue && (
          <div className={className.notFoundRoot}>
            <p className={className.notFoundTitle}>
              You haven&rsquo;t published any posts yet
            </p>
          </div>
        )
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <PostItem key={index} classes={{ root: className.item }} />
      ))}
    </TabBox>
  );
}
