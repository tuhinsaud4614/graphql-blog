import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";

import { LinkButton } from "@component";
import { ROUTES } from "@constants";
import { AdminLayout } from "components/Layout";
import { PostCreateContainer, PostCreateHeader } from "components/account";
import { SpaceIcon } from "components/svg";

const className = {
  root: "flex flex-col sm:flex-row sm:space-x-2",
  left: "flex-1 hidden sm:block",
  right: "flex-1",
  title: "text-8xl text-neutral dark:text-neutral-dark uppercase mb-4",
  subtitle: "text-3xl font-bold text-neutral dark:text-neutral-dark mb-2",
  text: "text-neutral dark:text-neutral-dark mb-4",
};

const PageNotFound: NextPage = () => {
  const router = useRouter();

  const isAdmin = router.asPath.startsWith("/admin");

  const content = (
    <div className={className.root}>
      <div className={className.left}>
        <SpaceIcon />
      </div>
      <div className={className.right}>
        <h1 className={className.title}>404</h1>
        <h2 className={className.subtitle}>{"UH OH! You're lost."}</h2>
        <p className={className.text}>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the{" "}
          {isAdmin ? "dashboard" : "homepage"}.
        </p>
        <LinkButton
          href={isAdmin ? ROUTES.admin.dashboard : ROUTES.myHome}
          anchorProps={{
            "aria-label": isAdmin ? "Got to Dashboard" : "Go to Home",
          }}
          variant="secondary"
          className="flex w-fit justify-center text-xl uppercase"
          passHref
        >
          {isAdmin ? "Dashboard" : "Home"}
        </LinkButton>
      </div>
    </div>
  );

  if (isAdmin) {
    return <AdminLayout>{content}</AdminLayout>;
  }

  return (
    <Fragment>
      <PostCreateHeader />
      <PostCreateContainer>{content}</PostCreateContainer>
    </Fragment>
  );
};

export default PageNotFound;
