import React, { useState } from "react";
import SimpleLoginModal from "./SimpleLoginModal";
import PatientLoginModal from "./PatientLoginModal";

type Props = {
  handleOpenModel: () => void;
  handleCloseModal: () => void;
  showLoginModal: boolean;
};

const LoginModal = (props: Props) => {
  const [userType, setUserType] = useState("superUser");

  if (userType === "patient") {
    return <PatientLoginModal {...props} getUserType={setUserType} />;
  } else {
    return <SimpleLoginModal {...props} getUserType={setUserType} />;
  }
};

export default LoginModal;
