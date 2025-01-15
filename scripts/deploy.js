const hre = require("hardhat");

async function main() {
    const Degree = await hre.ethers.getContractFactory("Degree");
    const degree = await Degree.deploy();
    await degree.deployed();
    console.log("Degree contract deployed to:", degree.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
