import Redis from 'redis';
import env from 'dotenv';

env.config();

export const redis = Redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
