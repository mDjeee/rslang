import { IUser } from "src/types/IUser";
import { baseUrl } from "./baseUrl";

const users = `${baseUrl}/users`;

export const createUser = async (user: IUser) => {
  const rawResponse = await fetch(`${users}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();
  console.log(content);
};
