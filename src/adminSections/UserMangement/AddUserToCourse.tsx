import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { BASE_URL } from "../../features/settings";
import type { Doctor, Patient } from "./definations";
import type { Course } from "../../definations/course";

// type = 1
//user_id, email, firstname, role: "1 -> patient" , "2 -> doctor/staff", user_type : 1-pa, 2-staff

// type 2
//user_id,  email, firstname, course: id,  user_type : 1-pa, 2-staff

// type 3
//user_id,  email, firstname, course: id,  user_type : 1-pa, 2-staff

type Props = {
  setState: React.Dispatch<
    React.SetStateAction<
      "updateUser" | "addUserToCourse" | "addStudentToCourse" | undefined
    >
  >;
  currentSelectedUser: Patient | Doctor;

  courses: Course[];
};

const AddUserToCourse = ({
  setState,
  currentSelectedUser,
  courses,
}: Props) => {
  const [data, setData] = useState({
    firstname:
      currentSelectedUser.firstname ||
      currentSelectedUser.name ||
      currentSelectedUser.Name,
    email: currentSelectedUser.Email || currentSelectedUser.email,
    user_type: "",
    course: "",
  });
  const [message, setMessage] = useState<{
    message: string;
    type: "success" | "error";
  }>({ message: "", type: "success" });
  let token = localStorage.getItem("token");

  const AddUserToCourseHandler = () => {
    if (token) {
      const headers = {
        Authorization: `token ${token}`,
      };

      const formData = new FormData();
      if (currentSelectedUser._id)
        formData.append("user_id", currentSelectedUser._id);
      if (data.email) formData.append("email", data.email);
      if (data.user_type) formData.append("user_type", data.user_type);
      formData.append("type", "2");
      if (data.firstname) formData.append("firstname", data.firstname);
      formData.append("course", data.course);
      axios
        .post(`${BASE_URL}/master/user-course-update/`, formData, { headers })
        .then((res) => {
          setMessage({ message: res.data.message, type: "success" });
        })
        .catch((err) => {
          if (err.response) {
            setMessage({ message: err.response.statusText, type: "error" });
          } else if (err.request) {
            setMessage({ message: err.request, type: "error" });
          } else {
            setMessage({ message: err, type: "error" });
          }
        });
    }
  };

  const inputChangeHandler = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container w-50 py-5 px-2">
      <Button
        variant="white"
        className="p-0 d-flex justify-content-center"
        onClick={() => setState(undefined)}
      >
        <BsArrowLeft size="25" className="text-primary" />
        <p>Back</p>
      </Button>
      {message.message && message.type === "success" && (
        <div className="py-3 px-3 text-white bg-green mb-2 br-1">
          {message.message}
        </div>
      )}
      {message.message && message.type === "error" && (
        <div className="py-3 px-3 text-white bg-danger mb-2 br-1">
          {message.message}
        </div>
      )}
      <Form className="bg-graydark p-5 br-2">
        <h3 className="mb-3">Add User {currentSelectedUser.name} to Course</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstname"
            value={data.firstname}
            onChange={inputChangeHandler}
            type="text"
            placeholder="Enter FirstName"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={data.email}
            onChange={inputChangeHandler}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User Type</Form.Label>
          <Form.Select
            aria-label="user Type"
            name="user_type"
            value={data.user_type}
            onChange={inputChangeHandler}
            placeholder="Select user type"
          >
            <option>Open this UserType</option>
            <option value="1">Patient</option>
            <option value="2">Staff</option>
            <option value="3">StaffProvider</option>
            <option value="3">SuperUser</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select the Course</Form.Label>
          <Form.Select
            aria-label="Course"
            name="course"
            value={data.course}
            onChange={inputChangeHandler}
          >
            <option>Open this select Course</option>
            {(courses || []).map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button
          className="px-3 py-2 text-white"
          onClick={AddUserToCourseHandler}
        >
          Update User to Course
        </Button>
      </Form>
    </div>
  );
};

export default AddUserToCourse;
