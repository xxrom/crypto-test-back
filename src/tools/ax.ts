import axios from "axios";
import { debounce } from "./t";

export type axProps = {
  url: string;
  method?: "get" | "post";
  timeout?: number;
};

const memoObj: { [key: string]: any } = {};
export const REQUEST_TIMEOUT: number = 1050;

/**
 * TODO:
 * [ ]: implement request queue with timeout parameter (1sec)
 */
const axiosMy: any = axios.create({
  baseURL: "https://api.nomics.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: String(process.env.API_KEY_NOMICS),
  },
});

export const ax = async ({ url, method = "get", timeout = -1 }: axProps) => {
  const memoPath = `${method}:${url}`;

  if (memoObj[memoPath]) {
    //console.log("<<< MEMO");

    return memoObj[memoPath];
  }

  const reqFunction = () =>
    axiosMy[method](
      url //safe option: `${url}?key=${process.env.API_KEY_NOMICS}`,
    );

  const res =
    timeout <= 0 ? reqFunction() : await debounce(reqFunction, timeout);

  //console.log("<<< save to MEMO");
  memoObj[memoPath] = res;

  return memoObj[memoPath];
};
