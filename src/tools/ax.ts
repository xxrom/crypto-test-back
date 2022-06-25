import axios from "axios";
import { debounce, getMillis } from "./t";

export type axProps = {
  url: string;
  method?: "get" | "post";
  timeout?: number;
};

const cashe: { [key: string]: any } = {};
export const REQUEST_TO_SERVER_TIMEOUT: number = 1.1 * 1000;
export const CASHE_EXPIRE_TIMEOUT = 60 * 1000;

/**
 * TODO:
 * [V]: implement request queue with timeout parameter (1sec)
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
  const currentTime = getMillis();
  const memoPath = `${method}:${url}`;

  if (cashe[memoPath]) {
    const { res: memoryRes, expiretime } = cashe[memoPath];

    if (currentTime < expiretime) {
      console.log(`<<< MEMO, ${currentTime} / ${expiretime}`);

      return memoryRes;
    } else {
      console.log("EXPIRED request!");
    }
  }

  const reqFunction = () =>
    axiosMy[method](
      url //safe option: `${url}?key=${process.env.API_KEY_NOMICS}`,
    );

  const res =
    timeout <= 0 ? reqFunction() : await debounce(reqFunction, timeout);

  console.log("<<< save to MEMO");
  cashe[memoPath] = { res, expiretime: getMillis(CASHE_EXPIRE_TIMEOUT) };

  return cashe[memoPath];
};
