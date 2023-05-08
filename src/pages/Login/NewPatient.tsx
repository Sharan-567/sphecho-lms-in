import React from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Patient } from "../../definations/patients";
import { QISH_URL } from "../../features/settings";
import "./Login.scss";

type NewPatientProps = {
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  mobile: string;
};
const range = (start, end, step) => {
  const result: any[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
};

const isSmallScreen = window.screen.width < 990;

const NewPatient = ({ mobile, setSelectedPatient }: NewPatientProps) => {
  const [fName, setFname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [dob, setDob] = React.useState<Date>();
  const [createdOn, setCreatedOn] = React.useState("");

  const years = range(1990, new Date().getFullYear() + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getYear = (date) => {
    return date.getFullYear();
  };

  const getMonth = (date) => {
    return date.getMonth();
  };

  const createPatient = () => {
    axios
      .post(QISH_URL + "/patient/createPatientRecord", {
        fName,
        age,
        dob,
        mobile,
        createdOn: new Date(),
        lean: "true",
        gender: "male",
      })
      .then(({ data }) => {
        setSelectedPatient(data.patient);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <input
        value={fName}
        onChange={(e) => setFname(e.target.value)}
        className="input"
        placeholder="First Name"
        style={{}}
        type="text"
      />
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="input"
        placeholder="Age"
        type="tel"
        maxLength={2}
      />
      <div style={{ width: "15rem", marginLeft: "1rem" }}>
        <DatePicker
          style={{ width: "100%" }}
          name="start_date"
          dateFomart="DD/MM/YYYY"
          customInput={
            <CustomInput value={dob} onClick={(date: Date) => setDob(date)} />
          }
          selected={dob}
          onChange={(date: Date) => setDob(date)}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                style={{
                  background: "#6ab447",
                  color: "white",
                  border: "none",
                  padding: ".5rem",
                }}
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                style={{
                  background: "#6ab447",
                  color: "white",
                  border: "none",
                  padding: ".5rem",
                }}
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
        />
      </div>
      <Form.Select
        name="Gender"
        id="gender"
        className="input"
        placeholder="Age"
        style={{ width: "14rem" }}
      >
        <option value="" disabled>
          Please select gender
        </option>
        <option value="mercedes">Male</option>
        <option value="audi">Female</option>
        <option value="audi">Other</option>
      </Form.Select>

      <Button className="btn-login" onClick={createPatient}>
        Create Account
      </Button>
    </div>
  );
};

const CustomInput = React.forwardRef(
  (
    { value, onClick }: { value: Date | undefined; onClick: (e: any) => void },
    ref
  ) => (
    <input
      // @ts-ignore
      ref={ref}
      // @ts-ignore
      value={value}
      onChange={onClick}
      required
      type="text"
      onClick={onClick}
      className="input"
      placeholder="pick date"
      maxLength={2}
    />
  )
);

export default NewPatient;
