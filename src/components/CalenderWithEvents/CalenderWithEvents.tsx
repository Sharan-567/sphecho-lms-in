import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "./calender.styles.scss";
import { AiOutlineCalendar } from "react-icons/ai";

// dummy data
const events = [
  {
    id: 1,
    eventName: "Meta Learning with play ground",
    start: "2:00 pm",
    end: "4 pm",
  },
  {
    id: 2,
    eventName: "Meta Learning with play ground",
    start: "2:00 pm",
    end: "4 pm",
  },
  {
    id: 3,
    eventName: "Meta Learning with play ground",
    start: "2:00 pm",
    end: "4 pm",
  },
  {
    id: 4,
    eventName: "Meta Learning with play ground",
    start: "2:00 pm",
    end: "4 pm",
  },
  {
    id: 5,
    eventName: "Meta Learning with play ground",
    start: "2:00 pm",
    end: "4 pm",
  },
  {
    id: 6,
    eventName: "Meta Learning with play ground",
    start: "2:00 pm",
    end: "4 pm",
  },
];

const CalenderWithEvents = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Row className="bg-skyBlue br-2">
      <Col sm={6} className="bg-white p-3 br-2">
        <Calendar className="bg-white" onChange={setDate} value={date} />
      </Col>
      <Col sm={6} className="bg-skyBlue p-3 br-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="tiny text-white">{date.toDateString()} Events</h6>
          {/* <Button className="tiny bg-blue py-1 text-white">Add Event</Button> */}
        </div>
        <div className="today-events">
          {events.map((e) => {
            return (
              <Button
                key={e.id}
                className="br-1 w-100 mb-2 bg-gray"
                style={{
                  textAlign: "left",
                  borderLeft: "7px solid rgb(30, 37, 79)",
                }}
              >
                <p className="small text-blue b-700">{e.eventName}</p>
                <div className="d-flex align-items-center">
                  <AiOutlineCalendar
                    className="me-2"
                    style={{ marginTop: "-1em" }}
                  />
                  <p className="tiny" style={{ lineHeight: "0" }}>
                    {e.start} - {e.end}
                  </p>
                </div>
              </Button>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};

export default CalenderWithEvents;
