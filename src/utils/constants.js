import LOGO_PLACEHOLDER from "../assets/logo-placeholder-image.png";
import BIRAC_LOGO from "../assets/birac_nav_logo.png";

const ALLOWED_SOCIAL_MEDIA_KEYWORDS = [
  "Twitter",
  "Facebook",
  "Linkedin",
  "Website",
  "Instagram",
];
const SOCIAL_PLATFORMS = [
  { id: 1, name: "Website" },
  { id: 2, name: "Linkedin" },
  { id: 3, name: "Instagram" },
  { id: 4, name: "Facebook" },
  { id: 5, name: "Twitter" },
];
const MATCHED_FOUNDERS_KEYWORDS = ["Founder", "Co-Founder"];
import EMPTY_DATA_IMAGE from "../assets/EMPTY_IMAGE.svg";

import TICK_MARK_IMAGE from "../assets/TICK_IMAGE.jpg";

const ALL_TEAM_SIZE = ["0-10", "11-50", "51-100", "101-500", "500+"];
const ALL_TEAM_SIZE_PAIRS = [
  {
    label: "0-10",
    value: "0-10",
  },
  {
    label: "11-50",
    value: "11-50",
  },
  {
    label: "51-100",
    value: "51-100",
  },
  {
    label: "101-500",
    value: "101-500",
  },
  {
    label: "500+",
    value: "500+",
  },
];

const ALL_STAGES = ["Pre-Product", "Post-Product"];
const ALL_INDUSTRIES = [
  { id: 1, name: "Healthcare" },
  { id: 2, name: "Agriculture/Environment" },
  { id: 3, name: "Industrial Biotech" },
  ,
];
const INITIAL_LOCATIONS = ["Bangalore", "Mangalore", "Mumbai"];

const EXPERTS_TYPE = ["Mentor", "Investor"];
const JOIN_BIRAC_AS_ROLE = [
  {
    label: "Mentor",
    value: "Mentor",
  },
  {
    label: "Investor",
    value: "Investor",
  },
  {
    label: "Founder of a Startup",
    value: "Founder",
  },
];
const ALL_WORK_TYPE = ["Remote", "Hybrid", "Onsite"];
const ALL_JOB_TYPE = ["Full Time", "Part Time", "Contract"];
const EXPERTS_AREA_OF_EXPERTISE = [
  { id: 1, name: "Agriculture" },
  { id: 2, name: "Environment" },
  { id: 3, name: "Seeds" },
  { id: 4, name: "Food Supplements" },
];

//startups

export {
  LOGO_PLACEHOLDER,
  ALLOWED_SOCIAL_MEDIA_KEYWORDS,
  MATCHED_FOUNDERS_KEYWORDS,
  BIRAC_LOGO,
  EMPTY_DATA_IMAGE,
  ALL_INDUSTRIES,
  ALL_TEAM_SIZE,
  ALL_STAGES,
  INITIAL_LOCATIONS,
  EXPERTS_TYPE,
  EXPERTS_AREA_OF_EXPERTISE,
  TICK_MARK_IMAGE,
  ALL_WORK_TYPE,
  ALL_JOB_TYPE,
  JOIN_BIRAC_AS_ROLE,
  ALL_TEAM_SIZE_PAIRS,
  SOCIAL_PLATFORMS,
};
