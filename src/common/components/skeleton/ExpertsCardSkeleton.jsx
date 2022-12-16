import { RhCard, RhCardBody, RhIcon, RhSkeleton } from "@rhythm-ui/react";
import React from "react";

function ExpertsCardSkeleton() {
  return (
    <RhCard className="mb-4 border">
      {/* <RhCardBody > */}
      <div className="p-2">
        <div className="flex gap-2  mb-2">
          <RhSkeleton>
            <RhSkeleton.Rectangle
              height="120px"
              width="120px"
              borderRadius="10px"
              icon={
                <RhIcon
                  icon="heroicons:photo-solid"
                  className="text-white text-6xl"
                />
              }
            />
            <div className=" flex flex-col ">
              <RhSkeleton>
                <RhSkeleton.Rectangle height="24px" className="my-2" />
                <RhSkeleton.Rectangle height="16px" width="100px" />
              </RhSkeleton>
            </div>
          </RhSkeleton>
        </div>
        <div className="mb-2">
          <RhSkeleton.Rectangle className="mb-2 w-full" width="100%" />
          <RhSkeleton.Rectangle className="mb-2 w-full" width="90%" />
          <RhSkeleton.Rectangle className="mb-2 w-full" width="85%" />
          <RhSkeleton.Rectangle className="mb-2 w-full" width="50%" />
        </div>
      </div>

      {/* </RhCardBody> */}
    </RhCard>
  );
}

export default ExpertsCardSkeleton;
