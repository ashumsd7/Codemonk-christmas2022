import {
  RhInputFormik,
  RhLoader,
  RhButton,
  RhCardBody,
  RhCard,
  RhLabel,
} from "@rhythm-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email Id.")
    .required("Email address is required."),
  password: Yup.string().required("Password is required"),
});
const initialValues = {
  email: "",
  password: "",
};

function LoginForm({ onSubmitForm, isLoading }) {
  const navigate = useNavigate();
  function onSubmitLoginForm(data) {
    onSubmitForm(data);
  }
  return (
    <div className="p-5 m-3  flex justify-center items-center mx-auto bg-white rounded-lg">
      <Formik
        enableReinitialize
        validationSchema={FormSchema}
        initialValues={initialValues}
        onSubmit={onSubmitLoginForm}
      >
        {() => (
          <Form>
            <div className="mt-5">
              <RhCard className="lg:w-[28rem] w-full p-2 mx-auto border-none">
                <RhCardBody className="flex flex-col gap-4">
                  <div className="text-2xl font-semibold text-[#ff512f]">
                    Welcome Monk Please Login
                  </div>
                  <div>
                    <RhLabel>Email</RhLabel>
                    <RhInputFormik
                      block
                      type="email"
                      name="email"
                      className="mt-1 "
                    />
                  </div>
                  <div>
                    <RhLabel>Password</RhLabel>
                    <RhInputFormik
                      block
                      type="password"
                      name="password"
                      className="mt-1 "
                      placeholder="*************"
                    />
                  </div>
                  <RhButton type="submit" className="bg-[#ff512f]">
                    {isLoading && <RhLoader className="mr-3" />}
                    Submit
                  </RhButton>
                </RhCardBody>
              </RhCard>
              {/* <RhInputFormik
                  block
                  label="Email"
                  type="email"
                  name="email"
                  className="mt-1 "
                />
  
                <RhInputFormik
                  block
                  label="Password"
                  type="password"
                  name="password"
                  className="mt-1 "
                  placeholder="*************"
                />
                <div className="text-right cursor-pointer body-small mt-1">
                  <p
                    href=""
                    onClick={() => {
                      alert("call ashu");
                    }}
                  >
                    don't know your password ?
                  </p>
                </div>
  
                <div className="flex justify-between my-5">
                  <RhButton
                    type="submit"
                    block
                    disabled={isLoading}
                    variant="primary"
                  >
                    {isLoading ? <RhLoader /> : "Log in "}
                  </RhButton> */}
              {/* </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
