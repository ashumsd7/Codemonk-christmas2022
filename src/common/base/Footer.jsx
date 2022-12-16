import { RhDivider, RhIcon } from "@rhythm-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import FOOTER_LOGO_IMG from "../../assets/Birac_logo__1_.png";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#00223C] p-20 -mt-10 ">
      <div className="grid lg:grid-cols-3  grid-cols-1">
        {/* logo */}
        <div className=" mb-5 lg:mb-0 lg:flex lg:justify-start justify-center h-40 w-44 ">
          <img
            onClick={() => {
              navigate("/home");
            }}
            className="lg:flex lg:justify-start justify-center cursor-pointer"
            src={FOOTER_LOGO_IMG}
            alt=""
          />
        </div>

        {/* links */}

        <div className=" ">
          <div className="mb-6">
            <p
              href="/"
              className="body link text-secondary-50 text-center lg:text-left "
            >
              Home
            </p>
          </div>
          <div className="flex flex-col gap-2 mb-5 lg:mb-0 text-center lg:text-left">
            <a href="/startups" className="body link text-secondary-50">
              Startups
            </a>
            <a href="/mentors" className="body link text-secondary-50">
              Investors & Mentors
            </a>

            <a href="/jobs" className="body link text-secondary-50">
              Jobs
            </a>
            <a href="/announcements" className="body link text-secondary-50">
              Highlights
            </a>
            <a href="/discussions" className="body link text-secondary-50">
              Discussions
            </a>
          </div>
        </div>

        {/* info */}

        <div className=" text-secondary-50 b-5 lg:mb-0  text-center lg:text-left  ">
          <p className="mb-6 font-bold"> Reach US</p>

          <div className="flex flex-col gap-3">
            <p className="flex flex-wrap body">
              Biotechnology Industry Research Assistance Council (BIRAC)
            </p>
            <p className="flex flex-wrap body">
              1st Floor, MTNL Building 9,CGO Complex, Lodhi Road,New
              Delhi-110003
            </p>{" "}
            <p className="flex flex-wrap body lg:text-left text-center ">
              <a className="link text-secondary-50" href={`tel:+${1124389600}`}>
                Ph: +91-11-24389600{" "}
              </a>
            </p>
            {/* social media */}
            {/* <p className="flex flex-wrap body">Ph: +91-11-24389600</p> */}
            <div className="flex gap-9 mt-2">
              <RhIcon icon="mdi:linkedin" className="text-xl"></RhIcon>
              <RhIcon icon="mdi:facebook" className="text-xl"></RhIcon>
              <RhIcon icon="mdi:instagram" className="text-xl"></RhIcon>
              <RhIcon icon="mdi:twitter" className="text-xl"></RhIcon>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <RhDivider className=""></RhDivider>
        <h3 className="mb-2 mt-6 text-secondary-50">Disclaimer:</h3>
        <p className="body text-secondary-50">
          Information showcased at the BIRAC's Biotech Showcase Portal is
          received from the innovators and gets updated at regular intervals and
          BIRAC in no way certifies and will be responsible if any
          discrepancy/error is found in the information featured. Additionally,
          BIRAC takes no responsibility for, and will not be liable for any
          losses, damages/compensation, etc. due to the information received
          through the BIRAC's Portal.
        </p>
      </div>
    </div>
  );
}

export default Footer;
