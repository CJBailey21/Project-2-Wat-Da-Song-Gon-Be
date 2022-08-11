const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const Post = require('./Post')

class User extends Model { }

User.init({
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

User.hasMany(Post)
Post.belongsTo(User)

  
  module.exports = User;