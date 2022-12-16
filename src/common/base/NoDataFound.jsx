import React from "react";
import { RhImage } from "@rhythm-ui/react";
import { EMPTY_DATA_IMAGE } from "../../utils/constants";
import NO_DATA from '../../assets/nodata.png'

function NoDataFound({ children, info = "No data found." }) {
  return (
    <>
      <div className="my-10 text-xl text-center text-secondary-400 lg:text-3xl">
        {children ? (
          children
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-2">
              <RhImage
                className="w-40 h-25"
                src={EMPTY_DATA_IMAGE}
                alt="noData"
              />
              {info}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default NoDataFound;
