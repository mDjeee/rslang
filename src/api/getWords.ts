// https://angular-learndwords.herokuapp.com/words?page=2&group=0

import { IWord } from "src/types/IWord";
import { baseUrl } from "./baseUrl";

const words = `${baseUrl}/words`;

export const getWords = async (group = 0, page = 0) => {
  const response = await fetch(`${words}?group=${group}&page=${page}`);

  return await response.json();
}
