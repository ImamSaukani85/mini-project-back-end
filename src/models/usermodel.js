module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        user_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        join_date: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {freezeTableName: true, createdAt: false, updatedAt: false})

    return User
}