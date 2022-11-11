import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { BsCheckCircleFill } from "react-icons/bs";
import {Button} from "react-bootstrap"
import AssesmentComp from "../../sections/Assessment";
import { Assessment } from "../../definations/assessment";
import type { Topic as TopicType } from "../../definations/course";
import { fetchAllProgress, updateProgress } from "../../features/progress";
import { useAppDispatch, useAppSelector } from "../../store";

type TopicProp = {
  topic?: Assessment | TopicType;
  courseId?: string;
};

const Topic = ({ topic, courseId }: TopicProp) => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const dispatch = useAppDispatch()
  const {progress} = useAppSelector(state => state.progress)

  
  useEffect(() => {
    if(topic?.id && courseId) {
      if(courseId in progress && progress[courseId].topics.includes(topic?.id)) {
        setCompleted(true)
      }
    }
    return () => setCompleted(false)
  }, [topic?.id, courseId])

  const updateProgressHanlder = () => {
    if(topic?.id && courseId) {
      dispatch(updateProgress({ course: courseId, topic: topic?.id })).unwrap()
        .then((data) => {
          console.log(data)
          dispatch(fetchAllProgress({}))
          setCompleted(true)
        })
    }
  }


  if (topic && "content" in topic) {
    return (
      <div className="p-3 br-2 bg-gray">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="b-700 px-3 pt-4">{topic.name}</h4>
          {!completed ? <Button className="bg-white text-black" style={{height: "3rem"}} onClick={updateProgressHanlder}>
           Mark as Completed
          </Button>:
          <Button  className="bg-white text-black">
          <BsCheckCircleFill className="me-2" size="20" />Completed
          </Button>}
        </div>

        <div className="py-4 px-5 margin-auto">
          {topic?.video ? <ReactPlayer
            width={"100%"}
            controls
            url={topic?.video}
            onEnded={() => setVideoCompleted(true)}
          /> : null}
        </div>
        <p className="p-3 my-1">{topic?.content}</p>
        {topic?.pdf && (
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
      <div className="p-3  br-1 bg-gray">
        {topic && <AssesmentComp assessmentId={topic.id} />}
      </div>
    );
  }
  return <h3 className="p-2 m-auto">No topics available to this course yet.</h3>
};

export default Topic;
