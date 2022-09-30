import React from "react";
import { Link } from "react-router-dom";
import { HOST } from "../../features/settings";
import { AiOutlineUser } from "react-icons/ai";
import "./card.scss";
const Card = ({ course }) => {
  return (
    <div
      className="bg-gray p-2 br-1"
      style={{
        width: "12rem",
        height: "14rem",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "7rem",
          objectFit: "cover",
          borderRadius: "1rem",
        }}
        src={`https://${HOST}${course.info_image}`}
      />
      <Link
        to={`/courses/detail/${course.id}`}
        state={{ id: course.id }}
        style={{ textDecoration: "none" }}
      >
        <p className="p-1 tiny b-600" style={{ minHeight: "4rem" }}>
          {course?.name?.slice(0, 60)}...
        </p>
        <div className="d-flex" style={{ marginTop: "-.8rem" }}>
          <AiOutlineUser className="text-green me-2" size={"1.2rem"} />
          <p className="small b-600">{course?.trainer_name}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
