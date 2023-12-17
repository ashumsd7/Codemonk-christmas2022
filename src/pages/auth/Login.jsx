import React from "react";
import LoginForm from "./components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/api";
import side_image from "../../assets/login2.svg";

function Login() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmitForm = async (data) => {
    login(data)
      .unwrap()
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);

        // localStorage.setItem("refresh", res.refresh);
        navigate("/");
      });
  };

  return (
    <div className="foverflow-y-hidden  h-screen bg-no-repeat bg-cover w-full  ">
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <LoginForm onSubmitForm={onSubmitForm} isLoading={isLoading} />
        <div className=" ">
          <img src={side_image}></img>
        </div>
      </div>
    </div>
  );
}

export default Login;
