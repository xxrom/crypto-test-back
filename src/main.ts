import Koa from 'koa';
import logger from 'koa-morgan';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import env from 'dotenv';
import {currenciesRouter} from './router';
import axios from 'axios';
import mongoose from 'mongoose';

env.config();

const port = process.env.PORT || '4444';

const app: Koa = new Koa();

const {Schema} = mongoose;

const blogSchema = new Schema({
  email: String,
  password: String,
});

const mongodbIP = 'mongodb://192.168.3.13:27017';

const getMongoDB = async () => {
  const connection = await mongoose.createConnection(mongodbIP).asPromise();

  console.log(`DB readyState ${connection.readyState}`);

  if (connection.readyState !== 1) {
    throw Error(`Not connectToDb, readyState ${connection.readyState}`);
  }

  return connection;
};

const connectToDB = async (): Promise<mongoose.Connection> => {
  console.log('Connect to Mongo');

  try {
    const connection = await getMongoDB();
    return connection;
  } catch (error) {
    console.error('Error: ConnectDB', error.message);
    return error;
  }
};

export let db: mongoose.Connection;
connectToDB().then(res => {
  db = res;
});

app
  .use(logger('tiny'))
  .use(cors())
  .use(currenciesRouter.routes())
  .use(currenciesRouter.allowedMethods())
  .use(bodyParser())
  .use(async (ctx: Koa.Context) => {
    ctx.body = 'Hello world';
  })
  .listen(port, () => {
    console.log(`>>> 🌍 >>> Server running on port >>> ${port}`);
  });
