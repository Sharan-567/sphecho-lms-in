import React from "react";
import { useAppDispatch } from "../store";
import { showToast } from "../features/toast";
import { customAxios } from "../services/utils";
import ListItem from "./ListItem";
import { User } from "../definations/patients";
import MultiList from "./MultiList";
import { Question } from "../definations/assessment";
import Fuse from "fuse.js";

type Props = {
  setMultipleUserSelect: React.Dispatch<React.SetStateAction<number[]>>;
  multipleUsersSelect: number[];
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  questionSearchResult: Fuse.FuseResult<Question>[];
  questionSelectSearch: string;
};

const AllQuestions = ({
  multipleUsersSelect,
  setMultipleUserSelect,
  questions,
  setQuestions,
  questionSelectSearch,
  questionSearchResult,
}: Props) => {
  return (
    <div>
      {questionSelectSearch.length > 0
        ? (questionSearchResult || []).map(({ item }, idx) => {
            return (
              <>
                <MultiList
                  id={item.id}
                  idx={idx}
                  title={item.question}
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
          })
        : (questions || []).map((u, idx) => {
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

export default AllQuestions;
