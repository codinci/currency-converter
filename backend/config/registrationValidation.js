const Joi = require('../../client/node_modules/joi/lib');

const schema = Joi.object({
    first_name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    last_name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'))
      .required(),

    repeat_password: Joi.ref('password'),

    refresh_token: [
      Joi.string(),
      Joi.number()
    ],
    phone_number: Joi.number(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
})
module.exports = {
  schema: schema
};