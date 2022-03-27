import Joi from 'joi';

export const schema = Joi.object().keys({
  email: Joi.string()
    .min(5)
    .max(32)
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ru']}})
    .required(),

  password: Joi.string()
    .min(8)
    .max(64)
    .required(),
});
