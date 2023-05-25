import React from "react";
import { useAppDispatch } from "../store";
import { showToast } from "../features/toast";
import { customAxios } from "../services/utils";
import ListItem from "./ListItem";
import { User } from "../definations/patients";
import MultiList from "./MultiList";

type Props = {
  setMultipleUserSelect: React.Dispatch<React.SetStateAction<number[]>>;
  multipleUsersSelect: number[];
};

const AllUser = ({ multipleUsersSelect, setMultipleUserSelect }: Props) => {
  const [users, setUsers] = React.useState<User[]>();

  const dispatch = useAppDispatch();

  const getAllUsers = () => {
    const formData = new FormData();
    customAxios
      .get(`/student/users-list/`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : users get : while fetcthing all users",
          })
        );
      });
  };

  React.useEffect(() => {
    getAllUsers();
  }, []);

  // console.log(multipleUsersSelect);

  return (
    <div>
      {(users || []).map((u, idx) => {
        return (
          <>
            <MultiList
              id={u.id}
              idx={idx}
              title={u.name}
              subTitle={u.email}
              getMultiSelectId={(id, type) => {
                if (type === "add") {
                  setMultipleUserSelect([...multipleUsersSelect, id]);
                } else {
                  setMultipleUserSelect(
                    multipleUsersSelect.filter((urId) => urId !== id)
                  );
                }
              }}
            />
          </>
        );
      })}
    </div>
  );
};

export default AllUser;
