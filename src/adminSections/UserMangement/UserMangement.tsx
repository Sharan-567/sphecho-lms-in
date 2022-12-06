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
  const [currentSelectedUserRole, setCurrentSelectedUserRole] = React.useState<
    "1" | "2"
  >();
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
          currentSelectedUserRole,
        }}
      />
    );
  } else if (state === "addUserToCourse") {
    return (
      <AddUserToCourse
        {...{
          setState,
          currentSelectedUser,
          currentSelectedUserRole,
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
          currentSelectedUserRole,
          courses,
        }}
      />
    );
  }

  // 1 means patient/user
  // 2 means doctor/staff
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
                setCurrentSelectedUserRole("1");
              }}
              addUserToCourseHandler={() => {
                setState("addUserToCourse");
                setCurrentSelectedUser(user);
                setCurrentSelectedUserRole("1");
              }}
              addStudentToCourseHandler={() => {
                setState("addStudentToCourse");
                setCurrentSelectedUser(user);
                setCurrentSelectedUserRole("1");
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
                setCurrentSelectedUserRole("2");
              }}
              addUserToCourseHandler={() => {
                setState("addUserToCourse");
                setCurrentSelectedUser(user);
                setCurrentSelectedUserRole("2");
              }}
              addStudentToCourseHandler={() => {
                setState("addStudentToCourse");
                setCurrentSelectedUser(user);
                setCurrentSelectedUserRole("2");
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMangement;
