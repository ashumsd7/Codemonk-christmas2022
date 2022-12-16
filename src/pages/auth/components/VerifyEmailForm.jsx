import { RhInputFormik, RhLoader, RhButton } from "@rhythm-ui/react";

import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email Id.")
    .required("Email address is required."),
});
const initialValues = {
  email: "",
};

function VerifyEmailForm({ onSubmitForm, isLoading }) {
  const navigate = useNavigate();
  function onSubmitLoginForm(data) {
    onSubmitForm(data);
  }
  return (
    <div className="mt-16">
      <div>
        <div className="mb-16 text-center">
          <h1 className=" my-1">Hello , Welcome to BIRAC !</h1>
        </div>
        <div className="p-5 m-3  w-[400px] border mx-auto">
          <div className="mb-5">
            <h2>Forget Password</h2>
            <h4 className="body"> Enter your registered email.</h4>
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
                    label="Email"
                    type="email"
                    name="email"
                    className="mt-1 "
                  />

                  <div className="text-right body-small mt-1">
                    <p
                      className="text-sm cursor-pointer"
                      href=""
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/login");
                      }}
                    >
                      remember password ? login
                    </p>
                  </div>

                  <div className="flex justify-between my-5">
                    <RhButton
                      type="submit"
                      block
                      disabled={isLoading}
                      variant="primary"
                    >
                      {isLoading ? <RhLoader /> : " Get reset password link "}
                    </RhButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailForm;
