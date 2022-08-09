const User = require('../models/User');
const db = require('../config/connection')

db.sync({force: true}).then(() => {
    const userData = [
      {
       username: 'bob5', password: '123456'
      },
      {
        username: 'Roger6', password: 'asdfghj'
      }
    ]
    User.bulkCreate(userData).then(users => {
        users[0].addFollower(users[1]).then(() => {
            console.log('follower added');
        })
    })
})
