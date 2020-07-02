// Import of JWT
const argon2 = require('argon2');
const {generateJWT} = require('../AuthLayer');

exports.getUsers = async function() {
  const passwordHashed = await argon2.hash("passwordSegret@123");
  return [
    {
      email : "cesare@email.it",
      name : "Cesare",
      surname : "Galli",
      password : passwordHashed,
      gender : "male",
      birthday : "1973-01-01",
      country: "italy",
      phone: "3335879651",
      profilePic: "https://polimi-dil-civis.herokuapp.com/users-pic/cesare.png",
      level: 3,
      premium: true
    },
    {
      email : "laura@email.it",
      name : "Laura",
      surname : "Basile",
      password : passwordHashed,
      gender : "female",
      birthday : "1996-05-02",
      country: "italy",
      phone: "3235771631",
      profilePic: "https://polimi-dil-civis.herokuapp.com/users-pic/laura.png",
      level: 1,
      premium: false
    }
  ];
}
