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
import type {Assessment, Question, Badge} from "./../../definations/assessment"
import { BASE_URL, HOST } from "../../features/settings";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import * as Yup from "yup";


//create validation
const createSchema = Yup.object().shape({
 question: Yup.string().required("question is required"),
 option_1: Yup.string().required("option 1 is required"),
 option_2: Yup.string().required("option 2 is required"),
 answer: Yup.string().required("answer is required"),
 correct_option: Yup.number().required("correct Option is required"),
 cnt: Yup.number().required("count is required"),
 marks: Yup.number().required("marks is required"),
});

const BadgeMangement = () => {
  const userType = localStorage.getItem("userType");
  const [badges, setBadges] = useState<Badge[]>()
  const [topics, setTopics] = useState<Topic[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Question>();
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
    onSubmit: (data, { resetForm }) => createQuestion(data,resetForm),
  });

  const updateFormik = useFormik({
    initialValues: {
      question: currentSelectedItem?.question ? currentSelectedItem.question : "",
      option_1: currentSelectedItem?.option_01 ? currentSelectedItem?.option_01  : "",
      option_2: currentSelectedItem?.option_02 ? currentSelectedItem?.option_02 : "",
      option_3: currentSelectedItem?.option_03 ? currentSelectedItem?.option_03 : "",
      option_4: currentSelectedItem?.option_04 ? currentSelectedItem?.option_04 : "",
      answer: currentSelectedItem?.answer ?currentSelectedItem.answer : "",
      correct_option:  currentSelectedItem?.correct_option ?  currentSelectedItem?.correct_option : "",
      cnt:  currentSelectedItem?.cnt ?currentSelectedItem.cnt : "",
      marks:  currentSelectedItem?.marks ?currentSelectedItem.marks : "",
      topic: currentSelectedItem?.topic ? currentSelectedItem.topic : "",
      type: "1"
    },
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data) => {
      updateQuestion(data);
    },
  });

  // modal handlers
  const [show, setShow] = useState(false);

  // update
  const [updatedItem, setUpdatedItem] = useState<Question>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  const openModel = (
    question: Question,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(question);
    setUpdatedItem(question);
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
    getBadgeList();
    getTopicsList();
    getCourseList();
    
  }, []);

  // delete question
  const deleteQuestion = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("delete");
    axios
      .get(`${BASE_URL}/master/question-delete/${currentSelectedItem?.id}`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setShowSpinner("none");
        setSuccess("Question deleted successfully")
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
        console.log(res.data.topics)
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
            console.log(res.data.topics)
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
            setAssessments(res.data.courses);
            console.log(res.data.topics)
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

  // update
  const updateQuestion = (data) => {
    console.log(data);
    let token = localStorage.getItem("token");
    const formData = new FormData();
    Object.entries(data || {}).forEach(([key, val]) => {
      // @ts-ignore
        formData.append(key, val);
    });
    setShowSpinner("update");
    if (currentSelectedItem) {
      axios
        .post(
          `${BASE_URL}/master/question-update/${currentSelectedItem.id}/`,
          formData,
          {
            headers: { Authorization: `token ${token}` },
          }
        )
        .then((res) => {
          setErrorType("none");
          setShowSpinner("none");
          setSuccess("Question updated successfully.");
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
  // create question
  const createQuestion = (data, resetForm) => {
    console.log(data)
    setShowSpinner("create");
    const formData = new FormData();
    const token = localStorage.getItem("token");
    Object.entries(data).map(([key, val]) => {
      // @ts-ignore
      formData.append(key, val);
    });
    axios
      .post(
        "https://lmsv2.metahos.com/lms_api_v1/master/question-create/",
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
        setSuccess("Question is created successfully");
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

  const updateOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    // @ts-ignore
    setUpdatedItem((p) => ({ ...p, [key]: e.target.value }));
  };

  return (
    <Container className="p-4 w-75">
      {error && errorType === "list" || errorType === "delete" && (
        <ErrorMessage setError={setError}>{error}</ErrorMessage>
      )}
      {success && <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>}
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
        ) : (badges || []).map(item =>  <ListItem
          //@ts-ignore
            item={item}
            title={item.title}
            key={item.id}
            openModel={openModel}
            sm={7}
          ></ListItem>)}
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
                  {creatFormik.touched.image &&
                  creatFormik.errors.image ? (
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
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.numbers && creatFormik.errors.numbers ? (
                      <div className="text-danger">
                        {creatFormik.errors.numbers}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>option 4</Form.Label>
                    <Form.Control
                      name="option_4"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.option_4}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.option_4 && creatFormik.errors.option_4 ? (
                      <div className="text-danger">
                        {creatFormik.errors.option_4}
                      </div>
                    ) : null}
                  </Form.Group>
                 </Row>


                 <Form.Group className="mb-2">
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                      name="answer"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.answer}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.answer && creatFormik.errors.answer ? (
                      <div className="text-danger">
                        {creatFormik.errors.answer}
                      </div>
                    ) : null}
                  </Form.Group>

               <Row className="mb-2">
               <Form.Group as={Col}>
                    <Form.Label>Correct Option</Form.Label>
                    <Form.Control
                      name="correct_option"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.correct_option}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.correct_option && creatFormik.errors.correct_option ? (
                      <div className="text-danger">
                        {creatFormik.errors.correct_option}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                      name="cnt"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.cnt}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.cnt && creatFormik.errors.cnt ? (
                      <div className="text-danger">
                        {creatFormik.errors.cnt}
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
                      {(courses || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
                      {(topics || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
                      {(assessments || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
      {success && <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>}
            <Modal.Header closeButton>
              <Modal.Title>Delete Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to delete this question
              <h5>{currentSelectedItem?.question}</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
             {!success &&  <Button
                    className="d-flex align-items-center"
                    variant="danger text-white"
                  
                    onClick={() => deleteQuestion()}
                  >
                    {showSpinner === "delete" && <Spinner />}
                    Delete
                  </Button>}
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
        {currentModal === "update" && (
          <>
            {error && errorType === "update" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
             <Modal.Header closeButton>
              <Modal.Title>Edit Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={updateFormik.handleSubmit}>
              <Form.Group className="b-3">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                      name="question"
                      value={updateFormik.values.question}
                      onChange={updateFormik.handleChange}
                      type="text"
                      required
                      placeholder="Enter Topic question"
                    />
                    {updateFormik.touched.question && updateFormik.errors.question ? (
                      <div className="text-danger">
                        {updateFormik.errors.question}
                      </div>
                    ) : null}
                  </Form.Group>

            
                 <Row className="mb-3">
                 <Form.Group as={Col}>
                    <Form.Label>option 1</Form.Label>
                    <Form.Control
                      name="option_1"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.option_1}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.option_1 && updateFormik.errors.option_1 ? (
                      <div className="text-danger">
                        {updateFormik.errors.option_1}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>option 2</Form.Label>
                    <Form.Control
                      name="option_2"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.option_2}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.option_2 && updateFormik.errors.option_2 ? (
                      <div className="text-danger">
                        {updateFormik.errors.option_2}
                      </div>
                    ) : null}
                  </Form.Group>
                 </Row>
                
 
                 <Row className="mb-3">
                 <Form.Group as={Col}>
                    <Form.Label>option 3</Form.Label>
                    <Form.Control
                      name="option_3"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.option_3}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.option_3 && updateFormik.errors.option_3 ? (
                      <div className="text-danger">
                        {updateFormik.errors.option_3}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>option 4</Form.Label>
                    <Form.Control
                      name="option_4"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.option_4}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.option_4 && updateFormik.errors.option_4 ? (
                      <div className="text-danger">
                        {updateFormik.errors.option_4}
                      </div>
                    ) : null}
                  </Form.Group>
                 </Row>


                 <Form.Group className="mb-2">
                    <Form.Label>Answer</Form.Label>
                    <Form.Control
                      name="answer"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.answer}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.answer && updateFormik.errors.answer ? (
                      <div className="text-danger">
                        {updateFormik.errors.answer}
                      </div>
                    ) : null}
                  </Form.Group>

               <Row className="mb-2">
               <Form.Group as={Col}>
                    <Form.Label>Correct Option</Form.Label>
                    <Form.Control
                      name="correct_option"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.correct_option}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.correct_option && updateFormik.errors.correct_option ? (
                      <div className="text-danger">
                        {updateFormik.errors.correct_option}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Count</Form.Label>
                    <Form.Control
                      name="cnt"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.cnt}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.cnt && updateFormik.errors.cnt ? (
                      <div className="text-danger">
                        {updateFormik.errors.cnt}
                      </div>
                    ) : null}
                  </Form.Group>
               </Row>
               <Form.Group className="mb-2">
                    <Form.Label>Marks</Form.Label>
                    <Form.Control
                      name="marks"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.marks}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.marks && updateFormik.errors.marks ? (
                      <div className="text-danger">
                        {updateFormik.errors.marks}
                      </div>
                    ) : null}
                  </Form.Group>
                <Form.Group>
                    <Form.Label>Topic</Form.Label>
                    <Form.Select
                      required
                      name="topic"
                      onChange={updateFormik.handleChange}
                    >
                      <option>select the Topic</option>
                      {(topics || []).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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

export default BadgeMangement;
