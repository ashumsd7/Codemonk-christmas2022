import React, { useEffect, useState } from "react";

function NotFound() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typedData, setTypedData] = useState("");
  const [isError, setIsError] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typiode.com/todos");
      var data = await response.json();
      setIsError(false);
    } catch {
      setLoading(false);
      setIsError(true);
      setTodos([]);
    }
    setLoading(false);
    // console.log(data);
    const sortedData = data?.splice(1, 10);
    // console.log(sortedData);
    setTodos(sortedData);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-2 flex justify-center items-center">
      <div className="">
        <input
          value={typedData}
          onChange={(e) => {
            setTypedData(e.target.value);
          }}
          className="border p-2"
        ></input>
        <button
          onClick={() => {
            let splitValue = typedData?.split(" ");
            // console.log(splitValue);
            if (
              splitValue?.includes("Task") ||
              splitValue?.includes("task") ||
              splitValue?.includes("TASK")
            ) {
              // console.log("hai to");
              return;
            } else {
              setTodos((prev) => {
                return [...todos, { title: typedData, completed: false }];
              });
            }
          }}
          className="border bg-blue-400 p-2 text-white rounded-md ml-2"
        >
          Submit
        </button>
        {!loading &&
          todos?.map((data) => {
            return (
              <div className={` ${!data?.completed ? "" : "line-through"}`}>
                {data?.title}
              </div>
            );
          })}
        <div className="">{loading && "loading..."}</div>
        <div className="text-red-500"> {isError && "Error while loading"}</div>
      </div>
    </div>
  );
}

export default NotFound;
