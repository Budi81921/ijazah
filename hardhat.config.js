/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); // Gunakan dotenv untuk menyimpan private key secara aman

module.exports = {
  solidity: "0.8.0", // Pastikan versi Solidity sesuai dengan kontrak Anda
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // URL default Hardhat Network
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined, // Gunakan private key dari .env
    },
  },
};
