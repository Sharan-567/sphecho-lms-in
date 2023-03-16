import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { BASE_URL, HOST } from "../../features/settings";
import "./certificate.scss";
import { convertToObject } from "./helpers";
import Empty from "../Empty";
import LoadingEl from "../Loading";
import { motion, AnimatePresence } from "framer-motion";
import { Document, pdfjs, Page } from "react-pdf";

type Certification = {
  id: number;
  date: string;
  student: number;
  certificate: number;
  certificate__title: string;
};

type Badge = {
  id: number;
  date: string;
  badge: number;
  badge__title: string;
  badge__image: string;
  student: number;
};

const Certification = () => {
  const [certificationList, setCertificationList] = useState<Certification[]>(
    []
  );
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [badgeList, setBadgeList] = useState<Badge[]>();
  const [error, setError] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [pdf, setPdf] = useState();
  const [loading, setLoading] = useState(false);

  const getCertificationList = useCallback(() => {
    setLoading(true);
    let token = localStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: "token " + token,
      };
      axios
        .get(`${BASE_URL}/student/certificates-badges/`, { headers })
        .then((res) => {
          setCertificationList(convertToObject(res.data.certs));
          setBadgeList(convertToObject(res.data.badges));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            setError(err.response.statusText);
          } else if (err.request) {
            setError(err.request);
          } else {
            setError(err.message);
          }
        });
    }
  }, []);

  const getCertificatePdf = (id: number) => {
    let token = localStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: "token " + token,
      };

      fetch(`${BASE_URL}/student/certificate/${id}/`, {
        method: "GET",
        headers,
      })
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          let base64Data;
          reader.readAsDataURL(blob);
          reader.onload = () => {
            base64Data = reader.result;
            setPdf(base64Data);
          };
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.statusText);
          } else if (err.request) {
            setError(err.request);
          } else {
            setError(err.message);
          }
        });
    }
  };

  useEffect(() => {
    getCertificationList();
  }, [getCertificationList]);

  const showCertificateHandler = useCallback(
    (id: number) => {
      setShowCertificate(true);
      getCertificatePdf(id);
    },
    [getCertificatePdf]
  );

  const closeCertificateHandler = () => {
    setShowCertificate(false);
  };

  if (loading) {
    return (
      <div>
        <LoadingEl />
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  if (showCertificate) {
    return (
      <div
        className="w-100 text-center p-5"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Button
          variant="white"
          className="p-0 d-flex justify-content-center"
          onClick={() => setShowCertificate(false)}
        >
          <BsArrowLeft size="25" className="text-primary" />
          <p>Back</p>
        </Button>
        {/* <embed
          width={"80%"}
          height={"97%"}
          src={pdf + "#toolbar=0&navpanes=0&scrollbar=0"}
          type="application/pdf"
        /> */}
        <div
          className="pdf-container"
          style={{
            margin: "auto",
            maxWidth: "90%",
            overflow: "hidden",
            color: "white",
            background: "white",
            overflowY: "hidden",
          }}
        >
          <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-75 p-3">
      <div className="p-2 mb-2">
        <h2 className="b-700">Certifications</h2>
        {(certificationList || []).length > 0 && <p>Certificates you earned</p>}
        {(certificationList || []).length === 0 && (
          <p>You have no certificates available at this moment.</p>
        )}
      </div>
      <div className="mb-4">
        {(certificationList || []).map((certficate, idx) => (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={idx + "1"}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.1,
              }}
              onClick={() => showCertificateHandler(certficate.id)}
              className="bg-graydark pt-3 br-1 px-4 py-2 mb-2"
              style={{ cursor: "pointer" }}
            >
              <h3 style={{ fontSize: "1.1rem" }}>
                Certificate title: {certficate.certificate__title}
              </h3>
              <p>{certficate.date}</p>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
      <div className="p-2">
        <h2 className="b-700">Badges</h2>
        {(badgeList || []).length > 0 && <p>Badges you earned</p>}
        {(badgeList || []).length === 0 && (
          <>
            <Empty />{" "}
            <p style={{ textAlign: "center" }}>You have no badges yet</p>
          </>
        )}
      </div>

      <div className="d-flex flex-wrap">
        {(badgeList || []).map((badge, idx) => (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={idx + "1"}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.1,
              }}
              className="br-1 mb-2 text-center m-5 bg-graydark"
              style={{
                cursor: "pointer",
                borderRadius: "1rem",
                padding: "2rem 4rem",
                width: "14rem",
                height: "100%",
              }}
            >
              <img
                src={`https://${HOST}/open_api_v_0_0_1/shared_data/media/${badge.badge__image}`}
                width={100}
                style={{ marginBottom: "1rem" }}
              />

              <p>
                {badge.badge__title}
                <span className="text-primary b-700"> x{badge.badge}</span>
              </p>
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
};

export default Certification;
