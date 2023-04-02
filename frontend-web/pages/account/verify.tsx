import { Button, LinkButton } from "@component";
import { ROUTES } from "@constants";
import { PostCreateContainer, PostCreateHeader } from "components/account";
import { LoaderIcon } from "components/svg";
import { getCookie } from "cookies-next";
import {
  useResendActivationLinkMutation,
  useUserVerificationMutation,
} from "graphql/generated/schema";
import _ from "lodash";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect, useRef } from "react";
import { BiError } from "react-icons/bi";
import { toast } from "react-toastify";
import { gplErrorHandler, isDev } from "utils";

const className = {
  container: "flex flex-col items-center justify-center min-h-[40vh]",
  items: "list-item flex-col m-0 space-y-2",
  item: "text-error dark:text-error-dark text-lg",
  text: "text-warning dark:text-warning-dark text-lg font-medium",
};

interface Props {
  query: { [key: string]: any };
}

const VerifyUser: NextPage<Props> = ({ query }) => {
  const effectRan = useRef(false);
  const { replace } = useRouter();
  const [verifyUser, { loading, data, error }] = useUserVerificationMutation({
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });
  const code = "code" in query ? query.code : "";
  const userId = "userId" in query ? query.userId : "";

  useEffect(() => {
    if ((effectRan.current || !isDev()) && code && userId) {
      const handler = async () => {
        try {
          const { data } = await verifyUser({
            variables: { code: query.code, userId: query.userId },
          });

          if (data?.verifyUser && data.verifyUser === userId) {
            replace(ROUTES.login);
          }
        } catch (error) {}
      };
      handler();
    }
    return () => {
      effectRan.current = true;
    };
  }, [code, query.code, query.userId, replace, userId, verifyUser]);

  const errors = gplErrorHandler(error);

  if (_.isEmpty(query)) {
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
              <div className="mt-4 flex items-center justify-center space-x-3">
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

  if (!loading && data?.verifyUser) {
    return (
      <Wrapper>
        <div className={className.container}>
          <p className="text-success dark:text-success-dark">
            {data.verifyUser} verified successfully.
          </p>
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
      toast.error(error.message, {
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data?.resendActivation) {
      toast.success(data?.resendActivation, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        pauseOnHover: false,
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
      <PostCreateHeader hideAvatar />
      <PostCreateContainer>{children}</PostCreateContainer>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const token = getCookie("jwt", { req, res });

  if (token) {
    return {
      redirect: { destination: ROUTES.myHome, permanent: false },
      props: {},
    };
  }
  return { props: { query } };
};

export default VerifyUser;
