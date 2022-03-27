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
  const providedEmail = value.email;
  const providedPassword = value.password;
  //const correctPassword = await redis.getAsync(value.username);
  const correctEmail = 'admin@gmail.com';
  const correctPassword = 'adminadmin';

  return providedPassword == correctPassword && providedEmail == correctEmail;
};
