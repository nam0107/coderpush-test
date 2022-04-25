import Joi from 'joi';

const getAllUserValidation = async (args: any) =>
  Joi.object({
    id: Joi.number().required(),
    page: Joi.number().optional(),
    size: Joi.number().optional(),
    sort: Joi.string().optional(),
  }).validateAsync(args, { stripUnknown: true });

const findUserByIdValidation = async (args: any) =>
  Joi.object({
    id: Joi.string().required(),
  }).validateAsync(args, { stripUnknown: true });

const updateUserValidation = async (args: any) =>
  Joi.object({
    id: Joi.number().required(),
    liked: Joi.number().optional(),
    passed: Joi.number().optional(),
  }).validateAsync(args, { stripUnknown: true });

const orderValidation = {
  getAllUserValidation,
  findUserByIdValidation,
  updateUserValidation,
};

export default orderValidation;
