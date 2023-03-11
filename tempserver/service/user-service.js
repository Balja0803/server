const fs = require("fs").promises;

async function checkUser(path, data) {
  try {
    const users = await fs.readFile(path);
    const userData = JSON.parse(users);

    const isValidUser = userData.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    if (!isValidUser) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(`error ${error.message}`);
  }
}

module.exports = checkUser;
