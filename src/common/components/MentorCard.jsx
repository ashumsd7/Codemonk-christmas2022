import {
  RhAvatar,
  RhButton,
  RhCard,
  RhCardBody,
  RhChip,
  RhDivider,
  RhIcon,
  RhTooltip,
} from "@rhythm-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenData, isLoggedIn } from "../../utils";
import SendConnectionRequestDialog from "./SendConnectionRequestDialog";
import ShowMoreTextUtility from "./utilities/ShowMoreTextUtility";

function MentorCard({ data, isConnected = false, isRequestSent = false }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  return (
    <>
      <RhCard
        className="mb-4 card-hover cursor-pointer  hover:drop-shadow-lg"
        onClick={() => {
          navigate(`/mentor/${data.id}`);
        }}
      >
        <RhCardBody className="px-6">
          <div>
            {/* image */}
            <div className="flex gap-6 flex-wrap">
              <RhAvatar
                className="h-20 w-20"
                type={data?.user_detail?.image ? "image" : "text"}
                src={data?.user_detail?.image}
                name={data?.user_detail?.name}
              ></RhAvatar>
              {/* detail */}
              <div className="flex flex-col flex-1 gap-2  justify-center">
                <div>
                  <RhChip className="body-small   font-semibold rounded-lg py-1.5 px-3 ">
                    MENTOR{" "}
                  </RhChip>
                </div>
                <h3>{data?.user_detail?.name}</h3>
                <div>
                  {data?.area_of_expertise?.map((area) => {
                    return (
                      <RhChip
                        key={area?.name}
                        className="  mr-2 rounded-sm py-1.5 px-3
                     bg-info-50 text-sm  text-info-500"
                      >
                        {area?.name}
                      </RhChip>
                    );
                  })}
                </div>

                <p className="mt-4">
                  <ShowMoreTextUtility
                    text={data?.user_detail?.about}
                    length="30"
                  ></ShowMoreTextUtility>
                </p>
              </div>
              <div className=" ">
                {isLoggedIn() && (
                  <>
                    {isConnected && (
                      <div className="flex items-center">
                        <RhIcon
                          icon="mdi:tick-circle"
                          className="mr-2 text-3xl text-green-500"
                        ></RhIcon>
                        <h3>Connected</h3>
                      </div>
                    )}{" "}
                    {isRequestSent && !isConnected && (
                      <RhTooltip
                        position="bottom"
                        title="Request sent! waiting to be accepted by the mentor."
                      >
                        <div className="flex items-center">
                          <RhIcon
                            icon="mdi:account-pending"
                            className="mr-2 text-3xl text-yellow-500"
                          ></RhIcon>
                          <h3>Pending</h3>{" "}
                        </div>
                      </RhTooltip>
                    )}
                    {!isConnected && !isRequestSent && (
                      <RhButton
                        className="h-10"
                        disabled={data?.user == getTokenData()?.user_id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(true);
                        }}
                      >
                        {" "}
                        <RhIcon icon="bxl:telegram" className="mr-2"></RhIcon>
                        Connect{" "}
                      </RhButton>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </RhCardBody>
      </RhCard>

      <SendConnectionRequestDialog
        open={open}
        setOpen={setOpen}
        receiverId={data?.user}
        name={data?.user_detail?.name}
      ></SendConnectionRequestDialog>
    </>
  );
}

export default MentorCard;
