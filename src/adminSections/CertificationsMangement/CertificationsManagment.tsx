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
import type { Course, Certificate, Topic } from "./../../definations/course";
import type { Assessment } from "./../../definations/assessment";
import { BASE_URL, HOST } from "../../features/settings";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import * as Yup from "yup";

type CourseCreateType = Record<string, string>;

//create validation
const createSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  background_image: Yup.string()
    .required("background ima ge  is required")
    .nullable(),
  on_complition: Yup.string().required("On complition is required"),
  on_attend: Yup.string().required("On attend is required"),
  text: Yup.string().required("Text is required"),
});

const CertificationManagment = () => {
  const userType = localStorage.getItem("userType");
  const [certificates, setCertifications] = useState<Certificate[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assesments, setAssessments] = useState<Assessment[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Certificate>();
  const [showEditor, setShowEditor] = useState(false);
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
      title: "",
      topic: "",
      background_image: "",
      assesment: "",
      on_complition: "True",
      on_attend: "True",
      text: "",
    },
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => console.log(data),
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
      trainer_name: currentSelectedItem?.trainer_name
        ? currentSelectedItem.trainer_name
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
  const [updatedItem, setUpdatedItem] = useState<Certificate>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  const openModel = (
    certificate: Certificate,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(certificate);
    setUpdatedItem(certificate);
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
    getCertificationList();
    getTopicsList();
    getAssessmentList();
  }, []);

  const deleteCourse = () => {
    console.log("course deleted");
    handleClose();
  };

  //get Certification list
  const getCertificationList = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("list");
    axios
      .get(`${BASE_URL}/master/certificate-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setCertifications(res.data.Certificates);
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

  //get assessment list
  const getAssessmentList = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/master/assement-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setAssessments(res.data.Assements);
      })
      .catch((err) => {
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
      //@ts-ignore
      formData.append(key, val);
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
          getCertificationList();
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

  //get topics list
  const getTopicsList = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/master/topic-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setTopics(res.data.topics);
        console.log(res.data.topics);
      })
      .catch((err) => {
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
        getCertif();
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

  return (
    <Container className="p-4 w-75">
      {error && errorType === "list" && (
        <ErrorMessage setError={setError}>{error}</ErrorMessage>
      )}
      <div className="bg-white p-5 br-2">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="b-700">Certificates</h3>
          <Button
            className="bg-adminteritory text-white br-2"
            onClick={createCourseOpenModal}
          >
            Create Certificate
          </Button>
        </div>
        {showSpinner === "list" ? (
          <Spinner />
        ) : (
          certificates.map((item) => {
            return (
              <ListItem
                item={item}
                title={item.title}
                key={item.id}
                openModel={openModel}
                NoDelete
                sm={9}
              ></ListItem>
            );
          })
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        {currentModal === "create" && !showEditor && (
          <>
            {error && errorType === "create" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
            <Modal.Header closeButton>
              <Modal.Title>Create Certificate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={creatFormik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      value={creatFormik.values.title}
                      onChange={creatFormik.handleChange}
                      type="text"
                      required
                      placeholder="Enter Certificate title"
                    />
                    {creatFormik.touched.title && creatFormik.errors.title ? (
                      <div className="text-danger">
                        {creatFormik.errors.title}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>text</Form.Label>
                    <Form.Control
                      name="text"
                      value={creatFormik.values.text}
                      onChange={creatFormik.handleChange}
                      type="text"
                      required
                      placeholder="Enter Certificate title"
                    />
                    {creatFormik.touched.text && creatFormik.errors.text ? (
                      <div className="text-danger">
                        {creatFormik.errors.text}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Background Image</Form.Label>
                  <Form.Control
                    name="background_image"
                    type="file"
                    required
                    placeholder="Upload background image"
                    onChange={(e) =>
                      creatFormik.setFieldValue(
                        "background_image",
                        //@ts-ignore
                        e.currentTarget.files[0]
                      )
                    }
                    // value={creatFormik.values.info_image}
                  />
                  {creatFormik.touched.background_image &&
                  creatFormik.errors.background_image ? (
                    <div className="text-danger">
                      {creatFormik.errors.background_image}
                    </div>
                  ) : null}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>On Complition</Form.Label>
                    <Form.Select
                      required
                      name="on_complition"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.on_complition}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                    {creatFormik.touched.on_complition &&
                    creatFormik.errors.on_complition ? (
                      <div className="text-danger">
                        {creatFormik.errors.on_complition}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>On Attend</Form.Label>
                    <Form.Select
                      name="on_attend"
                      required
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.on_attend}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Form.Group>
                  <Form.Label>Assessment</Form.Label>
                  <Form.Select
                    required
                    name="assesment"
                    onChange={creatFormik.handleChange}
                  >
                    <option>select the assesment</option>
                    {(assesments || []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>select the Topic</Form.Label>
                  <Form.Select
                    required
                    name="topic"
                    onChange={creatFormik.handleChange}
                  >
                    <option>select the Topic</option>
                    {(topics || []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
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
        {currentModal === "create" && showEditor(
          <h1></h1>
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
              <Modal.Title>Detail of Certification</Modal.Title>
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
                      name="on_"
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

export default CertificationManagment;
