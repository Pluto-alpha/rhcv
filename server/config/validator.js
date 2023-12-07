const Joi = require("joi");


const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required()
  ,
  password: Joi.string().required(),
  role: Joi.string().allow('').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const visiterValid = Joi.object({
  type: Joi.string().required(),
  passNo: Joi.number().integer().required(),
  fatherName: Joi.string().required(),
  advocateName: Joi.string().required(),
  address: Joi.string().required(),
  mobile: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': 'Phone number must have 10 digits.' }).required(),
  email: Joi.string().email().required(),
  idProofType: Joi.string().required(),
  idProofNo: Joi.string().required(),
  validUpTo: Joi.date().required(),
  validOn: Joi.date().required(), 
});

module.exports = { signupSchema, loginSchema, visiterValid };
