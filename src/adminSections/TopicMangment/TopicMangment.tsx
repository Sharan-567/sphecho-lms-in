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
import { useAppDispatch } from "../../store";
import Loading from "../../sections/Loading";
import { showToast } from "../../features/toast";
import NotFound from "../../sections/NotFound";

//create validation
const createSchema = Yup.object().shape({
  name: Yup.string()
    .required("Topic Name is required")
    .min(3, "Atleast 3 characters required"),
  video: Yup.string(),
  info_image: Yup.string(),
  pdf: Yup.string(),
  image: Yup.string(),
  content: Yup.string(),
  description: Yup.string(),
  order: Yup.number().required("order is required"),
});

const TopicManagment = () => {
  const userType = localStorage.getItem("userType");
  const [courses, setCourses] = useState<Course[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Topic>();
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
      video: currentSelectedItem?.video ? currentSelectedItem?.video : "",
      info_image: currentSelectedItem?.info_image
        ? currentSelectedItem?.info_image
        : "",
      pdf: currentSelectedItem?.pdf ? currentSelectedItem.pdf : "",
      image: currentSelectedItem?.image ? currentSelectedItem.image : "",
      content: currentSelectedItem?.content ? currentSelectedItem.content : "",
      description: currentSelectedItem?.description
        ? currentSelectedItem.description
        : "",
      assement_required: currentSelectedItem?.assement_required
        ? "True"
        : "False",
      order: currentSelectedItem?.order ? currentSelectedItem.order : "",
      course: currentSelectedItem?.course ? currentSelectedItem.course : "",
    },
    enableReinitialize: true,
    // validationSchema: createSchema,
    onSubmit: (data) => {
      updateTopic(data);
    },
  });

  // modal handlers
  const [show, setShow] = useState(false);

  // update
  const [updatedItem, setUpdatedItem] = useState<Topic>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const dispatch = useAppDispatch();

  const openModel = (
    topic: Topic,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(topic);
    setUpdatedItem(topic);
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

  const deleteTopic = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("delete");
    axios
      .get(`${BASE_URL}/master/topic-delete/${currentSelectedItem?.id}`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setShowSpinner("none");
        setSuccess("topic deleted successfully");
        setErrorType("none");
        getTopicsList();
      })
      .catch((err) => {
        setShowSpinner("none");
        setErrorType("delete");
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while topic delete",
          })
        );
      });
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
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching course list",
          })
        );
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
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : fetching topic list",
          })
        );
      });
  };

  // update
  const updateTopic = (data) => {
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
          `${BASE_URL}/master/topic-update/${currentSelectedItem.id}/`,
          formData,
          {
            headers: { Authorization: `token ${token}` },
          }
        )
        .then((res) => {
          setErrorType("none");
          setShowSpinner("none");
          setSuccess("Topic updated successfully.");
        })
        .catch((err) => {
          setShowSpinner("none");
          setErrorType("update");
          setError(err.message);
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : admin : while topic update",
            })
          );
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
      .post(`${BASE_URL}/master/topic-create/`, formData, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
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
    <Container style={{ maxWidth: "820px" }}>
      <div className="bg-white py-2 px-1 br-2">
        <div className="d-flex justify-content-between mb-3 mt-2 p-2">
          <h3 className="b-700">Topics</h3>
          <Button
            className="bg-adminteritory text-white br-2"
            onClick={createCourseOpenModal}
          >
            Create topic
          </Button>
        </div>
        {showSpinner === "list" ? (
          <Loading />
        ) : topics.length === 0 ? (
          <>
            <NotFound />
            <h3 className="text-center b-600">
              No Topics available at this moment
            </h3>
            <p className="text-center">Please try again later</p>
          </>
        ) : (
          topics.map((item, idx) => {
            return (
              <ListItem
                //@ts-ignore
                item={item}
                title={item.name}
                key={item.id}
                openModel={openModel}
                sm={7}
                idx={idx}
              ></ListItem>
            );
          })
        )}
      </div>

      <Modal size="xl" show={show} onHide={handleClose}>
        {currentModal === "create" && (
          <>
            {error && errorType === "create" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
            <Modal.Header closeButton>
              <Modal.Title>Create topics</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={creatFormik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Topic name</Form.Label>
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
                    <Form.Label>Video url</Form.Label>
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
                  <Form.Label>Info image</Form.Label>
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
                  {/* @ts-ignore */}
                  {updateFormik.values.info_image instanceof File && (
                    <img
                      className="mt-3"
                      style={{ width: "8rem" }}
                      src={URL.createObjectURL(creatFormik.values.info_image)}
                    />
                  )}
                  {creatFormik.touched.info_image &&
                  creatFormik.errors.info_image ? (
                    <div className="text-danger">
                      {creatFormik.errors.info_image}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>pdf url</Form.Label>
                  <Form.Control
                    name="pdf"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.pdf}
                    placeholder="Add the course pdf.."
                  />
                  {creatFormik.touched.pdf && creatFormik.errors.pdf ? (
                    <div className="text-danger">{creatFormik.errors.pdf}</div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Image url</Form.Label>
                  <Form.Control
                    name="image"
                    required
                    onChange={creatFormik.handleChange}
                    value={creatFormik.values.image}
                    type="text"
                  />
                  {creatFormik.touched.image && creatFormik.errors.image ? (
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
                  {creatFormik.touched.content && creatFormik.errors.content ? (
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
                    {creatFormik.touched.order && creatFormik.errors.order ? (
                      <div className="text-danger">
                        {creatFormik.errors.order}
                      </div>
                    ) : null}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Assessment required</Form.Label>
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
                    {courses.map((c) => (
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
            c
            <Modal.Header closeButton>
              <Modal.Title>Delete topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to delete this topic
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
                  onClick={() => deleteTopic()}
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
              <Modal.Title>Detail of topic</Modal.Title>
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
              <Modal.Title>Update topics</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={updateFormik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Topic name</Form.Label>
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

                  <Form.Group as={Col}>
                    <Form.Label>Video url</Form.Label>
                    <Form.Control
                      name="video"
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.video}
                      type="text"
                      required
                      placeholder="Enter play,example.."
                    />
                    {updateFormik.touched.video && updateFormik.errors.video ? (
                      <div className="text-danger">
                        {updateFormik.errors.video}
                      </div>
                    ) : null}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Info image</Form.Label>
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
                  <Form.Label>pdf url</Form.Label>
                  <Form.Control
                    name="pdf"
                    required
                    onChange={updateFormik.handleChange}
                    value={updateFormik.values.pdf}
                    placeholder="Add the course pdf.."
                  />
                  {updateFormik.touched.pdf && updateFormik.errors.pdf ? (
                    <div className="text-danger">{updateFormik.errors.pdf}</div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Image url</Form.Label>
                  <Form.Control
                    name="image"
                    required
                    onChange={updateFormik.handleChange}
                    value={updateFormik.values.image}
                    type="text"
                  />
                  {updateFormik.touched.image && updateFormik.errors.image ? (
                    <div className="text-danger">
                      {updateFormik.errors.image}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    name="content"
                    required
                    onChange={updateFormik.handleChange}
                    value={updateFormik.values.content}
                    type="text"
                    as={"textarea"}
                    rows={3}
                  />
                  {updateFormik.touched.content &&
                  updateFormik.errors.content ? (
                    <div className="text-danger">
                      {updateFormik.errors.content}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    required
                    onChange={updateFormik.handleChange}
                    as={"textarea"}
                    rows={4}
                    value={updateFormik.values.description}
                    type="text"
                  />
                  {updateFormik.touched.description &&
                  updateFormik.errors.description ? (
                    <div className="text-danger">
                      {updateFormik.errors.description}
                    </div>
                  ) : null}
                </Form.Group>
                <Row className="mb-3">
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

                  <Form.Group as={Col}>
                    <Form.Label>Assessment required</Form.Label>
                    <Form.Select
                      name="assement_required"
                      required
                      onChange={updateFormik.handleChange}
                      value={updateFormik.values.assement_required}
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
                    onChange={updateFormik.handleChange}
                  >
                    <option>{currentSelectedItem?.name}</option>
                    {courses.map((c) => (
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

export default TopicManagment;
