require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const GOERLI_API_KEY=process.env.GOERLI_URL
const PRIVATE_KEY=process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.4",
  networks:{
    goerli:{
      url:GOERLI_API_KEY,
      accounts:[PRIVATE_KEY]
    }
  }
};
