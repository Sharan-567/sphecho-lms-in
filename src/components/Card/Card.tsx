import React from "react";
import { Button } from "react-bootstrap";
import { HOST } from "../../features/settings";
import { AiOutlineUser } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store";
import { addItem, removeItem } from "../../features/cart";
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

const Card = ({ course }: Props) => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const isItemAlreadingIncart = (id: number): boolean => {
    for (let item of items) {
      if (item.id === course.id) return true;
    }
    return false;
  };

  return (
    <div
      className="bg-gray p-2 br-1"
      style={{
        width: "12rem",
        minHeight: "17rem",
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
      <div>
        <p
          className="p-2 tiny b-600"
          style={{ minHeight: "4rem", textAlign: "left" }}
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
            className="text-white"
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
