// Import of JWT
const argon2 = require('argon2');
const {generateJWT} = require('../AuthService');

exports.parseUser = function(user) {
  delete user.verify;
  delete user.password;
  user.birthday = user.birthday.toISOString().split('T')[0];
  if(user.profilePic != "")
    user.profilePic = JSON.parse(user.profilePic);
  return user;
}

exports.getUsers = async function() {
  const passwordHashed = await argon2.hash("passwordSegret@123");
  return [
    {
      email : "cesare@email.it",
      verify: true,
      name : "Cesare",
      surname : "Galli",
      password : passwordHashed,
      gender : "male",
      birthday : "1973-01-01",
      country: "italy",
      phone: "3335879651",
      profilePic: '{"uri":"https://polimi-dil-civis.herokuapp.com/users-pic/cesare.png"}',
      level: 3,
      premium: true
    },
    {
      email : "laura@email.it",
      verify: true,
      name : "Laura",
      surname : "Basile",
      password : passwordHashed,
      gender : "female",
      birthday : "1996-05-02",
      country: "italy",
      phone: "3235771631",
      profilePic: '{"uri":"https://polimi-dil-civis.herokuapp.com/users-pic/laura.png"}',
      level: 1,
      premium: false
    }
  ];
}
