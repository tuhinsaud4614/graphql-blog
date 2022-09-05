import { LinkButton } from "@component";
import { ROUTES } from "@constants";
import { PostCreateContainer, PostCreateHeader } from "components/account";
import { SpaceIcon } from "components/svg";
import { NextPage } from "next";
import { Fragment } from "react";

const className = {
  root: "flex flex-col sm:flex-row sm:space-x-2",
  left: "flex-1 hidden sm:block",
  right: "flex-1",
  title: "text-8xl text-neutral dark:text-neutral-dark uppercase mb-4",
  subtitle: "text-3xl font-bold text-neutral dark:text-neutral-dark mb-2",
  text: "text-neutral dark:text-neutral-dark mb-4",
};

const PageNotFound: NextPage = () => {
  return (
    <Fragment>
      <PostCreateHeader />
      <PostCreateContainer>
        <div className={className.root}>
          <div className={className.left}>
            <SpaceIcon />
          </div>
          <div className={className.right}>
            <h1 className={className.title}>404</h1>
            <h2 className={className.subtitle}>{"UH OH! You're lost."}</h2>
            <p className={className.text}>
              The page you are looking for does not exist. How you got here is a
              mystery. But you can click the button below to go back to the
              homepage.
            </p>
            <LinkButton
              href={ROUTES.myHome}
              variant="secondary"
              className="w-32 text-xl flex justify-center uppercase"
              passHref
            >
              Home
            </LinkButton>
          </div>
        </div>
      </PostCreateContainer>
    </Fragment>
  );
};

export default PageNotFound;
