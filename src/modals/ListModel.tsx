import React from "react";
import { Modal, Button } from "react-bootstrap";
import { BASE_URL } from "../features/settings";
type Props = {
  getUserType: React.Dispatch<React.SetStateAction<string>>;
  handleOpenModel: () => void;
  handleCloseModal: () => void;
  showLoginModal: boolean;
};

type UserType = {
  id: number;
  title: string;
  type: string;
};

const typeOfUsers: UserType[] = [
  {
    id: 1,
    title: "Patient",
    type: "patient",
  },
  {
    id: 2,
    title: "Doctor",
    type: "doctor",
  },
];

const ListModel = ({ getUserType, ...restProps }: Props) => {
  return (
    <Modal
      centered
      show={restProps.showLoginModal}
      onHide={() => {
        getUserType("");
        restProps.handleCloseModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Please Select Login Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column p-4">
          {typeOfUsers.map((user) => (
            <Button
              className="bg-green my-2 py-2 text-white"
              key={user.id}
              onClick={() => getUserType(user.type)}
            >
              <h6 style={{ fontSize: "1rem" }}>
                Login as {user.title.toUpperCase()}
              </h6>
            </Button>
          ))}
          <Button
            className="bg-green my-2 py-2 text-white"
            href={
              "https://lmsv2.metahos.com/lms_api_v1/super-admin/login/?next=/lms_api_v1/super-admin/"
            }
          >
            <h6 style={{ fontSize: "1rem" }}>Login as Super Admin</h6>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ListModel;
