const fs = require("fs").promises;

async function getProducts(path) {
  try {
    const data = await fs.readFile(path);

    return data;
  } catch (error) {
    return console.error(`error trying to read file: ${error.message} `);
  }
}

module.exports = getProducts;
