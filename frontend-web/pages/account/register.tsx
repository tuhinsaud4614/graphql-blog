import { gql, useMutation } from "@apollo/client";
import { Button, ErrorModal } from "@component";
import { Form, FormContainer, FormControl } from "components/account";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useId } from "react";
import { gplErrorHandler } from "utils";
import { ROUTES, VALID_MOBILE_REGEX } from "utils/constants";
import * as yup from "yup";

const className = {
  control: "mb-4",
};

const REGISTER_AUTHOR = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $mobile: String!
  ) {
    register(
      data: {
        name: $name
        email: $email
        role: "AUTHOR"
        password: $password
        confirmPassword: $confirmPassword
        mobile: $mobile
      }
    )
  }
`;

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

const Register: NextPage = () => {
  const [registerAuthor, { loading, data, error, reset }] = useMutation(
    REGISTER_AUTHOR,
    { errorPolicy: "all" }
  );
  const initialValues: IValues = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const nameId = useId();
  const emailId = useId();
  const mobileId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const onSubmit = async (
    values: IValues,
    { resetForm }: FormikHelpers<IValues>
  ) => {
    await registerAuthor({ variables: values });
    resetForm();
  };

  const {
    handleSubmit,
    touched,
    handleChange,
    handleBlur,
    errors,
    isValid,
    dirty,
    values,
    isSubmitting,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: schema,
  });

  console.log("data", data);
  console.log("loading", loading);
  console.log(
    "errors",
    JSON.stringify(error?.graphQLErrors[0].extensions.fields, null, 2)
  );

  return (
    <Fragment>
      <FormContainer title="Sign up with email or mobile">
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
              className="w-[14.125rem] px-5 !py-2 "
              type="submit"
              aria-label="Register"
              loading={isSubmitting || loading}
              disabled={!(isValid && dirty) || isSubmitting}
            >
              Register
            </Button>
          </div>
        </Form>
      </FormContainer>
      <ErrorModal
        onClose={() => reset()}
        title="Registration Errors"
        errors={gplErrorHandler(error)}
      />
    </Fragment>
  );
};
export default Register;
