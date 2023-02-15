import React, { useCallback, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Course } from "../../definations/course";
import { useAppSelector } from "../../store";
import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useState<Course[]>([]);
  const [textSearch, setTextSearch] = useState("");

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(...args);
      }, 500);
    };
  };

  const handleChange = async (value) => {
    setTextSearch(value);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `token ${token}`,
    };
    fetch(
      `https://lmsv2.metahos.com/lms_api_v1/student/course-serach/?search=${value}`,
      { headers }
    )
      .then((res) => res.json())
      .then((data) => setSearch(data.courses))
      .catch((err) => console.log(err));
  };

  const handleSearch = useCallback(debounce(handleChange), []);

  return (
    <div className="position-relative ">
      <Form
        className="me-2 ms-auto"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Control
          className="bg-white py-3 px-5 search-continer"
          style={{
            width: "28rem",
            borderRadius: "3rem",
            border: "1px solid green",
            fontWeight: "500",
          }}
          type="search"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="What do you want to learn today"
        ></Form.Control>
      </Form>
      {search && search.length > 0 ? (
        <div
          className="bg-green position-absolute p-3 bg-white border"
          style={{
            left: 0,
            top: "130%",
            minWidth: "34rem",
            borderRadius: "1rem",
            maxHeight: "70vh",
            overflowY: "scroll",
          }}
        >
          {search.map((course) => (
            <Link
              key={course.id}
              className="text-dn"
              to={`/courses/detail/${course.id}`}
              state={{ id: course.id }}
            >
              <p
                className="bg-graydark px-2 py-3 round"
                style={{ cursor: "pointer" }}
                key={course.id}
              >
                {course.name}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        textSearch.length > 0 && (
          <div
            className="bg-green position-absolute p-3 bg-white border"
            style={{
              left: 0,
              top: "130%",
              minWidth: "34rem",
              borderRadius: "1rem",
            }}
          >
            <p> No result Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default Search;
