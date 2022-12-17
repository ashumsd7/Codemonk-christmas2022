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
  RhToast,
} from "@rhythm-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useGetUsersQuery } from "../../services/api";
import codemonk_logo from "../../assets/logocodemonk.png";
import bells from "../../assets/bells.jpg";
import bellshanging from "../../assets/bellhanging2.gif";
import bellshanging2 from "../../assets/bellhanging.gif";

function AllWishList() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data: employees = [] } = useGetUsersQuery();
  const [selectedData, setSelectedData] = useState({});
  const [showingData, setShowingData] = useState({});

  return (
    <>
      <div className="flex justify-between text-xl text-[#ff512f] relative ">
        <RhButton
          variant="link"
          onClick={() => {
            navigate("/");
          }}
        >
          <RhIcon icon="material-symbols:arrow-back-rounded"> </RhIcon> Back to
          home
        </RhButton>

        <img
          className="h-22 absolute -top-4 right-10 z-30 animate-pulse "
          src={bellshanging2}
          alt=""
        />
        <img
          className="h-22 absolute -top-4 left-10 z-30 animate-pulse "
          src={bellshanging2}
          alt=""
        />
      </div>
      <marquee behavior="" loop direction="">
        <div className=" bg-gradient-to-r py-1 px-4  from-[#ff512f] to-[#dd2476] text-white rounded-md font-extrabold">
          🎉 🎁 Merry Christmas 🎉 🎁 📣 Click the card to show more info like
          address : 📣 Missing Address or any help contact Ashu 👋 : 🎉 🎁 Merry
          Christmas 🎉 🎁🎉 🎁 Merry Christmas 🎉
        </div>
      </marquee>

      <RhScrollbar className=" h-[90vh] flex justi items-center border lg:mt-0 lg:m-10 m-2 p-2 lg:p-10 lg:pt-0">
        <div className="p-4 h-screen">
          <h1 className="text-center lg:text-4xl text-xl mb-4 text-[#ff512f]">
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
                  className="p-2 my-4 relative cursor-pointer card-hover hover:scale-105 duration-150 ease-out bg-gradient-to-r  from-[#ff512f] to-[#dd2476]"
                >
                  <div className="flex justify-between animate-pulse">
                    <img className="w-1/2 " src={codemonk_logo} alt="" />
                  </div>
                  <RhDivider></RhDivider>
                  <div className="flex flex-col justify-between items-">
                    {/* name */}
                    <div className=" my-2 gap-1 cursor-pointer text-left text-2xl flex items-center font-extrabold hover:font-extrabold text-white">
                      {item?.address && (
                        <RhIcon
                          icon="mdi:tick-decagram"
                          className="text-white animate-pulse duration-1000"
                        >
                          {" "}
                        </RhIcon>
                      )}
                      {item?.name}
                    </div>
                  </div>
                  <div>
                    <div className="">
                      {item?.wishes?.map((data) => {
                        return (
                          <li className="block text-white font-semibold">
                            {" "}
                            🎁
                            {data.link ? (
                              <a
                                target="_blank"
                                className="cursor-pointer text-white"
                                href={data.link}
                              >
                                {data?.title}{" "}
                              </a>
                            ) : (
                              data?.title
                            )}
                          </li>
                        );
                      })}
                    </div>
                    <RhDivider></RhDivider>
                    <p className="text-white text-xs mt-1">
                      Cultural & Food committee Codemonk
                    </p>
                    <p className="flex items-center justify-end gap-1">
                      {item?.address?.length > 5 && (
                        <CopyToClipboard
                          text={item?.address}
                          onCopy={(e) => {
                            RhToast.success("Address copied.");
                          }}
                        >
                          <>
                            <RhIcon
                              icon="mdi:tick-decagram"
                              className="text-green-500"
                            >
                              {" "}
                            </RhIcon>{" "}
                            <div className="text-white text-sm font-bold animate-pulse">
                              {" "}
                              Address
                            </div>
                          </>
                        </CopyToClipboard>
                      )}
                    </p>
                  </div>
                  {/* //thanks */}
                  {item?.address && (
                    <>
                      <div className="animate-pulse text-[#ff512f] absolute top-4 z-10 right-1 rotate-45 translate-x-11 bg-white rounded-md  text-xs font-extrabold w-auto inline-block px-6 py-1">
                        Thank you 🎉
                      </div>
                      <div className="absolute top-7 animate-pulse right-0 h-16 z-20 flex  ">
                        <img className="h-24 " src={bellshanging} alt="" />
                      </div>
                    </>
                  )}
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

            {selectedData?.wishes?.length > 0 &&
              selectedData?.wishes?.map((data, index) => {
                return (
                  <>
                    <div className="">
                      <RhListItem className="flex items-center  my-1 ">
                        <RhListItem.Icon variant="primary" align="start">
                          {
                            <div className="flex items-center gap-2">
                              🎉🎁
                              <RhListItem.Text
                                primary={
                                  <>
                                    {data.link ? (
                                      <a
                                        target="_blank"
                                        className="cursor-pointer text-blue-500"
                                        href={data.link}
                                      >
                                        {data?.title}{" "}
                                      </a>
                                    ) : (
                                      data?.title
                                    )}
                                  </>
                                }
                              />
                            </div>
                          }
                        </RhListItem.Icon>
                      </RhListItem>
                    </div>

                    <RhDivider></RhDivider>
                  </>
                );
              })}
            {selectedData?.address?.length > 5 && (
              <CopyToClipboard
                text={selectedData?.address}
                onCopy={() => {
                  RhToast.success("Address copied.");
                }}
              >
                <p className="flex flex-wrap flex-col">
                  <span className="block text-black font-bold cursor-pointer">
                    click to copy{" "}
                  </span>
                  🗒️ {selectedData?.address}
                </p>
              </CopyToClipboard>
            )}

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
