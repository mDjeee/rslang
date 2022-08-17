import { IUser } from "src/types/IUser";
import { baseUrl } from "./baseUrl";

const users = `${baseUrl}/users`;

export const getUser = async (id: string) => {
  (await fetch(`${users}/${id}`, {
    method: 'DELETE'
  })).json();
}
