import {
  RhAvatar,
  RhButton,
  RhCard,
  RhCardBody,
  RhDialog,
  RhDivider,
  RhIcon,
  RhInput,
  RhInputFormik,
  RhInputGroup,
  RhLabel,
  RhListItem,
  RhLoader,
  RhScrollbar,
  RhSelect,
  RhToast,
  RhToggle,
  RhTooltip,
} from "@rhythm-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import gift from "../../assets/giftrec.png";
import { useGetUsersQuery, usePatchUserMutation } from "../../services/api";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { getTokenData, isLoggedIn, logOut } from "../../utils";
import audio from "../../assets/notify.mp3";
import car_image from "../../assets/car.svg";
import codemonk_logo from "../../assets/logocodemonk.svg";
import running from "../../assets/running.gif";
import bellshanging from "../../assets/bellhanging2.gif";
import santapoint from "../../assets/santapoint2.jpg";
import happySanta from "../../assets/happysanta.jpg";
import sadSanta from "../../assets/sadsanta.png";

// import DateCountdown from "react-date-countdown-timer";
import cap from "../../assets/cap.png";
import ReactAudioPlayer from "react-audio-player";
import { use } from "echarts";

function Index() {
  const { data: employees = [] } = useGetUsersQuery();
  const loggedInUser = getTokenData();

  const currentEmployee = employees.find(
    (employee) => employee._id == loggedInUser.id
  );
  // console.log(">>>>>>>currentEmployee>>>", currentEmployee);

  const whoGuessedYourList = employees?.filter(
    (data) => data?.yourMonk == currentEmployee?.name
  );

  // console.log(">>>>>whoGuessedYourList>>>", whoGuessedYourList);

  let yourMonk = employees?.find(
    (employee) => employee.name == currentEmployee?.yourMonk
  );

  // const yourMonk;
  useEffect(() => {
    let guessedMonk = employees?.find(
      (employee) => employee.name == currentEmployee?.yourMonk
    );
    setMyMonk(guessedMonk);
    setIsReceived(currentEmployee?.isGiftReceived);
  }, [yourMonk]);

  // console.log(">>>>>>guessedMonk>>>>>>", yourMonk);

  const [searchFilter, setSearchFilter] = useState("");
  const [isShowingLink, setIsShowingLink] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const navigate = useNavigate();
  const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updateProfile, { isLoading }] = usePatchUserMutation();
  const [showingData, setShowingData] = useState({});
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [count, setCount] = useState(0);
  const [isGifDialogOpen, setIsGifDialogOpen] = useState(false);
  const [isReceived, setIsReceived] = useState(currentEmployee?.isGiftReceived);
  const [myMonk, setMyMonk] = useState({});
  const [isGuessedListOpen, setIsGuessedListOpen] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsAdOpen(true);
  //   }, 3000);
  // }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      setTimeout(() => {
        setIsGuessedListOpen(true);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (count == 10) {
      if (isLoggedIn()) {
        setIsInviteFormOpen(true);
      }
    }
  }, [count]);
  useEffect(() => {
    const allFilteredData = employees?.filter((item) => {
      if (
        item.email?.toLowerCase().includes(searchFilter?.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchFilter?.toLowerCase())
      )
        return item;
    });

    setFilteredEmployees(allFilteredData);
  }, [searchFilter]);

  const onConfirmMonk = (data) => {
    // console.log(">>>>>>>>>>>", {
      isGiftReceived: isReceived,
      yourMonk: myMonk?.name,
    });
    // return;
    updateProfile({ isGiftReceived: isReceived, yourMonk: myMonk?.name }).then(
      () => {
        RhToast.success("  Thank you.");
        // setIsInviteFormOpen(false);
        window.location.reload();
      }
    );
  };

  const initialValues = {};

  const onSubmitWish = (data) => {
    updateProfile({ wishes: data.wishes, address: data.address }).then(() => {
      RhToast.success(" Hurrah updated 🎉");
      setIsInviteFormOpen(false);
      // window.location.reload();
    });
  };

  return (
    <div className=" h-screen relative bg-no-repeat bg-cover w-full   bg-[url('https://wallpaper.dog/large/10732913.jpg')]">
      <div className="backdrop-blur-sm h-full">
        {/* // amrwuee */}
        <div className="flex justify-between  w-full gap-2">
          {
            <div className="flex-1">
              <div className=" bg-gradient-to-r py-1 px-4  animate-pulse from-[#ff512f] to-[#dd2476] text-white rounded-md flex justify-center items-center font-extrabold">
                <marquee behavior="" loop direction="">
                  📣 If you dont know login details please contact Kokila Joseph, Event
                  Timings and date to be announced soon 📣 : 🎉 🎁
                  Merry Christmas
                </marquee>
              </div>
            </div>
          }
          {isLoggedIn() ? (
            <RhTooltip title="Logout" position="left">
              <RhButton
                name={loggedInUser?.name}
                // type="image"
                onClick={() => {
                  logOut();
                }}
                rounded
                className="hover:rotate-180 h-8 w-8 rounded-full bg-red-500 hover:bg-red-500 duration-200 ease-in cursor-pointer hover:scale-75"
                // src="https://m.media-amazon.com/images/I/51Gb8GLccNL._SY450_.jpg"
              >
                <RhIcon icon="mdi:logout"></RhIcon>
              </RhButton>
            </RhTooltip>
          ) : (
            <></>
          )}
        </div>

        <div className="grid h-full lg:grid-cols-2 grid-cols-1">
          <div className="flex justify-center items-center mt-10 lg:mt-5 leading-5">
            <div className="font-extrabold flex flex-col gap-4">
              <div className="relative">
                <h1 className="lg:text-8xl text-5xl drop-shadow-lg  text-white ">
                  <span className="text-red-500 relative lg:-right-5 -right-1 ">
                    C
                  </span>{" "}
                  ODEMONK
                </h1>
                <p className="text-right font-rubik mb-2 text-white">
                  celebrating christmas 2023
                </p>
                <p className="text-right text-xs text-red-400">
                  Date and timings to be announced soon.
                </p>

                {isLoggedIn() && (
                  <>
                    <div className="flex w-[90vw] mt-2 sm:w-[40vw] gap-2 items-center">
                      <div
                        onClick={() => navigate("/wishlist")}
                        className=" h-10 bg-gradient-to-r w-full gap-2  cursor-pointer from-[#ff512f] to-[#dd2476]    rounded-md flex justify-center items-center"
                      >
                        <p className="animate-bounce"> 🎁 </p>
                        <p className="text-white font-extrabold">Wish List</p>
                      </div>

                      <div
                        onClick={() => {
                          setIsGifDialogOpen(true);
                        }}
                        className="h-10 bg-gradient-to-r w-full animate-pulse gap-2 cursor-pointer from-[#ff512f] to-[#dd2476]    rounded-md flex justify-center items-center"
                      >
                        <RhTooltip title="Guess Your Monk" position="bottom">
                          {/* <p className="animate-bounce"> 🔐 </p> */}
                          <p className="text-white font-extrabold">
                            🤔 Guess your ?
                          </p>
                        </RhTooltip>
                      </div>
                    </div>

                    {/* */}
                  </>
                )}

                <img
                  // onClick={() => {
                  //   setCount((prev) => ++prev);
                  // }}
                  className="absolute lg:-top-2 -top-1 lg:w-20 w-10 lg:-left-0  left-1 lg:-translate-x-2 -translate-x-4 -rotate-45"
                  src={cap}
                  alt=""
                />
              </div>

              {!isLoggedIn() && (
                <RhButton
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="lg:h-20 h-14 bg-white text-[#ff512f] text-2xl font-extrabold  hover:bg-[#ff512f] hover:text-white"
                >
                  🔔 Call your Santa
                </RhButton>
              )}
              <h1></h1>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center ">
            {isLoggedIn() && (
              <RhCard
                onClick={() => setIsInviteFormOpen(true)}
                className="w-[90vw] sm:w-[40vw] p-2 my-4 relative cursor-pointer card-hover hover:scale-105 duration-150 ease-out bg-gradient-to-r  from-[#ff512f] to-[#dd2476]"
              >
                <div className="flex flex-col justify-between items-">
                  {/* name */}
                <span className="uppercase font-extrabold tracking-widest text-white">  {currentEmployee?.name}</span>
                  <div className=" my-2 gap-1 cursor-pointer text-left text-2xl flex items-center font-extrabold hover:font-extrabold text-white"></div>
                </div>
                <div>
                  <div className="">
                    <div className=" flex flex-col gap-3 justify-center items-center my-4">
                      <p className="text-white text-center tracking-wider">
                        {currentEmployee?.isGiftReceived
                          ? " GIFT RECEIVED &"
                          : ""}
                      </p>
                      <p className="text-white text-xl mb-2">
                        You have guessed
                        <span className="animate-bounce "> </span>
                      </p>

                      <h2>
                        {" "}
                        <span className="lg:text-4xl  text-2xl text-center mb-2 font-extrabold tracking-wider animate-bounce ">
                          {currentEmployee?.yourMonk || "---------"}
                        </span>
                      </h2>

                      <h4 className="text-white">as secret monk</h4>
                    </div>

                    <div
                      onClick={() => setIsGuessedListOpen(true)}
                      className=" h-10  text-red-500  gap-2 mt-4  cursor-pointer bg-white   rounded-md flex justify-center items-center"
                    >
                      <p className="t font-extrabold">Who guessed me </p>
                      <p className="animate-bounce"> ❓ </p>
                    </div>
                  </div>

                  <p className="flex items-center justify-end gap-1 reltive">
                    {currentEmployee?.address?.length > 5 && (
                      <CopyToClipboard
                        text={currentEmployee?.address}
                        onCopy={(e) => {
                          RhToast.success("Address copied.");
                        }}
                      >
                        <></>
                      </CopyToClipboard>
                    )}
                  </p>
                </div>
                {/* //thanks */}
                {currentEmployee?.address && (
                  <>
                    <div className=" text-white absolute top-4 z-10 right-1 rotate-45 translate-x-11 bg-gray-800 rounded-md  text-xs font-extrabold w-auto inline-block px-6 py-1">
                      Thank you 🎉
                    </div>
                    {currentEmployee?.isGiftReceived && (
                      <div className="absolute top-7 animate-pulse right-0 h-16 z-20 flex  ">
                        <img className="h-24 " src={gift} alt="" />
                      </div>
                    )}
                  </>
                )}
              </RhCard>
            )}

            {/* <div className="flex justify-center flex-col   flex-wrap ">
       
              {
                <div className="">
                  <div className="h-6  flex justify-center">
                    {searchFilter.length > 0 &&
                      filteredEmployees?.length > 0 && (
                        <RhLabel className="text-white text-center">
                          👁️ Click on list see wish list of the monk 👁️
                        </RhLabel>
                      )}
                  </div>
                  {isLoggedIn() ? (
                    <RhInputGroup className="bg-gradient-to-r w-[90vw] sm:w-[40vw] rounded-md animate-pulse  from-[#ff512f] to-[#dd2476]">
                      <RhIcon icon="ic:round-search" size="lg" />
                      <RhInput
                       
                        type="text"
                        placeholder=" Who is your secret monk ?"
                        className="py-4 px-6 "
                        value={searchFilter}
                        disabled={!isLoggedIn()}
                        onChange={(e) => setSearchFilter(e.target.value)}
                      />
                    </RhInputGroup>
                  ) : (
                    <></>
                  )}
                  <RhScrollbar className="w-[90vw] sm:w-[40vw] h-[200px] overflow-y-auto">
                    {searchFilter &&
                      filteredEmployees?.map((item) => {
                        return (
                          <div className="">
                            <RhListItem
                              onClick={() => {
                                setShowingData(item);
                                setIsOpen(true);
                              }}
                              className="flex items-center bg-gradient-to-r from-[#ff512f] to-[#dd2476]  my-2 cursor-pointer"
                            >
                              <RhListItem.Icon variant="primary" align="start">
                                <RhAvatar
                                 
                                  size="sm"
                                  name={"item?.name"}
                                ></RhAvatar>
                              </RhListItem.Icon>

                              <RhListItem.Text
                                primary={
                                  <p className="button text-white font-semibold">
                                    {item?.name}
                                  </p>
                                }
                                secondary={item?.email}
                              />
                            </RhListItem>
                          </div>
                        );
                      })}
                    {searchFilter && filteredEmployees?.length == 0 && (
                      <div className="bg-white p-2 mt-3">No Monks found..</div>
                    )}
                  </RhScrollbar>
                </div>
              }
            </div> */}

            {/* <ReactAudioPlayer src={audio} autoPlay controls /> */}

            {/* // add wishlist */}
            <RhDialog
              className=" flex flex-col gap-4 p-10 w-[90vw] sm:w-[60vw]"
              isOpen={isInviteFormOpen}
              onClose={() => setIsInviteFormOpen(!open)}
            >
              <h2 className="lg:tex-4xl text-xl">
                {" "}
                🎁 Update Wish List & Address 🎁
              </h2>
              <RhDivider></RhDivider>
              {/* <span>{currentEmployee?.name}</span> */}

              <Formik
                initialValues={currentEmployee}
                enableReinitialize
                onSubmit={onSubmitWish}
              >
                {({ values }) => (
                  <Form>
                    {/* {console.log(currentEmployee, "888888")} */}
                    <div>
                      {values?.wishes?.map((wish, index) => (
                        <div className="my-4">
                          {/* {console.log(wish)} */}
                          <RhInputFormik
                            block
                            required
                            label="  🎉  Wish "
                            type="text"
                            name={`wishes[${index}].title`}
                            className=" "
                          />
                          <RhInputFormik
                            block
                            // required
                            isOptional
                            // label="Link ( paste link if you want)"
                            type="text"
                            placeholder="Link ( paste link if you want)"
                            name={`wishes[${index}].link`}
                            className="mb-2 h-6 text-sm"
                          />
                        </div>
                      ))}

                      <RhInputFormik
                        block
                        required
                        label="🗒️ Address ( with Pin Code and  Mo. No.)"
                        type="textarea"
                        name="address"
                        className=" "
                        rows="4"
                      />

                      <div className="flex justify-between my-5">
                        <RhButton
                          // disabled={isSendingRequest}

                          layout="link"
                          onClick={() => {
                            setIsInviteFormOpen(false);
                          }}
                        >
                          Cancel
                        </RhButton>
                        <RhButton
                          type="submit"
                          disabled={isLoading}
                          variant="primary"
                        >
                          {isLoading ? "Updating...." : "Update Wishlist 🚀"}
                        </RhButton>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </RhDialog>

            {/* //show */}
            <RhDialog
              className=" flex flex-col gap-3  w-[90vw] sm:w-[60vw]"
              isOpen={isOpen}
              onClose={() => {
                setShowingData({});
                setIsOpen(!open);
              }}
            >
              <RhCard>
                <RhCardBody>
                  <div className="flex justify-between">
                    <h2 className="lg:text-4xl text-xl mb-4 text-center w-full">
                      {" "}
                      🎁 {showingData?.name} ⁉️ 🎁
                    </h2>

                    {loggedInUser?.id == showingData?._id && (
                      <RhIcon
                        className="bg-blue-500 p-2 cursor-pointer rounded-full text-white shadow-md"
                        onClick={() => {
                          setIsOpen(false);
                          setIsInviteFormOpen(true);
                        }}
                        icon="mdi:pencil"
                      ></RhIcon>
                    )}
                  </div>

                  <div className="">
                    <div className="flex justify-center items-center gap-4"></div>

                    {showingData?.wishes?.length > 0 &&
                      showingData?.wishes?.map((data, index) => {
                        return (
                          <>
                            <div className="">
                              <RhListItem className="flex items-center  my-2 ">
                                <RhListItem.Icon
                                  variant="primary"
                                  align="start"
                                >
                                  {
                                    <div className="flex items-center gap-2">
                                      {/* <span className="font-extrabold">{index + 1}</span>  */}
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

                    {showingData?.address?.length > 5 && (
                      <RhCard>
                        <RhCardBody>
                          <CopyToClipboard
                            text={showingData?.address}
                            onCopy={() => {
                              RhToast.success("Address copied.");
                            }}
                          >
                            <p className="flex flex-wrap flex-col">
                              🗒️ {showingData?.address}
                            </p>
                          </CopyToClipboard>
                        </RhCardBody>
                      </RhCard>
                    )}
                  </div>
                </RhCardBody>
              </RhCard>
              <div className="flex justify-between">
                {showingData?.address?.length > 5 ? (
                  <CopyToClipboard
                    text={showingData?.address}
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
                  disabled={isLoading}
                >
                  Ok Got it
                </RhButton>
              </div>
            </RhDialog>

            <RhDialog
              className=" flex flex-col gap-6  w-[90vw] sm:w-[50vw]"
              isOpen={isAdOpen}
              onClose={() => {
                // setShowingData({});
                setIsAdOpen(false);
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
                      setIsAdOpen(false);
                    }}
                  >
                    ❌
                  </div>
                </div>
                <div className="flex gap-2">
                  <img className="lg:w-44 w-32" src={santapoint} alt="" />
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-lg lg:text-4xl font-rubik text-[#ff512f]">
                      Remembered the Date ?
                    </h1>
                    <h2 className="text-sm lg:text-3xl">
                      To be announced...
                    </h2>
                    {/* <div className="relative w-full m-auto"> */}
                    {/* <div
                      onClick={() => {
                        setIsShowingLink(true);
                      }}
                      className="bg-[#ff512f] hover:translate-x-10 hover:-translate-x-10 duration-75  w-[70%] cursor-pointer py-1 px-3 text-white font-extralight  border border-dotted flex justify-center items-center"
                    >
                      {!isShowingLink ? (
                        " REVEAL LINK"
                      ) : (
                        <>
                          <span className="text-black font-extrabold">
                            WAIT 👋
                          </span>
                        </>
                      )}
                    </div> */}

                    {/* </div> */}
                  </div>
                </div>
              </div>
            </RhDialog>

            <RhDialog
              className=" flex flex-col gap-6  w-[90vw] sm:w-[50vw]"
              isOpen={isGuessedListOpen}
              onClose={() => {
                // setShowingData({});
                setIsGuessedListOpen(false);
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
                      setIsGuessedListOpen(false);
                    }}
                  >
                    ❌
                  </div>
                </div>
                <div className="my-2 flex justify-center">
                  {!whoGuessedYourList?.length ? (
                    <img className="lg:w-44 w-20" src={sadSanta} alt="" />
                  ) : (
                    <img className="lg:w-44 w-20" src={happySanta} alt="" />
                  )}
                </div>
                <div className="flex gap-2 justify-center">
                  <div className="flex flex-col gap-4 justify-center items-center">
                    {!whoGuessedYourList?.length ? (
                      <>
                        <h1 className="text-lg lg:text-4xl font-rubik text-[#ff512f]">
                          No one has guessed you.
                        </h1>
                        <h2 className="text-sm lg:text-3xl">
                          Keep Checking !!
                        </h2>
                      </>
                    ) : (
                      <>
                        <h1 className="text-lg lg:text-4xl font-rubik text-[#ff512f]">
                          Hey
                        </h1>

                        {whoGuessedYourList?.map((data) => {
                          return (
                            <p className="text-xl font-semibold tracking-wide">
                              {data.name}
                            </p>
                          );
                        })}

                        <p> guessed you as secret santa?</p>

                        <h2 className="text-sm lg:text-xl">Really ??</h2>

                        
                      </>
                    )}

                 
                  </div>
                </div>
              </div>
            </RhDialog>
          </div>
        </div>

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
            <div className="flex justify-center">
              <img className="lg:w-44 w-32" src={santapoint} alt="" />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-lg lg:text-4xl font-rubik text-[#ff512f]">
                  Hey Monk 👋
                </h1>
                <p> Have you received your gift ?</p>
                <h2 className="text-sm lg:text-3xl">
                  Who is your secret monk ?
                </h2>
                {/* <RhLabel className="text-left">Guess your monk</RhLabel> */}
                <RhSelect
                  className="w-full"
                  options={employees}
                  value={myMonk}
                  onChange={(val) => {
                    if (currentEmployee?.name == val?.name) {
                      alert("LOL, You are not your secret monk !!");
                      return;
                    }
                    setMyMonk(val);
                  }}
                  placeholder="Guess your monk"
                  getOptionValue={(val) => val.name}
                  getOptionLabel={(val) => val.name}
                ></RhSelect>

                <div className="">
                  <RhInput
                    type="checkbox"
                    value={isReceived}
                    checked={isReceived}
                    onChange={(e) => {
                      // console.log(e);
                      setIsReceived(!isReceived);
                    }}
                  ></RhInput>{" "}
                  Yes I have received the gift.
                </div>

                <div className="flex w-full gap-2 justify-end">
                  {/* <RhButton
                    onClick={() => {
                      setIsGifDialogOpen(false);
                    }}
                    layout="outline"
                    className="border border-red-500 text-red-500"
                  >
                    Cancel
                  </RhButton> */}
                  <RhButton
                    className="bg-red-500 hover:bg-red-500 w-full"
                    onClick={() => {
                      onConfirmMonk();
                    }}
                    disabled={isLoading}
                  >
                    Confirm
                  </RhButton>
                </div>
              </div>
            </div>
          </div>
        </RhDialog>

        {/* //dancing */}
        <div className="mb-20"></div>
        <div className="absolute bottom-0 right-0">
          {/* <img className="h-40" src={running}></img> */}
        </div>
        <div className="absolute bottom-0 left-0">
          {/* <img className="h-40" src={running}></img> */}
        </div>
      </div>
    </div>
  );
}

export default Index;
