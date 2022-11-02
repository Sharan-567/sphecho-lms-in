import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./store";
import Home from "./pages/Home";
import Profession from "./pages/Profession";
import Curriculum from "./pages/Curriculum/Curriculum";
import ResourceHub from "./pages/ResourceHub";
import Dashboard from "./pages/DashBoard/";

// adminSection
import { AdminMain, CousreMangement, TopicMangment } from "./adminSections";
import {
  Course,
  TopicsList,
  Main,
  CourseDetail,
  Cart,
  Webinars,
} from "./sections";
import AdminDashboard from "./pages/AdminDashBoard/AdminDashBoard";

function App() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const userType = localStorage.getItem("userType");
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
                <Route path="detail/:id" element={<CourseDetail />} />
              </Route>
              <Route path="webinars" element={<Webinars />} />
              <Route path="cart" element={<Cart />} />
              <Route path="admin">
                <Route index element={<AdminMain />} />
                <Route path="coursesMangement" element={<CousreMangement />} />
                <Route path="topicsMangement" element={<TopicMangment />} />
              </Route>
            </Route>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
