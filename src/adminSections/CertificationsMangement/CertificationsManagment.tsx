import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Form,
  Button,
  Modal,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useFormik, validateYupSchema } from "formik";
import ListItem from "../ListItem";
import type { Course, Certificate, Topic } from "./../../definations/course";
import type { Assessment } from "./../../definations/assessment";
import { BASE_URL, HOST } from "../../features/settings";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import * as Yup from "yup";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAppDispatch } from "../../store";
import { showToast } from "../../features/toast";
import NotFound from "../../sections/NotFound";
import Loading from "../../sections/Loading";
import { customAxios } from "../../services/utils";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SearchBtn from "../SearchBtn";
import Fuse from "fuse.js";
import "../main.scss";

//create validation
const createSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  background_image: Yup.string()
    .required("background ima ge  is required")
    .nullable(),
  on_complition: Yup.string().required("On completion is required"),
  on_attend: Yup.string().required("On attend is required"),
  // text: Yup.string().required("Text is required"),
});

const CertificationManagment = () => {
  const userType = localStorage.getItem("userType");
  const [certificates, setCertifications] = useState<Certificate[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assesments, setAssessments] = useState<Assessment[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Certificate>();
  const [showEditor, setShowEditor] = useState(false);
  const [validateErrors, setValidateErros] = useState<Record<string, string>>(
    {}
  );
  const [certificateTags, setCertificateTags] = useState<
    Record<string, string>
  >({});
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
  const [showDeleteBtn, setShowDeleteButton] = useState(true);

  const createInitialValues = {
    title: "",
    topic: "",
    background_image: "",
    on_complition: "True",
    on_attend: "True",
    course: "",
    // text: "",
  };

  const creatFormik = useFormik({
    initialValues: createInitialValues,
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => {
      console.log(editorState.getCurrentContent());
      const markup = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      data["text"] = markup;
      createCertificate(data, resetForm);
    },
  });

  // modal handlers
  const [show, setShow] = useState(false);

  // update
  const [updatedItem, setUpdatedItem] = useState<Certificate>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const dispatch = useAppDispatch();
  const [searchTxt, setSearchTxt] = useState("");
  const fuse = new Fuse(certificates || [], { keys: ["name"] });
  const result = fuse.search(searchTxt);

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const openModel = (
    certificate: Certificate,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(certificate);
    setUpdatedItem(certificate);
    setShow(true);
    setCurrentModal(type);
  };
  // console.log(editorState.getCurrentContent().getPlainText());

  const createCourseOpenModal = () => {
    setCurrentModal("create");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setError("");
    setSuccess("");
    setShowEditor(false);
    creatFormik.setValues(createInitialValues);
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
    getCertificatesTags();
    getCourseList();
  }, []);

  const deleteCertificate = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("delete");
    axios
      .get(`${BASE_URL}/master/certificate-delete/${currentSelectedItem?.id}`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setShowSpinner("none");
        setSuccess("Certificate deleted successfully");
        setErrorType("none");
        setShowDeleteButton(false);
        getCertificationList();
      })
      .catch((err) => {
        setShowSpinner("none");
        setErrorType("delete");
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while deleting Certificate",
          })
        );
      });
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
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching certificates",
          })
        );
      });
  };

  //get Certification tags list
  const getCertificatesTags = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/master/certificate-create`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => {
        setCertificateTags(res.data.tags);
        // console.info(res.data.tags)
        setShowSpinner("none");
        setErrorType("none");
      })
      .catch((err) => {
        setShowSpinner("none");
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message:
              err.message + " : admin : while fetcthing certificate tags",
          })
        );
      });
  };

  // create certificate
  const createCertificate = (data, resetForm) => {
    setShowSpinner("create");
    const formData = new FormData();
    const token = localStorage.getItem("token");
    Object.entries(data).map(([key, val]) => {
      // @ts-ignore
      formData.append(key, val);
    });
    axios
      .post(`${BASE_URL}/master/certificate-create/`, formData, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        setShowSpinner("none");
        resetForm();
        setSuccess("Certificate is created successfully");
        getCertificationList();
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
            message: err.message + " : admin : while creating certificates",
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
            message: err.message + " : admin : while fetching assessment list",
          })
        );
      });
  };

  //get course list
  const getCourseList = () => {
    customAxios
      .get(`${BASE_URL}/master/course-list`)
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching courseList",
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
            message: err.message + " : admin : while fetching topic list",
          })
        );
      });
  };

  const validateAndNext = () => {
    creatFormik.validateForm().then((data) => {
      if (Object.keys(data).length === 0) {
        setShowEditor(true);
      } else {
        setValidateErros(data);
      }
    });
  };

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  return (
    <Container style={{ maxWidth: "820px" }}>
      <div className="bg-white py-2 px-1 br-2">
        <div className="d-flex justify-content-between mb-3 mt-2 p-2 header-container">
          <h3 className="b-700">Certificates</h3>
          <div className="d-flex justify-content-between">
            <SearchBtn
              searchtxt={searchTxt}
              setSearchTxt={setSearchTxt}
              placeholder={"Search certificates"}
            />
            <Button
              className="bg-adminteritory text-white br-2"
              onClick={createCourseOpenModal}
            >
              Create certificate
            </Button>
          </div>
        </div>
        {showSpinner === "list" ? (
          <Loading />
        ) : (certificates || []).length === 0 ? (
          <>
            <NotFound />
            <h3 className="text-center b-600">
              No certificates available At this moment
            </h3>
            <p className="text-center">Please try again later</p>
          </>
        ) : searchTxt.length > 0 ? (
          (result || []).map(({ item }) => {
            return (
              <ListItem
                item={item}
                title={item.title}
                key={item.id}
                openModel={openModel}
                NoEdit
                sm={9}
              ></ListItem>
            );
          })
        ) : (
          (certificates || []).map((item) => {
            return (
              <ListItem
                item={item}
                title={item.title}
                key={item.id}
                openModel={openModel}
                NoEdit
                sm={9}
              ></ListItem>
            );
          })
        )}
      </div>

      <Modal
        show={show}
        //@ts-ignore
        size="xl"
        onHide={handleClose}
      >
        {currentModal === "create" && (
          <>
            {error && errorType === "create" && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {success && (
              <SuccessMessage setSuccess={setSuccess}>{success}</SuccessMessage>
            )}
            <Modal.Header closeButton>
              <Modal.Title>Create certificate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate onSubmit={creatFormik.handleSubmit}>
                {!showEditor ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        name="title"
                        value={creatFormik.values.title}
                        onChange={creatFormik.handleChange}
                        type="text"
                        required
                        placeholder="Enter certificate title"
                      />
                      {creatFormik.touched.title && creatFormik.errors.title ? (
                        <div className="text-danger">
                          {creatFormik.errors.title}
                        </div>
                      ) : null}
                      {validateErrors?.title ? (
                        <div className="text-danger">
                          {validateErrors.title}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Background image</Form.Label>
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
                      {validateErrors?.background_image ? (
                        <div className="text-danger">
                          {validateErrors.background_image}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label>On completion</Form.Label>
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

                    <Form.Group className="mb-3">
                      <Form.Label>select the topic</Form.Label>
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
                    <Form.Group>
                      <Form.Label>select the course</Form.Label>
                      <Form.Select
                        required
                        name="course"
                        onChange={creatFormik.handleChange}
                      >
                        <option>select the couse</option>
                        {(courses || []).map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <div>
                      <h6>Use the following tags only.</h6>
                      <p className="me-2">
                        {Object.entries(certificateTags || {}).map(
                          ([key, value]) => `${key}: ${value}, `
                        )}
                      </p>
                    </div>
                    <div>
                      <Editor
                        editorStyle={{ minHeight: "15rem", background: "none" }}
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                          options: [
                            "inline",
                            "fontSize",
                            "fontFamily",
                            "textAlign",
                            "colorPicker",
                            "link",
                            "embedded",
                            "emoji",
                            "image",
                            "remove",
                            "history",
                          ],
                          inline: {
                            options: ["bold", "italic", "underline"],
                          },
                          fontSize: {
                            options: [12, 14, 16, 18, 24, 30, 36],
                          },
                        }}
                        mention={{
                          separator: " ",
                          trigger: "{",
                          suggestions: Object.entries(
                            certificateTags || {}
                          ).map(([key, value]) => ({
                            text: key,
                            value: value.slice(1),
                          })),
                        }}
                      />
                    </div>
                  </>
                )}
                {!showEditor ? (
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      className="d-flex align-items-center"
                      variant="admingreen text-white"
                      onClick={() => validateAndNext()}
                    >
                      Next
                    </Button>
                  </Modal.Footer>
                ) : (
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      className="d-flex align-items-center"
                      variant="admingreen text-white"
                      onClick={() => setShowEditor(false)}
                    >
                      Back
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
                )}
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
              <Modal.Title>Delete certificate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure to delete this {currentSelectedItem?.title}{" "}
                certificate{" "}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                  setShowDeleteButton(true);
                }}
              >
                Close
              </Button>
              {showDeleteBtn && (
                <Button variant="danger text-white" onClick={deleteCertificate}>
                  delete
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
        {currentModal === "read" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Detail of certification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Object.entries(currentSelectedItem || {}).map(([k, v]) => (
                <div key={k} className="d-flex">
                  <p className="b-700 me-2">{k}: </p>
                  <p style={{ wordBreak: "break-word" }}>
                    {(v || "").toString()}
                  </p>
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
      </Modal>
    </Container>
  );
};

export default CertificationManagment;
