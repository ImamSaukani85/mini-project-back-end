const db = require('../models')
const User = db.user

isUserExist = (req, res, next) => {
    User.findOne({
        where: {
            user_name: req.body.user_name
        }
    }).then((user) => {
        if (user) {
            res.status(400).json({
                message: 'User_name already exists'
            })
            return
        }
        next()
    })
}

module.exports = {
    isUserExist,
}