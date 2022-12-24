export type UserState = "Patient" | "Provider" | "SuperUser" | "staffMember";

export type Auth = {
  title: string;
  userState: UserState;
  user_type: string;
  type: string;
};