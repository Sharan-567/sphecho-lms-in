import { createSlice } from "@reduxjs/toolkit";
import type { Patient } from "../definations/patients";

type InitialState = {
  patients: Patient[];
};

const PatientInitialState: InitialState = {
  patients: [],
};

const patient = createSlice({
  name: "patient",
  initialState: PatientInitialState,
  reducers: {
    addPatients(state, action) {
      state.patients = action.payload;
    },
  },
});

export const { addPatients } = patient.actions;
export default patient.reducer;
