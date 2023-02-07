import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../features/settings";
import { BsArrowLeft } from "react-icons/bs";
// type = 1
//user_id, email, firstname, role: "1 -> patient" , "2 -> doctor/staff", user_type : 1-pa, 2-staff

// type 2
//user_id,  email, firstname, course: id,  user_type : 1-pa, 2-staff

const UpdateUser = ({ setState, currentSelectedUser }) => {
  const [data, setData] = useState({
    firstname: currentSelectedUser.firstname || currentSelectedUser.Name,
    email: currentSelectedUser.Email,
    role: "",
    user_type: "",
  });
  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  }>({ message: "", type: "success" });

  let token = localStorage.getItem("token");

  const updateUserHandler = () => {
    if (token) {
      const headers = {
        Authorization: `token ${token}`,
      };

      const formData = new FormData();
      formData.append("user_id", currentSelectedUser._id);
      formData.append("firstname", data.firstname);
      formData.append("email", data.email);
      formData.append("role", data.role);
      formData.append("user_type", data.user_type);
      formData.append("type", "1"); //type 1 means update the user
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
  console.log(data);

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
        <h3 className="mb-3">Update User {currentSelectedUser.name}</h3>
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
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            aria-label="role"
            value={data.role}
            onChange={inputChangeHandler}
          >
            <option>Open this select Role</option>
            <option value="1">Patient</option>
            <option value="2">Staff</option>
            <option value="3">StaffProvider</option>
            <option value="3">SuperUser</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>User Type</Form.Label>
          <Form.Select
            aria-label="user Type"
            name="user_type"
            value={data.user_type}
            onChange={inputChangeHandler}
          >
            <option>Open this select user_type</option>
            <option value="1">Patient</option>
            <option value="2">Staff</option>
            <option value="3">StaffProvider</option>
            <option value="3">SuperUser</option>
          </Form.Select>
        </Form.Group>
        <Button className="px-3 py-2 text-white" onClick={updateUserHandler}>
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
