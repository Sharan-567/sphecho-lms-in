import { createSlice } from "@reduxjs/toolkit";
import type { Patient } from "../definations/patients";

type InitialState = {
  patients: Patient[];
  error: string;
  stage: number;
};

const PatientInitialState: InitialState = {
  patients: [],
  error: "",
  stage: 0,
};

const patient = createSlice({
  name: "patient",
  initialState: PatientInitialState,
  reducers: {
    addPatients(state, action) {
      state.patients = action.payload;
    },
    patientError(state, action) {
      state.patients = [];
      state.error = action.payload;
    },
    updateStage(state, action) {
      state.stage = action.payload;
    },
    resetStage(state) {
      state.stage = 0;
      state.error = "";
    },
    resetStageTo(state, action) {
      state.stage = action.payload;
      state.error = "";
    },
  },
});

export const {
  addPatients,
  patientError,
  updateStage,
  resetStage,
  resetStageTo,
} = patient.actions;
export default patient.reducer;
