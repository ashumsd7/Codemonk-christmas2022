import { RhButton } from "@rhythm-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TICK_MARK_IMAGE } from "../../utils/constants";

function VerificationLinkSent() {
  const navigate = useNavigate();
  return (
    <div className="h-full flex justify-center items-center text-center">
      <div className=" flex flex-col gap-4">
        <div className="flex justify-center">
          <img className="h-[160px] w-[160px]  " src={TICK_MARK_IMAGE}></img>
        </div>

        <h2>Thank you for applying to BIRAC. </h2>
        <p className="body">
          You will receive one mail, once BIRAC accepts your request. Thanks.
        </p>
        <RhButton
          layout="link"
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          Go to home page
        </RhButton>
      </div>
    </div>
  );
}

export default VerificationLinkSent;
