const db = require('../models')
const User = db.user

exports.profile = (req, res) => {
    User.findByPk(req.userId).then((user) => {
        res.status(200).json({
            id: user.id,
            user_name: user.user_name,
            address: user.address,
            phone_number: user.phone_number,
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message
        })
    })
}