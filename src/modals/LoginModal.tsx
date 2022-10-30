import React, { useState } from "react";
import SimpleLoginModal from "./SimpleLoginModal";
import PatientLoginModal from "./PatientLoginModal";
import ListModel from "./ListModel";

type Props = {
  handleOpenModel: () => void;
  handleCloseModal: () => void;
  showLoginModal: boolean;
};

const LoginModal = (props: Props) => {
  const [userType, setUserType] = useState("");
  if (!userType) {
    return <ListModel {...props} getUserType={setUserType} />;
  } else if (userType === "patient") {
    return <PatientLoginModal {...props} getUserType={setUserType} />;
  } else {
    return (
      <SimpleLoginModal
        {...props}
        userType={userType}
        getUserType={setUserType}
      />
    );
  }
};

export default LoginModal;
