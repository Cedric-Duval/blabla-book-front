import { ILibraries } from "./libraries";

export type IUser = {
  id: number;
  name: string;
  firstname: string;
  email: string;
  password: string;
  Libraries: ILibraries[];
  createdAt: string;
  updatedAt: string;
};
