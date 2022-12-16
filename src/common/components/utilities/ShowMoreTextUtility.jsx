import React, { useState } from "react";

function ShowMoreTextUtility({ length = 0, text = "" }) {
  const [isShowingAllText, setIsShowingAllText] = useState(false);
  let isValidate = true;

  if (!length || !text || length >= text?.split(" ").length) {
    isValidate = false;
  }

  return (
    <div>
      {isShowingAllText || !isValidate ? (
        <div>
          {text}
          {isValidate && (
            <span
              className="link ml-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsShowingAllText(false);
              }}
            >
              Less
            </span>
          )}
        </div>
      ) : (
        <div>
          {text.split(" ").splice(0, length).join(" ")}{" "}
          <span
            className="link ml-1 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsShowingAllText(true);
            }}
          >
            More
          </span>
        </div>
      )}
    </div>
  );
}

export default ShowMoreTextUtility;
