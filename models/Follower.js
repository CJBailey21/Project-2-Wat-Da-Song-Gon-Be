const { DataTypes, Model, DatabaseError } = require('sequelize');
const User = require('./User')

class Follower extends Model {}

Follower.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     references:{
    //         model: 'user',
    //         key: id,
    //         as: 'primaryId'
    //     }
    // },
    followedId: {
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
            as: 'followedId'
        }
    },
},  {
    sequelize: require('../config/connection'),
    modelName: 'follower'
})

module.exports = Follower