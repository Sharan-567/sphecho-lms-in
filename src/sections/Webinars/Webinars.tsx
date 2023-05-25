import React, { useEffect, useState } from "react";

import { Spinner, Button, Row, Col, Form } from "react-bootstrap";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { customAxios } from "../../services/utils";
import { useAppDispatch, useAppSelector } from "../../store";
import WebinarContainer from "./WebinarContainer";

const Webinars = () => {
  const [ShowCreateRoom, setShowCreateRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomHash, setRoomHash] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [participants, setparticipants] = useState(10);
  const [webLoading, setWebLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const createRoom = () => {
    const formData = new FormData();
    formData.append("description", description ? description : "description");
    formData.append("name", "name" ? name : name);
    formData.append("duration", "180");
    formData.append("participants", "10");

    setWebLoading(true);
    customAxios
      .post("/master/create-room/", formData)
      .then((res) => {
        const str = res.data.response;
        let jsonStr = str.replace(/\/"/g, "");
        let obj = JSON.parse(jsonStr);
        // console.log(obj);
        setRoomHash(btoa(`${obj.room.room_id}-635be752406823329574a808`));
        // console.log(obj);
        setRoomId(obj.room.room_id);
        setWebLoading(false);
        setShowVideo(true);
      })
      .catch((err) => {
        setWebLoading(false);
        setShowVideo(false);
        // console.log(err);
      });
  };

  const isAdmin = () => {
    const userState = localStorage.getItem("userState");
    if (userState) {
      if (
        userState === "SuperUser" ||
        userState === "Provider" ||
        userState === "staffMember"
      )
        return true;
    }
    return false;
  };

  return (
    <div
      className="p-3 w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      {showVideo ? (
        <>
          {!isAdmin() ? (
            <iframe
              style={{ height: "90vh", width: "100%" }}
              allow="camera; microphone; fullscreen; speaker; display-capture"
              src={`https://qish.yourvideo.live/${roomId}`}
            ></iframe>
          ) : (
            <>
              <iframe
                style={{ height: "90vh", width: "100%" }}
                allow="camera; microphone; fullscreen; speaker; display-capture"
                src={`https://qish.yourvideo.live/${roomHash}`}
              ></iframe>
            </>
          )}
        </>
      ) : (
        <div style={{ height: "90vh" }}>
          <div className="w-100 d-flex justify-content-center align-items-center flex-column">
            <div className="mb-3 mt-5">
              <BsFillCameraVideoFill
                className="text-primary"
                size="7rem"
                style={{}}
              />
            </div>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  style={{ padding: ".8rem", marginBottom: "1rem" }}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter Name"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  style={{ padding: ".8rem", marginBottom: "1rem" }}
                  name="About"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter Description"
                />
              </Form.Group>
            </Row>
            <Button
              className="br-1 px-5 bg-black text-white"
              style={{ padding: "1rem 3rem" }}
              onClick={() => {
                if (!webLoading) {
                  createRoom();
                }
              }}
            >
              {webLoading ? "Loading ..." : " Create Room"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="container px-5 py-2 mt-4 w-100">
  //     {loading ? (
  //       <div className="w-100 d-flex justify-content-center mt-5">
  //         <Spinner animation="border" variant="green" />
  //       </div>
  //     ) : (
  //       <div
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //         }}
  //         className="px-5  py-5 flex-direction-column align-items-center"
  //       >
  //         <div>
  //           <h2 className="b-700 text-blue ms-2">Webinars</h2>
  //           <div>
  //             {courses.map((course) => {
  //               return (
  //                 <WebinarContainer
  //                   key={`course-${course.id}`}
  //                   course={course}
  //                 />
  //               );
  //             })}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Webinars;
