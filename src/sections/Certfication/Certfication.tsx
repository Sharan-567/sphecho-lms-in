import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios'
import { Document, Page } from 'react-pdf';
import {BASE_URL} from '../../features/settings'
import './certificate.scss'

type Certification = {
  "id": number
  "date": string,
  "student": number,
  "certificate": number
}

const Certification = () => {
    const [certificationList, setCertificationList] = useState<Certification[]>([])
    const [error, setError] = useState("");
    const [showCertificate, setShowCertificate] = useState(false)
    const [pdf, setPdf] = useState();

    const getCertificationList = useCallback(() => {
      let token = localStorage.getItem("token")
      if(token) {
        const headers = {
          Authorization: "token " + token
        }
        axios.get(`${BASE_URL}/student/certificates-badges/`, {headers})
          .then(res => {
            setCertificationList(res.data.certs);
          })
          .catch(err => {
            if(err.response) {
              setError(err.response.statusText)
            } else if (err.request) {
              setError(err.request)
            } else {
              setError(err.message)
            }
          })
        }
      }, [])

      const getCertificatePdf = (id: number) => {
        let token = localStorage.getItem("token")
        if(token) {
          const headers = {
            Authorization: "token " + token
          }
          fetch(`${BASE_URL}/student/certificate/${id}/`, {method: 'GET', headers})
            .then(res => res.blob())
            .then(blob => {
              const reader = new FileReader();
              let base64Data;
              reader.readAsDataURL(blob)
              reader.onload = () => {
                base64Data = reader.result;
                setPdf(base64Data)
              }
            })
            .catch(err => {
              if(err.response) {
                setError(err.response.statusText)
              } else if(err.request) {
                setError(err.request)
              } else {
                setError(err.message)
              }
            })
        }
      }


    useEffect(() => {
        getCertificationList();
    }, [getCertificationList])

    const showCertificateHandler = useCallback((id: number) => {
      setShowCertificate(true)
      getCertificatePdf(id)
    }, [getCertificatePdf])
    
    const closeCertificateHandler = () => {
      setShowCertificate(false)
    }

    
    if(showCertificate) {
      return <div className='w-100 text-center p-5' style={{height: '100vh', overflow: "hidden"}}>
       <embed  width={"100%"} height="100%" src={pdf+"#toolbar=0&navpanes=0&scrollbar=0"} type="application/pdf"/>
      </div>
    }

    return <div className='container w-75 p-3'>
      <div className='p-2'>
      <h2 className='b-700'>Certifications</h2>
        <p >You earned</p>
        {error && <h2 className='text-danger text-center'>{error}</h2>}
      </div>
      {
        (certificationList || []).map(certficate => (
            <div key={certficate.id} onClick={() => showCertificateHandler(certficate.id)} className='bg-gray br-1 px-4 py-2' style={{cursor: 'pointer'}}>
              <p style={{fontSize: "1.1rem"}}>{certficate.id}</p>
              <p>{certficate.date}</p>
            </div>
        ))
      }
    </div>
}

export default Certification;