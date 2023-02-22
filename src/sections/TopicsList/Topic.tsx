import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { BsCheckCircleFill } from "react-icons/bs";
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
          console.log(data);
          getAllProgress();
          setCompleted(true);
        });
    }
  };

  if (topic && "content" in topic) {
    return (
      <div className="p-3 br-2 bg-graydark">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="b-700 px-3 pt-4">{topic.name}</h4>
          {!completed ? (
            <Button
              className="bg-white text-black btn-complete"
              style={{ height: "3rem", border: "none" }}
              onClick={updateProgressHanlder}
            >
              Mark as completed
            </Button>
          ) : (
            <Button className="bg-white text-black">
              <BsCheckCircleFill className="me-2" size="20" />
              Completed
            </Button>
          )}
        </div>

        <div className="py-4 px-5 margin-auto">
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
          <iframe src={topic?.pdf} width="100%" height="580"></iframe>
        )}
      </div>
    );
  } else if (topic && "max_marks" in topic) {
    return (
      <div className="p-3  br-2 mt-5 bg-graydark">
        {topic && (
          <AssesmentComp isCompleted={isCompleted} assessment={topic} />
        )}
      </div>
    );
  } else {
    <div className="p-3  br-1 bg-gray">something went wrong</div>;
  }
};

export default Topic;
