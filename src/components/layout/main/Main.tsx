import React from "react";
import { Routes, Route } from "react-router-dom";
import scss from "./Main.module.scss";
import HomePage from "../../../pages/homePage/HomePage";
import ChatBotPage from "../../../pages/botPage/ChatBotPage";

const Main = () => {
  return (
    <>
      <div className={scss.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bot" element={<ChatBotPage />} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
