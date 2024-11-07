const bcrypt = require('bcryptjs')

async function hash (pw) {
  const salt = await bcrypt.genSalt(10);
  let result = await bcrypt.hash(pw, salt);
  return result;
}

async function compareHashed (pw, hashed) {
  let result = await bcrypt.compare(pw, hashed);
  return result;
}
module.exports = { hash, compareHashed }