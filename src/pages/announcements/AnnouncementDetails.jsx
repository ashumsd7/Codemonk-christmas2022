import { RhChip } from "@rhythm-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetAnnouncementsByIdQuery } from "../../services/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Breadcrumbs from "../../common/components/utilities/Breadcrumbs";
dayjs.extend(relativeTime);

function AnnouncementDetails() {
  const { id } = useParams();
  const { data: announcementDetails, isLoading } =
    useGetAnnouncementsByIdQuery(id);
  return (
    <div className="mb-24">
      <div>
        <Breadcrumbs
          routes={[
            { name: "Home", to: "/" },
            { name: "Highlights", to: "/announcements" },
            {
              name: announcementDetails?.data?.title,
              to: `/announcements/${announcementDetails?.data?.id}`,
            },
          ]}
        />
      </div>

      <div>
        <RhChip className="rounded-sm py-1.5 px-3 mb-1 mt-7 bg-info-50 text-sm  text-info-500">
          BIRAC Updates
        </RhChip>
      </div>

      <div className="mt-4">
        <h1>{announcementDetails?.data?.title}</h1>
      </div>

      <div className="flex flex-col gap-2 mb-6 ">
        <p className="body-faded-4 ">
          {" "}
          {dayjs(announcementDetails?.data?.created_ts).fromNow(true)} ago
        </p>
      </div>

      {/* image */}
      <div>
        {announcementDetails?.data?.image && (
          <div className="h-72 w-96 rounded-md border ">
            <img
              className="h-72 w-96"
              src={announcementDetails?.data?.image}
              alt=""
            />
          </div>
        )}
      </div>

      {/* details */}

      <div className="mt-6">
        <p
          className="body"
          dangerouslySetInnerHTML={{
            __html: announcementDetails?.data?.description,
          }}
        ></p>
      </div>
    </div>
  );
}

export default AnnouncementDetails;
