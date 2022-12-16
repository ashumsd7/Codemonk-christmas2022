import { RhButton } from "@rhythm-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TICK_MARK_IMAGE } from "../../utils/constants";

function PasswordResetSuccessfulScreen() {
  const navigate = useNavigate();
  return (
    <div className="h-[80vh] flex justify-center items-center text-center">
      <div className=" flex flex-col gap-4">
        <div className="flex justify-center">
          <img className="h-[160px] w-[160px]  " src={TICK_MARK_IMAGE}></img>
        </div>

        <h2>Password reset successful.</h2>
        <p className="body">Your password has been successfully reset.</p>

        <RhButton
          onClick={() => {
            navigate("/login");
          }}
        >
          Go to Login
        </RhButton>
      </div>
    </div>
  );
}

export default PasswordResetSuccessfulScreen;
