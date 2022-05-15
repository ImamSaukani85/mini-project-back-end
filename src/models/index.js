const db = require('../config/database')

db.user = require('./usermodel')(db.sequelize, db.Sequelize)
db.product = require('./productmodel')(db.sequelize, db.Sequelize)

module.exports = db