import React from "react";
import { RhCard, RhCardBody, RhChip } from "@rhythm-ui/react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function AnnouncementCard({ data, showTime }) {
  let description = data?.description?.replace("<p>", "");
  description = description?.replace("</p>", "");
  description = description.split("").slice(0, 50).join("") + "...";
  const navigate = useNavigate();
  return (
    <RhCard
      className=" my-2 mx-2 card-hover cursor-pointer"
      onClick={() => {
        navigate(`/announcements/${data.id}`);
      }}
    >
      <div className="">
        <img src={data.image} className="object-cover w-full h-52 "></img>
      </div>
      <RhCardBody>
        {/* image */}

        {/* chip and timings */}
        <div className="flex justify-between mb-1 mt-3">
          <RhChip
            className=" rounded-lg py-1.5 px-3 mb-1
                     bg-info-50 text-sm  text-info-500 "
          >
            {data.category}
          </RhChip>
          {showTime && (
            <small className=" text-xs opacity-50 flex flex-wrap mb-1">
              {dayjs(data.created_ts).fromNow(true)} ago
            </small>
          )}
        </div>
        {/* title */}
        <h3 className="">{data.title} </h3>

        <p className="my-2 body">{description}</p>
      </RhCardBody>
    </RhCard>
  );
}

export default AnnouncementCard;
