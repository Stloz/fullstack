// import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./normalize.css";
import "./index.css";

import AppContext from "./App-context";
// import AppReduce from "./App-reduce";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppContext />);
