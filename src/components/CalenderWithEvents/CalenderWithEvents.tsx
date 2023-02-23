import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "./calender.styles.scss";
import { AiOutlineCalendar, AiFillRest } from "react-icons/ai";
import { customAxios } from "../../services/utils";
import { useAppDispatch } from "../../store";
import { showToast } from "../../features/toast";
import { Event } from "../../definations/course";
import { motion, AnimatePresence } from "framer-motion";

// dummy data
// const events = [
//   {
//     id: 1,
//     eventName: "Meta Learning with play ground",
//     start: "2:00 pm",
//     end: "4 pm",
//   },
//   {
//     id: 2,
//     eventName: "Meta Learning with play ground",
//     start: "2:00 pm",
//     end: "4 pm",
//   },
//   {
//     id: 3,
//     eventName: "Meta Learning with play ground",
//     start: "2:00 pm",
//     end: "4 pm",
//   },
//   {
//     id: 4,
//     eventName: "Meta Learning with play ground",
//     start: "2:00 pm",
//     end: "4 pm",
//   },
//   {
//     id: 5,
//     eventName: "Meta Learning with play ground",
//     start: "2:00 pm",
//     end: "4 pm",
//   },
//   {
//     id: 6,
//     eventName: "Meta Learning with play ground",
//     start: "2:00 pm",
//     end: "4 pm",
//   },
// ];

const CalenderWithEvents = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [dateOnlyEvents, setDateOnlyEvents] = useState<Event[]>([]);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    customAxios
      .get("/student/get-user-event/")
      .then((res) => {
        setEvents(res.data.event);
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : calender : while fetching events",
          })
        );
      });
  }, []);

  const getEventsByDate = (date: Date) => {
    return events.filter((e) => {
      let ed1 = new Date(e.date);
      if (
        ed1.getDate() === date.getDate() &&
        ed1.getMonth() === date.getMonth()
      ) {
        return true;
      }
      return false;
    });
  };

  console.log(getEventsByDate(date));

  return (
    <Row className="bg-primary p-2 br-2">
      <Col sm={6} className="bg-white p-3 br-2">
        <Calendar className="bg-white" onChange={setDate} value={date} />
      </Col>
      <Col sm={6} className="bg-primary p-3 br-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="tiny text-white">{date.toDateString()} Events</h6>
          {/* <Button className="tiny bg-blue py-1 text-white">Add Event</Button> */}
        </div>
        <div className="today-events">
          {getEventsByDate(date).length === 0 ? (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={`${date.getDate()}` + "1"}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{
                  duration: 0.4,
                }}
                className="h-100 d-flex align-items-center flex-column  justify-content-center"
              >
                <AiFillRest
                  style={{
                    fontSize: "5rem",
                    marginTop: "3rem",
                    color: "white",
                  }}
                />
                <p className="text-white">No events today.</p>
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              {(getEventsByDate(date) || []).map((e, idx) => {
                return (
                  <AnimatePresence exitBeforeEnter>
                    <motion.div
                      key={idx}
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -25, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.08,
                      }}
                    >
                      <Button
                        key={e.id}
                        className="br-1 w-100 mb-2 bg-white"
                        style={{
                          textAlign: "left",
                          borderLeft: "7px solid rgb(30, 37, 79)",
                        }}
                      >
                        <p className="small text-blue b-700">{e.title}</p>
                        <div className="d-flex align-items-center">
                          <AiOutlineCalendar
                            className="me-2"
                            style={{ marginTop: "-1em", width: "2rem" }}
                          />
                          <p className="tiny">
                            {e.description.slice(0, 100)}...
                          </p>
                        </div>
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                );
              })}
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default CalenderWithEvents;
