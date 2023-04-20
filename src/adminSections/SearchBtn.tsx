import React from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

type Props = {
  searchtxt: string;
  setSearchTxt: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

const SearchBtn = ({ searchtxt, setSearchTxt, placeholder }) => {
  const [bigInput, setBigInput] = React.useState(false);

  const inputRef = React.useRef(null);

  return (
    <motion.div
      className="bg-graydark br-4 d-flex justify-content-left align-items-center px-3 py-3 me-2"
      animate={{ width: bigInput ? "100%" : "4rem" }}
      transition={{ type: "keyframes", ease: "linear" }}
      style={{ overflow: "hidden" }}
    >
      <motion.input
        ref={inputRef}
        placeholder={placeholder ? placeholder : "Search.."}
        onBlur={() => {
          if (searchtxt.length === 0) {
            setBigInput(false);
          }
        }}
        animate={{
          width: "100%",
        }}
        value={searchtxt}
        onChange={(e) => setSearchTxt(e.target.value)}
        style={{
          height: "100%",
          fontWeight: "bold",
          background: "none",
          border: "none",
          outline: "none",
          paddingRight: ".5rem",
        }}
      />
      {bigInput ? (
        <div
          className="h-100"
          onClick={() => {
            setBigInput(false);
            setSearchTxt("");
          }}
          style={{ cursor: "pointer", height: "100%", marginLeft: "auto" }}
        >
          <AiOutlineClose style={{ fontSize: "1.6rem" }} />
        </div>
      ) : (
        <div
          className="h-100"
          onClick={() => {
            setBigInput(true);
            setSearchTxt("");
            inputRef?.current.focus();
          }}
          style={{ cursor: "pointer", height: "100%", marginLeft: "auto" }}
        >
          <AiOutlineSearch style={{ fontSize: "1.6rem" }} />
        </div>
      )}
    </motion.div>
  );
};

export default SearchBtn;
