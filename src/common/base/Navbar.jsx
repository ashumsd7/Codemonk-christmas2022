import {
  RhAvatar,
  RhButton,
  RhCard,
  RhDivider,
  RhIcon,
  RhImage,
  RhListContainer,
  RhListItem,
  RhPopover,
  RhTabs,
} from "@rhythm-ui/react";
import React, { useLayoutEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import { BIRAC_LOGO } from "../../utils/constants";
import { getTokenData, isLoggedIn, logOut } from "../../utils";
// import { useGetUserByIdQuery } from "../../services/api";
import classNames from "classnames";

const directoryRoutes = ["startups", "mentors"];
const userRoutes = [
  "profile",
  "user-management",
  "company-profile",
  "update-founder-profile",
  "update-investor-profile",
  "update-mentor-profile",
  "edit-company",
];
const jobRoutes = ["jobs", "edit-job", "add-job"];
const highlightsRoutes = ["announcements"];
const connectionsROutes = ["connections"];
const discussionsRoutes = ["discussions"];

function Navbar() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState();
  const [isDirectoryOpen, setIsDirectoryOpen] = useState();
  const [isUserDirectoryOpen, setIsUserDirectoryOpen] = useState();
  let loggedUserId = getTokenData()?.user_id;
  const location = useLocation();
  const { pathname } = useLocation();

  // const { data: loggedInUserData, isLoading: founderDetailsLoading } =
  //   useGetUserByIdQuery(loggedUserId);

  const handleTabValue = (value) => {
    if (!value) return;
    setTabValue(value);
    navigate(`/${value}`);
  };

  return (
    <RhCard className="z-50 lg:py-0 fixed top-0 w-full px-20 border-x-0 flex justify-between items-center border-t-0 h-20">
      <div className="flex justify-between items-center h-full  ">
        <div
          className="cursor-pointer h-full flex justify-center items-center gap-6 text-primary-500"
          onClick={() => {
            navigate("/");
          }}
        >
          <RhImage
            className="w-auto h-20"
            src="https://media.istockphoto.com/id/1166048674/vector/santa-claus-christmas-cartoon-character.jpg?s=612x612&w=0&k=20&c=G_g33yKh2rS-O2bFnC74lWo9z8e9cee3mfOatd3sBnM="
            alt=""
          />
          <span className=" font-bold fot text-danger-500     animate-text bg-gradient-to-r from-teal-500 via-danger-500 to-blue-500 bg-clip-text text-transparent text-sm lg:text-xl">
            {" "}
            WHO IS YOUR MONK
          </span>
        </div>
      </div>
      <div className="h-full lg:flex gap-6 hidden justify-center items-center">
        <div className="flex gap-12 h-full justify-center items-center cursor-pointer hover:text-danger-500     animate-text bg-gradient-to-r from-teal-500 via-danger-500 to-blue-500 bg-clip-text text-transparent text-xl">
          <div>See Wishlist</div>
        </div>
        {/* <div
          className="flex gap-12 h-full justify-center items-center cursor-pointer hover:text-danger-500 
        
        animate-text bg-gradient-to-r from-teal-500 via-danger-500 to-blue-500 bg-clip-text text-transparent text-xl font-black
        "
        >
          <div>Edit yours</div>
        </div> */}
        <div className="flex gap-12 h-full justify-center items-center">
          <div>
            <RhAvatar
              className="hover:rotate-180 duration-200 ease-in cursor-pointer hover:scale-75"
              size="sm"
              type="image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA0KNWY2VFM9FL1R0OuuIyQvO7u__TBVPfhfpYJ4RCNg&s"
            ></RhAvatar>
          </div>
        </div>
      </div>
    </RhCard>
  );
}

export default Navbar;
