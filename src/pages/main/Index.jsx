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
  RhToast,
  RhTooltip,
} from "@rhythm-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { useGetUsersQuery, usePatchUserMutation } from "../../services/api";
import { getTokenData, isLoggedIn, logOut } from "../../utils";

function Index() {
  const { data: employees = [] } = useGetUsersQuery();
  const loggedInUser = getTokenData();

  const currentEmployee = employees.find(
    (employee) => employee._id == loggedInUser.id
  );

  const [searchFilter, setSearchFilter] = useState("");
  const navigate = useNavigate();
  const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [updateProfile, { isLoading }] = usePatchUserMutation();
  const [showingData, setShowingData] = useState({});
  const [filteredEmployees, setFilteredEmployees] = useState([]);

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

  const initialValues = {};

  const onSubmitWish = (data) => {
    updateProfile({ wishList: data.wishList }).then(() => {
      RhToast.success("Updated!!!");
    });
  };
  return (
    <div className=" h-screen bg-no-repeat bg-cover w-full   bg-[url('https://cdn.pixabay.com/photo/2020/11/13/23/53/christmas-5740363_960_720.png')]">
      <div className="flex justify-between w-full p-2">
        {isLoggedIn() && (
          <RhButton
            className=" flex text-white justify-center gap-2 items-center"
            layout="link"
            onClick={() => setIsInviteFormOpen(true)}
          >
            <RhIcon icon="mdi:pencil"></RhIcon> <span>Edit your wish</span>
          </RhButton>
        )}
        {isLoggedIn() ? (
          <RhTooltip title="Logout" position="left">
            <RhAvatar
              name={loggedInUser?.name}
              type="image"
              onClick={() => {
                logOut();
              }}
              className="hover:rotate-180 duration-200 ease-in cursor-pointer hover:scale-75"
              src="https://m.media-amazon.com/images/I/51Gb8GLccNL._SY450_.jpg"
            ></RhAvatar>
          </RhTooltip>
        ) : (
          <RhButton
            layout="link"
            className=" gap-2 text-white flex justify-center items-center"
            onClick={() => {
              navigate("/login");
            }}
          >
            <RhIcon icon="mdi:lock"></RhIcon> <span>Login</span>
          </RhButton>
        )}
        {/* </div> */}
        {/* <div className=""></div> */}
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="flex justify-center  gap-10 flex-wrap ">
          <div className="mt-10 ">
            <div className="h-6 mb-4">
              {searchFilter.length > 0 && filteredEmployees?.length > 0 && (
                <RhLabel className="text-white text-center">
                  👁️ Click on list see wish list 👁️
                </RhLabel>
              )}
            </div>
            <RhInputGroup>
              <RhIcon icon="ic:round-search" size="lg" />
              <RhInput
                // disabled={isLoading}
                type="text"
                placeholder="Kiranraj"
                className="py-4 px-6"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </RhInputGroup>

            <RhScrollbar className="max-w-md h-[200px] overflow-y-auto">
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
                            // type={data?.receiver?.image ? "image" : "text"}
                            // src={data?.receiver?.image}
                            size="sm"
                            name={"item?.name"}
                          ></RhAvatar>
                        </RhListItem.Icon>

                        <RhListItem.Text
                          primary={
                            <p className="button text-white font-semibold">{item?.name}</p>
                          }
                          secondary={item?.email}
                        />
                      </RhListItem>
                    </div>
                  );
                })}
              {searchFilter && filteredEmployees?.length == 0 && (
                <div className="bg-white p-2 mt-3">No Records...</div>
              )}
            </RhScrollbar>
          </div>
        </div>

        {/* // add wishlist */}
        <RhDialog
          className=" flex flex-col gap-6 p-10 w-[90vw] sm:w-[60vw]"
          isOpen={isInviteFormOpen}
          onClose={() => setIsInviteFormOpen(!open)}
        >
          <h2> 🎁 Update Wish List 🎁</h2>
          <span>{currentEmployee?.name}</span>

          <Formik
            initialValues={currentEmployee}
            enableReinitialize
            onSubmit={onSubmitWish}
          >
            {({ values }) => (
              <Form>
                <div>
                  {values.wishList?.map((wish, index) => (
                    <RhInputFormik
                      block
                      label="Wishlist 1"
                      type="text"
                      name={`wishList[${index}]`}
                      className=" "
                    />
                  ))}

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
                      // disabled={isSendingRequest}
                      variant="primary"
                    >
                      {false ? <RhLoader /> : "Update Wish "}
                    </RhButton>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </RhDialog>

        {/* //show */}
        <RhDialog
          className=" flex flex-col gap-6 p-10 w-[90vw] sm:w-[60vw]"
          isOpen={isOpen}
          onClose={() => {
            setShowingData({});
            setIsOpen(!open);
          }}
        >
          <div className="flex justify-between">
            <h2> {showingData?.name}</h2>
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
          <RhDivider></RhDivider>
          {currentEmployee?.wishList?.length > 0 &&
            currentEmployee?.wishList?.map((data, index) => {
              return (
                <>
                  <RhListItem className="flex items-center ">
                    <RhListItem.Icon variant="primary" align="start">
                      {
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold">{index + 1}</span>{" "}
                          <RhAvatar
                            // type={data?.receiver?.image ? "image" : "text"}
                            // src={data?.receiver?.image}
                            size="sm"
                            name={"data?.receiver?.name"}
                          ></RhAvatar>
                          <RhListItem.Text
                            primary={<p className="button">{data}</p>}
                          />
                        </div>
                      }
                    </RhListItem.Icon>
                  </RhListItem>
                  <RhDivider></RhDivider>
                </>
              );
            })}
          <div className="flex justify-end">
            <RhButton
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Theek hai yaar 👌
            </RhButton>
          </div>
        </RhDialog>
      </div>
    </div>
  );
}

export default Index;
