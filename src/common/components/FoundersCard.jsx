import { RhAvatar, RhCard, RhCardBody, RhChip } from "@rhythm-ui/react";
import React from "react";

function FoundersCard({ data }) {
  return (
    <RhCard className="my-6 shadow-none border border-secondary-200">
      <RhCardBody>
        <div className="flex gap-4  items-center">
          <RhAvatar
            className="h-20 w-20"
            type={data?.image ? "image" : "text"}
            src={data?.image}
            name={data?.name}
          ></RhAvatar>
          <div>
            <div className="flex gap-3">
              <h3>{data?.name}</h3>
            </div>
            <RhChip className=" body-small bg-warning-50 text-warning-500">
              {data?.designation || "-"}
            </RhChip>
          </div>
        </div>

        <div className="my-6">
          <p className="bod-faded-3">{data?.about}</p>
        </div>
      </RhCardBody>
    </RhCard>
  );
}

export default FoundersCard;
