import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./store";
import Home from "./pages/Home";
import Profession from "./pages/Profession";
import Curriculum from "./pages/Curriculum/Curriculum";
import ResourceHub from "./pages/ResourceHub";
import Dashboard from "./pages/DashBoard/";
import Login from "./pages/Login/Login";

// adminSection
import {
  AdminMain,
  AssessmentMangement,
  CousreMangement,
  TopicMangment,
  QuestionMangement,
  BadgeMangement,
  CertificationMangement,
  UserMangement,
} from "./adminSections";
import {
  Course,
  TopicsList,
  Main,
  CourseDetail,
  Cart,
  Webinars,
  Certification,
} from "./sections";

import Webinar from "./pages/Home/Webinar";
import Features from "./pages/Home/Features";
import Privacy from "./pages/Home/Privacy";
import Terms from "./pages/Home/Terms";
import CourseContainer from "./adminSections/courseMangement/CourseContainer";
import EventManagment from "./adminSections/EventsMangement/EventMangement";

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
              <Route path="webinar" element={<Webinar />} />
              <Route path="features" element={<Home />} />
              <Route path="contact" element={<Home />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="tandc" element={<Terms />} />

              <Route path="login" element={<Login />} />
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
              <Route path="certification" element={<Certification />} />
              <Route path="webinars" element={<Webinars />} />
              <Route path="cart" element={<Cart />} />
              <Route path="analytics" element={<AdminMain />} />
              <Route path="userMangement" element={<UserMangement />} />
              <Route path="coursesMangement" element={<CousreMangement />} />
              <Route path="eventMangement" element={<EventManagment />} />
              <Route
                path="coursesMangement/:courseId/:courseName/"
                element={<CourseContainer />}
              />
              <Route path="topicsMangement" element={<TopicMangment />} />
              <Route
                path="assessmentMangement"
                element={<AssessmentMangement />}
              />
              <Route path="questionMangement" element={<QuestionMangement />} />
              <Route path="badgeMangement" element={<BadgeMangement />} />
              <Route
                path="certificationMangement"
                element={<CertificationMangement />}
              />
              {/* <Route path="admin">
                <Route index element={<AdminMain />} />
                <Route path="userMangement" element={<UserMangement />} />
                <Route path="coursesMangement" element={<CousreMangement />} />
                <Route path="topicsMangement" element={<TopicMangment />} />
                <Route
                  path="assessmentMangement"
                  element={<AssessmentMangement />}
                />
                <Route
                  path="questionMangement"
                  element={<QuestionMangement />}
                />
                <Route path="badgeMangement" element={<BadgeMangement />} />
                <Route
                  path="certificationMangement"
                  element={<CertificationMangement />}
                />
              </Route> */}
            </Route>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
