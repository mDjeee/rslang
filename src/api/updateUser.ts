import { IUpdateUser } from "src/types/IUpdateUser";
import { baseUrl } from "./baseUrl";

const users = `${baseUrl}/users`;

export const updateUser = async (user: IUpdateUser) => (await fetch(`${users}/id`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })).json();
