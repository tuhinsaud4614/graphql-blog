import { AuthGuard, LinkButton } from "@component";
import { PostCreateContainer, PostCreateHeader } from "components/account";
import { LoaderIcon } from "components/svg";
import {
  UserRole,
  useVerifyResetPasswordMutation,
} from "graphql/generated/schema";
import _ from "lodash";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { BiError } from "react-icons/bi";
import { gplErrorHandler } from "utils";
import { ROUTES } from "utils/constants";

const className = {
  container: "flex flex-col items-center justify-center min-h-[40vh]",
  items: "list-item flex-col m-0 space-y-2",
  item: "text-error dark:text-error-dark text-lg",
  text: "text-warning dark:text-warning-dark text-lg font-medium",
};

const VerifyResetPassword: NextPage = () => {
  const { query, replace } = useRouter();
  const [verifyResetPassword, { loading, data, error }] =
    useVerifyResetPasswordMutation({
      errorPolicy: "all",
      fetchPolicy: "network-only",
    });

  useEffect(() => {
    (async () => {
      if ("code" in query && typeof query.code === "string") {
        await verifyResetPassword({
          variables: { code: query.code },
        });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (!loading && data && query && data.verifyResetPassword) {
      replace(ROUTES.accountSettings);
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
                  href={ROUTES.accountSettings}
                  replace
                  variant="warning"
                  mode="outline"
                >
                  Go to settings
                </LinkButton>
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
        <h3 className={className.text}>Verifying Reset Password</h3>
        <LoaderIcon />
      </div>
    </Wrapper>
  );
};

function Wrapper({ children }: PropsWithChildren) {
  return (
    <AuthGuard role={UserRole.Author}>
      <Head>
        <title>The RAT Diary | Reset Password Verification</title>
      </Head>
      <PostCreateHeader />
      <PostCreateContainer>{children}</PostCreateContainer>
    </AuthGuard>
  );
}

export default VerifyResetPassword;
