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
import Spinner from "../Spinner";
import { BASE_URL, HOST } from "../../features/settings";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../store";
import { showToast } from "../../features/toast";
import NotFound from "../../sections/NotFound";
import Loading from "../../sections/Loading";
import { customAxios } from "../../services/utils";
import SearchBtn from "../SearchBtn";
import Fuse from "fuse.js";
import "../main.scss";
import SearchBar from "../SearchBar";
import SingleSelect from "../SingleSelect";

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
  const [showCourseSelect, setShowCourseSelect] = useState(false);
  const [showCourseError, setShowCourseError] = useState(false);
  const [currentSelectCourse, setCurrentSelectedCourse] =
    React.useState<number>();

  const createInitialValues = {
    title: "",
    image: "",
    on_complition: "True",
    on_attend: "True",
    numbers: "",
    start_date: "",
    end_date: "",
    course: "",
    topic: "",
  };

  const creatFormik = useFormik({
    initialValues: createInitialValues,
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
      course: currentSelectedItem?.course ? currentSelectedItem?.course : "",
      topic: currentSelectedItem?.topic ? currentSelectedItem?.topic : "",
    },
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data) => {
      updateBadge(data);
      // console.log(data);
    },
  });

  // modal handlers
  const [show, setShow] = useState(false);

  // update
  const [updatedItem, setUpdatedItem] = useState<Badge>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const dispatch = useAppDispatch();
  const [showCreateBtn, setShowCreateBtn] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const fuse = new Fuse(badges || [], { keys: ["title"] });
  const result = fuse.search(searchTxt);

  const [courseSelectSearch, setCourseSelectSearchTxt] = useState("");

  const courseFuse = new Fuse(courses, { keys: ["name"] });
  const courseSearchResult = courseFuse.search(courseSelectSearch);

  const openModel = (
    badge: Badge,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(badge);
    setUpdatedItem(badge);
    setShow(true);
    setCurrentModal(type);
    setShowCreateBtn(true);
  };

  const createCourseOpenModal = () => {
    setCurrentModal("create");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setError("");
    setSuccess("");
    setCurrentSelectedCourse(undefined);
    setCourseSelectSearchTxt("");
    creatFormik.setValues(createInitialValues);
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
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while deleting badge",
          })
        );
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
        // console.log(res.data.topics);
      })
      .catch((err) => {
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching topoic list",
          })
        );
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
        // console.log(res.data.topics);
      })
      .catch((err) => {
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching courseList",
          })
        );
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
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching assessmentList",
          })
        );
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
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching badgeList",
          })
        );
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
        let newdate = date[2] + "-" + date[1] + "-" + date[0];
        formData.append(key, newdate);
      } else if (key === "course") {
        if (val !== currentSelectCourse) {
          formData.set(key, `${currentSelectCourse}`);
        }
      } else if (key === "image") {
        if (val instanceof File) formData.append(key, val);
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
        })
        .catch((err) => {
          setShowSpinner("none");
          setErrorType("update");
          setError(err.message);
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : admin : while updaging badge",
            })
          );
        });
    }
  };
  // create badge
  const createBadge = (data, resetForm) => {
    // console.log(data);
    setShowSpinner("create");
    const formData = new FormData();
    const token = localStorage.getItem("token");
    Object.entries(data).map(([key, val]) => {
      if (key === "start_date" || key === "end_date") {
        // @ts-ignore
        let date = new Date(val).toLocaleDateString().split("/");
        let newdate = date[2] + "-" + date[1] + "-" + date[0];
        formData.append(key, newdate);
      } else {
        // @ts-ignore
        formData.append(key, val);
      }
    });
    formData.set("course", `${currentSelectCourse}`);
    customAxios
      .post("/master/badge-create/", formData)
      .then((res) => {
        setShowSpinner("none");
        resetForm();
        setSuccess("Badge is created successfully");
        getBadgeList();
        setErrorType("none");
      })
      .catch((err) => {
        setShowSpinner("none");
        setSuccess("");
        setErrorType("create");
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while creating badge",
          })
        );
      });
  };

  const getCourseNameById = (id?: number) => {
    let courseName;
    (courses || []).map((c) => {
      if (c.id === id) {
        courseName = c.name;
      }
    });
    return courseName;
  };

  return (
    <Container style={{ maxWidth: "820px" }}>
      <div className="bg-white py-2 px-1 br-2">
        <div className="d-flex justify-content-between mb-3 mt-2 p-2 header-container">
          <h3 className="b-700">Badges</h3>
          <div className="d-flex justify-content-between">
            <SearchBtn
              searchtxt={searchTxt}
              setSearchTxt={setSearchTxt}
              placeholder={"Search badges"}
            />
            <Button
              className="bg-adminteritory text-white br-2"
              onClick={createCourseOpenModal}
            >
              Create badge
            </Button>
          </div>
        </div>
        {showSpinner === "list" ? (
          <Loading />
        ) : (badges || []).length === 0 ? (
          <>
            <NotFound />
            <h3 className="text-center b-600">
              No badges available at this moment
            </h3>
            <p className="text-center">Please try again later</p>
          </>
        ) : searchTxt.length > 0 ? (
          (result || []).map(({ item }) => (
            <ListItem
              //@ts-ignore
              item={item}
              title={item.title}
              key={item.id}
              openModel={openModel}
              sm={7}
            ></ListItem>
          ))
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

      <Modal show={show} size="xl" onHide={handleClose}>
        {currentModal === "create" && (
          <>
            {error && errorType === "create" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
            {showCourseSelect ? (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>Select course</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div style={{ maxWidth: "40rem", margin: "auto" }}>
                    <div className="p-3">
                      <SearchBar
                        placeholder="Search course"
                        selectSearchTxt={courseSelectSearch}
                        setSelectSearchTxt={setCourseSelectSearchTxt}
                      />
                    </div>
                    <div style={{ height: "70vh", overflow: "scroll" }}>
                      {courseSearchResult.length > 0
                        ? (courseSearchResult || []).map(({ item: c }, idx) => (
                            <div>
                              <SingleSelect
                                id={c.id}
                                title={c.name}
                                idx={idx}
                                select={currentSelectCourse === c.id}
                                setCurrent={setCurrentSelectedCourse}
                              />
                            </div>
                          ))
                        : (courses || []).map((c, idx) => (
                            <div>
                              <SingleSelect
                                id={c.id}
                                title={c.name}
                                idx={idx}
                                select={currentSelectCourse === c.id}
                                setCurrent={setCurrentSelectedCourse}
                              />
                            </div>
                          ))}
                    </div>
                  </div>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowCourseSelect(false)}
                    >
                      Next
                    </Button>
                  </Modal.Footer>
                </Modal.Body>
              </div>
            ) : (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>Create badge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ maxWidth: "50rem", margin: "auto" }}>
                    <Form noValidate onSubmit={creatFormik.handleSubmit}>
                      <Form.Group className="b-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          name="title"
                          value={creatFormik.values.title}
                          onChange={creatFormik.handleChange}
                          type="text"
                          required
                          placeholder="Enter topic title"
                        />
                        {creatFormik.touched.title &&
                        creatFormik.errors.title ? (
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
                          {creatFormik.touched.image &&
                          creatFormik.errors.image ? (
                            <div className="text-danger">
                              {creatFormik.errors.image}
                            </div>
                          ) : null}
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>On complition</Form.Label>
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
                          <Form.Label>On attend</Form.Label>
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
                          <Form.Label>Number of badges</Form.Label>
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
                          <Form.Label>Start date</Form.Label>
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
                          <Form.Label>End date</Form.Label>
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
                        <button
                          className="w-50 p-2 bg-white mb-3"
                          onClick={() => setShowCourseSelect(true)}
                          style={{
                            display: "block",
                            border: "1px solid #dedede",
                            borderRadius: ".6rem",
                          }}
                        >
                          {currentSelectCourse
                            ? getCourseNameById(currentSelectCourse)
                            : "Select the users to select"}
                        </button>
                        {showCourseError && !currentSelectCourse ? (
                          <div className="text-danger">
                            Please Select Course
                          </div>
                        ) : null}
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Topic</Form.Label>
                        <Form.Select
                          required
                          name="topic"
                          onChange={creatFormik.handleChange}
                        >
                          <option>select the topic</option>
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
                  </div>
                </Modal.Body>
              </>
            )}
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
              <Modal.Title>Delete badge</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to delete this badge
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
              {Object.entries(currentSelectedItem || {}).map(([k, v]) =>
                v ? (
                  <>
                    <div key={k} className="d-flex my-2">
                      <div
                        className="b-700 me-2 p-3 text- bg-graydark"
                        style={{
                          minWidth: "30%",
                          borderRadius: "0.5rem",
                          wordBreak: "break-word",
                        }}
                      >
                        {k === "image"
                          ? "Badge"
                          : k === "assement_required"
                          ? "Assessment required"
                          : k === "min_marks_to_qualify"
                          ? "Min Marks "
                          : k === "max_marks"
                          ? "Max marks "
                          : k}
                      </div>

                      <div
                        className="b-700 me-2 p-3 w-100 add-hover "
                        style={{
                          borderRadius: "0.5rem",
                          wordBreak: "break-word",
                        }}
                      >
                        {k === "image" ? (
                          <img
                            src={`https://${HOST}${v}`}
                            style={{ width: "15rem" }}
                          />
                        ) : (
                          (v || "").toString()
                        )}
                      </div>
                    </div>
                  </>
                ) : null
              )}
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
            {showCourseSelect ? (
              <div>
                <Modal.Header closeButton>
                  <Modal.Title>Select course</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div style={{ maxWidth: "40rem", margin: "auto" }}>
                    <div className="p-3">
                      <SearchBar
                        placeholder="Search course"
                        selectSearchTxt={courseSelectSearch}
                        setSelectSearchTxt={setCourseSelectSearchTxt}
                      />
                    </div>
                    <div style={{ height: "70vh", overflow: "scroll" }}>
                      {courseSearchResult.length > 0
                        ? (courseSearchResult || []).map(({ item: c }, idx) => (
                            <div>
                              <SingleSelect
                                id={c.id}
                                title={c.name}
                                idx={idx}
                                select={currentSelectCourse === c.id}
                                setCurrent={setCurrentSelectedCourse}
                              />
                            </div>
                          ))
                        : (courses || []).map((c, idx) => (
                            <div>
                              <SingleSelect
                                id={c.id}
                                title={c.name}
                                idx={idx}
                                select={currentSelectCourse === c.id}
                                setCurrent={setCurrentSelectedCourse}
                              />
                            </div>
                          ))}
                    </div>
                  </div>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowCourseSelect(false)}
                    >
                      Next
                    </Button>
                  </Modal.Footer>
                </Modal.Body>
              </div>
            ) : (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>Edit badge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ maxWidth: "50rem", margin: "auto" }}>
                    <Form noValidate onSubmit={updateFormik.handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          name="title"
                          value={updateFormik.values.title}
                          onChange={updateFormik.handleChange}
                          type="text"
                          required
                          placeholder="Enter badge title"
                        />
                        {updateFormik.touched.title &&
                        updateFormik.errors.title ? (
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
                              src={URL.createObjectURL(
                                updateFormik.values.image
                              )}
                            />
                          )}
                          {updateFormik.touched.image &&
                          updateFormik.errors.image ? (
                            <div className="text-danger">
                              {updateFormik.errors.image}
                            </div>
                          ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3" as={Col}>
                          <Form.Label>On complition</Form.Label>
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
                          <Form.Label>On attend</Form.Label>
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
                          <Form.Label>Number of badges</Form.Label>
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
                          <Form.Label>Start date</Form.Label>
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
                          <Form.Label>End date</Form.Label>
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

                      <Form.Group className="mb-3">
                        <Form.Label>Select the course</Form.Label>
                        <button
                          className="w-50 p-2 bg-white mb-3"
                          onClick={() => setShowCourseSelect(true)}
                          style={{
                            display: "block",
                            border: "1px solid #dedede",
                            borderRadius: ".6rem",
                          }}
                        >
                          {currentSelectCourse
                            ? getCourseNameById(currentSelectCourse)
                            : "Select the users to select"}
                        </button>
                        {showCourseError && !currentSelectCourse ? (
                          <div className="text-danger">
                            Please Select Course
                          </div>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Select the Topic</Form.Label>
                        <p>Current Topic Id: {updateFormik.values.topic}</p>
                        <Form.Select
                          required
                          name="topic"
                          onChange={updateFormik.handleChange}
                        >
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
                          update
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </div>
                </Modal.Body>
              </>
            )}
          </>
        )}
      </Modal>
    </Container>
  );
};

export default BadgeMangement;
