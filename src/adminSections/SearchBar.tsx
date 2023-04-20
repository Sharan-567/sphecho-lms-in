import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  setSelectSearchTxt: React.Dispatch<React.SetStateAction<string>>;
  selectSearchTxt: string;
  placeholder?: string;
};

const SearchBar = ({
  selectSearchTxt,
  setSelectSearchTxt,
  placeholder,
}: Props) => {
  return (
    <div className="d-flex align-items-center bg-graydark px-2 py-3  br-1">
      <AiOutlineSearch size={"2rem"} className="text-primary" />
      <input
        className="bg-graydark ms-2"
        style={{
          width: "100%",
          //   borderRadius: ".5rem",
          border: "none",
          outline: "none",
        }}
        placeholder={placeholder}
        value={selectSearchTxt}
        onChange={(e) => setSelectSearchTxt(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
