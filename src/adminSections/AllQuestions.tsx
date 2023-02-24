import React from "react";
import { useAppDispatch } from "../store";
import { showToast } from "../features/toast";
import { customAxios } from "../services/utils";
import ListItem from "./ListItem";
import { User } from "../definations/patients";
import MultiList from "./MultiList";
import { Question } from "../definations/assessment";

type Props = {
  setMultipleUserSelect: React.Dispatch<React.SetStateAction<number[]>>;
  multipleUsersSelect: number[];
};

const AllUser = ({ multipleUsersSelect, setMultipleUserSelect }: Props) => {
  const [questions, setQuestions] = React.useState<Question[]>();

  const dispatch = useAppDispatch();

  const getAllquestions = () => {
    const formData = new FormData();
    customAxios
      .get(`/master/question-list`)
      .then((res) => {
        setQuestions(res.data.Questions);
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : admin : while fetching questionList",
          })
        );
      });
  };

  React.useEffect(() => {
    getAllquestions();
  }, []);

  console.log(multipleUsersSelect);

  return (
    <div>
      {(questions || []).map((u, idx) => {
        return (
          <>
            <MultiList
              id={u.id}
              idx={idx}
              title={u.question}
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
