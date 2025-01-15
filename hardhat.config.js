/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.0", // Pastikan versi sesuai dengan kontrak Anda
  networks: {
      localhost: {
          url: "http://127.0.0.1:8545", // URL default Hardhat Network
      },
  },
};