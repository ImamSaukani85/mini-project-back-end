const config = require('../config/auth')
const db = require('../models')
const User = db.user
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    User.create({
        user_name: req.body.user_name,
        password: bcrypt.hashSync(req.body.password, 8),
        address: req.body.address,
        phone_number: req.body.phone_number,
    }).then((user) => {
        res.status(201).json({
            message: 'User registered successfully'
        })
    } )
    .catch((err) => {
        res.status(500).json({
            message: err.message
        })
    })
}

exports.login = (req, res) => {
    User.findOne({
        where: {
            user_name: req.body.user_name
        }
    }).then((user) => {
        if(!user){
            res.status(404).json({
                message: 'User not found'
            })
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

        if(!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: 'password is invalid'
            })
        }

        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400
        })

        res.status(200).json({
            id: user.id,
            user_name: user.user_name,
            accessToken: token
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message
        })
    })
}
