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
import type { Topic } from "./../../definations/course";
import type { Question } from "./../../definations/assessment";
import { BASE_URL, HOST } from "../../features/settings";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import Loading from "../../sections/Loading";
import { useAppDispatch } from "../../store";
import NotFound from "../../sections/NotFound";
import { showToast } from "../../features/toast";
import * as Yup from "yup";

//create validation
const createSchema = Yup.object().shape({
  question: Yup.string().required("question is required"),
  option_01: Yup.string().required("option 1 is required"),
  option_02: Yup.string().required("option 2 is required"),
  answer: Yup.string().required("answer is required"),
  correct_option: Yup.number().required("correct Option is required"),
  cnt: Yup.number().required("count is required"),
  marks: Yup.number().required("marks is required"),
});

const QuestionMangement = () => {
  const userType = localStorage.getItem("userType");
  const [questions, setQuestions] = useState<Question[]>();
  const [topics, setTopics] = useState<Topic[]>([]);
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
      question: "",
      option_01: "",
      option_02: "",
      option_03: "",
      option_04: "",
      answer: "",
      correct_option: "",
      marks: "0",
      topic: "",
      cnt: "",
      type: "1",
    },
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => createQuestion(data, resetForm),
  });

  const updateFormik = useFormik({
    initialValues: {
      question: currentSelectedItem?.question
        ? currentSelectedItem.question
        : "",
      option_01: currentSelectedItem?.option_01
        ? currentSelectedItem?.option_01
        : "",
      option_02: currentSelectedItem?.option_02
        ? currentSelectedItem?.option_02
        : "",
      option_03: currentSelectedItem?.option_03
        ? currentSelectedItem?.option_03
        : "",
      option_04: currentSelectedItem?.option_04
        ? currentSelectedItem?.option_04
        : "",
      answer: currentSelectedItem?.answer ? currentSelectedItem.answer : "",
      correct_option: currentSelectedItem?.correct_option
        ? currentSelectedItem?.correct_option
        : "",
      cnt: currentSelectedItem?.cnt ? currentSelectedItem.cnt : "",
      marks: currentSelectedItem?.marks ? currentSelectedItem.marks : "0",
      topic: currentSelectedItem?.topic ? currentSelectedItem.topic : "",
      type: "1",
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
  const dispatch = useAppDispatch();

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
    getQuestions();
    getTopicsList();
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
        setSuccess("Question deleted successfully");
        setErrorType("none");
        getQuestions();
      })
      .catch((err) => {
        setShowSpinner("none");
        setErrorType("delete");
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while deleting question",
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
        console.log(res.data.topics);
      })
      .catch((err) => {
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching topicList",
          })
        );
      });
  };

  //get questions list
  const getQuestions = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("list");
    axios
      .get(`${BASE_URL}/master/question-list`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setQuestions(res.data.Questions);
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
            message: err.message + " : admin : while fetching questionList",
          })
        );
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
          getQuestions();
          console.log(res.data);
        })
        .catch((err) => {
          setShowSpinner("none");
          setErrorType("update");
          setError(err.message);
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : admin : while updating question",
            })
          );
        });
    }
  };
  // create question
  const createQuestion = (data, resetForm) => {
    console.log(data);
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
        getQuestions();
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
            message: err.message + " : admin : while creating question",
          })
        );
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
    <Container style={{ maxWidth: "820px" }}>
      <div className="bg-white py-2 px-1 br-2">
        <div className="d-flex justify-content-between mb-3 mt-2 p-2">
          <h3 className="b-700">Questions</h3>
          <Button
            className="bg-adminteritory text-white br-2"
            onClick={createCourseOpenModal}
          >
            Create question
          </Button>
        </div>
        {showSpinner === "list" ? (
          <Loading />
        ) : (questions || []).length === 0 ? (
          <>
            <NotFound />
            <h3 className="text-center b-600">
              No questions available at this moment
            </h3>
            <p className="text-center">Please try again later</p>
          </>
        ) : (
          (questions || []).map((item) => (
            <ListItem
              //@ts-ignore
              item={item}
              title={item.question}
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
            <Modal.Header closeButton>
              <Modal.Title>Create question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={creatFormik.handleSubmit}>
                <Form.Group className="b-3">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    name="question"
                    value={creatFormik.values.question}
                    onChange={creatFormik.handleChange}
                    type="text"
                    required
                    placeholder="Enter topic question"
                  />
                  {creatFormik.touched.question &&
                  creatFormik.errors.question ? (
                    <div className="text-danger">
                      {creatFormik.errors.question}
                    </div>
                  ) : null}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>option 1</Form.Label>
                    <Form.Control
                      name="option_01"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.option_01}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.option_01 &&
                    creatFormik.errors.option_01 ? (
                      <div className="text-danger">
                        {creatFormik.errors.option_01}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>option 2</Form.Label>
                    <Form.Control
                      name="option_02"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.option_02}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.option_02 &&
                    creatFormik.errors.option_02 ? (
                      <div className="text-danger">
                        {creatFormik.errors.option_02}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>option 3</Form.Label>
                    <Form.Control
                      name="option_03"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.option_03}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.option_03 &&
                    creatFormik.errors.option_03 ? (
                      <div className="text-danger">
                        {creatFormik.errors.option_03}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>option 4</Form.Label>
                    <Form.Control
                      name="option_04"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.option_04}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.option_04 &&
                    creatFormik.errors.option_04 ? (
                      <div className="text-danger">
                        {creatFormik.errors.option_04}
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
                    <Form.Label>Correct option</Form.Label>
                    <Form.Control
                      name="correct_option"
                      onChange={creatFormik.handleChange}
                      value={creatFormik.values.correct_option}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {creatFormik.touched.correct_option &&
                    creatFormik.errors.correct_option ? (
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
                <Form.Group className="mb-2">
                  <Form.Label>Marks</Form.Label>
                  <Form.Control
                    name="marks"
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.marks}
                    type="text"
                    required
                    placeholder="Enter play,example.."
                  />
                  {creatFormik.touched.marks && creatFormik.errors.marks ? (
                    <div className="text-danger">
                      {creatFormik.errors.marks}
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
              {!success && (
                <Button
                  className="d-flex align-items-center"
                  variant="danger text-white"
                  onClick={() => deleteQuestion()}
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
              <Modal.Title>Detail of question</Modal.Title>
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
              <Modal.Title>Edit question</Modal.Title>
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
                  {updateFormik.touched.question &&
                  updateFormik.errors.question ? (
                    <div className="text-danger">
                      {updateFormik.errors.question}
                    </div>
                  ) : null}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>option 1</Form.Label>
                    <Form.Control
                      name="option_01"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.option_01}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.option_01 &&
                    updateFormik.errors.option_01 ? (
                      <div className="text-danger">
                        {updateFormik.errors.option_01}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>option 2</Form.Label>
                    <Form.Control
                      name="option_02"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.option_02}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.option_02 &&
                    updateFormik.errors.option_02 ? (
                      <div className="text-danger">
                        {updateFormik.errors.option_02}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>option 3</Form.Label>
                    <Form.Control
                      name="option_03"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.option_03}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.option_03 &&
                    updateFormik.errors.option_03 ? (
                      <div className="text-danger">
                        {updateFormik.errors.option_03}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>option 4</Form.Label>
                    <Form.Control
                      name="option_04"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.option_04}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.option_04 &&
                    updateFormik.errors.option_04 ? (
                      <div className="text-danger">
                        {updateFormik.errors.option_04}
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
                    <Form.Label>Correct option</Form.Label>
                    <Form.Control
                      name="correct_option"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.correct_option}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.correct_option &&
                    updateFormik.errors.correct_option ? (
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

export default QuestionMangement;
