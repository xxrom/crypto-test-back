import axios from 'axios';

export type axProps = {
  url: string;
  method?: 'get' | 'post';
};

const memoObj: {[key: string]: any} = {};

export const axiosMy: any = axios.create({
  timeout: 3000,
  baseURL: 'https://api.nomics.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.API_KEY_NOMICS,
  },
});

export const ax = async ({url, method = 'get'}: axProps) => {
  if (!memoObj[url]) {
    console.info('Save to memo', url);

    const res = await axiosMy[method](url);
    memoObj[url] = res;
  }

  return memoObj[url];
};
