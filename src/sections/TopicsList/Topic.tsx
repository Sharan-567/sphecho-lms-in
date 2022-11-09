import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import AssesmentComp from "../../sections/Assessment";
import { Assessment } from "../../definations/assessment";
import type { Topic as TopicType } from "../../definations/course";
import { fetchAllProgress, updateProgress } from "../../features/progress";
import { useAppDispatch } from "../../store";
import { Document, Page  } from 'react-pdf'

type TopicProp = {
  topic?: Assessment | TopicType;
  courseId?: string;
};


const Topic = ({ topic, courseId }: TopicProp) => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useAppDispatch()

  console.log(topic?.pdf)


  useEffect(() => {
    const disPacthFun = async () => {
      try {
        if (topic && "content" in topic && courseId) {
          if (!topic.video || videoCompleted) {
            let data = await dispatch(
              updateProgress({ course: courseId, topic: topic?.id })
            ).unwrap();
            console.log(data);
            dispatch(fetchAllProgress({}));
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    disPacthFun();
  }, [videoCompleted]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (topic && "content" in topic) {
    return (
      <div className="p-3 br-2 bg-gray">
        <h4 className="b-700 px-3 pt-4">{topic.name}</h4>

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
};

export default Topic;
