const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const Followed = require('./followed')

class User extends Model { }

User.init({
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: 4,
            notNull: {
                msg: 'Please insert a username.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: 6,
            notNull: {
                msg: 'Please insert a password.'
            } 
        }
    }
},  {
    sequelize: require('../config/connection'),
    modelName: 'user',
    hooks: {
      async beforeCreate(user) {
        const hash_pass = await bcrypt.hash(user.password, 12);
        user.password = hash_pass;
      }
    }
})

User.prototype.validatePassword = async function (pass, stored_pass) {
    return await bcrypt.compare(pass, stored_pass);
  }

User.belongsToMany(Followed, { through: 'followed', foreignKey: 'followed_id'})
Followed.belongsToMany(User, { through: 'users', as: 'followers', foreignKey: 'user_id' })

  
  module.exports = User;