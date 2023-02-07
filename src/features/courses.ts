import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, StudentCourse } from "./../definations/course";

type InitialState = {
  courses: Course[];
  userCourses: StudentCourse[];
  userCoursesTopics: {
    courseId: number;
    noOfAssessments: number;
    noOfTopics: number;
  }[];
};

const initialState: InitialState = {
  courses: [],
  userCourses: [],
  userCoursesTopics: [],
};

const courses = createSlice({
  name: "course",
  initialState,
  reducers: {
    addAllCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    addUserCourses: (state, action: PayloadAction<StudentCourse[]>) => {
      state.userCourses = action.payload;
    },
    addUserTopic: (
      state,
      action: PayloadAction<{
        courseId: number;
        noOfAssessments: number;
        noOfTopics: number;
      }>
    ) => {
      const filterList = state.userCoursesTopics.filter(
        (c) => c.courseId !== action.payload.courseId
      );
      filterList.push(action.payload);
      state.userCoursesTopics = filterList;
    },
  },
});

export const { addAllCourses, addUserCourses, addUserTopic } = courses.actions;

export default courses.reducer;
