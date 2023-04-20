import React from "react";
import { motion } from "framer-motion";
import { AiOutlineShrink } from "react-icons/ai";
import { Button } from "react-bootstrap";

type Props = {
  topicName: string;
  setShowExpand: React.Dispatch<React.SetStateAction<boolean>>;
  pdf?: string;
};

const PdfPanel = ({ topicName, pdf, setShowExpand }: Props) => {
  return (
    <div
      className="bg-primary"
      style={{
        width: "100%",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0%",
        right: "0",
        zIndex: 1,
        padding: "2rem",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "white",
          borderRadius: "2.4rem",
          padding: "1rem",
          overflowY: "scroll",
        }}
      >
        <div
          onClick={() => setShowExpand(false)}
          style={{
            border: "none",
            height: "3rem",
            width: "3rem",
            borderRadius: "50rem",
            cursor: "pointer",
            zIndex: "2",
          }}
          className="text-white mt-2 ps-2 bg-black me-5 d-flex align-items-center d-flex align-items-center justify-content-center"
        >
          <AiOutlineShrink
            className="me-2 text-center"
            style={{ fontSize: "1.8rem" }}
          />
        </div>
        <motion.div
          key={"sumbit-page"}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ position: "relative", marginTop: "0rem" }}>
            <iframe
              src={pdf}
              style={{
                width: "79vw",
                height: "93vh",
                border: "none",
                borderRadius: "1rem",
              }}
            ></iframe>
            <div
              onClick={() => {}}
              style={{
                position: "absolute",
                width: "7rem",
                height: "1.6rem",
                background: "#444444",
                right: 0,
                marginTop: "-2.2rem",
                zIndex: 1,
              }}
            ></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PdfPanel;
