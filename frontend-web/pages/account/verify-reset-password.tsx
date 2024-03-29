import * as React from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import _isEmpty from "lodash/isEmpty";
import { BiError } from "react-icons/bi";

import { AuthGuard, LinkButton } from "@/components";
import { PostCreateContainer, PostCreateHeader } from "@/components/account";
import { LoaderIcon } from "@/components/svg";
import {
  UserRole,
  useVerifyResetPasswordMutation,
} from "@/graphql/generated/schema";
import { gplErrorHandler, isDev } from "@/utils";
import { ROUTES } from "@/utils/constants";
import { withSSRAuth } from "@/utils/ssr";

const className = {
  container: "flex flex-col items-center justify-center min-h-[40vh]",
  items: "list-item flex-col m-0 space-y-2",
  item: "text-error dark:text-error-dark text-lg",
  text: "text-warning dark:text-warning-dark text-lg font-medium",
};

interface Props {
  query: { [key: string]: any };
}

const VerifyResetPassword: NextPage<Props> = ({ query }) => {
  const effectRan = React.useRef(false);
  const { replace } = useRouter();
  const [verifyResetPassword, { error, loading, data }] =
    useVerifyResetPasswordMutation({
      fetchPolicy: "network-only",
    });

  const code = "code" in query ? query.code : "";

  React.useEffect(() => {
    if ((effectRan.current || !isDev()) && code) {
      const handler = async () => {
        try {
          const { data } = await verifyResetPassword({
            variables: { code: code },
          });
          if (data?.verifyResetPassword) {
            replace(ROUTES.accountSettings);
          }
        } catch (error) {}
      };
      handler();
    }

    return () => {
      effectRan.current = true;
    };
  }, [code, replace, verifyResetPassword]);

  const errors = gplErrorHandler(error);

  if (_isEmpty(query)) {
    return (
      <div className={className.container}>
        <LoaderIcon />
      </div>
    );
  }

  if (errors) {
    return (
      <Wrapper>
        <div className={className.container}>
          <BiError size={50} className="mb-4 text-error dark:text-error-dark" />
          <ul className={className.items}>
            {Array.isArray(errors) ? (
              errors.map((er) => (
                <li key={er} className={className.item}>
                  {er}
                </li>
              ))
            ) : (
              <li className={className.item}>{errors}</li>
            )}
          </ul>

          <div className="mt-4 flex items-center justify-center space-x-3">
            <LinkButton
              href={ROUTES.accountSettings}
              replace
              variant="warning"
              mode="outline"
            >
              Go to settings
            </LinkButton>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (!loading && data?.verifyResetPassword) {
    return (
      <Wrapper>
        <div className={className.container}>
          <p className="text-success dark:text-success-dark">
            {data.verifyResetPassword}
          </p>
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

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <AuthGuard role={[UserRole.Admin, UserRole.Author]}>
      <Head>
        <title>The RAT Diary | Reset Password Verification</title>
      </Head>
      <PostCreateHeader />
      <PostCreateContainer>{children}</PostCreateContainer>
    </AuthGuard>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  ROUTES.accountSettings,
  async (_, { query }) => ({ props: { query } }),
);

export default VerifyResetPassword;
