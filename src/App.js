import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />

        <Route path="/main" element={<MainPage />} />

        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
