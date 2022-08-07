import { Button, LinkButton } from "@component";
import { PostCreateContainer, PostCreateHeader } from "components/account";
import { LoaderIcon } from "components/svg";
import {
  useResendActivationLinkMutation,
  useUserVerificationMutation,
} from "graphql/generated/schema";
import _ from "lodash";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { BiError } from "react-icons/bi";
import { toast } from "react-toastify";
import { gplErrorHandler } from "utils";
import { ROUTES } from "utils/constants";

const className = {
  container: "flex flex-col items-center justify-center min-h-[40vh]",
  items: "list-item flex-col m-0 space-y-2",
  item: "text-error dark:text-error-dark text-lg",
  text: "text-warning dark:text-warning-dark text-lg font-medium",
};

const CreatePost: NextPage = () => {
  const { query, replace } = useRouter();
  const [verifyUser, { loading, data, error }] = useUserVerificationMutation({
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    (async () => {
      if (
        "userId" in query &&
        "code" in query &&
        typeof query.userId === "string" &&
        typeof query.code === "string"
      ) {
        await verifyUser({
          variables: { code: query.code, userId: query.userId },
        });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!loading && data && query && data.verifyUser === query["userId"]) {
      replace(ROUTES.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, query]);

  const errors = gplErrorHandler(error);

  if (_.isEmpty(query)) {
    return (
      <div className={className.container}>
        <LoaderIcon />
      </div>
    );
  }

  if (!loading && errors) {
    const errors = gplErrorHandler(error);
    return (
      <Wrapper>
        <div className={className.container}>
          <BiError size={50} className="mb-4 text-error dark:text-error-dark" />
          {Array.isArray(errors) ? (
            <ul className={className.items}>
              {errors.map((er) => (
                <li key={er} className={className.item}>
                  {er}
                </li>
              ))}
            </ul>
          ) : (
            <Fragment>
              <p className={className.item}>{errors}!</p>
              <div className="flex items-center justify-center space-x-3 mt-4">
                <LinkButton
                  href={ROUTES.home}
                  replace
                  variant="warning"
                  mode="outline"
                >
                  Go to home
                </LinkButton>
                {errors !== "User already verified" &&
                  "userId" in query &&
                  typeof query.userId === "string" && (
                    <ResendButton userId={query.userId} />
                  )}
              </div>
            </Fragment>
          )}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className={className.container}>
        <h3 className={className.text}>Verifying account</h3>
        <LoaderIcon />
      </div>
    </Wrapper>
  );
};

function ResendButton({ userId }: { userId: string }) {
  const { replace } = useRouter();
  const [resend, { error, loading, data }] = useResendActivationLinkMutation({
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data?.resendActivation) {
      toast.success(data?.resendActivation, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
      });
      replace(ROUTES.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Fragment>
      <Button
        type="button"
        aria-label="Resend verification link"
        variant="primary"
        onClick={async () => {
          await resend({ variables: { userId } });
        }}
        loading={loading}
        disabled={loading}
      >
        Resend verification link
      </Button>
    </Fragment>
  );
}

function Wrapper({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Head>
        <title>The RAT Diary | User Verification</title>
      </Head>
      <PostCreateHeader />
      <PostCreateContainer>{children}</PostCreateContainer>
    </Fragment>
  );
}

export default CreatePost;
