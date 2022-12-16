import { RhInputFormik, RhLoader, RhButton } from "@rhythm-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  old_password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  new_password: Yup.string()
    .oneOf([Yup.ref("old_password"), null], "Passwords didn't match.")
    .required("Please confirm your password."),
});
const initialValues = {
  old_password: "",
  new_password: "",
};

function ResetPasswordForm({ onSubmitForm, isLoading, tokenDetails }) {
  function onSubmitLoginForm(data) {
    onSubmitForm(data);
  }
  return (
    <div>
      <div className="mb-2 text-center">
        <h1 className=" my-1">
          Hello {tokenDetails?.name}, Welcome{" "}
          {tokenDetails?.type == "Forgot Password" ? "Back" : ""} to BIRAC!
        </h1>
        <p className="body">
          {tokenDetails?.type == "Forgot Password"
            ? `Please enter your new password.`
            : `
         You’ve been invited to join BIRAC platform. Please reset your password
         to proceed further.`}
        </p>
      </div>
      <div className="p-5 m-3  w-[400px] border mx-auto my-10">
        <div className="mb-5">
          <h2>Password Reset</h2>
          <p className="body">Enter your new password and confirm.</p>
        </div>

        <Formik
          enableReinitialize
          validationSchema={FormSchema}
          initialValues={initialValues}
          onSubmit={onSubmitLoginForm}
        >
          {() => (
            <Form>
              <div>
                <RhInputFormik
                  block
                  label="New Password"
                  type="password"
                  name="old_password"
                  className="mt-1 "
                  placeholder="*************"
                />

                <RhInputFormik
                  block
                  label="Confirm Password"
                  type="password"
                  name="new_password"
                  className="mt-1 "
                  placeholder="*************"
                />

                <div className="flex justify-between my-5">
                  <RhButton
                    type="submit"
                    block
                    disabled={isLoading}
                    variant="primary"
                  >
                    {isLoading ? <RhLoader /> : " Continue "}
                  </RhButton>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
