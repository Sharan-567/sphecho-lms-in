import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Profession from "./pages/Profession";
import Curriculum from "./pages/Curriculum/Curriculum";
import ResourceHub from "./pages/ResourceHub";
import Dashboard from "./pages/DashBoard/";
import { Course } from "./sections";
import DashBoard from "./pages/DashBoard/";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={isLoggedIn ? <Dashboard /> : <Home />} />
            <Route path="/profession" element={<Profession />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/resourcehub" element={<ResourceHub />} />c
            {isLoggedIn && (
              <>
                <Route path="/courses" element={<Course />} />
              </>
            )}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
