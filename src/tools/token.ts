import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_HEADER_KEY = process.env.JWT_HEADER_KEY;

export type tokenType = {
  accessToken: string;
  refreshToken: string;
};

// Return new copy of passed object and trim() all string keys
export type trimAllType = { [key: string]: string | any };

const trimAll = (obj: trimAllType) => {
  const trimmed: trimAllType = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      trimmed[key] = obj[key].trim();
    } else {
      trimmed[key] = obj[key];
    }
  });

  return trimmed;
};

export type generateTokensType = {
  username: string;
};
export const generateTokens = async (
  userInfo: generateTokensType
): Promise<tokenType> => {
  const trimmedUserInfo = trimAll(userInfo);

  const accessToken = jwt.sign(trimmedUserInfo, JWT_SECRET_KEY, {
    expiresIn: "1d",
  }); // 30m
  const refreshToken = jwt.sign(trimmedUserInfo, JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  const tokens = {
    accessToken,
    refreshToken,
    //expiresIn: jwt.decode(accessToken),
  };
  console.log("new tokens", tokens);

  //await redis.setAsync(`${username}_access_token`, accessToken);
  //await redis.setAsync(`${username}_refresh_token`, refreshToken);

  return tokens;
};

export const jwtVerifyAsync = (
  fromHeaderToken: string
): Promise<generateTokensType> =>
  new Promise((resolve, reject) =>
    jwt.verify(fromHeaderToken, JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(decode as generateTokensType);
    })
  );

export const getPayload = async (token: string) => {
  const payload = await jwtVerifyAsync(token);
  return payload;
};
