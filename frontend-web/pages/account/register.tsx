import { Button, ErrorModal } from "@component";
import { ROUTES, VALID_MOBILE_REGEX } from "@constants";
import { Form, FormContainer, FormControl } from "components/account";
import { getCookie } from "cookies-next";
import { Formik, FormikHelpers } from "formik";
import { useRegisterMutation } from "graphql/generated/schema";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useId } from "react";
import { toast } from "react-toastify";
import { gplErrorHandler } from "utils";
import * as yup from "yup";

const className = {
  control: "mb-4",
};

interface IValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

// validation
const schema = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .required("Email address is required.")
    .email("Must be a valid email address."),
  mobile: yup
    .string()
    .required("Mobile is required!")
    .test("validMobile", "Mobile is invalid", (value) => {
      return !!value && VALID_MOBILE_REGEX.test(value);
    }),
  password: yup.string().required("Password is required."),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("password")], "Password must be matched."),
});

const initialValues: IValues = {
  name: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register: NextPage = () => {
  const nameId = useId();
  const emailId = useId();
  const mobileId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const [registerAuthor, { loading, data, error, reset }] = useRegisterMutation(
    { errorPolicy: "all", fetchPolicy: "network-only" },
  );

  const { replace } = useRouter();

  const onSubmit = async (
    values: IValues,
    { resetForm }: FormikHelpers<IValues>,
  ) => {
    await registerAuthor({ variables: values });
    resetForm();
  };

  useEffect(() => {
    if (!loading && !error && data) {
      toast.success(<SuccessMsg />, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      const timer = window.setTimeout(() => {
        replace(ROUTES.login);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);

  return (
    <Fragment>
      <FormContainer title="Sign up with email or mobile">
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
              changeLink={ROUTES.login}
              changeLinkText="Sign in"
              changeText="Already have an account?"
              onSubmit={handleSubmit}
            >
              <Head>
                <title>The RAT Diary | Register</title>
              </Head>
              <FormControl
                classes={{ root: className.control }}
                id={nameId}
                title="Your name"
                name="name"
                aria-label="name"
                aria-invalid="true"
                type="text"
                valid={!(touched.name && errors.name)}
                errorText={touched.name && errors.name}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormControl
                classes={{ root: className.control }}
                id={emailId}
                title="Your email"
                name="email"
                aria-label="email"
                aria-invalid="true"
                type="email"
                valid={!(touched.email && errors.email)}
                errorText={touched.email && errors.email}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <FormControl
                classes={{ root: className.control }}
                id={mobileId}
                title="Your mobile"
                name="mobile"
                aria-label="mobile"
                aria-invalid="true"
                type="tel"
                valid={!(touched.mobile && errors.mobile)}
                errorText={touched.mobile && errors.mobile}
                value={values.mobile}
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
                aria-invalid="true"
                type="password"
                valid={!(touched.password && errors.password)}
                errorText={touched.password && errors.password}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <FormControl
                classes={{ root: className.control }}
                id={confirmPasswordId}
                title="Your confirm password"
                name="confirmPassword"
                aria-label="confirmPassword"
                aria-invalid="true"
                type="password"
                valid={!(touched.confirmPassword && errors.confirmPassword)}
                errorText={touched.confirmPassword && errors.confirmPassword}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <div className="flex justify-center py-3">
                <Button
                  className="w-[14.125rem] !py-2 px-5 "
                  type="submit"
                  aria-label="Register"
                  loading={isSubmitting || loading}
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </FormContainer>
      <ErrorModal
        onClose={() => reset()}
        title="Registration Errors"
        errors={gplErrorHandler(error)}
      />
    </Fragment>
  );
};

function SuccessMsg() {
  return (
    <div className="flex flex-col space-y-2 text-success dark:text-success-dark">
      <p>User register successfully!</p>
      <p>Verify user through email.</p>
    </div>
  );
}

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

export default Register;
