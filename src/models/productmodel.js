module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
        }
    }, {freezeTableName: true, createdAt: false, updatedAt: false})
    
    return Product
}