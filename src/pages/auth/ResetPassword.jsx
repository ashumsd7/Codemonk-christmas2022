import { RhButton, RhToast } from "@rhythm-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/api";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { getDataByToken } from "../../utils";
import dayjs from "dayjs";

function ResetPassword() {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const tokenDetails = getDataByToken(token);
  useEffect(() => {
    // const tokenDetails = getDataByToken(token);

    const isExpired = dayjs.unix(tokenDetails?.exp).diff(dayjs()) < 1;
    if (!token) {
      navigate("/not-found");
    }
    if (tokenDetails === "TOKEN ERROR") {
      navigate("/invalid-reset-link");
    }
    if (isExpired) {
      navigate("/link-expired");
    }
  }, []);

  const onSubmitForm = (data) => {
    const payload = {
      token: token,
      new_password: data.new_password,
    };

    resetPassword(payload)
      .unwrap()
      .then((res) => {
        navigate("/password-reset-successful");
      })
      .catch((err) => {
        navigate("/invalid-reset-link");
        RhToast.error(`${err.data?.error} Please contact BIRAC.`);
      });
  };
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <ResetPasswordForm
        tokenDetails={tokenDetails}
        isLoading={isLoading}
        onSubmitForm={onSubmitForm}
      ></ResetPasswordForm>
    </div>
  );
}

export default ResetPassword;
