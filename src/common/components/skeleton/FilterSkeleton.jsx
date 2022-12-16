import { RhSkeleton } from "@rhythm-ui/react";
import React from "react";

function FilterSkelton() {
  return (
    <div className="mt-3">
      <RhSkeleton>
        <span className="inline-block w-6 h-6  rounded-sm bg-secondary-200"></span>
        <RhSkeleton.Line lineCount={1} />
      </RhSkeleton>
    </div>
  );
}

export default FilterSkelton;
