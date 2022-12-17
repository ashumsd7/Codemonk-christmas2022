import {
  RhAvatar,
  RhButton,
  RhCard,
  RhCardBody,
  RhDialog,
  RhIcon,
  RhListItem,
  RhDivider,
  RhScrollbar,
} from "@rhythm-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../services/api";

function AllWishList() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data: employees = [] } = useGetUsersQuery();
  const [selectedData, setSelectedData] = useState({});
  const [showingData, setShowingData] = useState({});

  return (
    <>
      <div className="flex justify-between">
        <RhButton
          variant="link"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to home {employees?.length}
        </RhButton>
      </div>

      <RhScrollbar className=" h-[90vh] flex justify-center items-center border lg:m-10 m-5  p-5 lg:p-10">
        <div className="p-4 h-screen">
          {employees?.map((item) => {
            return (
              <RhCard
                onClick={() => {
                  setSelectedData(item);
                  setIsOpen(true);
                }}
                className="p-2 my-4 cursor-pointer card-hover hover:scale-105 duration-150 ease-out bg-gradient-to-r from-[#ff512f] to-[#f6c68c]"
              >
                {/* <RhCardBody> */}
                <div className="flex justify-between items-center">
                  {/* name */}
                  <div className="  cursor-pointer text-lg hover:font-extrabold text-white">
                    {item?.name}
                  </div>
                  {/* button to see */}
                  <RhIcon
                    onClick={() => {
                      setSelectedData(item);
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
            className="w-[90vw] sm:w-[60vw] flex flex-col gap-6 p-10"
            isOpen={isOpen}
          onClose={() => setIsOpen(!open)}
          >
            <h2 className="lg:text-xl text-sm text-center w-full">
              🎁 {selectedData?.name} ⁉️ 🎁{" "}
            </h2>

            {selectedData?.wishList?.length > 0 &&
              selectedData?.wishList?.map((data, index) => {
                return (
                  <>
                    <RhListItem className="flex items-center h-6 ">
                      <RhListItem.Icon variant="primary" align="start">
                        {
                          <div className="flex items-center gap-2">
                            {/* <span className="font-extrabold">{index + 1}</span>  */}
                            🎉🎁
                            <RhListItem.Text
                              primary={
                                <p className="button">
                                  {data || "❓ ❓ ❓ ..."}
                                </p>
                              }
                            />
                          </div>
                        }
                      </RhListItem.Icon>
                    </RhListItem>
                    <RhDivider></RhDivider>
                  </>
                );
              })}

            <RhButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              ok Kool 👌
            </RhButton>
          </RhDialog>
        </div>
      </RhScrollbar>
    </>
  );
}

export default AllWishList;
