import React, { useCallback } from "react";
import {
  addUniqueIdsToList,
  customAxios,
  getOrderListFromTwoList,
  NormalizeProgressData,
  normalizeTopics,
} from "../../services/utils";
import { showToast } from "../../features/toast";
import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import {
  BsPenFill,
  BsFileTextFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import type { Topic, Module } from "../../definations/course";
import type { Assessment } from "../../definations/assessment";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./styles.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../store";
import { HOST } from "../../features/settings";

const createInitialValues = {
  name: "",
  video: "",
  info_image: "",
  pdf: "",
  image: "",
  content: "",
  description: "",
  assement_required: "False",
  course: "",
  module_title: "",
};

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
});

const CourseContainer = ({}) => {
  const [topics, setTopics] = React.useState<(Topic | Assessment)[]>();
  const [showMododel, setShowModel] = React.useState(false);
  const [modelType, setModelType] = React.useState<
    "TOPIC_UPDATE" | "TOPIC_CREATE" | "MODULE_CREATE"
  >();
  const [currentSelectIndex, setCurrentSelectedIndex] =
    React.useState<number>();
  const { courseId, courseName } = useParams();
  const [currentSelectTopic, setCurrentSelectedTopic] = React.useState();
  const [moduleTitle, setModuleTitle] = React.useState("");
  const dispatch = useDispatch();
  const [selectedUpdateTopic, setSelectedUpdateTopic] = React.useState<Topic>();

  const creatFormik = useFormik({
    initialValues: createInitialValues,
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => createTopic(data, resetForm),
  });

  const updateInitialValues = {
    name: selectedUpdateTopic?.name ? selectedUpdateTopic.name : "",
    video: selectedUpdateTopic?.video ? selectedUpdateTopic?.video : "",
    info_image: selectedUpdateTopic?.info_image
      ? selectedUpdateTopic?.info_image
      : "",
    pdf: selectedUpdateTopic?.pdf ? selectedUpdateTopic.pdf : "",
    image: selectedUpdateTopic?.image ? selectedUpdateTopic.image : "",
    content: selectedUpdateTopic?.content ? selectedUpdateTopic.content : "",
    description: selectedUpdateTopic?.description
      ? selectedUpdateTopic.description
      : "",
  };

  const updateFormik = useFormik({
    initialValues: updateInitialValues,
    enableReinitialize: true,
    // validationSchema: createSchema,
    onSubmit: (data) => {
      updateTopic(data);
    },
  });

  const hideModel = () => {
    setShowModel(false);
    setModelType(undefined);
    setCurrentSelectedTopic(undefined);
    setModuleTitle("");
    setSelectedUpdateTopic(undefined);
  };

  const getAllTopics = useCallback(() => {
    if (courseId) {
      customAxios
        .get(`student/get-course-details/${courseId}/`)
        .then((res) => {
          const { topics, assesements } = res.data;
          const orderTopics = getOrderListFromTwoList<Topic, Assessment>(
            topics,
            assesements
          );
          const orderTopicsWithCustomIds = addUniqueIdsToList<
            Topic | Assessment
          >(orderTopics);
          // const normalizedTopics = normalizeTopics(orderTopicsWithCustomIds);
          setTopics(orderTopicsWithCustomIds);
          console.log(orderTopicsWithCustomIds);
        })
        .catch((err) => {
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : while fetching all topics",
            })
          );
        });
    }
  }, [courseId]);

  React.useEffect(() => {
    getAllTopics();
  }, []);

  // create topic
  const createTopic = (data, resetForm) => {
    if (courseId) {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      Object.entries(data).map(([key, val]) => {
        // @ts-ignore
        formData.append(key, val);
      });

      formData.set("course", `${courseId}`);
      if (currentSelectIndex && currentSelectIndex <= 0) {
        formData.set("order", `0`);
      } else {
        formData.set("order", `${currentSelectIndex}`);
      }
      customAxios
        .post(`/master/topic-create/`, formData)
        .then((res) => {
          resetForm();
          hideModel();
          getAllTopics();
          dispatch(
            showToast({
              type: "success",
              message: "Topic Successfully Created",
            })
          );
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            showToast({
              type: "danger",
              message: error.message + " : admin : while topic delete",
            })
          );
        });
    }
  };

  const deleteTopic = (id) => {
    customAxios
      .get(`/master/topic-delete/${id}`)
      .then((res) => {
        getAllTopics();
        dispatch(
          showToast({
            type: "success",
            message: "Successfully Topic deleted",
          })
        );
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while topic delete",
          })
        );
      });
  };

  // update
  const updateMoudle = (title) => {
    const formData = new FormData();
    formData.set("course", `${courseId}`);
    formData.set("module_title", moduleTitle);
    if (courseId) {
      customAxios
        .put(
          `/master/topic-update_module_title/${currentSelectTopic}/`,
          formData
        )
        .then((res) => {
          getAllTopics();
          hideModel();

          dispatch(
            showToast({
              type: "success",
              message: "Module Created Successfullly",
            })
          );
        })
        .catch((err) => {
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : admin : while topic module update",
            })
          );
        });
    }
  };

  // remove module
  const removeModule = (topicId) => {
    const formData = new FormData();
    formData.set("course", `${courseId}`);
    formData.set("module_title", "");
    if (courseId) {
      customAxios
        .put(`/master/topic-update_module_title/${topicId}/`, formData)
        .then((res) => {
          getAllTopics();
          hideModel();

          dispatch(
            showToast({
              type: "success",
              message: "Module removed Successfullly",
            })
          );
        })
        .catch((err) => {
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : admin : while topic module update",
            })
          );
        });
    }
  };

  const updateTopic = (data) => {
    const formData = new FormData();
    Object.entries(data || {}).forEach(([key, val]) => {
      //@ts-ignore
      if (selectedUpdateTopic[key] !== val) {
        formData.append(key, val);
      }
    });
    // formData.set("info_image", selectedUpdateTopic.info_image);
    formData.set("course", `${courseId}`);
    if (courseId) {
      customAxios
        .put(
          `/master/topic-update_module_title/${selectedUpdateTopic.id}/`,
          formData
        )
        .then((res) => {
          getAllTopics();
          hideModel();

          dispatch(
            showToast({
              type: "success",
              message: "Topic Updated Successfullly",
            })
          );
        })
        .catch((err) => {
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : admin : while topic module update",
            })
          );
        });
    }
  };

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={"mxain" + "1"}
          initial={{ y: 55, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -55, opacity: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.1,
          }}
          className="course-container"
          style={{
            maxWidth: "700px",
            margin: "auto",
            paddingTop: "3rem",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginBottom: "1.1rem" }}
          >
            <h2 className="title-container">Course: {courseName}</h2>
            <div></div>
          </div>
          {(topics || []).map((t) => (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1,
                }}
                className="course-container"
                style={{
                  margin: "auto",
                }}
                key={t.id}
              >
                {t.module_title ? (
                  <div className="text-center">
                    {/* <div
                      className="w-100"
                      style={{
                        marginBottom: "-2.3rem",
                        marginTop: "3rem",
                        padding: "0% 10%",
                        borderTop: "2px dashed #cccccc",
                      }}
                    ></div> */}
                    <p
                      className="my-2 b-500 mt-2 pt-3 px-4 pb-5 text-center br-1 text-black "
                      style={{
                        height: "3rem",
                        fontSize: "1.2rem",
                        background: "white",
                        display: "inline-block",
                        textTransform: "capitalize",
                      }}
                    >
                      {t.module_title}
                      <AiTwotoneDelete
                        onClick={() => {
                          removeModule(t.id);
                        }}
                        className="text-black"
                        style={{
                          marginTop: "-.8rem",
                          marginLeft: "1rem",
                          cursor: "pointer",
                        }}
                        size={18}
                      />
                    </p>
                  </div>
                ) : (
                  <motion.div
                    className="add-module-line" //moudle lilne
                    style={{
                      height: "1.5rem",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="inside-line"
                      style={{
                        height: 0,

                        transform: "translateY(-9rem)",
                      }}
                    >
                      <p
                        className="px-5"
                        style={{
                          borderTop: "2px dashed #cccccc",
                          zIndex: "-1",
                        }}
                      ></p>
                      <div style={{ textAlign: "center", marginTop: "-2rem" }}>
                        {/* <BsFillPlusCircleFill
                        size="1.6rem"
                        style={{
                          zIndex: "100",
                          color: "black",
                          textAlign: "center",
                          marginTop: "-4rem",
                        }}
                      /> */}
                        <p
                          onClick={() => {
                            setModelType("MODULE_CREATE");
                            setCurrentSelectedTopic(t.id);
                          }}
                          className="bg-gray"
                          style={{
                            color: "black",
                            display: "inline-block",
                            padding: ".2rem 1rem",
                            cursor: "pointer",
                            borderRadius: ".5rem",
                          }}
                        >
                          <BsFillPlusCircleFill
                            size="1.1rem"
                            style={{
                              zIndex: "100",
                              color: "black",
                              textAlign: "center",
                              marginTop: "-.5rem",
                              marginRight: ".5rem",
                            }}
                          />
                          Add module
                        </p>
                        <p
                          className="bg-gray"
                          style={{
                            // background: "#18b3a7",
                            color: "black",
                            display: "inline-block",
                            padding: ".2rem 1rem",
                            cursor: "pointer",
                            borderRadius: ".5rem",
                            margin: "0rem 1rem",
                          }}
                          onClick={() => {
                            setModelType("TOPIC_CREATE");
                            setCurrentSelectedIndex(t.order - 1);
                          }}
                        >
                          Add topic
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <Row className="d-flex justify-content-between bg-graydark br-1 ">
                  <Col sm={8} style={{ cursor: "pointer" }}>
                    <div className="p-2 d-flex align-items-center">
                      <OrderInput
                        order={`${t.order}`}
                        courseId={courseId}
                        topicId={t.id}
                        getAllTopics={getAllTopics}
                      />
                      <p
                        className="mt-2 ps-2"
                        style={{
                          fontSize: "1.1rem",

                          wordWrap: "break-word",
                        }}
                      >
                        {t.name &&
                          t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                      </p>
                    </div>
                  </Col>
                  <Col
                    style={{
                      minHeight: "100%",

                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      className="bg-graydark text-white me-1  btn-circle"
                      onClick={() => deleteTopic(t.id)}
                      style={{
                        outline: "none",
                        border: "none",
                        borderRadius: "4rem",
                      }}
                    >
                      <AiTwotoneDelete className="text-danger" size={22} />
                    </Button>
                    <Button
                      className="bg-graydark text-white me-1  btn-circle"
                      onClick={() => {
                        setSelectedUpdateTopic(t);
                        setModelType("TOPIC_UPDATE");
                      }}
                      style={{
                        outline: "none",
                        border: "none",
                        borderRadius: "4rem",
                      }}
                    >
                      <BsPenFill className="text-adminsecondary" size="20" />
                    </Button>
                  </Col>
                </Row>
              </motion.div>
            </AnimatePresence>
          ))}
          {/* {(modules || []).map((m) => (
          <div>
            <div>
              <Row className="d-flex justify-content-between bg-primary text-white br-1 my-4">
                <Col sm={8} style={{ cursor: "pointer" }}>
                  <div className="p-2">
                    <p className="mt-2 ps-2" style={{ fontSize: "1.1rem" }}>
                      {m.module_name &&
                        m.module_name.charAt(0).toUpperCase() +
                          m.module_name.slice(1)}
                    </p>
                  </div>
                </Col>
                <Col style={{ marginTop: "1rem" }}>
                  <div className="d-flex">
                    <div className="me-1">create topic</div>
                    <div>create assessment</div>
                  </div>
                </Col>
              </Row>
            </div>
            <>
              {m.topics.map((t) => (
                <Row className="d-flex justify-content-between bg-graydark br-1 mb-1 w-75">
                  <Col sm={8} style={{ cursor: "pointer" }}>
                    <div className="p-2">
                      <p className="mt-2 ps-2" style={{ fontSize: "1.1rem" }}>
                        {t.name &&
                          t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                      </p>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "1rem" }}>
                    <Button
                      className="bg-graydark text-white me-1  btn-circle"
                      style={{
                        outline: "none",
                        border: "none",
                        borderRadius: "4rem",
                      }}
                      onClick={() => props.openModel(props.item, "delete")}
                    >
                      <AiTwotoneDelete className="text-danger" size={22} />
                    </Button>
                  </Col>
                </Row>
              ))}
            </>
          </div>
        ))} */}
          <div
            style={{
              height: "3rem",
              overflow: "hidden",
              marginTop: "2rem",

              textAlign: "center",
            }}
          >
            <p
              style={{
                background: "black",
                color: "white",
                display: "inline-block",
                padding: ".2rem 1rem",
                cursor: "pointer",
                borderRadius: ".5rem",
              }}
            >
              <BsFillPlusCircleFill
                size="1.1rem"
                style={{
                  zIndex: "100",
                  color: "white",
                  textAlign: "center",
                  marginTop: "-.5rem",
                  marginRight: ".5rem",
                }}
              />
              Add module
            </p>
            <p
              className="bg-primary"
              style={{
                // background: "#18b3a7",
                color: "white",
                display: "inline-block",
                padding: ".2rem 1rem",
                cursor: "pointer",
                borderRadius: ".5rem",
                margin: "0rem 1rem",
              }}
              onClick={() => {
                setModelType("TOPIC_CREATE");
                setCurrentSelectedIndex(topics?.length + 1);
              }}
            >
              Add topic
            </p>
          </div>
          {modelType === "TOPIC_CREATE" && (
            <>
              <Modal size="xl" show={true} onHide={hideModel}>
                <Modal.Header closeButton>
                  <Modal.Title>Create topic</Modal.Title>
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
                        {creatFormik.touched.video &&
                        creatFormik.errors.video ? (
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
                      {creatFormik.values.info_image instanceof File && (
                        <img
                          className="mt-3"
                          style={{ width: "8rem" }}
                          src={URL.createObjectURL(
                            creatFormik.values.info_image
                          )}
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
                        <div className="text-danger">
                          {creatFormik.errors.pdf}
                        </div>
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

                    <Modal.Footer>
                      <Button variant="secondary" onClick={hideModel}>
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
                  </Form>
                </Modal.Body>
              </Modal>
            </>
          )}
          {modelType === "MODULE_CREATE" && (
            <Modal size="sm" show={true} onHide={hideModel}>
              <Modal.Header closeButton>
                <Modal.Title>Create Module</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Module title</Form.Label>
                  <Form.Control
                    name="Title"
                    required
                    onChange={(e) => setModuleTitle(e.target.value)}
                    value={moduleTitle}
                    placeholder="My title.."
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={hideModel}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    updateMoudle();
                  }}
                  className="d-flex align-items-center"
                  variant="admingreen text-white"
                  type="submit"
                >
                  Create
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          {modelType === "TOPIC_UPDATE" && (
            <Modal size="xl" show={true} onHide={hideModel}>
              <Modal.Header closeButton>
                <Modal.Title>Update topic</Modal.Title>
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
                      {updateFormik.touched.video &&
                      updateFormik.errors.video ? (
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
                        src={URL.createObjectURL(
                          updateFormik.values.info_image
                        )}
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
                      <div className="text-danger">
                        {updateFormik.errors.pdf}
                      </div>
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

                  <Modal.Footer>
                    <Button variant="secondary" onClick={hideModel}>
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
                </Form>
              </Modal.Body>
            </Modal>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

type Props = {
  order: string;
  courseId?: string;
  topicId: number;
  getAllTopics: () => void;
};

const OrderInput = ({ order, courseId, topicId, getAllTopics }: Props) => {
  const [currentOrder, setCurrentOrder] = React.useState(order);
  const dispatch = useAppDispatch();

  const updateOrder = () => {
    const formData = new FormData();

    formData.set("course", `${courseId}`);
    formData.set("order", `${currentOrder}`);
    if (courseId) {
      customAxios
        .put(`/master/topic-update_module_title/${topicId}/`, formData)
        .then((res) => {
          getAllTopics();
          dispatch(
            showToast({
              type: "success",
              message: "Order updated Successfullly",
            })
          );
        })
        .catch((err) => {
          setCurrentOrder(order);
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : admin : while updating order number",
            })
          );
        });
    }
  };

  return (
    <input
      className="bg-gray d-flex align-items-center justify-content-center b-600"
      style={{
        borderRadius: "1rem",
        marginRight: "1rem",
        width: "3.8rem",
        height: "3.8rem",
        textAlign: "center",
        border: "none",
      }}
      type="tel"
      maxLength={2}
      onBlur={updateOrder}
      value={currentOrder}
      onChange={(e) => {
        setCurrentOrder(e.target.value);
      }}
    />
  );
};

export default CourseContainer;
