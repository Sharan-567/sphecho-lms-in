import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineExpand } from "react-icons/ai";
import { Button } from "react-bootstrap";
import AssesmentComp from "../../sections/Assessment";
import { Assessment } from "../../definations/assessment";
import type { Topic as TopicType } from "../../definations/course";
import { addAllprogress, updateProgress } from "../../features/progress";
import { useAppDispatch, useAppSelector } from "../../store";
import NotFound from "../NotFound";
import { showToast } from "../../features/toast";
import { customAxios, NormalizeProgressData } from "../../services/utils";
import "./topics.scss";
import { motion, AnimatePresence } from "framer-motion";
import PdfPanel from "./PdfPanel";

type TopicProp = {
  topic?: Assessment | TopicType;
  courseId?: string;
  isCompleted: (topic: TopicType | Assessment) => boolean;
};

const Topic = ({ topic, courseId, isCompleted }: TopicProp) => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const dispatch = useAppDispatch();
  const { progress } = useAppSelector((state) => state.progress);
  const [showExpand, setShowExpand] = useState(false);

  useEffect(() => {
    if (topic?.id && courseId) {
      if (
        courseId in progress &&
        progress[courseId].topics.includes(topic?.id)
      ) {
        setCompleted(true);
      }
    }
    return () => setCompleted(false);
  }, [topic?.id, courseId]);

  const getAllProgress = () => {
    customAxios
      .get(`student/student-progress/`)
      .then((res) => {
        let progresses = NormalizeProgressData(res.data.progress);
        dispatch(addAllprogress(progresses));
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : Topic - While fetching all Progress",
          })
        );
      });
  };

  const updateProgressHanlder = () => {
    if (topic?.id && courseId) {
      dispatch(updateProgress({ course: courseId, topic: topic?.id }))
        .unwrap()
        .then((data) => {
          // console.log(data);
          getAllProgress();
          setCompleted(true);
        });
    }
  };

  if (topic && "content" in topic) {
    return (
      <motion.div
        key={`topic-${topic.id}`}
        initial={{ y: 55, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -55, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="p-3 br-2 bg-graydark mt-5"
      >
        <div
          className="d-flex justify-content-between align-items-center pb-4"
          style={{ borderBottom: "1px solid black" }}
        >
          <h4 className="b-700 px-3 pt-4 topic-name">
            {topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}
          </h4>
          {!completed ? (
            <Button
              className="bg-black br-0.5  text-white btn-complete"
              style={{ border: "none", padding: ".7rem" }}
              onClick={updateProgressHanlder}
            >
              Mark as completed
            </Button>
          ) : (
            <Button
              className="bg-black br-0.5 px-4 text-white"
              style={{
                border: "none",
                padding: ".7rem",
                borderRadius: ".7rem",
              }}
            >
              <BsCheckCircleFill className="me-2" size="20" />
              Completed
            </Button>
          )}
        </div>

        <div className="py-4 pt-0 px-5 margin-auto">
          {topic?.video && topic?.video.toLowerCase() !== "n/a" ? (
            <ReactPlayer
              width={"100%"}
              controls
              url={topic?.video}
              onEnded={() => setVideoCompleted(true)}
            />
          ) : null}
        </div>
        {topic?.description?.toLowerCase() !== "n/a" ? (
          <p className="p-3 my-1">{topic?.description}</p>
        ) : null}
        {topic?.content?.toLowerCase() !== "n/a" ? (
          <p className="p-3 my-1">{topic?.content}</p>
        ) : null}
        {topic?.pdf && topic?.pdf.toLowerCase() !== "n/a" && (
          // <a
          //   target="_blank"
          //   rel="noreferrer"
          //   href={topic?.pdf}
          //   className="d-flex align-items-center p-2 mb-2 bg-graydark round"
          // >
          //   <BsFillFileEarmarkPdfFill color="red" size="24" />
          //   <p className="ms-3 mt-2">{topic.pdf}</p>
          // </a>
          <div style={{ position: "relative" }}>
            <div>
              <iframe src={topic?.pdf} width="100%" height="580"></iframe>
            </div>
            <div
              style={{
                position: "absolute",
                width: "7rem",
                height: "1.7rem",
                background: "#444444",
                right: 0,
                marginTop: "-2.3rem",
                zIndex: 1,
              }}
            ></div>
            <Button
              onClick={() => setShowExpand(true)}
              className="text-white mt-2 ms-auto d-flex align-items-center"
            >
              <AiOutlineExpand className="me-2" /> Expand
            </Button>
          </div>
        )}
        {showExpand ? (
          <PdfPanel
            topicName={topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}
            setShowExpand={setShowExpand}
            pdf={topic.pdf}
          />
        ) : null}
      </motion.div>
    );
  } else if (topic && "max_marks" in topic) {
    return (
      <div className="p-3  br-2 mt-5 bg-graydark">
        {topic && (
          <AssesmentComp isCompleted={isCompleted} assessment={topic} />
        )}
      </div>
    );
  }
};

export default Topic;
