import {
  RhCard,
  RhCardBody,
  RhChip,
  RhIcon,
  RhTooltip,
} from "@rhythm-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils";
import { LOGO_PLACEHOLDER } from "../../utils/constants";

function StartupCard({ data, isConnected = false }) {
  const navigate = useNavigate();

  return (
    <RhCard
      className="mb-4  hover:cursor-pointer card-hover "
      onClick={() => {
        navigate(`/startups/${data.id}`);
      }}
    >
      <RhCardBody className="py-6 pb-0 ">
        <div>
          {/* image */}
          <div className="flex  gap-4 flex-wrap">
            <div className=" h-20 w-full md:w-20 rounded-md ">
              <img
                className="h-full w-full overflow-hidden"
                src={data?.logo || LOGO_PLACEHOLDER}
              ></img>
            </div>
            {/* detail */}
            <div className="flex flex-col flex-1 gap-1  justify-center ">
              <div className="flex justify-between">
                <h3>{data?.company_name}</h3>
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
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="body-small">
                <RhChip className="body-small  rounded-sm py-1.5 px-3 bg-info-50 text-info-500">
                  {data?.sector?.name || "-"}
                </RhChip>
              </div>
            </div>
          </div>

          <div className="my-6 block">
            <p
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className="body text-secondary-700"
            >
              {}
            </p>
          </div>

          {/* details */}
          <div className="flex justify-between bg-secondary-100 p-6 -mx-6  items-center ">
            <div>
              <p className="body-faded-4">Locations</p>

              {data?.new_location?.length > 0 ? (
                <RhTooltip
                  position="bottom"
                  title={data?.new_location
                    ?.map((location) => location.name)
                    .join(", ")}
                >
                  <p className="body flex flex-wrap ">
                    {data?.new_location
                      ?.slice(0, 1)
                      ?.map((location) => location.name)
                      .join(", ") || "-"}{" "}
                    {data?.new_location?.length > 1 && (
                      <>{`+ ${data?.new_location?.length - 1} more`}</>
                    )}
                  </p>
                </RhTooltip>
              ) : (
                " -"
              )}
            </div>

            <div>
              <p className="body-faded-4 ">Stage in Development</p>
              <p className="body">{data?.stage_of_development || "-"}</p>
            </div>

            <div>
              <p className="body-faded-4"> Team Size</p>
              <p className="body">{data?.team_size || "-"}</p>
            </div>

            <div>
              <p className="body-faded-4">Keywords</p>
              <RhTooltip
                position="bottom"
                title={data?.sub_sector
                  ?.map((sector) => sector.name)
                  .join(", ")}
              >
                <p className="body flex flex-wrap ">
                  {data?.sub_sector
                    ?.slice(0, 1)
                    ?.map((sector) => sector.name)
                    .join(", ") || "-"}{" "}
                  {data?.sub_sector?.length > 1 && (
                    <>{`+ ${data?.sub_sector?.length - 1} more`}</>
                  )}
                </p>
              </RhTooltip>
            </div>
          </div>
        </div>
      </RhCardBody>
    </RhCard>
  );
}

export default StartupCard;
