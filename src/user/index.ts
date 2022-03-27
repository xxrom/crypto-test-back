import Koa from 'koa';
import {schema} from './schema';
//import {redis} from '../redis';

export const isAuthorized = async (req: Koa.Request) => {
  const {error, value} = schema.validate(req);

  console.log('isAuthorized', error, value, req);

  if (error) {
    return false;
  }

  // Mock validation
  const providedUser = value.username;
  const providedPassword = value.password;
  //const correctPassword = await redis.getAsync(value.username);
  const correctUser = 'admin';
  const correctPassword = 'adminadmin';

  return providedPassword == correctPassword && providedUser == correctUser;
};
