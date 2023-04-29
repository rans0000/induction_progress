import Joi from 'joi';

const create = Joi.object({
    userId: Joi.string().required(),
    isMemberCompleted: Joi.bool().required(),
    status: Joi.any().valid('pending', 'rejected', 'verified').required(),
    tasks: Joi.array()
        .items({
            taskId: Joi.string().required(),
            isCompleted: Joi.bool().required(),
        })
        .required(),
});

const update = Joi.object({
    userId: Joi.string().required(),
    isMemberCompleted: Joi.bool().required(),
    status: Joi.any().valid('pending', 'rejected', 'verified').required(),
    tasks: Joi.array()
        .items({
            taskId: Joi.string().required(),
            isCompleted: Joi.bool().required(),
        })
        .required(),
});

export default { create, update };
