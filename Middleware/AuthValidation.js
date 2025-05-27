const joi = require('joi')

const SignInVaidation = (req, res, next) => {
    const SignInSchema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(100).required(),
    })

    const { error } = SignInSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad Request", error })
    }

    next()
}


const LogInVaidation = (req, res, next) => {
    const LogInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).max(100).required(),
    })

    const { error } = LogInSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad Request", error })
    }

    next()
}


module.exports = { SignInVaidation, LogInVaidation }