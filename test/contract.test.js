const { expect } = require("chai");
const sinon = require("sinon");
const hre = require("hardhat");

describe("Interact Script", function () {
    let degreeContractMock, contractFactoryMock;

    beforeEach(() => {
        // Mock contract and its methods
        degreeContractMock = {
            issueCertificate: sinon.stub(),
            verifyCertificate: sinon.stub(),
            verifyCertificateDetails: sinon.stub(),
        };

        // Mock contract factory
        contractFactoryMock = {
            attach: sinon.stub().returns(degreeContractMock),
        };

        // Stub ethers.getContractFactory
        sinon.stub(hre.ethers, "getContractFactory").returns(contractFactoryMock);
    });

    afterEach(() => {
        // Restore all mocks
        sinon.restore();
    });

    it("should issue a certificate", async () => {
        degreeContractMock.issueCertificate.resolves({ wait: () => Promise.resolve() });

        const args = [
            "node", "interact.js", "issue",
            "John Doe", "Bachelor of Science", "2023", "Blockchain University"
        ];
        process.argv = args;

        const script = require("../scripts/interact.js");
        await script.main();

        expect(degreeContractMock.issueCertificate.calledOnce).to.be.true;
        expect(degreeContractMock.issueCertificate.calledWith(
            "John Doe", "Bachelor of Science", 2023, "Blockchain University"
        )).to.be.true;
    });

    it("should verify a certificate", async () => {
        degreeContractMock.verifyCertificate.resolves(true);

        const args = [
            "node", "interact.js", "verify",
            "John Doe", "Bachelor of Science", "2023", "Blockchain University"
        ];
        process.argv = args;

        const script = require("../scripts/interact.js");
        await script.main();

        expect(degreeContractMock.verifyCertificate.calledOnce).to.be.true;
        expect(degreeContractMock.verifyCertificate.calledWith(sinon.match.string)).to.be.true;
    });

    it("should verify certificate details", async () => {
        degreeContractMock.verifyCertificateDetails.resolves(true);

        const args = [
            "node", "interact.js", "details",
            "John Doe", "Bachelor of Science", "2023", "Blockchain University"
        ];
        process.argv = args;

        const script = require("../scripts/interact.js");
        await script.main();

        expect(degreeContractMock.verifyCertificateDetails.calledOnce).to.be.true;
        expect(degreeContractMock.verifyCertificateDetails.calledWith(
            "John Doe", "Bachelor of Science", 2023, "Blockchain University"
        )).to.be.true;
    });

    it("should handle invalid action", async () => {
        const args = [
            "node", "interact.js", "invalid",
            "John Doe", "Bachelor of Science", "2023", "Blockchain University"
        ];
        process.argv = args;

        const consoleStub = sinon.stub(console, "log");
        const script = require("../scripts/interact.js");
        await script.main();

        expect(consoleStub.calledOnceWith("Invalid action. Use 'issue', 'verify', or 'details'.")).to.be.true;

        consoleStub.restore();
    });
});
