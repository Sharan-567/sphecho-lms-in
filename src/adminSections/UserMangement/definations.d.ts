export type Patient = {
  qmsDoctors: [];
  roles: [];
  _id: string;
  name?: string;
  Name?: string;
  type: string;
  contact?: string;
  phoneextention?: string;
  password: string;
  email: string;
  role: string;
  department: string;
  gender?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  dateofbirth?: string;
  dateofjoin?: string;
  terminatedate?: string;
  monthlyctc?: string;
  profileURL?: string;
  __v?: string;
  assigningAuthority?: string;
  Email?: string;
};

export type Doctor = {
  firstname?: string;
  disabled?: boolean;
  isReferred?: boolean;
  isVerified?: boolean;
  isSource?: boolean;
  isAnaesthetist?: boolean;
  forEmergencyWard?: boolean;
  languages?: string[];
  onCallArray?: [];
  roles?: [];
  _id?: string;
  Name?: string;
  name?: string;
  Department?: string;
  Qualification?: string;
  Gender?: string;
  Contact?: number;
  Registration?: string;
  Email?: string;
  email?: string;
  Password?: string;
  ProfileURL?: string;
  followupConsultations?: [];
  medicineFrequencies?: [];
  medicineInstructions?: [];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  Address?: string;
  Bio?: string;
  ClinicName?: string;
  DOB?: string;
  HospitalFee?: number;
  Joining?: string;
  Speciality?: string;
  Unit?: string;
  assigningAuthority?: string;
  building?: string;
  consultationFee?: number;
  doctorSecretaryName?: string;
  doctorSecretaryNumber?: string;
  doctorStatus?: string;
  floor?: string;
  monthlyctc?: string;
  room?: string;
};
