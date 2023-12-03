// validator.js
const Joi = require('joi');

const authValidation = {
  register: Joi.object({

    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = { validator, authValidation };
