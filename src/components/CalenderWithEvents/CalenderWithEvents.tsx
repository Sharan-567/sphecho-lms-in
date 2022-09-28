import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import "./calender.styles.scss";
const CalenderWithEvents = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-graydark p-3 px-4 br-2 h-100">
      <Row className="bg-skyBlue br-2">
        <Col sm={6} className="bg-gray p-3 br-2">
          <Calendar className="bg-gray" onChange={setDate} value={date} />
        </Col>
        <Col sm={6} className="bg-skyBlue p-2 br-2">
          <h4 className="text-white">Today Events</h4>
          <div className="today-events">
            <p>asjdf</p>
            <p>asjdf</p>
            <p>asjdf</p>
            <p>asjdf</p>
            <p>asjdf</p>
            <p>asjdf</p>
            <p>asjdf</p>
            <p>asjdf</p>
            <p>asjdf</p>
            <p>asjdf</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CalenderWithEvents;
