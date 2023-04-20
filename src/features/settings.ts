export const HOST = "lmsv2.metahos.com";
export const LOCAL = "localhost:8000";
// change this on production
export const BASE_URL = `https://${HOST}/lms_api_v1`;
export const QISH_URL = "https://qish.metahos.com";
export const SHOP_URL = "https://qishcommerce.metahos.com";
export const SCHOLAR_URL = "https://qish.metahos.com/scholar";

export const SERVICE_URLS = {
  speech: `${QISH_URL}/service/departments/speech`,
  education: `${QISH_URL}/service/departments/education`,
  occupation: `${QISH_URL}/service/departments/accupational`,
  behavioral: `${QISH_URL}/service/departments/behavioral`,
  physiotherapy: `${QISH_URL}/service/departments/physiotherapy`,
  counselling: `${QISH_URL}/service/departments/counselling`,
  audiology: `${QISH_URL}/service/departments/audiology`,
};
export const JOIN_OUR_NETWORK = `${QISH_URL}/joinOurNetwork`;
