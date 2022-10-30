import React from "react";
import { Button } from "react-bootstrap";

type ListItem = {
  title: string;
  subTitle?: String;
  deleteHandler?: () => {};
  updateHandler?: () => {};
  detailHandler?: () => {};
};

const ListItem = (props: ListItem) => {
  return (
    <div className="br-1 p-2 ">
      <div className="d-flex justify-between">
        <div>
          <p className="w-75">{props.title}</p>
          {props.subTitle && <p className="tiny">{props.subTitle}</p>}
        </div>
        <div>
          {props.deleteHandler && (
            <Button
              className="bg-danger text-white"
              onClick={props.deleteHandler}
            ></Button>
          )}
          {props.updateHandler && (
            <Button
              className="bg-blue text-white"
              onClick={props.updateHandler}
            ></Button>
          )}
          {props.detailHandler && (
            <Button
              className="bg-admingreen text-white"
              onClick={props.detailHandler}
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
