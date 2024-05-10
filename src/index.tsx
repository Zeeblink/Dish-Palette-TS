import React from "react";
import ReactDOM from "react-dom/client";
import "./font.css"
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeInfo from "./Components/RecipeInfo";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/recipe/:id" element={<RecipeInfo />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
