import { RhCard, RhCardBody, RhIcon, RhSkeleton } from "@rhythm-ui/react";
import React from "react";

function JobsCardSkeleton() {
  return (
    <RhCard className="mb-4 border">
      <div className="p-2">
        <div className="flex gap-2  mb-2">
          <RhSkeleton>
            <RhSkeleton.Rectangle
              height="80px"
              width="80px"
              borderRadius="8px"
              icon={
                <RhIcon
                  icon="heroicons:photo-solid"
                  className="text-white text-6xl"
                />
              }
            />
            <div className=" flex flex-col ">
              <RhSkeleton>
                <RhSkeleton.Rectangle height="16px" className="my-2" />
                <RhSkeleton.Rectangle height="8px" width="100px" />
              </RhSkeleton>
            </div>
          </RhSkeleton>
        </div>
      </div>

      {/* </RhCardBody> */}
    </RhCard>
  );
}

export default JobsCardSkeleton;
