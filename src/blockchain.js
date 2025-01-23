import { ethers } from 'ethers';

// Alamat kontrak pintar
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Ganti dengan alamat kontrak Anda
// ABI dari kontrak pintar
const CONTRACT_ABI = [
    {
      "inputs": [
        { "internalType": "string", "name": "_studentName", "type": "string" },
        { "internalType": "string", "name": "_degree", "type": "string" },
        { "internalType": "uint256", "name": "_yearOfPassing", "type": "uint256" },
        { "internalType": "string", "name": "_issuer", "type": "string" }
      ],
      "name": "issueCertificate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "bytes32", "name": "_hash", "type": "bytes32" }
      ],
      "name": "verifyCertificate",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "_studentName", "type": "string" },
        { "internalType": "string", "name": "_degree", "type": "string" },
        { "internalType": "uint256", "name": "_yearOfPassing", "type": "uint256" },
        { "internalType": "string", "name": "_issuer", "type": "string" }
      ],
      "name": "verifyCertificateDetails",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  // Fungsi untuk membuat koneksi ke node lokal
  export const getContract = async () => {
    // Hubungkan ke node lokal
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  
    // Dapatkan wallet dari private key (pastikan key ini dari node lokal Anda)
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Masukkan private key dari akun lokal
    const wallet = new ethers.Wallet(privateKey, provider);
  
    // Buat instance kontrak pintar
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
  
    return contract;
  };

  