import Joi from 'joi';

const create = Joi.object({
    userId: Joi.string().required(),
    isCompleted: Joi.bool().required(),
    tasks: Joi.object({
        taskId: Joi.string().required(),
        status: Joi.any().valid('pending', 'rejected', 'verified').required(),
    }).required(),
});

const update = Joi.object({
    userId: Joi.string().required(),
    isCompleted: Joi.bool().required(),
    tasks: Joi.object({
        taskId: Joi.string().required(),
        status: Joi.any().valid('pending', 'rejected', 'verified').required(),
    }).required(),
});

export default { create, update };
