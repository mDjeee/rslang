import { IUser } from "src/types/IUser";
import { baseUrl } from "./baseUrl";

const users = `${baseUrl}/users`;

export const getUser = async (id: string) => {
  const response = await fetch(`${users}/${id}`);

  return await response.json();
}
