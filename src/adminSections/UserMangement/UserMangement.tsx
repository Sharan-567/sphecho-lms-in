import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../../features/settings";
import UpdateUser from "./UpdateUser";
import AddUserToCourse from "./AddUserToCourse";
import AddStudentToCourse from "./AddStudentToCourse";

import type { Patient, Doctor } from "./definations";
import ListItem from "./ListItem";

type User = {
  users: Patient[];
  doctors: Doctor[];
};

const UserMangement = () => {
  const [users, setUsers] = React.useState<User>();
  const [courses, setCourses] = React.useState([]);
  const [state, setState] = React.useState<
    "updateUser" | "addUserToCourse" | "addStudentToCourse"
  >();
  const [currentSelectedUser, setCurrentSelectedUser] = React.useState<
    Patient | Doctor
  >({});
  // const [currentSelectedUserRole, setCurrentSelectedUserRole] = React.useState<
  //   "1" | "2" | "3"
  // >();
  let token = localStorage.getItem("token");

  const [error, setError] = React.useState("");

  const getListOfUser = React.useCallback(() => {
    if (token) {
      const headers = {
        Authorization: `token ${token}`,
      };
      axios
        .get(`${BASE_URL}/master/user-management/`, { headers })
        .then((res) => {
          setUsers(res.data.users);
          setCourses(res.data.courses);
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.statusText);
          } else if (err.request) {
            setError(err.request);
          } else {
            setError(err);
          }
        });
    }
  }, []);

  React.useEffect(() => {
    getListOfUser();
  }, [getListOfUser]);

  if (state === "updateUser") {
    return (
      <UpdateUser
        {...{
          setState,
          currentSelectedUser,
          setError,
       
        }}
      />
    );
  } else if (state === "addUserToCourse") {
    return (
      <AddUserToCourse
        {...{
          setState,
          currentSelectedUser,
        
          courses,
        }}
      />
    );
  } else if (state === "addStudentToCourse") {
    return (
      <AddStudentToCourse
        {...{
          setState,
          currentSelectedUser,

          courses,
        }}
      />
    );
  }

  // user_type: 1 means patient/user
  // user_type: 2 means doctor/staff/staffProvider

  //send type 1 for update the user //send type 2 for update the user to course // send type 3 for adding user to the course.
  return (
    <div className="container w-75 py-5">
      <h1 className="mb-2">Users</h1>
      <div className="mb-5">
        {(users?.users || []).map((user) => (
          <div key={user._id}>
            <ListItem
              title={user.name}
              update={() => {
                setState("updateUser");
                setCurrentSelectedUser(user);
              }}
              addUserToCourseHandler={() => {
                setState("addUserToCourse");
                setCurrentSelectedUser(user);
              }}
              addStudentToCourseHandler={() => {
                setState("addStudentToCourse");
                setCurrentSelectedUser(user);
              }}
            />
          </div>
        ))}
      </div>
      <h1 className="mb-2">Doctors</h1>
      <div>
        {(users?.doctors || []).map((user) => (
          <div key={user._id}>
            <ListItem
              title={user.Name || user?.Email}
              update={() => {
                setState("updateUser");
                setCurrentSelectedUser(user);
              }}
              addUserToCourseHandler={() => {
                setState("addUserToCourse");
                setCurrentSelectedUser(user);
              }}
              addStudentToCourseHandler={() => {
                setState("addStudentToCourse");
                setCurrentSelectedUser(user);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMangement;
