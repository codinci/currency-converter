const Joi = require('joi');

const schema = Joi.object({
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'))
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
})

module.exports = {
  schema: schema
};