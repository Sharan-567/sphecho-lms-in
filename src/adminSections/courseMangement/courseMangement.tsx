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
import { useFormik } from "formik";
import ListItem from "../ListItem";
import type { Course } from "./../../definations/course";
import { BASE_URL, HOST } from "../../features/settings";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import * as Yup from "yup";

type CourseCreateType = Record<string, string>;

//create validation
const createSchema = Yup.object().shape({
  name: Yup.string()
    .required("Course Name is required")
    .max(30, "max Length 30 chars"),
  tags: Yup.string()
    .required("tags are required")
    .nullable()
    .max(30, "max Length 30 chars"),
  info_image: Yup.string().required("info images is required").nullable(),
  description: Yup.string().required("description is required"),
  trainer_name: Yup.string()
    .required("trainer name is required")
    .max(30, "max Length 30 chars"),
});

const CourseMangement = () => {
  const userType = localStorage.getItem("userType");
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Course>();
  const [currentModal, setCurrentModal] = useState<
    "update" | "delete" | "read" | "create"
  >();
  // snippers
  const [showSpinner, setShowSpinner] = useState<
    "update" | "delete" | "read" | "create" | "list" | "none"
  >();
  // erros
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState<
    "update" | "delete" | "read" | "create" | "list" | "none"
  >("none");
  //success
  const [success, setSuccess] = useState("");

  const creatFormik = useFormik({
    initialValues: {
      name: "",
      tags: "",
      info_image: "",
      description: "",
      trainer_name: "",
      view_all: "False",
      enroll_all: "False",
      featured: "False",
    },
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => createCourse(data, resetForm),
  });

  const updateFormik = useFormik({
    initialValues: {
      name: currentSelectedItem?.name ? currentSelectedItem.name : "",
      tags: currentSelectedItem?.tags ? currentSelectedItem.tags : "",
      info_image: currentSelectedItem?.info_image
        ? currentSelectedItem?.info_image
        : "",
      description: currentSelectedItem?.description
        ? currentSelectedItem?.description
        : "",
      trainer_name: currentSelectedItem?.trainer_image
        ? currentSelectedItem.trainer_image
        : "",
      view_all: currentSelectedItem?.view_all ? "True" : "False",
      enroll_all: currentSelectedItem?.enroll_all ? "True" : "False",
      featured: currentSelectedItem?.featured ? "True" : "False",
    },
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data) => {
      updateCourse(data);
    },
  });

  // modal handlers
  const [show, setShow] = useState(false);

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
  };

  const createCourseOpenModal = () => {
    setCurrentModal("create");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setError("");
    setSuccess("");
  };
  const handleShow = () => {
    setShow(true);
    setError("");
    setSuccess("");
  };

  // get list of courses
  useEffect(() => {
    getCourseList();
  }, []);

  const deleteCourse = () => {
    console.log("course deleted");
    handleClose();
  };

  //get course list
  const getCourseList = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("list");
    axios
      .get(`${BASE_URL}/master/course-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setCourses(res.data.courses);
        setShowSpinner("none");
        setErrorType("none");
      })
      .catch((err) => {
        setShowSpinner("none");
        setErrorType("list");
        if (err.response) {
          setError(err.response.statusText);
          console.log(err.response.statusText);
        } else if (err.request) {
          setError(err.response.statusText);
          console.log(err.request.statusText);
        } else {
          console.log(err);
        }
      });
  };

  // update
  const updateCourse = (data) => {
    console.log(data);
    let token = localStorage.getItem("token");
    const formData = new FormData();
    Object.entries(data || {}).forEach(([key, val]) => {
      if (key === "info_image") {
        //some work
      } else {
        formData.append(key, val);
      }
    });
    setShowSpinner("update");
    if (currentSelectedItem) {
      axios
        .post(
          `${BASE_URL}/master/course-update/${currentSelectedItem.id}/`,
          formData,
          {
            headers: { Authorization: `token ${token}` },
          }
        )
        .then((res) => {
          setErrorType("none");
          setShowSpinner("none");
          setSuccess("Course updated successfully.");
          console.log(res.data);
        })
        .catch((err) => {
          setShowSpinner("none");
          setErrorType("update");
          if (err.response) {
            setError(err.response.statusText);
            console.log(err.response.status);
          } else if (err.request) {
            setError(err.request.statusText);
            console.log(err.request);
          } else {
            setError(err);
            console.log(err);
          }
        });
    }
  };
  // create course
  const createCourse = (data, resetForm) => {
    setShowSpinner("create");
    const formData = new FormData();
    const token = localStorage.getItem("token");
    Object.entries(data).map(([key, val]) => {
      // @ts-ignore
      formData.append(key, val);
    });
    axios
      .post(
        "https://lmsv2.metahos.com/lms_api_v1/master/course-create/",
        formData,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        setShowSpinner("none");
        resetForm();
        setSuccess("Course is created successfully");
        getCourseList();
        setErrorType("none");
      })
      .catch((error) => {
        setShowSpinner("none");
        setSuccess("");
        setErrorType("create");
        if (error.request) {
          setError(error.response.statusText);
          console.log(error.response.statusText);
        } else if (error.request) {
          setError(error.request.statusText);
        } else {
          setError(error);
        }
      });
  };

  const updateOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    // @ts-ignore
    setUpdatedItem((p) => ({ ...p, [key]: e.target.value }));
  };

  return (
    <Container className="p-4 w-75">
      {error && errorType === "list" && (
        <ErrorMessage setError={setError}>{error}</ErrorMessage>
      )}
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
        {showSpinner === "list" ? (
          <Spinner />
        ) : (
          courses.map((item) => {
            return (
              <ListItem
                item={item}
                title={item.name}
                key={item.id}
                openModel={openModel}
                NoDelete
              ></ListItem>
            );
          })
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        {currentModal === "create" && (
          <>
            {error && errorType === "create" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
            <Modal.Header closeButton>
              <Modal.Title>Create Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={creatFormik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={creatFormik.values.name}
                      onChange={creatFormik.handleChange}
                      type="text"
                      required
                      placeholder="Enter Course Name"
                    />
                    {creatFormik.touched.name && creatFormik.errors.name ? (
                      <div className="text-danger">
                        {creatFormik.errors.name}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                      name="tags"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.tags}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.tags && creatFormik.errors.tags ? (
                      <div className="text-danger">
                        {creatFormik.errors.tags}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Info Image</Form.Label>
                  <Form.Control
                    name="info_image"
                    type="file"
                    required
                    placeholder="Upload info image"
                    onChange={(e) =>
                      creatFormik.setFieldValue(
                        "info_image",
                        //@ts-ignore
                        e.currentTarget.files[0]
                      )
                    }
                    // value={creatFormik.values.info_image}
                  />
                  {creatFormik.touched.info_image &&
                  creatFormik.errors.info_image ? (
                    <div className="text-danger">
                      {creatFormik.errors.info_image}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    rows={5}
                    as="textarea"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.description}
                    placeholder="Add the course description.."
                  />
                  {creatFormik.touched.description &&
                  creatFormik.errors.description ? (
                    <div className="text-danger">
                      {creatFormik.errors.description}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Trainer Name</Form.Label>
                  <Form.Control
                    name="trainer_name"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.trainer_name}
                    type="text"
                  />
                  {creatFormik.touched.trainer_name &&
                  creatFormik.errors.trainer_name ? (
                    <div className="text-danger">
                      {creatFormik.errors.trainer_name}
                    </div>
                  ) : null}
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>View All</Form.Label>
                    <Form.Select
                      required
                      name="view_all"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.view_all}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                    {creatFormik.touched.view_all &&
                    creatFormik.errors.view_all ? (
                      <div className="text-danger">
                        {creatFormik.errors.view_all}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Enroll All</Form.Label>
                    <Form.Select
                      name="enroll_all"
                      required
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.enroll_all}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Featured</Form.Label>
                    <Form.Select
                      required
                      name="featured"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.featured}
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
                    className="d-flex align-items-center"
                    variant="admingreen text-white"
                    type="submit"
                  >
                    {showSpinner === "create" && <Spinner />}
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
                  <p>{(v || "").toString()}</p>
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
            {error && errorType === "update" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
            <Modal.Header closeButton>
              <Modal.Title>Update Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={updateFormik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={updateFormik.values.name}
                      onChange={updateFormik.handleChange}
                      type="text"
                      required
                      placeholder="Enter Course Name"
                    />
                    {updateFormik.touched.name && updateFormik.errors.name ? (
                      <div className="text-danger">
                        {updateFormik.errors.name}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                      name="tags"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.tags}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.tags && updateFormik.errors.tags ? (
                      <div className="text-danger">
                        {updateFormik.errors.tags}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Info Image</Form.Label>
                  <Form.Control
                    name="info_image"
                    type="file"
                    required
                    placeholder="Upload info image"
                    onChange={(e) =>
                      updateFormik.setFieldValue(
                        "info_image",
                        //@ts-ignore
                        e.currentTarget.files[0]
                      )
                    }
                    // value={updateFormik.values.info_image}
                  />
                  {typeof updateFormik.values.info_image === "string" && (
                    <img
                      className="mt-3"
                      style={{ width: "8rem" }}
                      src={`https://${HOST}${updateFormik.values.info_image}`}
                    />
                  )}
                  {/* @ts-ignore */}
                  {updateFormik.values.info_image instanceof File && (
                    <img
                      className="mt-3"
                      style={{ width: "8rem" }}
                      src={URL.createObjectURL(updateFormik.values.info_image)}
                    />
                  )}
                  {updateFormik.touched.info_image &&
                  updateFormik.errors.info_image ? (
                    <div className="text-danger">
                      {updateFormik.errors.info_image}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    rows={5}
                    as="textarea"
                    required
                    onChange={updateFormik.handleChange}
                    value={updateFormik.values.description}
                    placeholder="Add the course description.."
                  />
                  {updateFormik.touched.description &&
                  updateFormik.errors.description ? (
                    <div className="text-danger">
                      {updateFormik.errors.description}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Trainer Name</Form.Label>
                  <Form.Control
                    name="trainer_name"
                    required
                    onChange={updateFormik.handleChange}
                    value={updateFormik.values.trainer_name}
                    type="text"
                  />
                  {updateFormik.touched.trainer_name &&
                  updateFormik.errors.trainer_name ? (
                    <div className="text-danger">
                      {updateFormik.errors.trainer_name}
                    </div>
                  ) : null}
                </Form.Group>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>View All</Form.Label>
                    <Form.Select
                      required
                      name="view_all"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.view_all.toString()}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                    {updateFormik.touched.view_all &&
                    updateFormik.errors.view_all ? (
                      <div className="text-danger">
                        {updateFormik.errors.view_all.toString()}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Enroll All</Form.Label>
                    <Form.Select
                      name="enroll_all"
                      required
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.enroll_all.toString()}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Featured</Form.Label>
                    <Form.Select
                      required
                      name="featured"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.featured.toString()}
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
                    className="d-flex align-items-center"
                    variant="admingreen text-white"
                    type="submit"
                  >
                    {showSpinner === "update" && <Spinner />}
                    Update
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
