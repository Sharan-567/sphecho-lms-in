import React from "react";

type Props<T> = {
  title: string;
  items: T;
  UpdateModal?: React.ReactNode;
  DeleteModal?: React.ReactNode;
  DetailModal?: React.ReactNode;
  CreateModal?: React.ReactNode;
  children: React.ReactNode;
};

const ListContainer: React.FC<Props<T>> = (props) => {
  const { UpdateModal, DeleteModal, CreateModal, DetailModal } = props;
  return (
    <>
      <div className="p-5 br-2 bg-white">
        <h3 className="b-700">{props.title}</h3>
        {props.children}
      </div>
      {UpdateModal && UpdateModal}
      {DeleteModal && DeleteModal}
      {DetailModal && DetailModal}
      {UpdateModal && UpdateModal}
    </>
  );
};

export default ListContainer;
