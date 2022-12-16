import { RhButton, RhImage } from "@rhythm-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import LOGO_URL from "../../assets/404.png";
function InvalidResetLink() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col min-h-[90vh] pt-16 pb-12 ">
        <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-center flex-shrink-0">
            <a href="/" className="inline-flex">
              <RhImage className="w-auto h-12" src={LOGO_URL} alt="" />
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold  text-indigo-600 uppercase">
                TRY AGAIN
              </p>
              <h1 className="mt-2 text-4xl font-extrabold  text-gray-900 sm:text-5xl">
                INVALID RESET LINK
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <RhButton
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </RhButton>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InvalidResetLink;
