import { Button, ErrorModal } from "components";
import { FormControl } from "components/account";
import { FormikHelpers, useFormik } from "formik";
import { useResetPasswordMutation } from "graphql/generated/schema";
import { Fragment, useId, useState } from "react";
import { toast } from "react-toastify";
import { gplErrorHandler } from "utils";
import * as yup from "yup";

const className = {
  item: "py-8 flex flex-wrap sm:flex-nowrap items-center justify-between space-y-3",
  itemLeft: "flex-auto flex flex-col max-w-md pr-3",
  label: "mb-3 font-bold !text-xl text-neutral dark:text-neutral-dark",
  info: "text-neutral/60 dark:text-neutral-dark/60 text-sm mt-2",
  itemRight: "flex self-start shrink-0",
};

interface IValues {
  oldPassword: string;
  newPassword: string;
}

const schema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required."),
  newPassword: yup.string().required("New password is required."),
});

export default function PasswordChange() {
  const [editable, setEditable] = useState(false);
  const initialValues: IValues = {
    newPassword: "",
    oldPassword: "",
  };

  const newPasswordId = useId();
  const oldPasswordId = useId();

  const [resetPassword, { loading, error, reset }] = useResetPasswordMutation({
    errorPolicy: "all",
  });

  const onSubmit = async (
    { newPassword, oldPassword }: IValues,
    { resetForm }: FormikHelpers<IValues>
  ) => {
    try {
      const { data } = await resetPassword({
        variables: { newPassword, oldPassword },
      });
      if (data) {
        toast.success(data.resetPassword, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        resetForm();
        setEditable(false);
      }
    } catch (error) {
      resetForm();
    }
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

  return (
    <Fragment>
      <li>
        <form onSubmit={handleSubmit} className={className.item}>
          <div className={className.itemLeft}>
            <label className={className.label}>Password change</label>
            {!editable ? (
              <p className={className.info}>
                You can change your password. That will help you to log in.
              </p>
            ) : (
              <Fragment>
                <FormControl
                  classes={{
                    label: "text-left self-start",
                    input: "!text-left pb-2",
                  }}
                  id={oldPasswordId}
                  title="Old password"
                  name="oldPassword"
                  aria-label="Old password"
                  placeholder="Your old password"
                  aria-invalid={Boolean(
                    touched.oldPassword && errors.oldPassword
                  )}
                  type="password"
                  valid={!(touched.oldPassword && errors.oldPassword)}
                  errorText={touched.oldPassword && errors.oldPassword}
                  value={values.oldPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                <FormControl
                  classes={{
                    root: "mt-4",
                    label: "text-left self-start",
                    input: "!text-left pb-2",
                  }}
                  id={newPasswordId}
                  title="New password"
                  name="newPassword"
                  aria-label="New password"
                  placeholder="Your new password"
                  aria-invalid={Boolean(
                    touched.newPassword && errors.newPassword
                  )}
                  type="password"
                  valid={!(touched.newPassword && errors.newPassword)}
                  errorText={touched.newPassword && errors.newPassword}
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </Fragment>
            )}
          </div>
          <div className={className.itemRight}>
            {editable && (
              <Button
                className="mr-2 text-sm"
                type="submit"
                aria-label="Save"
                variant="success"
                mode="outline"
                loading={isSubmitting || loading}
                disabled={!(isValid && dirty) || isSubmitting}
              >
                Save
              </Button>
            )}
            <Button
              className="text-sm"
              type="button"
              aria-label={editable ? "Cancel" : "Edit"}
              variant="neutral"
              mode="outline"
              onClick={() => setEditable((prev) => !prev)}
            >
              {editable ? "Cancel" : "Edit"}
            </Button>
          </div>
        </form>
      </li>
      <ErrorModal
        onClose={() => reset()}
        title="Reset Password Errors"
        errors={gplErrorHandler(error)}
      />
    </Fragment>
  );
}
