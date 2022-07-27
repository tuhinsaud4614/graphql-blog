import { Button } from "@component";
import type { NextPageWithLayout } from "@types";
import { Form, FormContainer, FormControl } from "components/account";
import { FormikHelpers, useFormik } from "formik";
import Head from "next/head";
import { ReactElement, useId } from "react";
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
    .required("mobile is required!")
    .email("Must be a valid mobile number."),
  password: yup.string().required("Password is required."),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("password")], "Password must be matched."),
});

const Register: NextPageWithLayout = () => {
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
      changeLink="/account/login"
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
          loading={isSubmitting}
          disabled={!(isValid && dirty) || isSubmitting}
        >
          Register
        </Button>
      </div>
    </Form>
  );
};

Register.getLayout = (page: ReactElement) => {
  return (
    <FormContainer title="Sign up with email or mobile">{page}</FormContainer>
  );
};

export default Register;
