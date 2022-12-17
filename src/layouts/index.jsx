import React from "react";
// import Navbar from "../common/base/Navbar";

function DefaultLayout({ children }) {
  return (
    <div className="h-screen">
      {/* <Navbar /> */}
      {/* px-20 pt-[104px] h-full overflow-y-auto */}
      <div className="">{children}</div>
    </div>
  );
}

export { DefaultLayout };
