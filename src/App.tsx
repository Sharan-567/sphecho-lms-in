import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Profession from "./pages/Profession";
import Curriculum from "./pages/Curriculum/Curriculum";
import ResourceHub from "./pages/ResourceHub";
import Dashboard from "./pages/DashBoard/";
import { Course, TopicsList, Main, Assessment } from "./sections";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div>
      <Router>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="profession" element={<Profession />} />
              <Route path="curriculum" element={<Curriculum />} />
              <Route path="resourcehub" element={<ResourceHub />} />
            </Route>
          ) : (
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Main />} />
              <Route path="courses">
                <Route index element={<Course />} />
                <Route path=":courseId" element={<TopicsList />} />
              </Route>
              <Route path="assessment" element={<Assessment />} />
            </Route>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
