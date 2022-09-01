import { useApolloClient } from "@apollo/client";
import { Button, ErrorModal } from "@component";
import { ROUTES, VALID_EMAIL_REGEX, VALID_MOBILE_REGEX } from "@constants";
import { setAuthUser } from "@features";
import { Form, FormContainer, FormControl } from "components/account";
import { getCookie } from "cookies-next";
import { Formik, FormikHelpers } from "formik";
import { useLoginMutation } from "graphql/generated/schema";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useId } from "react";
import { useAppDispatch } from "store";
import { getAuthUser, gplErrorHandler } from "utils";
import * as yup from "yup";

const className = {
  control: "mb-4",
};

interface IValues {
  emailMobile: string;
  password: string;
}

// validation
const schema = yup.object().shape({
  emailMobile: yup
    .string()
    .required("Email address or mobile number is required.")
    .test(
      "validMobile",
      "Must be valid a mobile number or email address.",
      (value) => {
        return (
          !!value &&
          (VALID_MOBILE_REGEX.test(value) || VALID_EMAIL_REGEX.test(value))
        );
      }
    ),
  password: yup.string().required("Password is required."),
});

const initialValues: IValues = {
  emailMobile: "",
  password: "",
};

const Login: NextPage = () => {
  const emailId = useId();
  const passwordId = useId();
  const { replace } = useRouter();
  const [login, { loading, error, reset }] = useLoginMutation({
    errorPolicy: "all",
  });
  const client = useApolloClient();
  const rdxDispatch = useAppDispatch();

  const onSubmit = async (
    { emailMobile, password }: IValues,
    { resetForm }: FormikHelpers<IValues>
  ) => {
    try {
      await client.resetStore();
      const { data } = await login({
        variables: { password, emailOrMobile: emailMobile },
      });
      if (data && data.login) {
        const accessToken = data.login;
        const user = getAuthUser(accessToken);
        rdxDispatch(setAuthUser({ user, token: accessToken }));

        replace(ROUTES.myHome);
      }
    } catch (error) {
      resetForm();
    }
  };

  return (
    <Fragment>
      <FormContainer title="Sign in with email or mobile">
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={schema}
        >
          {({
            touched,
            errors,
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            isValid,
            dirty,
            handleSubmit,
          }) => (
            <Form
              changeLink={ROUTES.register}
              changeLinkText="Create one"
              changeText="No account?"
              onSubmit={handleSubmit}
            >
              <Head>
                <title>The RAT Diary | Login</title>
              </Head>
              <FormControl
                classes={{ root: className.control }}
                id={emailId}
                title="Your email or mobile"
                name="emailMobile"
                aria-label="email"
                aria-invalid={Boolean(
                  touched.emailMobile && errors.emailMobile
                )}
                type="text"
                valid={!(touched.emailMobile && errors.emailMobile)}
                errorText={touched.emailMobile && errors.emailMobile}
                value={values.emailMobile}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <FormControl
                classes={{ root: className.control }}
                id={passwordId}
                title="Your password"
                name="password"
                aria-label="password"
                aria-invalid={Boolean(touched.password && errors.password)}
                type="password"
                valid={!(touched.password && errors.password)}
                errorText={touched.password && errors.password}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <div className="flex justify-center py-3">
                <Button
                  className="w-[14.125rem] px-5 !py-2 "
                  type="submit"
                  aria-label="Login"
                  loading={isSubmitting || loading}
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </FormContainer>
      <ErrorModal
        onClose={() => reset()}
        title="Login Errors"
        errors={gplErrorHandler(error)}
      />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie("jwt", { req, res });
  if (token) {
    return {
      redirect: { destination: ROUTES.myHome, permanent: false },
      props: {},
    };
  }
  return { props: {} };
};

export default Login;
