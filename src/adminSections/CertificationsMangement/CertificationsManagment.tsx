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
import SearchBtn from "../SearchBtn";
import Fuse from "fuse.js";
import "../main.scss";
import JoditEditor, { Jodit } from "jodit-react";
import { Document, pdfjs, Page } from "react-pdf";
import SearchBar from "../SearchBar";
import SingleSelect from "../SingleSelect";
import { v4 as uuidv4 } from "uuid";

//create validation
const createSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  background_image: Yup.string()
    .required("background ima ge  is required")
    .nullable(),
  on_complition: Yup.string().required("On completion is required"),
  on_attend: Yup.string().required("On attend is required"),
  signature_1: Yup.string()
    // .required("signature 1 image  is required")
    .nullable(),
  signature_2: Yup.string()
    // .required("signature 2 ima ge  is required")
    .nullable(),
  // text: Yup.string().required("Text is required"),
  sig1_title: Yup.string(),
  sig2_title: Yup.string(),
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
  const [content, setContent] = useState();
  const [pdf, setPdf] = useState();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const createInitialValues = {
    title: "",
    topic: "",
    background_image: "",
    on_complition: "True",
    on_attend: "True",
    // course: "",
    signature_1: "",
    signature_2: "",
    sig1_title: "",
    sig2_title: "",
    // text: "",
  };

  const updateInitialValues = {
    title: currentSelectedItem?.title ? currentSelectedItem.title : "",
    topic: currentSelectedItem?.topic ? currentSelectedItem?.topic : "",
    background_image: currentSelectedItem?.background_image
      ? currentSelectedItem?.background_image
      : "",
    signature_1: currentSelectedItem?.signature_1
      ? currentSelectedItem.signature_1
      : "",
    signature_2: currentSelectedItem?.signature_2
      ? currentSelectedItem.signature_2
      : "",
    sign1_title: currentSelectedItem?.sign1_title
      ? currentSelectedItem.sign1_title
      : "",
    sign2_title: currentSelectedItem?.sign2_title
      ? currentSelectedItem.sign2_title
      : "",
    course: currentSelectedItem?.course ? currentSelectedItem.course : "",
    on_complition: "True",
    on_attend: "True",
    text: "",
  };

  const updateFormik = useFormik({
    initialValues: updateInitialValues,
    enableReinitialize: true,
    // validationSchema: createSchema,
    onSubmit: (data) => {
      updateCertificate(data);
    },
  });

  const createValidate = () => {
    if (!currentSelectCourse) {
      setShowCourseError(true);
    } else {
      setShowCourseError(true);
    }
  };

  const creatFormik = useFormik({
    initialValues: createInitialValues,
    validationSchema: createSchema,
    validate: createValidate,
    onSubmit: (data, { resetForm }) => {
      data["text"] = "";
      createCertificate(data, resetForm);
    },
  });

  // modal handlers
  const [show, setShow] = useState(false);
  const [currentSelectCourse, setCurrentSelectedCourse] =
    React.useState<number>();
  // update
  const [updatedItem, setUpdatedItem] = useState<Certificate>();
  const [updateStatusSuccess, setUpdateStatusSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const dispatch = useAppDispatch();
  const [searchTxt, setSearchTxt] = useState("");
  const fuse = new Fuse(certificates || [], { keys: ["title"] });
  const result = fuse.search(searchTxt);
  const [bgImage, setBgImage] = useState("");
  const [dataImage, setDataImg] = useState();
  const [showbg, setShowBg] = useState(false);
  const [previewPdf, setPreviewPdf] = useState(false);
  const [showCourseSelect, setShowCourseSelect] = useState(false);

  const [courseSelectSearch, setCourseSelectSearchTxt] = useState("");

  const courseFuse = new Fuse(courses, { keys: ["name"] });
  const courseSearchResult = courseFuse.search(courseSelectSearch);
  const [showCourseError, setShowCourseError] = useState(false);

  const config = React.useMemo(
    () => ({
      readonly: false,
      editorCssClass: "c-editor",
      iframe: true,
      width: "1110px",

      style: {
        "line-height": "0px",
        padding: 0,
        margin: 0,
        background: `url(${dataImage})`,
        "background-size": "100%",
        width: "1100px",
        "background-repeat": "no-repeat",
        "font-size": "12px",
        overflow: "hidden",
      },
      iframeStyle: "",
      showWordsCounter: false,
      showXPathInStatusbar: false,
      removeButtons: [
        "source",
        "fullsize",
        "about",
        "outdent",
        "indent",
        "video",
        // "preview",
        "table",
        "fontsize",
        "superscript",
        "subscript",
        "file",
        "eraser",
        "copyformat",
      ],

      uploader: {
        url: "/api/upload",
        insertImageAsBase64URI: true,
      },
      draggableTags: ["name"],
    }),
    [showbg]
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
    setShowBg(false);
    setPdf(undefined);
    setCurrentSelectedCourse(undefined);
    setShowCourseSelect(false);
  };

  // get list of courses
  useEffect(() => {
    getCertificationList();
    getAssessmentList();
    getCertificatesTags();
    getCourseList();
  }, []);

  const getCertificatePdf = () => {
    setPreviewPdf(true);
    let token = localStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: "token " + token,
      };

      const formData = new FormData();
      formData.set(
        "background_image",
        currentSelectedItem?.background_image as string
      );
      formData.set("signature_1", currentSelectedItem?.signature_1 as string);
      formData.set("signature_2", currentSelectedItem?.signature_2 as string);
      formData.set("sig1_title", currentSelectedItem?.sign1_title as string);
      formData.set("sig2_title", currentSelectedItem?.sign2_title as string);

      fetch(`${BASE_URL}/master/certificate-preview/`, {
        method: "POST",
        headers,
        body: formData,
      })
        .then((res) => res.blob())
        .then((blob) => {
          setPreviewPdf(false);
          const reader = new FileReader();
          let base64Data;
          reader.readAsDataURL(blob);
          reader.onload = () => {
            base64Data = reader.result;
            setPdf(base64Data);
          };
        })
        .catch((err) => {
          setPreviewPdf(false);
          if (err.response) {
            setError(err.response.statusText);
          } else if (err.request) {
            setError(err.request);
          } else {
            setError(err.message);
          }
        });
    }
  };

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

  const updateCertificate = (data) => {
    const formData = new FormData();
    Object.entries(data).map(([key, val]) => {
      if (key === "course" && currentSelectCourse) {
        if (val !== currentSelectCourse) {
          formData.set(key, `${currentSelectCourse}`);
        }
      } else if (
        (key === "background_image" && typeof val === "string") ||
        (key === "signature_1" && typeof val === "string") ||
        (key === "signature_2" && typeof val === "string")
      ) {
      } else {
        //@ts-ignore
        formData.set(key, val);
      }
    });

    customAxios
      .get(`/student/get-course-details/${formData.get("course")}/`)
      .then((res) => {
        let topics: Topic[] = res.data.topics;
        //@ts-ignore
        let lastTopic: Topic = { order: -10000 };
        for (let i = 0; i < topics.length; i++) {
          if (topics[i].order > lastTopic.order) {
            lastTopic = topics[i];
          }
        }
        if (!lastTopic.id) {
          setShowSpinner("none");
          setSuccess("");
          setErrorType("update");
          setError("No Topics for this course");
        } else {
          formData.set("topic", lastTopic.id.toString());
          customAxios
            .post(
              `/master/certificate-update/${currentSelectedItem?.id}/`,
              formData
            )
            .then((res) => {
              setShowSpinner("none");
              setSuccess("Certificate is updated successfully");
              getCertificationList();
              setErrorType("none");
            })
            .catch((err) => {
              setShowSpinner("none");
              setSuccess("");
              setErrorType("update");
              setError(err.message);
              dispatch(
                showToast({
                  type: "danger",
                  message: err.message + " : admin : updating certificate",
                })
              );
            });
        }
      })
      .catch((err) => {
        setShowSpinner("none");
        setSuccess("");
        setErrorType("update");
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : topic update certificate",
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
    formData.set("course", `${currentSelectCourse}`);

    customAxios
      .get(`/student/get-course-details/${currentSelectCourse}/`)
      .then((res) => {
        let topics: Topic[] = res.data.topics;
        //@ts-ignore
        let lastTopic: Topic = { order: -10000 };
        for (let i = 0; i < topics.length; i++) {
          if (topics[i].order > lastTopic.order) {
            lastTopic = topics[i];
          }
        }
        if (!lastTopic.id) {
          setShowSpinner("none");
          setSuccess("");
          setErrorType("create");
          setError("No Topics for this course");
        } else {
          formData.set("topic", lastTopic.id.toString());
          customAxios
            .post(`/master/certificate-create/`, formData)
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
                  message:
                    err.message + " : admin : while creating certificates",
                })
              );
            });
        }
      })
      .catch((err) => {
        setShowSpinner("none");
        setSuccess("");
        setErrorType("create");
        setError(err.message);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : adding topic certificates",
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

  const getCourseNameById = (id?: number) => {
    let courseName;
    (courses || []).map((c) => {
      if (c.id === id) {
        courseName = c.name;
      }
    });
    return courseName;
  };

  const renderHtml = (htmlString) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };

  const onBlur = (newContent) => {
    setContent(newContent);
  };

  const addUniqueName = (file: File) => {
    let type = file.type.split("/")[1];
    const renamedFile = new File([file], `${uuidv4()}.${type}`, {
      type: file.type,
    });
    return renamedFile;
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
                  <Modal.Title>Create certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ margin: "auto", maxWidth: "700px" }}>
                    <Form noValidate onSubmit={creatFormik.handleSubmit}>
                      {true ? (
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
                            {creatFormik.touched.title &&
                            creatFormik.errors.title ? (
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
                              onChange={(e) => {
                                // @ts-ignore
                                let file = e.currentTarget.files[0];
                                creatFormik.setFieldValue(
                                  "background_image",
                                  addUniqueName(file)
                                );
                                // setBgImage(e.currentTarget.files[0]);
                                // const reader = new FileReader();
                                // reader.onload = function (e) {
                                //   const dataUri = e.target.result;
                                //   setDataImg(dataUri);
                                // };
                                // reader.readAsDataURL(e.currentTarget.files[0]);
                                // setShowBg(true);
                              }}
                              // value={creatFormik.values.info_image}
                            />
                            {creatFormik.values.background_image instanceof
                              File && (
                              <img
                                className="mt-3"
                                style={{ width: "8rem" }}
                                src={URL.createObjectURL(
                                  creatFormik.values.background_image
                                )}
                              />
                            )}
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
                              <Form.Label>signature 1 image</Form.Label>
                              <Form.Control
                                name="signature_1"
                                type="file"
                                required
                                placeholder="Upload signature 1 image"
                                onChange={(e) => {
                                  //@ts-ignore
                                  let file = e.currentTarget.files[0];
                                  creatFormik.setFieldValue(
                                    "signature_1",
                                    addUniqueName(file)
                                  );
                                }}
                                // value={creatFormik.values.info_image}
                              />
                              {creatFormik.values.signature_1 instanceof
                                File && (
                                <img
                                  className="mt-3"
                                  style={{ width: "8rem" }}
                                  src={URL.createObjectURL(
                                    creatFormik.values.signature_1
                                  )}
                                />
                              )}
                              {creatFormik.touched.signature_1 &&
                              creatFormik.errors.signature_1 ? (
                                <div className="text-danger">
                                  {creatFormik.errors.signature_1}
                                </div>
                              ) : null}
                              {validateErrors?.signature_1a ? (
                                <div className="text-danger">
                                  {validateErrors.signature_1a}
                                </div>
                              ) : null}
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>signature 2 image</Form.Label>
                              <Form.Control
                                name="signature_2"
                                type="file"
                                required
                                placeholder="Upload signature 2 image"
                                onChange={(e) => {
                                  //@ts-ignore
                                  let file = e.currentTarget.files[0];
                                  creatFormik.setFieldValue(
                                    "signature_2",
                                    addUniqueName(file)
                                  );
                                }}
                                // value={creatFormik.values.info_image}
                              />
                              {creatFormik.values.signature_2 instanceof
                                File && (
                                <img
                                  className="mt-3"
                                  style={{ width: "8rem" }}
                                  src={URL.createObjectURL(
                                    creatFormik.values.signature_2
                                  )}
                                />
                              )}
                              {creatFormik.touched.signature_2 &&
                              creatFormik.errors.signature_2 ? (
                                <div className="text-danger">
                                  {creatFormik.errors.signature_2}
                                </div>
                              ) : null}
                              {validateErrors?.signature_2 ? (
                                <div className="text-danger">
                                  {validateErrors.signature_2}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Row>

                          <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3">
                              <Form.Label>signature 1 title</Form.Label>
                              <Form.Control
                                name="sig1_title"
                                value={creatFormik.values.sig1_title}
                                onChange={creatFormik.handleChange}
                                type="text"
                                required
                                placeholder="Enter signature 1 title"
                              />
                              {creatFormik.touched.sig1_title &&
                              creatFormik.errors.sig1_title ? (
                                <div className="text-danger">
                                  {creatFormik.errors.sig1_title}
                                </div>
                              ) : null}
                              {validateErrors?.sig1_title ? (
                                <div className="text-danger">
                                  {validateErrors.sig1_title}
                                </div>
                              ) : null}
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                              <Form.Label>signature 2 title</Form.Label>
                              <Form.Control
                                name="sig2_title"
                                value={creatFormik.values.sig2_title}
                                onChange={creatFormik.handleChange}
                                type="text"
                                required
                                placeholder="Enter signature 2 title"
                              />
                              {creatFormik.touched.sig2_title &&
                              creatFormik.errors.sig2_title ? (
                                <div className="text-danger">
                                  {creatFormik.errors.sig2_title}
                                </div>
                              ) : null}
                              {validateErrors?.sig2_title ? (
                                <div className="text-danger">
                                  {validateErrors.sig2_title}
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
                            {/* <JoditEditor
                              value={content}
                              config={config}
                              onChange={onBlur}
                            /> */}
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
                            type="submit"
                          >
                            Create
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
              {pdf ? null : (
                <div style={{ maxWidth: "50rem", margin: "auto" }}>
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
                            {k === "sign1_title"
                              ? "Signature 1 title"
                              : k === "sign2_title"
                              ? "Signature 2 title"
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
                            {k === "background_image" ||
                            k === "signature_1" ||
                            k === "signature_2" ? (
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
                </div>
              )}
              {pdf ? (
                <div>
                  <div
                    style={{
                      marginTop: "2rem",
                      height: "47rem",
                      overflow: "hidden",
                      color: "white",
                      background: "white",
                    }}
                  >
                    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                      <Page pageNumber={pageNumber} />
                    </Document>
                  </div>
                </div>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              {pdf ? (
                <Button
                  style={{}}
                  onClick={() => setPdf(undefined)}
                  className="text-white"
                >
                  Show Details
                </Button>
              ) : (
                <Button
                  onClick={() => getCertificatePdf()}
                  className="text-white"
                >
                  {previewPdf ? "Loading ..." : "Preview Certificate"}
                </Button>
              )}

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
                  <Modal.Title>Update certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div style={{ margin: "auto", maxWidth: "700px" }}>
                    <Form noValidate onSubmit={updateFormik.handleSubmit}>
                      {true ? (
                        <>
                          <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              name="title"
                              value={updateFormik.values.title}
                              onChange={updateFormik.handleChange}
                              type="text"
                              required
                              placeholder="Enter certificate title"
                            />
                            {updateFormik.touched.title &&
                            updateFormik.errors.title ? (
                              <div className="text-danger">
                                {updateFormik.errors.title}
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
                              onChange={(e) => {
                                //@ts-ignore
                                let file = e.currentTarget.files[0];
                                updateFormik.setFieldValue(
                                  "background_image",
                                  addUniqueName(file)
                                );
                              }}
                            />
                            {updateFormik.touched.background_image &&
                            updateFormik.errors.background_image ? (
                              <div className="text-danger">
                                {updateFormik.errors.background_image}
                              </div>
                            ) : null}
                            {typeof updateFormik.values.background_image ===
                              "string" && (
                              <img
                                className="mt-3"
                                style={{ width: "8rem" }}
                                src={`https://${HOST}${updateFormik.values.background_image}`}
                              />
                            )}
                            {updateFormik.values.background_image instanceof
                              File && (
                              <img
                                className="mt-3"
                                style={{ width: "8rem" }}
                                src={URL.createObjectURL(
                                  updateFormik.values.background_image
                                )}
                              />
                            )}
                            {validateErrors?.background_image ? (
                              <div className="text-danger">
                                {validateErrors.background_image}
                              </div>
                            ) : null}
                          </Form.Group>
                          <Row className="mb-3">
                            <Form.Group as={Col}>
                              <Form.Label>signature 1 image</Form.Label>
                              <Form.Control
                                name="signature_1"
                                type="file"
                                required
                                placeholder="Upload signature 1 image"
                                onChange={(e) => {
                                  //@ts-ignore
                                  let file = e.currentTarget.files[0];
                                  updateFormik.setFieldValue(
                                    "signature_1",
                                    addUniqueName(file)
                                  );
                                }}
                                // value={updateFormik.values.info_image}
                              />
                              {typeof updateFormik.values.signature_1 ===
                                "string" && (
                                <img
                                  className="mt-3"
                                  style={{ width: "8rem" }}
                                  src={`https://${HOST}${updateFormik.values.signature_1}`}
                                />
                              )}
                              {updateFormik.values.signature_1 instanceof
                                File && (
                                <img
                                  className="mt-3"
                                  style={{ width: "8rem" }}
                                  src={URL.createObjectURL(
                                    updateFormik.values.signature_1
                                  )}
                                />
                              )}
                              {updateFormik.touched.signature_1 &&
                              updateFormik.errors.signature_1 ? (
                                <div className="text-danger">
                                  {updateFormik.errors.signature_1}
                                </div>
                              ) : null}
                              {validateErrors?.signature_1a ? (
                                <div className="text-danger">
                                  {validateErrors.signature_1a}
                                </div>
                              ) : null}
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>signature 2 image</Form.Label>
                              <Form.Control
                                name="signature_2"
                                type="file"
                                required
                                placeholder="Upload signature 2 image"
                                onChange={(e) => {
                                  //@ts-ignore
                                  let file = e.currentTarget.files[0];
                                  updateFormik.setFieldValue(
                                    "signature_2",
                                    addUniqueName(file)
                                  );
                                }}
                                // value={updateFormik.values.info_image}
                              />
                              {typeof updateFormik.values.signature_2 ===
                                "string" && (
                                <img
                                  className="mt-3"
                                  style={{ width: "8rem" }}
                                  src={`https://${HOST}${updateFormik.values.signature_2}`}
                                />
                              )}
                              {updateFormik.values.signature_2 instanceof
                                File && (
                                <img
                                  className="mt-3"
                                  style={{ width: "8rem" }}
                                  src={URL.createObjectURL(
                                    updateFormik.values.signature_2
                                  )}
                                />
                              )}
                              {updateFormik.touched.signature_2 &&
                              updateFormik.errors.signature_2 ? (
                                <div className="text-danger">
                                  {updateFormik.errors.signature_2}
                                </div>
                              ) : null}
                              {validateErrors?.signature_2 ? (
                                <div className="text-danger">
                                  {validateErrors.signature_2}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Row>

                          <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3">
                              <Form.Label>signature 1 title</Form.Label>
                              <Form.Control
                                name="sign1_title"
                                value={updateFormik.values.sign1_title}
                                onChange={updateFormik.handleChange}
                                type="text"
                                required
                                placeholder="Enter signature 1 title"
                              />
                              {updateFormik.touched.sign1_title &&
                              updateFormik.errors.sign1_title ? (
                                <div className="text-danger">
                                  {updateFormik.errors.sign1_title}
                                </div>
                              ) : null}
                              {validateErrors?.sig1_title ? (
                                <div className="text-danger">
                                  {validateErrors.sig1_title}
                                </div>
                              ) : null}
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3">
                              <Form.Label>signature 2 title</Form.Label>
                              <Form.Control
                                name="sign2_title"
                                value={updateFormik.values.sign2_title}
                                onChange={updateFormik.handleChange}
                                type="text"
                                required
                                placeholder="Enter signature 2 title"
                              />
                              {updateFormik.touched.sign2_title &&
                              updateFormik.errors.sign2_title ? (
                                <div className="text-danger">
                                  {updateFormik.errors.sign2_title}
                                </div>
                              ) : null}
                              {validateErrors?.sig2_title ? (
                                <div className="text-danger">
                                  {validateErrors.sig2_title}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Row>

                          <Form.Group>
                            <button
                              className="w-50 p-2 bg-white mb-3"
                              onClick={() => setShowCourseSelect(true)}
                              style={{
                                display: "block",
                                border: "1px solid #dedede",
                                borderRadius: ".6rem",
                              }}
                            >
                              {getCourseNameById(
                                parseInt(updateFormik.values.course as string)
                              ) && !currentSelectCourse
                                ? getCourseNameById(
                                    parseInt(
                                      updateFormik.values.course as string
                                    )
                                  )
                                : getCourseNameById(currentSelectCourse)
                                ? getCourseNameById(currentSelectCourse)
                                : "Select the users to select"}
                            </button>
                            {showCourseError && !currentSelectCourse ? (
                              <div className="text-danger">
                                Please Select Course
                              </div>
                            ) : null}
                          </Form.Group>
                        </>
                      ) : (
                        <>
                          {/* <div>
                            <h6>Use the following tags only.</h6>
                            <p className="me-2">
                              {Object.entries(certificateTags || {}).map(
                                ([key, value]) => `${key}: ${value}, `
                              )}
                            </p>
                          </div>
                          <div>
                            <JoditEditor
                              value={content}
                              config={config}
                              onChange={onBlur}
                            />
                          </div> */}
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
                            type="submit"
                          >
                            Update
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

export default CertificationManagment;
