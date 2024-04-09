//App.jsx

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Logs } from "./pages/Logs";
import { Routines } from "./pages/Routines";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/routines" element={<Routines />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
