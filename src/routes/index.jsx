import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { DefaultLayout } from "../layouts";
import { DefaultRoute, pageRoutes } from "./config";
import { getTokenData, isLoggedIn } from "../utils";
import NotFound from "../common/base/NotFound";
// import { useGetUserByIdQuery } from "../services/api";
import { RhToast } from "@rhythm-ui/react";

const matchedRoutes = [
  "/update-mentor-profile",
  "/update-investor-profile",
  "/update-founder-profile",
  "/edit-company",
];

function FinalRoute({ route }) {
  const navigate = useNavigate();
  // const loggedUserId = getTokenData()?.user_id;
  // const { data: loggedInUserData } = useGetUserByIdQuery(loggedUserId);
  // // checking if logged in and hasn't filled required info then , navigate to the profile
  // useEffect(() => {
  //   if (isLoggedIn() && !matchedRoutes.includes(route.path)) {
  //     if (loggedInUserData?.group?.name == "Founder") {
  //       if (!loggedInUserData?.company_onboard) {
  //         return navigate("/edit-company");
  //       }
  //       if (!loggedInUserData?.user_onboard) {
  //         return navigate("/update-founder-profile");
  //       }
  //     }

  //     if (loggedInUserData?.group?.name == "Investor") {
  //       if (!loggedInUserData?.user_onboard) {
  //         return navigate("/update-investor-profile");
  //       }
  //     }

  //     if (loggedInUserData?.group?.name == "Mentor") {
  //       if (!loggedInUserData?.user_onboard) {
  //         return navigate("/update-mentor-profile");
  //       }
  //     }
  //   }
  // }, [loggedInUserData, route]);

  useEffect(() => {
    if (!route.public && !isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  return route.layout === "blank" ? (
    <route.component />
  ) : (
    <DefaultLayout>
      <Suspense fallback={null}>
        <route.component />
      </Suspense>
    </DefaultLayout>
  );
}

function Router() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to={DefaultRoute} />} />
        {pageRoutes.map((route, index) => (
          <Route
            key={route.path}
            path={route.path}
            element={<FinalRoute route={route} />}
          />
        ))}
        <Route path="*" element={<NotFound>Page not found!!</NotFound>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
