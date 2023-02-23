export type Patient = {
  fName: string;
  dob: string;
  _id: string;
  gender: string;
  mobile: string;
  fullName: string;
};

export type User = {
  id: number;
  last_login: undefined | string;
  email: string;
  name: string;
  profile_image: string;
  mobile: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  welcome_text: string;
  role: string;
  m16_id: string;
  referred_by: string;
  groups: [];
  user_permissions: [];
};
