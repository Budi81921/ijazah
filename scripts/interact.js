const hre = require("hardhat");

async function main() {
    // Get environment variables
    const action = process.env.ACTION; // 'issue', 'verify', or 'details'
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const Degree = await hre.ethers.getContractFactory("Degree");
    const degree = Degree.attach(contractAddress);

    if (action === "issue") {
        const studentName = process.env.STUDENT_NAME;
        const degreeName = process.env.DEGREE_NAME;
        const yearOfPassing = parseInt(process.env.YEAR_OF_PASSING, 10);
        const issuer = process.env.ISSUER;

        const tx = await degree.issueCertificate(studentName, degreeName, yearOfPassing, issuer);
        await tx.wait();
        console.log(`Certificate issued for ${studentName}.`);
    } else if (action === "verify") {
        const studentName = process.env.STUDENT_NAME;
        const degreeName = process.env.DEGREE_NAME;
        const yearOfPassing = parseInt(process.env.YEAR_OF_PASSING, 10);
        const issuer = process.env.ISSUER;

        const certHash = hre.ethers.utils.keccak256(
            hre.ethers.utils.solidityPack(
                ["string", "string", "uint256", "string"],
                [studentName, degreeName, yearOfPassing, issuer]
            )
        );
        const valid = await degree.verifyCertificate(certHash);
        console.log(`Certificate valid: ${valid}`);
    } else if (action === "details") {
        const studentName = process.env.STUDENT_NAME;
        const degreeName = process.env.DEGREE_NAME;
        const yearOfPassing = parseInt(process.env.YEAR_OF_PASSING, 10);
        const issuer = process.env.ISSUER;

        const valid = await degree.verifyCertificateDetails(studentName, degreeName, yearOfPassing, issuer);
        console.log(`Certificate details match: ${valid}`);
    } else {
        console.log("Invalid action. Use 'issue', 'verify', or 'details'.");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
