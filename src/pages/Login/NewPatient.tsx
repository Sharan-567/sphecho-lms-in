import React from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Button } from "react-bootstrap";

const NewPatient = ({ mobile }: { mobile: string }) => {
  const [fName, setFname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [dob, setDob] = React.useState<Date>();
  const [createdOn, setCreatedOn] = React.useState("");

  const createPatient = () => {
    axios
      .post(
        "http://qish.metahos.com/patient/createPatientRecord",
        {
          fName,
          age,
          dob,
          mobile,
          createdOn: new Date(),
          lean: "true",
        },
        { headers: { proxy: "https://qish.metahos.com" } }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="m-auto">
      <input
        value={fName}
        onChange={(e) => setFname(e.target.value)}
        className="py-3 text-center b-600 br-2"
        placeholder="First Name"
        style={{
          fontSize: "1.2rem",
          border: "1px solid #81a31b",
          display: "block",
        }}
        type="text"
      />
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="py-3 text-center b-600 br-2 my-3"
        placeholder="Age"
        style={{
          fontSize: "1.2rem",
          border: "1px solid #81a31b",
          display: "block",
        }}
        type="tel"
        maxLength={2}
      />
      <DatePicker
        style={{ background: "red" }}
        name="start_date"
        dateFomart="DD/MM/YYYY"
        customInput={
          <CustomInput value={dob} onClick={(date: Date) => setDob(date)} />
        }
        selected={dob}
        onChange={(date: Date) => setDob(date)}
      />
      <div className="w-100 ps-2">
        <Button
          className="p-2 px-4 br-3 mt-4 ms-5 text-white m-auto"
          onClick={createPatient}
        >
          GET OTP
        </Button>
      </div>
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
      className="py-3 text-center b-600 br-2"
      placeholder="pick date"
      style={{
        fontSize: "1.2rem",
        border: "1px solid #81a31b",
        display: "block",
      }}
      maxLength={2}
    />
  )
);

export default NewPatient;
