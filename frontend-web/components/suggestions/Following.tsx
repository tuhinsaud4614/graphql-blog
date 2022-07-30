import { FollowItem, LinkTextButton } from "components";
import { Fragment } from "react";
import { ROUTES } from "utils/constants";

const className = {
  root: "mt-6",
  title: "font-medium text-neutral dark:text-neutral-dark",
  items: "list-none my-6 flex flex-col space-y-3",
  notFound: "flex flex-col justify-center items-center",
  notFoundTitle: "font-medium text-neutral dark:text-neutral-dark mt-8 mb-4",
  notFoundSubtitle:
    "text-neutral/60 dark:text-neutral-dark/60 text-sm text-center",
  notFoundLink: "mt-6 text-sm",
};

const count = 2;
const isTrue = true;

export default function Following() {
  return (
    <div className={className.root}>
      {isTrue ? (
        <Fragment>
          <h2>{`2 Author${count > 1 ? "s" : ""}`}</h2>
          <ul className={className.items}>
            {Array.from({ length: 5 }).map((_, index) => (
              <FollowItem key={index} />
            ))}
          </ul>
        </Fragment>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
function NotFound() {
  return (
    <div className={className.notFound}>
      <h2 className={className.notFoundTitle}>
        You haven’t followed anything yet
      </h2>
      <p className={className.notFoundSubtitle}>
        Writers, publications, and topics you follow will appear here. The
        things you follow will influence what you see in your feed and daily
        email digests.
      </p>
      <LinkTextButton
        href={ROUTES.mySuggestions}
        aria-label="See suggestions"
        className={className.notFoundLink}
      >
        See suggestions
      </LinkTextButton>
    </div>
  );
}
