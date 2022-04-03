import axios from 'axios';

export type axProps = {
  url: string;
  method?: 'get' | 'post';
};

const memoObj: {[key: string]: any} = {};

const axiosMy: any = axios.create({
  timeout: 1000,
  baseURL: 'https://api.nomics.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: String(process.env.API_KEY_NOMICS),
  },
});

export const ax = async ({url, method = 'get'}: axProps) => {
  const memoPath = `${method}:${url}`;

  if (!memoObj[memoPath]) {
    console.info('Save to memo:', memoPath);

    const res = await axiosMy[method](
      url, //safe option: `${url}?key=${process.env.API_KEY_NOMICS}`,
    );
    memoObj[memoPath] = res;
  }

  return memoObj[memoPath];
};
