const { DataTypes, Model, DatabaseError } = require('sequelize');
const User = require('./User')

class Followed extends Model {}

Followed.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},  
{
    sequelize: require('../config/connection'),
    freezeTableName: true,
    modelName: 'followed'
})

module.exports = Followed