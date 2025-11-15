import Joi from "joi";

const taskSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(500).required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    completed: Joi.boolean().required()
});

const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            status: 400,
            message: error.details[0].message 
        });
    }
    next();
}

export default validateTask;