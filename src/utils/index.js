import jwt_decode from "jwt-decode";
import * as Yup from "yup";
const isLoggedIn = () => {
  let isThere = localStorage.getItem("token");
  return isThere;
};

const logOut = () => {
  localStorage.removeItem("token");
  // localStorage.removeItem("refresh");
  // localStorage.removeItem("userId");
  // localStorage.removeItem("role");
  window.location.reload();
};

const getTokenData = () => {
  // return true
  if (localStorage.getItem("token")) {
    let decoded = jwt_decode(localStorage.getItem("token"));
    return decoded;
  } else {
    return false;
  }
};

const getDataByToken = (token) => {
  try {
    if (token) {
      let decoded = jwt_decode(token);
      return decoded;
    } else {
      return false;
    }
  } catch (err) {
    return "TOKEN ERROR";
  }
};

const YupUrlValidation = Yup.string()
  .matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url!"
  )
  .nullable();

export { isLoggedIn, logOut, getTokenData, getDataByToken, YupUrlValidation };
