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
import type { Course, Topic, Event } from "./../../definations/course";
import { BASE_URL, HOST } from "../../features/settings";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMesage";
import SuccessMessage from "../SuccessMessage";
import * as Yup from "yup";
import { useAppDispatch } from "../../store";
import Loading from "../../sections/Loading";
import { showToast } from "../../features/toast";
import NotFound from "../../sections/NotFound";
import DatePicker from "react-datepicker";
import { customAxios } from "../../services/utils";
import AllUsers from "../AllUsers";

//create validation
const createSchema = Yup.object().shape({
  title: Yup.string()
    .required("Topic Name is required")
    .min(3, "Atleast 3 characters required"),
  description: Yup.string(),
  date: Yup.string(),
});

const EventManagment = () => {
  const userType = localStorage.getItem("userType");
  const [events, setEvents] = useState<Event[]>([]);
  const [currentSelectedItem, setCurrentSelectedItem] = useState<Event>();
  const [showUserSelectionPanel, setUSerSelectionPanel] = useState(false);
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

  const createInitialValues = {
    title: "",
    description: "",
    date: "",
    users: "",
  };

  const creatFormik = useFormik({
    initialValues: createInitialValues,
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit: (data, { resetForm }) => createEvent(data, resetForm),
  });

  const updateFormik = useFormik({
    initialValues: {
      title: currentSelectedItem?.title ? currentSelectedItem.title : "",

      description: currentSelectedItem?.description
        ? currentSelectedItem.description
        : "",
      data: currentSelectedItem?.date ? new Date(currentSelectedItem.date) : "",
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
  const [multipleUserSelected, setMultipleUserSelect] = React.useState<
    number[]
  >([]);

  const openModel = (
    event: Event,
    type: "create" | "delete" | "update" | "read"
  ) => {
    setCurrentSelectedItem(event);
    setUpdatedItem(event);
    setShow(true);
    setCurrentModal(type);
  };

  const createEventOpenModal = () => {
    setCurrentModal("create");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setError("");
    setSuccess("");
    creatFormik.setValues(createInitialValues);
  };
  const handleShow = () => {
    setShow(true);
    setError("");
    setSuccess("");
  };

  // get events lists
  useEffect(() => {
    getEventList();
  }, []);

  const deleteEvent = () => {
    let token = localStorage.getItem("token");
    setShowSpinner("delete");
    const formDate = new FormData();
    formDate.append("event", currentSelectedItem.id);
    customAxios
      .post(`/student/delete-event/`, formDate)
      .then((res) => {
        setShowSpinner("none");
        setSuccess("topic deleted successfully");
        setErrorType("none");
        getEventList();
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

  //get course list
  const getEventList = () => {
    setShowSpinner("list");
    customAxios
      .get(`/student/events-list/`)
      .then((res) => {
        setEvents(res.data.users);
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
          getEventList();
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
  // create event
  const createEvent = (data, resetForm) => {
    setShowSpinner("create");
    const formData = new FormData();
    const token = localStorage.getItem("token");
    Object.entries(data).map(([key, val]) => {
      // @ts-ignore
      if (key === "date") {
        // @ts-ignore
        let date = new Date(val).toLocaleDateString().split("/");
        let newdate = date[2] + "-" + date[1] + "-" + date[0];
        formData.append(key, newdate);
      } else {
        // @ts-ignore
        formData.append(key, val);
      }
    });
    formData.append("users", multipleUserSelected.join(","));
    customAxios
      .post(`/student/new-event/`, formData)
      .then((res) => {
        setShowSpinner("none");
        resetForm();
        setSuccess("Event is created successfully");
        getEventList();
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
          <h3 className="b-700">Events</h3>
          <Button
            className="bg-adminteritory text-white br-2"
            onClick={createEventOpenModal}
          >
            Create Event
          </Button>
        </div>
        {showSpinner === "list" ? (
          <Loading />
        ) : events.length === 0 ? (
          <>
            <NotFound />
            <h3 className="text-center b-600">
              No events available at this moment
            </h3>
            <p className="text-center">Please try again later</p>
          </>
        ) : (
          events.map((item, idx) => {
            return (
              <ListItem
                //@ts-ignore
                item={item}
                title={item.title}
                key={item.id}
                NoEdit
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

            <Modal.Body>
              {showUserSelectionPanel ? (
                <div>
                  <Modal.Header closeButton style={{ marginBottom: "1rem" }}>
                    <Modal.Title>
                      Select users you want to add event
                    </Modal.Title>
                  </Modal.Header>
                  <div style={{ maxHeight: "70vh", overflowY: "scroll" }}>
                    <AllUsers
                      multipleUsersSelect={multipleUserSelected}
                      setMultipleUserSelect={setMultipleUserSelect}
                    />
                  </div>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setUSerSelectionPanel(false);
                      }}
                    >
                      Select
                    </Button>
                  </Modal.Footer>
                </div>
              ) : (
                <>
                  <Modal.Header closeButton style={{ marginBottom: "1rem" }}>
                    <Modal.Title>Create Event</Modal.Title>
                  </Modal.Header>
                  <Form noValidate onSubmit={creatFormik.handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control
                          name="title"
                          value={creatFormik.values.title}
                          onChange={creatFormik.handleChange}
                          type="text"
                          required
                          placeholder="Enter Event Title"
                        />
                        {creatFormik.touched.title &&
                        creatFormik.errors.title ? (
                          <div className="text-danger">
                            {creatFormik.errors.title}
                          </div>
                        ) : null}
                      </Form.Group>

                      <Form.Group as={Col}>
                        <Form.Label>Event date</Form.Label>
                        <DatePicker
                          style={{ background: "red" }}
                          name="date"
                          dateFomart="DD/MM/YYYY"
                          minDate={new Date()}
                          customInput={<CustomInput />}
                          selected={creatFormik.values.date}
                          onChange={(date: Date) =>
                            creatFormik.setFieldValue("date", date)
                          }
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        name="description"
                        required
                        onChange={creatFormik.handleChange}
                        value={creatFormik.values.description}
                        placeholder="Add the description.."
                      />
                      {creatFormik.touched.description &&
                      creatFormik.errors.description ? (
                        <div className="text-danger">
                          {creatFormik.errors.description}
                        </div>
                      ) : null}
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Select Users to show event</Form.Label>
                      <button
                        className="w-50 p-2 bg-white mb-3"
                        onClick={() => setUSerSelectionPanel(true)}
                        style={{
                          display: "block",
                          border: "1px solid #dedede",
                          borderRadius: ".6rem",
                        }}
                      >
                        Select the users to select
                      </button>
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
                </>
              )}
            </Modal.Body>
          </>
        )}
        {currentModal === "delete" && (
          <>
            c
            <Modal.Header closeButton>
              <Modal.Title>Delete Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to delete this Event
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
                  onClick={() => deleteEvent()}
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
              <Modal.Title>Detail of Event</Modal.Title>
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
      </Modal>
    </Container>
  );
};

export default EventManagment;
