import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../../features/settings";
import UpdateUser from "./UpdateUser";
import AddUserToCourse from "./AddUserToCourse";
import AddStudentToCourse from "./AddStudentToCourse";

import type { Patient, Doctor } from "./definations";
import ListItem from "./ListItem";
import { useAppDispatch } from "../../store";
import Loading from "../../sections/Loading";
import { showToast } from "../../features/toast";
import NotFound from "../../sections/NotFound";
import { motion, AnimatePresence } from "framer-motion";
import SearchBtn from "../SearchBtn";
import Fuse from "fuse.js";
import "../main.scss";

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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const dispatch = useAppDispatch();
  const [searchTxt, setSearchTxt] = React.useState("");

  const fuse = new Fuse(users?.doctors || [], {
    keys: ["Name", "Email", "Contact"],
  });
  const ProviderResult = fuse.search(searchTxt);

  const getListOfUser = React.useCallback(() => {
    setLoading(true);
    if (token) {
      const headers = {
        Authorization: `token ${token}`,
      };
      axios
        .get(`${BASE_URL}/master/user-management/`, { headers })
        .then((res) => {
          setUsers(res.data.users);
          setCourses(res.data.courses);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : admin : while fetching userslist",
            })
          );
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
      {/* <h1 className="mb-2">Users</h1>
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
      </div> */}
      <div>
        <div className="d-flex justify-content-between mb-3 header-container">
          <h1 className="mb-2 me-3 w-100">Providers</h1>
          <SearchBtn
            searchtxt={searchTxt}
            setSearchTxt={setSearchTxt}
            placeholder="Search name, contact, email"
          />
        </div>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <>
              {searchTxt.length > 0
                ? (ProviderResult || []).map(({ item }, idx) => (
                    <div key={item._id}>
                      <motion.div
                        key={idx}
                        initial={{ y: 55, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -55, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.1,
                        }}
                      >
                        <ListItem
                          title={item.Name || item?.Email}
                          email={item.Email}
                          contact={item.Contact}
                          update={() => {
                            setState("updateUser");
                            setCurrentSelectedUser(item);
                          }}
                          addUserToCourseHandler={() => {
                            setState("addUserToCourse");
                            setCurrentSelectedUser(item);
                          }}
                          addStudentToCourseHandler={() => {
                            setState("addStudentToCourse");
                            setCurrentSelectedUser(item);
                          }}
                        />
                      </motion.div>
                    </div>
                  ))
                : (users?.doctors || []).map((user, idx) => (
                    <div key={user._id}>
                      <AnimatePresence exitBeforeEnter>
                        <motion.div
                          key={idx}
                          initial={{ y: 55, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -55, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: idx * 0.1,
                          }}
                        >
                          <ListItem
                            title={user.Name || user?.Email}
                            email={user.Email}
                            contact={user.Contact}
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
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMangement;
