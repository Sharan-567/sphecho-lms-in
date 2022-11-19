import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { BASE_URL, HOST } from "../../features/settings";
import "./certificate.scss";
import { convertToObject } from "./helpers";

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
  const [badgeList, setBadgeList] = useState<Badge[]>();
  const [error, setError] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [pdf, setPdf] = useState();

  const getCertificationList = useCallback(() => {
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
          console.log(convertToObject(res.data.badges));
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
        <embed
          width={"100%"}
          height="100%"
          src={pdf + "#toolbar=0&navpanes=0&scrollbar=0"}
          type="application/pdf"
        />
      </div>
    );
  }

  return (
    <div className="container w-75 p-3">
      <div className="p-2">
        <h2 className="b-700">Certifications</h2>
        <p>You earned</p>
        {error && <h2 className="text-danger text-center">{error}</h2>}
      </div>
      {(certificationList || []).map((certficate) => (
        <div
          key={certficate.id}
          onClick={() => showCertificateHandler(certficate.id)}
          className="bg-gray br-1 px-4 py-2 mb-2"
          style={{ cursor: "pointer" }}
        >
          <h3 style={{ fontSize: "1.1rem" }}>
            Certificate Title: {certficate.certificate__title}
          </h3>
          <p>{certficate.date}</p>
        </div>
      ))}
      <div className="p-2">
        <h2 className="b-700">Badges</h2>
        <p>Badges you earned</p>
      </div>
      <div className="d-flex flex-wrap">
        {(badgeList || []).map((badge) => (
          <div
            key={badge.id}
            className="br-1 px-4 py-2 mb-2 text-center m-5"
            style={{ cursor: "pointer" }}
          >
            <img
              src={`https://${HOST}/open_api_v_0_0_1/shared_data/media/${badge.badge__image}`}
              width={100}
            />
            <p>
              {badge.badge__title}
              <span className="text-primary b-700"> x{badge.badge}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certification;
