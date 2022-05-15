const db = require('../index')
const User = db.user

exports.userSeed = () => {
    User.create({
        user_name: 'Imam',
        password: '$2a$08$Ri25LYKfKRAHBBFhh4B0BuRerhMRAuxkW0WbmFMkpWPOEULmKe6hy', //password
        address: 'abcde',
        phone_number: '0819'
    })
}