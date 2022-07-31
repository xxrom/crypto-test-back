import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./env";

export type tokenType = {
  accessToken: string;
  refreshToken: string;
};

// Return new copy of passed object and trim() all string keys
export type trimAllType = { [key: string]: string | any };

const trimAll = (obj: trimAllType) => {
  const trimmed: trimAllType = obj;

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") {
      trimmed[key] = obj[key].trim();
    }
  });

  return trimmed;
};

export type generateTokensType = {
  email: string;
};
export const generateTokens = async (
  userInfo: generateTokensType
): Promise<tokenType> => {
  const trimmedUserInfo = trimAll(userInfo);

  const accessToken = jwt.sign(trimmedUserInfo, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  const refreshToken = jwt.sign(trimmedUserInfo, JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  const tokens = {
    accessToken,
    refreshToken,
    //expiresIn: jwt.decode(accessToken),
  };
  console.log("new tokens", tokens);

  return tokens;
};

export const jwtVerifyAsync = (
  fromHeaderToken: string
): Promise<generateTokensType> =>
  new Promise((resolve, reject) => {
    try {
      jwt.verify(fromHeaderToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.log("error", err);
          reject(err);

          return;
        }
        console.log("decode", decoded);

        resolve(decoded as generateTokensType);
      });
    } catch (err) {
      console.log("catch: error", err);
      reject(err);
    }
  });

export const getPayload = async (token: string) => {
  const payload = await jwtVerifyAsync(token);
  return payload;
};
