import {
  RhButton,
  RhDialog,
  RhInput,
  RhLabel,
  RhLoader,
  RhToast,
} from "@rhythm-ui/react";
import React, { useState } from "react";
import { useSetConnectionMutation } from "../../services/api";
import { getTokenData } from "../../utils";

function SendConnectionRequestDialog({ open, setOpen, receiverId, name }) {
  const [message, setMessage] = useState("");
  const [sendConnectionRequest, { isLoading: isSendingConnectionRequest }] =
    useSetConnectionMutation();
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const onSendRequest = () => {
    if (message.length > 256) {
      RhToast.error("Only 256 characters are allowed");
      return;
    }
    setIsSendingRequest(true);

    const payload = {
      sender: getTokenData()?.user_id,
      receiver: receiverId,
      status: "Pending",
      message: message,
    };

    // return;
    sendConnectionRequest(payload)
      .unwrap()
      .then(() => {
        setIsSendingRequest(false);
        RhToast.success("Request sent successfully");
        setOpen(false);
      })
      .catch((err) => {
        setIsSendingRequest(false);
      });
  };
  return (
    <div>
      <RhDialog
        className="min-w-fit flex flex-col gap-6 p-10"
        isOpen={open}
        onClose={() => setOpen(!open)}
      >
        <h2 className="">Send Connection Request </h2>
        <p className="body">You are sending connection request to {name}</p>

        <div className="">
          <RhLabel className="mb-2">
            You can now add a personalized message to your request. (Optional)
          </RhLabel>
          <RhInput
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            block
            type="textarea"
            rows="5"
          ></RhInput>
        </div>
        <div className="flex justify-end gap-6">
          <RhButton
            layout="outline"
            onClick={() => {
              setMessage("");
              setOpen(false);
            }}
          >
            Cancel
          </RhButton>
          <RhButton disabled={isSendingRequest} onClick={() => onSendRequest()}>
            {isSendingRequest ? <RhLoader /> : "Confirm "}
          </RhButton>
        </div>
      </RhDialog>
    </div>
  );
}

export default SendConnectionRequestDialog;
