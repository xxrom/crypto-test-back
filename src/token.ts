import jwt from 'jsonwebtoken';
import env from 'dotenv';
//import {redis} from './redis';

env.config();

const key = process.env.KEY;

export const generateTokens = async (username: string) => {
  const accessToken = jwt.sign({username}, key, {expiresIn: '10m'}); // 10m
  const refreshToken = jwt.sign({username}, key, {expiresIn: '30d'});

  const tokens = {
    accessToken,
    refreshToken,
    //expiresIn: jwt.decode(accessToken).exp,
  };

  //await redis.setAsync(`${username}_access_token`, accessToken);
  //await redis.setAsync(`${username}_refresh_token`, refreshToken);

  return tokens;
};
