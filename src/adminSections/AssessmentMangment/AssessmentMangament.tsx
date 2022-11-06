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
import type { Assessment } from "./../../definations/assessment";
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
  order: Yup.number().required("Order is required"),
  max_marks: Yup.number().required("max marks is required"),
  min_marks_to_qualify: Yup.number().required("min marks to qualify required"),
});

const AssessmentMangement = () => {
  const userType = localStorage.getItem("userType");
  const [courses, setCourses] = useState<Course[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [assements, setAssements] = useState<Assessment[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Assessment>();
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
      pre_assesment: "False",
      order: "",
      max_marks: "",
      min_marks_to_qualify: "",
      course: "",
      topic: "",
    },
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => createAsssessment(data, resetForm),
  });

  const updateFormik = useFormik({
    initialValues: {
      name: currentSelectedItem?.name ? currentSelectedItem.name : "",
      //@ts-ignore
      pre_assesment: currentSelectedItem?.pre_assesment
        ? currentSelectedItem.pre_assesment
          ? "True"
          : "False"
        : "False",
      order: currentSelectedItem?.order ? currentSelectedItem.order : "",
      max_marks: currentSelectedItem?.max_marks
        ? currentSelectedItem.max_marks
        : "",
      min_marks_to_qualify: currentSelectedItem?.min_marks_to_qualify
        ? currentSelectedItem.min_marks_to_qualify
        : "",
      course: currentSelectedItem?.course ? currentSelectedItem.course : "",
      topic: currentSelectedItem?.topic ? currentSelectedItem.topic : "",
    },
    enableReinitialize: true,
    // validationSchema: createSchema,
    onSubmit: (data) => {
      updateAssesment(data);
    },
  });

  // modal handlers
  const [show, setShow] = useState(false);

  // update
  const [updatedItem, setUpdatedItem] = useState<Assessment>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  const openModel = (
    assessment: Assessment,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(assessment);
    setUpdatedItem(assessment);
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
    getAssessmentList();
    getCourseList();
  }, []);

  const deleteAssessment = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("delete");
    axios
      .get(`${BASE_URL}/master/assement-delete/${currentSelectedItem?.id}`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setShowSpinner("none");
        setSuccess("Assessment deleted successfully");
        setErrorType("none");
        getAssessmentList();
      })
      .catch((err) => {
        setShowSpinner("none");
        setErrorType("delete");
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
    setShowSpinner("list");
    axios
      .get(`${BASE_URL}/master/assement-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setAssements(res.data.Assements);
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

  //get course list
  const getCourseList = () => {
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
          console.log(err.response.statusText);
        } else if (err.request) {
          console.log(err.request.statusText);
        } else {
          console.log(err);
        }
      });
  };

  //get topics  list
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

  // update assessment
  const updateAssesment = (data) => {
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
          `${BASE_URL}/master/assement-update/${currentSelectedItem.id}/`,
          formData,
          {
            headers: { Authorization: `token ${token}` },
          }
        )
        .then((res) => {
          setErrorType("none");
          setShowSpinner("none");
          setSuccess("Assessment updated successfully.");
          getAssessmentList();
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
  // create assessment
  const createAsssessment = (data, resetForm) => {
    setShowSpinner("create");
    const formData = new FormData();
    const token = localStorage.getItem("token");
    Object.entries(data).map(([key, val]) => {
      // @ts-ignore
      formData.append(key, val);
    });
    axios
      .post(
        "https://lmsv2.metahos.com/lms_api_v1/master/assement-create/",
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
        setSuccess("Assessment is created successfully");
        getAssessmentList();
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
      {(error && errorType === "list") ||
        (errorType === "delete" && (
          <ErrorMessage setError={setError}>{error}</ErrorMessage>
        ))}
      {success && (
        <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
      )}
      <div className="bg-white p-5 br-2">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="b-700">Assessments</h3>
          <Button
            className="bg-adminteritory text-white br-2"
            onClick={createCourseOpenModal}
          >
            Create Assessment
          </Button>
        </div>
        {showSpinner === "list" ? (
          <Spinner />
        ) : (
          assements.map((item) => {
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
              <Modal.Title>Create Assessment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={creatFormik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Assessment Name</Form.Label>
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
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Pre Assessment Required</Form.Label>
                    <Form.Select
                      name="pre_assesment"
                      required
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.pre_assesment}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>order</Form.Label>
                    <Form.Control
                      name="order"
                      required
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.order}
                      type="text"
                    />
                    {creatFormik.touched.order && creatFormik.errors.order ? (
                      <div className="text-danger">
                        {creatFormik.errors.order}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group as={Col}>
                  <Form.Label>Max marks</Form.Label>
                  <Form.Control
                    name="max_marks"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.max_marks}
                    type="text"
                  />
                  {creatFormik.touched.max_marks &&
                  creatFormik.errors.max_marks ? (
                    <div className="text-danger">
                      {creatFormik.errors.max_marks}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Min Marks to Qualify</Form.Label>
                  <Form.Control
                    name="min_marks_to_qualify"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.min_marks_to_qualify}
                    type="text"
                  />
                  {creatFormik.touched.min_marks_to_qualify &&
                  creatFormik.errors.min_marks_to_qualify ? (
                    <div className="text-danger">
                      {creatFormik.errors.min_marks_to_qualify}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Form.Select
                    required
                    name="course"
                    onChange={creatFormik.handleChange}
                  >
                    <option>select the course</option>
                    {(courses || []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Topics</Form.Label>
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
        {currentModal === "delete" && (
          <>
            {error && errorType === "delete" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
            <Modal.Header closeButton>
              <Modal.Title>Delete Assessment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to delete this Assessment
              <h5>{currentSelectedItem?.name}</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {!success && (
                <Button
                  className="d-flex align-items-center"
                  variant="danger text-white"
                  onClick={() => deleteAssessment()}
                >
                  {showSpinner === "delete" && <Spinner />}
                  Delete
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
        {currentModal === "read" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Detail of Assessment</Modal.Title>
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
        {currentModal === "update" && (
          <>
            {error && errorType === "update" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
            <Modal.Header closeButton>
              <Modal.Title>Update Assessment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={updateFormik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Assessment Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={updateFormik.values.name}
                      onChange={updateFormik.handleChange}
                      type="text"
                      required
                      placeholder="Enter Topic Name"
                    />
                    {updateFormik.touched.name && updateFormik.errors.name ? (
                      <div className="text-danger">
                        {updateFormik.errors.name}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Pre Assessment Required</Form.Label>
                    <Form.Select
                      name="pre_assesment"
                      required
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.pre_assesment}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>order</Form.Label>
                    <Form.Control
                      name="order"
                      required
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.order}
                      type="text"
                    />
                    {updateFormik.touched.order && updateFormik.errors.order ? (
                      <div className="text-danger">
                        {updateFormik.errors.order}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group as={Col}>
                  <Form.Label>Max marks</Form.Label>
                  <Form.Control
                    name="max_marks"
                    required
                    onChange={updateFormik.handleChange}
                    value={updateFormik.values.max_marks}
                    type="text"
                  />
                  {updateFormik.touched.max_marks &&
                  updateFormik.errors.max_marks ? (
                    <div className="text-danger">
                      {updateFormik.errors.max_marks}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Min Marks to Qualify</Form.Label>
                  <Form.Control
                    name="min_marks_to_qualify"
                    required
                    onChange={updateFormik.handleChange}
                    value={updateFormik.values.min_marks_to_qualify}
                    type="text"
                  />
                  {updateFormik.touched.min_marks_to_qualify &&
                  updateFormik.errors.min_marks_to_qualify ? (
                    <div className="text-danger">
                      {updateFormik.errors.min_marks_to_qualify}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Form.Select
                    required
                    name="course"
                    onChange={updateFormik.handleChange}
                  >
                    <option>select the course</option>
                    {(courses || []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Topics</Form.Label>
                  <Form.Select
                    required
                    name="topic"
                    onChange={updateFormik.handleChange}
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

export default AssessmentMangement;
