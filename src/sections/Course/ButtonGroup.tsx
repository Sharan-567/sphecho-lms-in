import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { addItem, removeItem } from "../../features/cart";
import type { Course } from "../../definations/course";
import { useAppSelector, useAppDispatch } from "../../store";

type Props = {
  course: Course;
  type: string;
};

const ButtonGroup = ({ course, type }: Props) => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const isItemAlreadingIncart = (id: number): boolean => {
    for (let item of items) {
      if (item.id === course.id) return true;
    }
    return false;
  };

  if (type === "userCourses") {
    return (
      <Link to={`/courses/${course.id}`}>
        <Button className="bg-green text-white">Enter this Course</Button>
      </Link>
    );
  }

  return (
    <div>
      {!isItemAlreadingIncart(course.id) ? (
        <Button
          onClick={() => dispatch(addItem(course))}
          className="bg-green text-white"
        >
          Add to Cart
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(removeItem(course.id))}
          className="bg-green text-white"
        >
          Remove From Cart
        </Button>
      )}
    </div>
  );
};

export default ButtonGroup;
