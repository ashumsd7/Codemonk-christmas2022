import { RhBreadCrumbs, RhIcon } from "@rhythm-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Breadcrumbs({ routes }) {
  const navigate = useNavigate();
  return (
    <div className="mt-2">
      <RhBreadCrumbs
        separator={
          <RhIcon icon="material-symbols:arrow-forward-rounded"></RhIcon>
        }
      >
        {routes?.map((item, index) => {
          return (
            <RhBreadCrumbs.Item
              key={index}
              onClick={() => {
                navigate(`${item.to}`);
              }}
              label={item.name}
            />
          );
        })}
      </RhBreadCrumbs>
    </div>
  );
}

export default Breadcrumbs;
