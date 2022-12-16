import { RhToast } from "@rhythm-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../services/api";
import VerifyEmailForm from "./components/VerifyEmailForm";

function VerifyEmail() {
  const navigate = useNavigate();
  const [verifyEmail, { isLoading }] = useForgetPasswordMutation();
  const onSubmitForm = (data) => {
    verifyEmail({ email: data.email })
      .unwrap()
      .then(() => {
        navigate("/verification-link-sent");
      })
      .catch((err) => {
        RhToast.error(`${err.data?.error}`);
      });
  };
  return (
    <VerifyEmailForm
      onSubmitForm={onSubmitForm}
      isLoading={isLoading}
    ></VerifyEmailForm>
  );
}

export default VerifyEmail;
