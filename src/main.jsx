import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RhThemeProvider, RhToastContainer } from "@rhythm-ui/react";
import App from "./App";
import { store } from "./store";
import mp3 from "../src/assets/notify.mp3";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RhThemeProvider theme="light">
        <RhToastContainer />
        <App />
        <audio src="./src/assets/notify2.mp3" autoPlay loop></audio>
      </RhThemeProvider>
    </Provider>
  </React.StrictMode>
);
