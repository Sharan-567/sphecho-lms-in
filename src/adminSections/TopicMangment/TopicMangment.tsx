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
import type { Course, Topic } from "./../../definations/course";
import { BASE_URL, HOST } from "../../features/settings";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import * as Yup from "yup";


//create validation
const createSchema = Yup.object().shape({
  name: Yup.string()
    .required("Topic Name is required")
    .max(25, "max Length 25 chars"),
 video: Yup.string().required("video url is needed"),
 info_image: Yup.string().required("info image is required").nullable(),
 pdf: Yup.string().required("pdf url is required"),
 image: Yup.string().required("image url is required"),
 content: Yup.string().required("content is required"),
 description: Yup.string().required("description is required"),
 order: Yup.number().required("order is required"),
});

const TopicManagment = () => {
  const userType = localStorage.getItem("userType");
  const [courses, setCourses] = useState<Course[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
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
      video: "",
      info_image: "",
      pdf: "",
      image: "",
      content: "",
      description: "",
      assement_required: "False",
      course: "",
      order: "",
    },
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => createTopic(data, resetForm),
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

  // get list of topics
  useEffect(() => {
    getTopicsList();
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

  //get topics list
  const getTopicsList = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("list");
    axios
      .get(`${BASE_URL}/master/topic-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setTopics(res.data.topics);
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
  // create topic
  const createTopic = (data, resetForm) => {
    setShowSpinner("create");
    const formData = new FormData();
    const token = localStorage.getItem("token");
    Object.entries(data).map(([key, val]) => {
      // @ts-ignore
      formData.append(key, val);
    });
    axios
      .post(
        "https://lmsv2.metahos.com/lms_api_v1/master/topic-create/",
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
        setSuccess("Topic is created successfully");
        getTopicsList();
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
          <h3 className="b-700">Topics</h3>
          <Button
            className="bg-adminteritory text-white br-2"
            onClick={createCourseOpenModal}
          >
            Create Topic
          </Button>
        </div>
        {showSpinner === "list" ? (
          <Spinner />
        ) : (
          topics.map((item) => {
            return (
              <ListItem
              //@ts-ignore
                item={item}
                title={item.name}
                key={item.id}
                openModel={openModel}
                sm={7}
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
              <Modal.Title>Create Topics</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={creatFormik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Topic Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={creatFormik.values.name}
                      onChange={creatFormik.handleChange}
                      type="text"
                      required
                      placeholder="Enter Topic Name"
                    />
                    {creatFormik.touched.name && creatFormik.errors.name ? (
                      <div className="text-danger">
                        {creatFormik.errors.name}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Video Url</Form.Label>
                    <Form.Control
                      name="video"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.video}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.video && creatFormik.errors.video ? (
                      <div className="text-danger">
                        {creatFormik.errors.video}
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
                  <Form.Label>pdf Url</Form.Label>
                  <Form.Control
                    name="pdf"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.pdf}
                    placeholder="Add the course pdf.."
                  />
                  {creatFormik.touched.pdf &&
                  creatFormik.errors.pdf ? (
                    <div className="text-danger">
                      {creatFormik.errors.pdf}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Image Url</Form.Label>
                  <Form.Control
                    name="image"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.image}
                    type="text"
                  />
                  {creatFormik.touched.image &&
                  creatFormik.errors.image ? (
                    <div className="text-danger">
                      {creatFormik.errors.image}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    name="content"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.content}
                    type="text"
                    as={"textarea"}
                    rows={3}
                  />
                  {creatFormik.touched.content &&
                  creatFormik.errors.content ? (
                    <div className="text-danger">
                      {creatFormik.errors.content}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    required
                    onChange={creatFormik.handleChange}
                    as={"textarea"}
                    rows={4}
                    value={creatFormik.values.description}
                    type="text"
                  />
                  {creatFormik.touched.description &&
                  creatFormik.errors.description ? (
                    <div className="text-danger">
                      {creatFormik.errors.description}
                    </div>
                  ) : null}
                </Form.Group>
                <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>order</Form.Label>
                  <Form.Control
                    name="order"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.order}
                    type="text"
                  />
                  {creatFormik.touched.order &&
                  creatFormik.errors.order ? (
                    <div className="text-danger">
                      {creatFormik.errors.order}
                    </div>
                  ) : null}
                </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Assessment Required</Form.Label>
                    <Form.Select
                      name="assement_required"
                      required
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.assement_required}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>

                </Row>
                <Form.Group>
                    <Form.Label>Course</Form.Label>
                    <Form.Select
                      required
                      name="course"
                      onChange={creatFormik.handleChange}
                    >
                      <option>select the course</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Form.Select>
                  </Form.Group>
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

        {/* ---update--- */}
      </Modal>
    </Container>
  );
};

export default TopicManagment;
