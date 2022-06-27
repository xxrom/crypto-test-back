import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const key = process.env.KEY;

export const generateTokens = async (username: string) => {
  const accessToken = jwt.sign({username}, key, {expiresIn: '10m'}); // 10m
  const refreshToken = jwt.sign({username}, key, {expiresIn: '30d'});

  const tokens = {
    accessToken,
    refreshToken,
    //expiresIn: jwt.decode(accessToken),
  };
  console.log('new tokens', tokens);

  //await redis.setAsync(`${username}_access_token`, accessToken);
  //await redis.setAsync(`${username}_refresh_token`, refreshToken);

  return tokens;
};

const jwtVerifyAsync = (innerToken: string, innerKey: string) =>
  new Promise((resolve, reject) =>
    jwt.verify(innerToken, innerKey, (err, decode) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(decode);
    }),
  );

export const getPayload = async (token: string) => {
  const payload = await jwtVerifyAsync(token, key);
  return payload;
};
