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
  RhInput,
  RhSelect,
  RhLabel,
  RhToggle,
} from "@rhythm-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useGetUsersQuery } from "../../services/api";
import codemonk_logo from "../../assets/logocodemonk.svg";
import bells from "../../assets/bells.jpg";
import bellshanging from "../../assets/bellhanging2.gif";
import bellshanging2 from "../../assets/bellhanging.gif";
import bell from "../../assets/bell.gif";
import loader1 from "../../assets/loader1.gif";
import gift from "../../assets/giftrec.png";
import santapoint from "../../assets/santapoint2.jpg";
import { Input } from "postcss";

function AllWishList() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data: employees = [], isLoading } = useGetUsersQuery();
  const [selectedData, setSelectedData] = useState({});
  const [showingData, setShowingData] = useState({});
  const [isGifDialogOpen, setIsGifDialogOpen] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsGifDialogOpen(true);
  //   }, 3000);
  // }, []);

  return (
    <div className="bg-gray-50">
      <div className="flex justify-between text-xl text-[#ff512f] relative ">
        <RhButton
          variant="link"
          className="font-extrabold"
          onClick={() => {
            navigate("/");
          }}
        >
          <RhIcon icon="material-symbols:arrow-back-rounded"> </RhIcon> Back to
          home
        </RhButton>

        <img
          className="h-24 absolute top-10 right-0 z-30 animate-pulse "
          src={bell}
          alt=""
        />
        <img
          className="h-24 absolute top-10 left-0 rotate-0 z-30 animate-pulse "
          src={bell}
          alt=""
        />
      </div>
      <h1
        onClick={() => {
          navigate("/");
        }}
        className="text-center cursor-pointer lg:text-4xl text-xl mb-4 text-[#ff512f]"
      >
        🎉 🎁 Merry Christmas 🎉 🎁{" "}
      </h1>

      <RhScrollbar className=" h-[90vh]  flex justi items-center  lg:mt-0 lg:m-10 m-2 p-2 lg:p-10 lg:pt-0">
        <div className=" bg-gradient-to-r py-1 px-4  from-[#ff512f] to-[#dd2476] text-white rounded-md flex justify-center items-center font-extrabold">
          <marquee behavior="" loop direction="">
            📣 Click the card to show more info like address , Link of gifts and
            much more... 📣 Missing Address or any help contact Ashu 👋 : 🎉 🎁
            Merry Christmas
          </marquee>
        </div>

        <div className="p-4 h-screen mb-20">
          {isLoading && (
            <div className="flex justify-center flex-col items-center">
              <img src={loader1} alt="" />

              <h1 className=" text-[#ff512f]">Getting wishes....</h1>
            </div>
          )}

          <div className=" grid lg:grid-cols-4 gap-3 grid-cols-1 mb-20">
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
                          className="bg-white text-blue-500  p-[2px] rounded-full animate-pulse duration-1000"
                        >
                          {" "}
                        </RhIcon>
                      )}
                      {item?.name}
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <div className=" flex flex-col justify-center gap-1 items-center my-4">
                        <p className="text-white text-xl mb-2">
                          has guessed
                          <span className="animate-bounce "> </span>
                        </p>

                        <h2>
                          {" "}
                          <span className="llg:text-4xl  text-2xl text-center mb-2 font-extrabold tracking-wider animate-bounce ">
                            {item?.yourMonk || "---------"}
                          </span>
                        </h2>

                        <h4 className="text-white">as secret monk</h4>
                        <p className="text-sm font-thin text-gray-100 ">
                          {item.isGiftReceived ? "  &  Received the gift." : ""}
                        </p>
                      </div>
                      {/* {item?.wishes?.map((data) => {
                        return (
                          <li className="block text-white font-semibold">
                            {" "}
                            🎁{" "}
                            {data.link ? (
                              <a
                                target="_blank"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                                className="cursor-pointer text-white  font-semibold"
                                href={data.link}
                              >
                                {data?.title.length > 15
                                  ? data?.title
                                      ?.split("")
                                      ?.slice(0, 15)
                                      .join("") + "..."
                                  : data?.title}
                              </a>
                            ) : data?.title.length > 15 ? (
                              data?.title?.split("")?.slice(0, 15).join("") +
                              "..."
                            ) : (
                              data?.title
                            )}
                          </li>
                        );
                      })} */}
                    </div>
                    <RhDivider></RhDivider>
                    <p className="text-white text-xs font-thin mt-1">
                      Cultural & Food committee Codemonk
                    </p>
                    <p className="flex items-center justify-end gap-1 reltive">
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
                            <div className="text-white text-sm flex items-center gap-2 font-bold animate-pulse">
                              {" "}
                              Click to see more details{" "}
                            </div>
                          </>
                        </CopyToClipboard>
                      )}
                    </p>
                  </div>
                  {/* //thanks */}
                  {item?.address && (
                    <>
                      <div className=" text-white absolute top-4 z-10 right-1 rotate-45 translate-x-11 bg-gray-800 rounded-md  text-xs font-extrabold w-auto inline-block px-6 py-1">
                        25.12.2023
                      </div>
                      {item.isGiftReceived ? (
                        <div className="absolute top-7 animate-pulse right-0 h-16 z-20 flex  ">
                          <img className="h-24 " src={gift} alt="" />
                        </div>
                      ) : (
                        <>
                          {/* // <div className="absolute top-7 animate-pulse right-0 h-28 z-20 flex  ">
                        //   <img className="h-24 " src={gift} alt="" />
                        // </div> */}
                        </>
                      )}
                    </>
                  )}
                </RhCard>
              );
            })}
          </div>

          <RhDialog
            className="w-[90vw] sm:w-[60vw] flex flex-col gap-4 "
            isOpen={isOpen}
            onClose={() => setIsOpen(!open)}
          >
            <h2 className="lg:text-4xl text-xl text-center w-full">
              🎁 {selectedData?.name} ⁉️ 🎁{" "}
            </h2>

            <RhCard>
              {selectedData?.wishes?.length > 0 &&
                selectedData?.wishes?.map((data, index) => {
                  return (
                    <>
                      <div className="">
                        <RhListItem className="flex items-center  ">
                          <RhListItem.Icon variant="primary" align="start">
                            {
                              <div className="flex items-center gap-2">
                                🎁
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
                  <RhCard className="flex flex-wrap flex-col">
                    <RhCardBody>🗒️ {selectedData?.address}</RhCardBody>
                  </RhCard>
                </CopyToClipboard>
              )}
            </RhCard>

            <div className="flex justify-between">
              {selectedData?.address?.length > 5 ? (
                <CopyToClipboard
                  text={selectedData?.address}
                  onCopy={() => {
                    RhToast.success("Address copied.");
                  }}
                >
                  <p className="flex flex-wrap flex-col">
                    <RhButton layout="link">Copy Address</RhButton>
                  </p>
                </CopyToClipboard>
              ) : (
                <div></div>
              )}
              <RhButton
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Ok got it.
              </RhButton>
            </div>
          </RhDialog>
        </div>
      </RhScrollbar>

      <RhDialog
        className=" flex flex-col gap-6  w-[90vw] sm:w-[50vw]"
        isOpen={isGifDialogOpen}
        onClose={() => {
          // setShowingData({});
          setIsGifDialogOpen(false);
        }}
      >
        <div className="p-2 border-0">
          {/* <RhCardBody> */}
          <div className="flex justify-between">
            <div className="">
              <img className="w-24" src={codemonk_logo} alt="" />
            </div>
            <div
              className="cursor-pointer hover:rotate-180 duration-100"
              onClick={() => {
                setIsGifDialogOpen(false);
              }}
            >
              ❌
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <img className="lg:w-44 w-32" src={santapoint} alt="" />
            <div className="flex flex-col gap-4 justify-center items-center">
              <h1 className="text-lg lg:text-4xl font-rubik text-[#ff512f]">
                Hey Monk 👋
              </h1>
              {/* <RhLabel className="text-left">Guess your monk</RhLabel> */}
              <RhSelect
                className="w-full"
                options={employees}
                placeholder="Guess your monk"
                getOptionValue={(val) => val.name}
                getOptionLabel={(val) => val.name}
              ></RhSelect>
              <h2 className="text-sm lg:text-3xl">
                Have you received your gift ?
              </h2>
              <div className="">
                No <RhToggle></RhToggle> Yes
              </div>

              <div className="flex w-full gap-2 justify-end">
                <RhButton
                  onClick={() => {
                    setIsGifDialogOpen(false);
                  }}
                  layout="outline"
                  className="border border-red-500 text-red-500"
                >
                  Cancel
                </RhButton>
                <RhButton
                  className="bg-red-500 hover:bg-red-500"
                  onClick={() => {}}
                >
                  Confirm
                </RhButton>
              </div>
            </div>
          </div>
        </div>
      </RhDialog>
    </div>
  );
}

export default AllWishList;
