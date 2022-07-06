import type { NextPageWithLayout } from "@types";
import { Form, FormContainer, FormControl } from "components/account";
import { Fragment, ReactElement, useId } from "react";

const className = {
  control: "mb-4",
  btnContainer: "flex justify-center py-3",
  btn: "w-[14.125rem] outline-none border-0 px-5 py-2 rounded-full inline-block bg-accent hover:bg-accent-focus text-base-200 hover:text-base-100 active:scale-95",
};

const Login: NextPageWithLayout = () => {
  const emailId = useId();
  const passwordId = useId();
  return (
    <Fragment>
      <Form
        changeLink="/account/register"
        changeLinkText="Create one"
        changeText="No account?"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormControl
          classes={{ root: className.control }}
          id={emailId}
          title="Your email"
          name="email"
          aria-label="email"
          aria-invalid="true"
          aria-describedby="error"
          type="text"
          // valid={false}
          errorText="Please enter a valid email address."
        />
        <FormControl
          classes={{ root: className.control }}
          id={passwordId}
          title="Your password"
          name="password"
          aria-label="password"
          aria-invalid="true"
          aria-describedby="error"
          type="password"
          // valid={false}
          errorText="Please enter a valid password."
        />
        <div className={className.btnContainer}>
          <button type="submit" aria-label="Register" className={className.btn}>
            Login
          </button>
        </div>
      </Form>
    </Fragment>
  );
};

Login.getLayout = (page: ReactElement) => {
  return <FormContainer title="Sign in with email">{page}</FormContainer>;
};

export default Login;
