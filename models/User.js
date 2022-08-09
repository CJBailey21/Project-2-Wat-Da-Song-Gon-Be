const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 4,
        notNull: {
          msg: "Please insert a username.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 6,
        notNull: {
          msg: "Please insert a password.",
        },
      },
    },
  },
  {
    sequelize: require("../config/connection"),
    modelName: "user",
    hooks: {
      async beforeCreate(user) {
        const hash_pass = await bcrypt.hash(user.password, 12);
        user.password = hash_pass;
      },
    },
  }
);

User.prototype.validatePassword = async function (pass, stored_pass) {
  return await bcrypt.compare(pass, stored_pass);
};

User.belongsToMany(User, {
  through: "user_followers",
  as: "followers",
  foreignKey: "user_id",
});
User.belongsToMany(User, {
  through: "user_followers",
  as: "following",
  foreignKey: "follower_id",
});

module.exports = User;



const User = require("../../models/User");
const searchBar = document.getElementById("usersearch");

let users = [];

searchBar.addEventListener("keydown", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredUsers = users.filter((User) => {
    return User.name.toLowerCase().includes(searchString);
  });
  displayUsers(filteredUsers);
});

const loadUsers = async () => {
  try {
    const res = await fetch(placeholder); // fetch(route that gets all users) reference 14 mini project
    users = await res.json();
    displayUsers(users);
  } catch (err) {
    console.log(err);
  }
};

const displayUsers = (users) => {
  const htmlString = users
    .map((users) => {
      return `
            <li class="users">
            <h3>${users.username}</h2>
            <p>${users.id}</p>
            </li>
        `;
    })
    .join(``);
  User = htmlString;
};

loadUsers();
