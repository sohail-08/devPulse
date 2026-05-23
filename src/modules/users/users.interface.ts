export interface IUser {
  id: number;
  name: string;
  email: string;
  role: "contributor" | "maintainer";
  created_at: string;
  updated_at: string;
}