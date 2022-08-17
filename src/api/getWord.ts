
import { IWord } from "src/types/IWord";
import { baseUrl } from "./baseUrl";

const words = `${baseUrl}/words`;

export const getWord = async (id: string) => {
  const response = await fetch(`${words}/${id}`);

  return await response.json();
}
