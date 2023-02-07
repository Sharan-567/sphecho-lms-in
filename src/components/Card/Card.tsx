import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { HOST } from "../../features/settings";
import { AiOutlineUser } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store";
import { addItem, removeItem } from "../../features/cart";
import defaultImg from "../../assets/default.jpg";
import "./card.scss";

interface Course {
  id: number;
  name: string;
  tags: string;
  info_image: string;
  description: string;
  trainer_name: string;
  trainer_image: string;
  full_amount?: string;
  sample_ur?: string;
  view_all: boolean;
  enroll_all: boolean;
  featured: boolean;
}

type Props = {
  course: Course;
};

const Card: React.FC<Props> = ({ course }) => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const imageRef = useRef<HTMLImageElement | any>(null);

  const isItemAlreadingIncart = (id: number): boolean => {
    for (let item of items) {
      if (item.id === course.id) return true;
    }
    return false;
  };

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onerror = () => {
        imageRef.current.src = defaultImg;
      };
    }
  }, [defaultImg, imageRef]);

  return (
    <div
      className="bg-graydark p-2 br-1"
      style={{
        width: "12rem",
        height: "17rem",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "7rem",
          objectFit: "cover",
          borderRadius: "1rem",
        }}
        ref={imageRef}
        src={`https://${HOST}${course.info_image}`}
      />
      <div>
        <p
          className="p-2 tiny b-600"
          style={{ height: "4rem", textAlign: "left", overflow: "hidden" }}
        >
          {course?.name?.slice(0, 60)}...
        </p>
        <div
          className="d-flex align-items-center"
          style={{ marginTop: "-.8rem" }}
        >
          <AiOutlineUser className="mb-3 me-1" size={"1.2rem"} />
          <p className="small b-600 w-100">{course?.trainer_name}</p>
        </div>
        {!isItemAlreadingIncart(course.id) ? (
          <Button
            onClick={() => dispatch(addItem(course))}
            variant="green"
            className="text-white p-2 w-100"
            style={{ fontSize: ".8rem" }}
          >
            Add To Cart
          </Button>
        ) : (
          <Button
            onClick={() => dispatch(removeItem(course.id))}
            variant="green"
            className="text-white"
            style={{ fontSize: ".8rem" }}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
