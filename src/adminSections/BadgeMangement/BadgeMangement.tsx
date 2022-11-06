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
  FormControl,
} from "react-bootstrap";
import { Formik, useFormik } from "formik";
import ListItem from "../ListItem";
import type { Course, Topic } from "./../../definations/course";
import type {
  Assessment,
  Question,
  Badge,
} from "./../../definations/assessment";
import { BASE_URL, HOST } from "../../features/settings";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function getMinDate() {
  return new Date(2000, 1, 1);
}

function getMaxDate() {
  return new Date(2030, 1, 1);
}

//create validation
const createSchema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  image: Yup.string().required("image is required"),
  on_complition: Yup.string().required("On complition is required"),
  on_attend: Yup.string().required("on attend is required"),
  numbers: Yup.number()
    .min(1, "min value is 1")
    .required("numbers is required"),
  start_date: Yup.date()
    .min(getMinDate(), `StartDate start date is ${getMinDate()}`)
    .max(Yup.ref("end_date"), "Start date must be earlier than the end date"),
  end_date: Yup.lazy(() =>
    Yup.date()
      .min(Yup.ref("start_date"), "end date must be later than min date")
      .max(getMaxDate(), `EndDate start date is ${getMaxDate()}`)
  ),
});

const BadgeMangement = () => {
  const userType = localStorage.getItem("userType");
  const [badges, setBadges] = useState<Badge[]>();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Badge>();
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
      image: "",
      on_complition: "True",
      on_attend: "True",
      numbers: "",
      start_date: "",
      end_date: "",
      course: "",
      assesment: "",
      topic: "",
    },
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => createBadge(data, resetForm),
  });

  const updateFormik = useFormik({
    initialValues: {
      title: currentSelectedItem?.title ? currentSelectedItem.title : "",
      image: currentSelectedItem?.image ? currentSelectedItem?.image : "",
      on_complition: currentSelectedItem?.on_complition ? "True" : "False",
      on_attend: currentSelectedItem?.on_attend ? "True" : "False",
      numbers: currentSelectedItem?.numbers ? currentSelectedItem?.numbers : "",
      start_date: currentSelectedItem?.start_date
        ? new Date(currentSelectedItem.start_date)
        : "",
      end_date: currentSelectedItem?.end_date
        ? new Date(currentSelectedItem?.end_date)
        : "",
    },
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data) => {
      updateBadge(data);
      console.log(data);
    },
  });

  // modal handlers
  const [show, setShow] = useState(false);

  // update
  const [updatedItem, setUpdatedItem] = useState<Badge>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  const openModel = (
    badge: Badge,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(badge);
    setUpdatedItem(badge);
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

  //@ts-ignore
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <Form.Control
      //@ts-ignore
      ref={ref}
      value={value}
      onChange={onClick}
      onClick={onClick}
      type="text"
      required
      placeholder="pick date"
    />
  ));

  // get list of topics
  useEffect(() => {
    getBadgeList();
    getTopicsList();
    getAssessmentList();
    getCourseList();
  }, []);

  // delete question
  const deleteBadge = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("delete");
    axios
      .get(`${BASE_URL}/master/badge-delete/${currentSelectedItem?.id}`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setShowSpinner("none");
        setSuccess("Badge deleted successfully");
        setErrorType("none");
        getBadgeList();
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

  //get course list
  const getCourseList = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/master/course-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setCourses(res.data.courses);
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

  //get questions list
  const getBadgeList = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("list");
    axios
      .get(`${BASE_URL}/master/badge-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setBadges(res.data.Badges);
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

  // update badge
  const updateBadge = (data) => {
    let token = localStorage.getItem("token");
    const formData = new FormData();
    Object.entries(data || {}).forEach(([key, val]) => {
      if (key === "start_date" || key === "end_date") {
        // @ts-ignore
        let date = new Date(val).toLocaleDateString().split("/");
        let newdate = date[2] + "-" + date[0] + "-" + date[1];
        formData.append(key, newdate);
      } else {
        // @ts-ignore
        formData.append(key, val);
      }
    });
    setShowSpinner("update");
    if (currentSelectedItem) {
      axios
        .post(
          `${BASE_URL}/master/badge-update/${currentSelectedItem.id}/`,
          formData,
          {
            headers: { Authorization: `token ${token}` },
          }
        )
        .then((res) => {
          setErrorType("none");
          setShowSpinner("none");
          setSuccess("Badge updated successfully.");
          getBadgeList();
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
  // create badge
  const createBadge = (data, resetForm) => {
    console.log(data);
    setShowSpinner("create");
    const formData = new FormData();
    const token = localStorage.getItem("token");
    Object.entries(data).map(([key, val]) => {
      if (key === "start_date" || key === "end_date") {
        // @ts-ignore
        let date = new Date(val).toLocaleDateString();
        let newdate = date.split("/").reverse().join("-");
        formData.append(key, newdate);
      } else {
        // @ts-ignore
        formData.append(key, val);
      }
    });
    axios
      .post(
        "https://lmsv2.metahos.com/lms_api_v1/master/badge-create/",
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
        setSuccess("Badge is created successfully");
        getBadgeList();
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
      {(error && errorType === "list") ||
        (errorType === "delete" && (
          <ErrorMessage setError={setError}>{error}</ErrorMessage>
        ))}
      {success && (
        <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
      )}
      <div className="bg-white p-5 br-2">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="b-700">Badges</h3>
          <Button
            className="bg-adminteritory text-white br-2"
            onClick={createCourseOpenModal}
          >
            Create Badge
          </Button>
        </div>
        {showSpinner === "list" ? (
          <Spinner />
        ) : (
          (badges || []).map((item) => (
            <ListItem
              //@ts-ignore
              item={item}
              title={item.title}
              key={item.id}
              openModel={openModel}
              sm={7}
            ></ListItem>
          ))
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
              <Modal.Title>Create Badge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={creatFormik.handleSubmit}>
                <Form.Group className="b-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={creatFormik.values.title}
                    onChange={creatFormik.handleChange}
                    type="text"
                    required
                    placeholder="Enter Topic title"
                  />
                  {creatFormik.touched.title && creatFormik.errors.title ? (
                    <div className="text-danger">
                      {creatFormik.errors.title}
                    </div>
                  ) : null}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      name="image"
                      type="file"
                      required
                      placeholder="Upload badge image"
                      onChange={(e) =>
                        creatFormik.setFieldValue(
                          "image",
                          //@ts-ignore
                          e.currentTarget.files[0]
                        )
                      }
                      // value={creatFormik.values.image}
                    />
                    {creatFormik.touched.image && creatFormik.errors.image ? (
                      <div className="text-danger">
                        {creatFormik.errors.image}
                      </div>
                    ) : null}
                  </Form.Group>

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
                      required
                      name="on_attend"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.on_attend}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                    {creatFormik.touched.on_attend &&
                    creatFormik.errors.on_attend ? (
                      <div className="text-danger">
                        {creatFormik.errors.on_attend}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Number of Badges</Form.Label>
                    <Form.Control
                      name="numbers"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.numbers}
                      type="text"
                      required
                      placeholder="1,2.."
                    />
                    {creatFormik.touched.numbers &&
                    creatFormik.errors.numbers ? (
                      <div className="text-danger">
                        {creatFormik.errors.numbers}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                      style={{ background: "red" }}
                      name="start_date"
                      dateFomart="DD/MM/YYYY"
                      customInput={<CustomInput />}
                      selected={creatFormik.values.start_date}
                      onChange={(date: Date) =>
                        creatFormik.setFieldValue("start_date", date)
                      }
                    />
                    {creatFormik.touched.start_date &&
                    creatFormik.errors.start_date ? (
                      <div className="text-danger">
                        {creatFormik.errors.start_date}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>End Date</Form.Label>
                    <DatePicker
                      name="end_date"
                      customInput={<CustomInput />}
                      dateFomart="DD/MM/YYYY"
                      selected={creatFormik.values.end_date}
                      onChange={(date: Date) =>
                        creatFormik.setFieldValue("end_date", date)
                      }
                    />
                    {creatFormik.touched.end_date &&
                    creatFormik.errors.end_date ? (
                      <div className="text-danger">
                        {creatFormik.errors.end_date}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Form.Select
                    required
                    name="course"
                    onChange={creatFormik.handleChange}
                  >
                    <option>select the Course</option>
                    {(courses || []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Topic</Form.Label>
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

                <Form.Group>
                  <Form.Label>Assessment</Form.Label>
                  <Form.Select
                    required
                    name="assesment"
                    onChange={creatFormik.handleChange}
                  >
                    <option>select the assesment</option>
                    {(assessments || []).map((c) => (
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
              <Modal.Title>Delete Badge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to delete this Badge
              <h5>{currentSelectedItem?.title}</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {!success && (
                <Button
                  className="d-flex align-items-center"
                  variant="danger text-white"
                  onClick={() => deleteBadge()}
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
              <Modal.Title>Detail of Badge</Modal.Title>
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
              <Modal.Title>Edit Badge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={updateFormik.handleSubmit}>
                <Form.Group className="b-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={updateFormik.values.title}
                    onChange={updateFormik.handleChange}
                    type="text"
                    required
                    placeholder="Enter badge title"
                  />
                  {updateFormik.touched.title && updateFormik.errors.title ? (
                    <div className="text-danger">
                      {updateFormik.errors.title}
                    </div>
                  ) : null}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      name="image"
                      type="file"
                      required
                      placeholder="Upload info image"
                      onChange={(e) =>
                        updateFormik.setFieldValue(
                          "image",
                          //@ts-ignore
                          e.currentTarget.files[0]
                        )
                      }
                      // value={updateFormik.values.image}
                    />
                    {typeof updateFormik.values.image === "string" && (
                      <img
                        className="mt-3"
                        style={{ width: "8rem" }}
                        src={`https://${HOST}${updateFormik.values.image}`}
                      />
                    )}
                    {/* @ts-ignore */}
                    {updateFormik.values.image instanceof File && (
                      <img
                        className="mt-3"
                        style={{ width: "8rem" }}
                        src={URL.createObjectURL(updateFormik.values.image)}
                      />
                    )}
                    {updateFormik.touched.image && updateFormik.errors.image ? (
                      <div className="text-danger">
                        {updateFormik.errors.image}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>On Complition</Form.Label>
                    <Form.Select
                      required
                      name="on_complition"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.on_complition}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                    {updateFormik.touched.on_complition &&
                    updateFormik.errors.on_complition ? (
                      <div className="text-danger">
                        {updateFormik.errors.on_complition}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>On Attend</Form.Label>
                    <Form.Select
                      required
                      name="on_attend"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.on_attend}
                    >
                      <option value={"True"}>Yes</option>
                      <option value={"False"}>No</option>
                    </Form.Select>
                    {updateFormik.touched.on_attend &&
                    updateFormik.errors.on_attend ? (
                      <div className="text-danger">
                        {updateFormik.errors.on_attend}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Number of Badges</Form.Label>
                    <Form.Control
                      name="numbers"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.numbers}
                      type="text"
                      required
                      placeholder="1,2.."
                    />
                    {updateFormik.touched.numbers &&
                    updateFormik.errors.numbers ? (
                      <div className="text-danger">
                        {updateFormik.errors.numbers}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                      style={{ background: "red" }}
                      name="start_date"
                      dateFomart="DD/MM/YYYY"
                      customInput={<CustomInput />}
                      selected={updateFormik.values.start_date}
                      onChange={(date: Date) =>
                        updateFormik.setFieldValue("start_date", date)
                      }
                    />
                    {updateFormik.touched.start_date &&
                    updateFormik.errors.start_date ? (
                      <div className="text-danger">
                        {updateFormik.errors.start_date}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>End Date</Form.Label>
                    <DatePicker
                      name="end_date"
                      customInput={<CustomInput />}
                      dateFomart="DD/MM/YYYY"
                      selected={updateFormik.values.end_date}
                      onChange={(date: Date) =>
                        updateFormik.setFieldValue("end_date", date)
                      }
                    />
                    {updateFormik.touched.end_date &&
                    updateFormik.errors.end_date ? (
                      <div className="text-danger">
                        {updateFormik.errors.end_date}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group>
                  <Form.Label>Course</Form.Label>
                  <Form.Select
                    required
                    name="course"
                    onChange={updateFormik.handleChange}
                  >
                    <option>select the Course</option>
                    {(courses || []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Topic</Form.Label>
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

                <Form.Group>
                  <Form.Label>Assessment</Form.Label>
                  <Form.Select
                    required
                    name="assesment"
                    onChange={updateFormik.handleChange}
                  >
                    <option>select the assesment</option>
                    {(assessments || []).map((c) => (
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

export default BadgeMangement;
