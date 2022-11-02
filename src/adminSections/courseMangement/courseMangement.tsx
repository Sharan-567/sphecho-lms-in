import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Modal,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import FormContainer from "../FormContainer";
import ListItem from "../ListItem";
import type { Course } from "./../../definations/course";
import { BASE_URL } from "../../features/settings";

type CourseCreateType = {
  name: "";
  tags: "";
  info_image: File | string;
  description: "";
  trainer_name: "";
  view_all: boolean;
  enroll_all: boolean;
  featured: boolean;
};

const CourseMangement = () => {
  const userType = localStorage.getItem("userType");
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Course>();
  const [currentModal, setCurrentModal] = useState<
    "update" | "delete" | "read" | "create"
  >();
  // modal handlers
  const [show, setShow] = useState(false);
  // create
  const [createdItem, setCreatedItem] = useState<CourseCreateType>({
    name: "",
    tags: "",
    info_image: "",
    description: "",
    trainer_name: "",
    view_all: false,
    enroll_all: false,
    featured: false,
  });

  // update
  const [updatedItem, setUpdatedItem] = useState<Course>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  const openModel = (
    course: Course,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(course);
    setUpdatedItem(course);
    setShow(true);
    setCurrentModal(type);
    console.log(type);
    console.log(course);
  };

  const createCourseOpenModal = () => {
    setCurrentModal("create");
    setShow(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // get list of courses
  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/master/course-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(err);
        }
      });
  }, []);

  const deleteCourse = () => {
    console.log("course deleted");
    handleClose();
  };
  // create course
  const createCourseOnChangeHandler = (e, key: string, isFile?: boolean) => {
    if (isFile) {
      setCreatedItem((p) => ({ ...p, [key]: e.target.files[0] }));
    } else {
      setCreatedItem((p) => ({ ...p, [key]: e.target.value }));
    }
  };
  // update
  const updateCourse = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    let token = localStorage.getItem("token");
    if (currentSelectedItem) {
      axios
        .post(
          `${BASE_URL}/master/course-update/${currentSelectedItem.id}/`,
          { ...updatedItem },
          {
            headers: { Authorization: `token ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log(err);
          }
        });

      handleClose();
    }
  };

  const createCourse = (e) => {
    e.preventDefault();
  };

  const updateOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    // @ts-ignore
    setUpdatedItem((p) => ({ ...p, [key]: e.target.value }));
  };

  const createOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    console.log(e.target.type);
    setCreatedItem((p) => ({ ...p, [key]: e.target.value }));
  };

  return (
    <Container className="p-4 w-75">
      <div className="bg-white p-5 br-2">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="b-700">Courses</h3>
          <Button
            className="bg-adminteritory text-white br-2"
            onClick={createCourseOpenModal}
          >
            Create Course
          </Button>
        </div>
        {courses.map((item) => {
          return (
            <ListItem
              item={item}
              title={item.name}
              key={item.id}
              openModel={openModel}
              NoDelete
            ></ListItem>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        {currentModal === "create" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Create Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="courseNameId">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                      onChange={(e) => createCourseOnChangeHandler(e, "name")}
                      value={createdItem.name}
                      type="text"
                      placeholder="Enter Course Name"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="courseTagsId">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                      onChange={(e) => createCourseOnChangeHandler(e, "tags")}
                      value={createdItem.tags}
                      type="text"
                      placeholder="Enter tages"
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Info Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Upload info image"
                    onChange={(e) =>
                      createCourseOnChangeHandler(e, "info_image", true)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    rows={5}
                    as="textarea"
                    onChange={(e) =>
                      createCourseOnChangeHandler(e, "description")
                    }
                    placeholder="Add the course description.."
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Trainer Name</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      createCourseOnChangeHandler(e, "trainer_name")
                    }
                    type="text"
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>View All</Form.Label>
                    <Form.Select
                      defaultValue="True"
                      onChange={(e) =>
                        createCourseOnChangeHandler(e, "view_all")
                      }
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Enroll All</Form.Label>
                    <Form.Select
                      defaultValue="False"
                      onChange={(e) =>
                        createCourseOnChangeHandler(e, "enroll_all")
                      }
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Featured</Form.Label>
                    <Form.Select
                      defaultValue="False"
                      onChange={(e) =>
                        createCourseOnChangeHandler(e, "featured")
                      }
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="admingreen text-white"
                    onClick={deleteCourse}
                  >
                    Create
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </>
        )}
        {currentModal === "delete" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger text-white" onClick={deleteCourse}>
                delete
              </Button>
            </Modal.Footer>
          </>
        )}
        {currentModal === "read" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Detail of Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Object.entries(currentSelectedItem || {}).map(([k, v]) => (
                <div key={k} className="d-flex">
                  <p className="b-700 me-2">{k}: </p>
                  <p>{v}</p>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="bg-adminsecondary text-white"
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </>
        )}

        {currentModal === "update" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Update Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {updateError && <Alert variant="danager">{updateError}</Alert>}
              {updateStatusSuccess && (
                <Alert variant="green">{updateStatusSuccess}</Alert>
              )}
              <Form>
                {Object.entries(updatedItem || {}).map(([k, v]) => (
                  <Form.Group
                    key={k}
                    className="mb-3"
                    controlId="formGroupEmail"
                  >
                    <Form.Label className="text-admingreen b-700">
                      {k}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        // @ts-ignore
                        updateOnChangeHandler(e, k);
                      }}
                      placeholder={v}
                      value={v || ""}
                    />
                  </Form.Group>
                ))}
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="admingreen text-white"
                    onClick={(e) => updateCourse(e)}
                  >
                    update
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default CourseMangement;
