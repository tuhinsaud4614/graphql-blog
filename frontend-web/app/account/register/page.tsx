import { Metadata } from "next";

import Register from "./_components/Register";

export const metadata: Metadata = {
  title: "The RAT Diary | Register",
};

export default function RegisterPage() {
  return <Register />;
  //   <Fragment>
  //     <FormContainer title="Sign up with email or mobile">
  //       <Formik
  //         onSubmit={onSubmit}
  //         initialValues={initialValues}
  //         validationSchema={schema}
  //       >
  //         {({
  //           touched,
  //           errors,
  //           values,
  //           handleChange,
  //           handleBlur,
  //           isSubmitting,
  //           isValid,
  //           dirty,
  //           handleSubmit,
  //         }) => (
  //           <Form
  //             changeLink={ROUTES.login}
  //             changeLinkText="Sign in"
  //             changeText="Already have an account?"
  //             onSubmit={handleSubmit}
  //           >
  //             <Head>
  //               <title>The RAT Diary | Register</title>
  //             </Head>
  //             <FormControl
  //               classes={{ root: className.control }}
  //               id={nameId}
  //               title="Your name"
  //               name="name"
  //               aria-label="name"
  //               aria-invalid="true"
  //               type="text"
  //               valid={!(touched.name && errors.name)}
  //               errorText={touched.name && errors.name}
  //               value={values.name}
  //               onChange={handleChange}
  //               onBlur={handleBlur}
  //             />
  //             <FormControl
  //               classes={{ root: className.control }}
  //               id={emailId}
  //               title="Your email"
  //               name="email"
  //               aria-label="email"
  //               aria-invalid="true"
  //               type="email"
  //               valid={!(touched.email && errors.email)}
  //               errorText={touched.email && errors.email}
  //               value={values.email}
  //               onChange={handleChange}
  //               onBlur={handleBlur}
  //               required
  //             />
  //             <FormControl
  //               classes={{ root: className.control }}
  //               id={mobileId}
  //               title="Your mobile"
  //               name="mobile"
  //               aria-label="mobile"
  //               aria-invalid="true"
  //               type="tel"
  //               valid={!(touched.mobile && errors.mobile)}
  //               errorText={touched.mobile && errors.mobile}
  //               value={values.mobile}
  //               onChange={handleChange}
  //               onBlur={handleBlur}
  //               required
  //             />
  //             <FormControl
  //               classes={{ root: className.control }}
  //               id={passwordId}
  //               title="Your password"
  //               name="password"
  //               aria-label="password"
  //               aria-invalid="true"
  //               type="password"
  //               valid={!(touched.password && errors.password)}
  //               errorText={touched.password && errors.password}
  //               value={values.password}
  //               onChange={handleChange}
  //               onBlur={handleBlur}
  //               required
  //             />
  //             <FormControl
  //               classes={{ root: className.control }}
  //               id={confirmPasswordId}
  //               title="Your confirm password"
  //               name="confirmPassword"
  //               aria-label="confirmPassword"
  //               aria-invalid="true"
  //               type="password"
  //               valid={!(touched.confirmPassword && errors.confirmPassword)}
  //               errorText={touched.confirmPassword && errors.confirmPassword}
  //               value={values.confirmPassword}
  //               onChange={handleChange}
  //               onBlur={handleBlur}
  //               required
  //             />
  //             <div className="flex justify-center py-3">
  //               <Button
  //                 className="w-[14.125rem] !py-2 px-5 "
  //                 type="submit"
  //                 aria-label="Register"
  //                 loading={isSubmitting || loading}
  //                 disabled={!(isValid && dirty) || isSubmitting}
  //               >
  //                 Register
  //               </Button>
  //             </div>
  //           </Form>
  //         )}
  //       </Formik>
  //     </FormContainer>
  //     <ErrorModal
  //       onClose={() => reset()}
  //       title="Registration Errors"
  //       errors={gplErrorHandler(error)}
  //     />
  //   </Fragment>
  // );
}
