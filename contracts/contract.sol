pragma solidity ^0.8.0;

contract Degree {
    struct Certificate {
        string studentName;
        string degree;
        uint256 yearOfPassing;
        string issuer;
        bytes32 hash;
    }

    mapping(bytes32 => Certificate) public certificates;
    
    event CertificateIssued(
        bytes32 indexed hash,
        string studentName,
        string degree,
        uint256 yearOfPassing,
        string issuer
    );

    // Fungsi untuk menerbitkan sertifikat
    function issueCertificate(
        string memory _studentName,
        string memory _degree,
        uint256 _yearOfPassing,
        string memory _issuer
    ) public {
        bytes32 certHash = keccak256(abi.encodePacked(_studentName, _degree, _yearOfPassing, _issuer));
        require(certificates[certHash].hash == bytes32(0), "Certificate already exists");

        certificates[certHash] = Certificate({
            studentName: _studentName,
            degree: _degree,
            yearOfPassing: _yearOfPassing,
            issuer: _issuer,
            hash: certHash
        });

        emit CertificateIssued(certHash, _studentName, _degree, _yearOfPassing, _issuer);
    }

    // Fungsi untuk memverifikasi keberadaan sertifikat
    // function verifyCertificate(bytes32 _hash) public view returns (bool) {
    //     return certificates[_hash].hash != bytes32(0);
    // }

    // Fungsi untuk memverifikasi keaslian detail sertifikat
    function verifyCertificateDetails(
        string memory _studentName,
        string memory _degree,
        uint256 _yearOfPassing,
        string memory _issuer
    ) public view returns (bool) {
        // Hasilkan hash dari detail sertifikat yang diberikan
        bytes32 certHash = keccak256(abi.encodePacked(_studentName, _degree, _yearOfPassing, _issuer));
        
        // Periksa apakah hash ada di mapping
        if (certificates[certHash].hash != bytes32(0)) {
            Certificate memory cert = certificates[certHash];
            // Verifikasi apakah semua detail cocok
            return (
                keccak256(abi.encodePacked(cert.studentName)) == keccak256(abi.encodePacked(_studentName)) &&
                keccak256(abi.encodePacked(cert.degree)) == keccak256(abi.encodePacked(_degree)) &&
                cert.yearOfPassing == _yearOfPassing &&
                keccak256(abi.encodePacked(cert.issuer)) == keccak256(abi.encodePacked(_issuer))
            );
        }
        return false;
    }
}
