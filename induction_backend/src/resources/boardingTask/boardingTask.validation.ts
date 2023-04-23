import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    enabled: Joi.boolean().required(),
});

const update = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    enabled: Joi.boolean().required(),
});

export default { create, update };
