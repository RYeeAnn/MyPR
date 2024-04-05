//App.jsx

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Logs } from "./pages/Logs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
