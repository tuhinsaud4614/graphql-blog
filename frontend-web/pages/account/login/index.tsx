import type { NextPageWithLayout } from "@types";
import {
  Form,
  FormButton,
  FormContainer,
  FormControl,
} from "components/account";
import { FormikHelpers, useFormik } from "formik";
import Head from "next/head";
import { ReactElement, useId } from "react";
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
    .required("Email address is required.")
    .email("Must be a valid email address."),
  password: yup.string().required("Password is required."),
});

const Login: NextPageWithLayout = () => {
  const initialValues: IValues = {
    emailMobile: "",
    password: "",
  };

  const emailId = useId();
  const passwordId = useId();

  const onSubmit = async (
    values: IValues,
    formikHelpers: FormikHelpers<IValues>
  ) => {};

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

  return (
    <Form
      changeLink="/account/register"
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
        aria-invalid={Boolean(touched.emailMobile && errors.emailMobile)}
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
      <FormButton
        type="submit"
        aria-label="Login"
        loader={isSubmitting}
        disabled={!(isValid && dirty) || isSubmitting}
      >
        Login
      </FormButton>
    </Form>
  );
};

Login.getLayout = (page: ReactElement) => {
  return (
    <FormContainer title="Sign in with email or mobile">{page}</FormContainer>
  );
};

export default Login;
