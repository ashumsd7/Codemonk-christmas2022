import {
  RhAvatar,
  RhButton,
  RhCard,
  RhCardBody,
  RhDialog,
  RhIcon,
  RhListItem,
} from "@rhythm-ui/react";
import React, { useState } from "react";

function AllWishList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  return (
    <div>
      {[1, 2, 4, 5].map((item) => {
        return (
          <RhCard
            onClick={() => {
              setIsOpen(true);
            }}
            className="p-2 my-4 cursor-pointer card-hover hover:scale-105 duration-150 ease-out"
          >
            {/* <RhCardBody> */}
            <div className="flex justify-between items-center">
              {/* name */}
              <div className="animate-text bg-gradient-to-r from-teal-500 via-danger-500 to-blue-500 bg-clip-text text-transparent cursor-pointer text-sm">
                Lovely Gupta
              </div>
              {/* button to see */}
              <RhIcon
                onClick={() => {
                  setSelectedData({ name: "Ashutosh", wish1: "aaaaaaaaaa" });
                  setIsOpen(true);
                }}
                className="text-blue-500 cursor-pointer hover:scale-150 hover:-rotate-90 duration-100 ease-in-out"
                icon="fluent-mdl2:see-do"
              ></RhIcon>
            </div>
            {/* </RhCardBody> */}
          </RhCard>
        );
      })}

      <RhDialog
        className="min-w-[500px] flex flex-col gap-6 p-10"
        isOpen={isOpen}
        onClose={() => setIsOpen(!open)}
      >
        <h2>{selectedData?.name}</h2>

        <RhListItem className="flex items-center h-10 my-2">
          <RhListItem.Icon variant="primary" align="start">
            <RhAvatar
              // type={data?.receiver?.image ? "image" : "text"}
              // src={data?.receiver?.image}
              size="sm"
              name={"data?.receiver?.name"}
            ></RhAvatar>
          </RhListItem.Icon>

          <RhListItem.Text
            primary={<p className="button">{selectedData.wish1}</p>}
          />
        </RhListItem>

        <RhButton
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Ok ok....
        </RhButton>
      </RhDialog>
    </div>
  );
}

export default AllWishList;
