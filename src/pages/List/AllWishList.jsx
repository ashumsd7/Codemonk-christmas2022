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
import codemonk_logo from "../../assets/logocodemonk.png";

function AllWishList() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data: employees = [] } = useGetUsersQuery();
  const [selectedData, setSelectedData] = useState({});
  const [showingData, setShowingData] = useState({});

  return (
    <>
      <div className="flex justify-between text-xl text-[#ff512f]">
        <RhButton
          variant="link"
          onClick={() => {
            navigate("/");
          }}
        >
          <RhIcon icon="material-symbols:arrow-back-rounded"> </RhIcon> Back to
          home
        </RhButton>
      </div>

      <RhScrollbar className=" h-[90vh] flex justi items-center border lg:m-10 m-5  p-5 lg:p-10">
        <div className="p-4 h-screen">
          <h1 className="text-center lg:text-4xl text-xl mb-4">
            🎉 🎁 Merry Christmas 🎉 🎁{" "}
          </h1>
          <div className=" grid lg:grid-cols-4 gap-3 grid-cols-1">
            {employees?.map((item) => {
              return (
                <RhCard
                  onClick={() => {
                    setSelectedData(item);
                    setIsOpen(true);
                  }}
                  className="p-2 my-4 cursor-pointer card-hover hover:scale-105 duration-150 ease-out bg-gradient-to-r  from-[#ff512f] to-[#dd2476]"
                >
                  {/* <RhCardBody> */}
                  <img className="w-1/2" src={codemonk_logo} alt="" />
                  <RhDivider></RhDivider>
                  <div className="flex flex-col justify-between items-">
                    {/* name */}
                    <div className=" my-2 cursor-pointer text-left text-2xl font-extrabold hover:font-extrabold text-white">
                      {item?.name}
                    </div>
                  </div>
                  <div>
                    <div className="">
                      {item?.wishList?.map((data) => {
                        return (
                          <li className="block text-white font-semibold">
                            {" "}
                            🎁 {data}
                          </li>
                        );
                      })}
                    </div>
                    <RhDivider></RhDivider>
                    <p className="text-white text-xs mt-1">
                      Cultural & Food committee Codemonk
                    </p>
                    {/* button to see */}
                    {/* <RhIcon
                      onClick={() => {
                        setSelectedData(item);
                        setIsOpen(true);
                      }}
                      className="text-blue-500 cursor-pointer hover:scale-150 hover:-rotate-90 duration-100 ease-in-out"
                      icon="fluent-mdl2:see-do"
                    ></RhIcon> */}
                  </div>
                  {/* <span className="text-white"> Codemonk Christmas celebration 2022</span> */}
                  {/* </RhCardBody> */}
                </RhCard>
              );
            })}
          </div>

          <RhDialog
            className="w-[90vw] sm:w-[60vw] flex flex-col gap-4 p-10"
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
                                  {data || "❌  ( not updated )  ❌ "}
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

            <span className="flex flex-wrap">🗒️ {selectedData?.address}</span>

            <RhButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Ok Kool 👌
            </RhButton>
          </RhDialog>
        </div>
      </RhScrollbar>
    </>
  );
}

export default AllWishList;
