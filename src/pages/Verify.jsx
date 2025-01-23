import React, { useState } from 'react';
import background from '../assets/background.png';
import '../css/body-section1.css';
import { Link } from 'react-router-dom';
import { getContract } from '../blockchain'; // Import fungsi blockchain

const Verify = () => {
  const [form, setForm] = useState({
    name: "",
    year: "",
    degree: "",
    issuer: "",
  });

  
  const [verificationResult, setVerificationResult] = useState(null);

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    // Ambil kontrak
    const contract = await getContract();
    if (!contract) return;

    try {
      // Panggil fungsi verifyCertificateDetails
      const isValid = await contract.verifyCertificateDetails(
        form.name,
        form.degree,
        parseInt(form.year),
        form.issuer
      );
      setVerificationResult(isValid);
      alert(isValid ? "Certificate is valid!" : "Certificate is invalid.");
    } catch (error) {
      console.error("Error verifying certificate:", error);
      alert("Failed to verify certificate.");
    }
  };

  return (
    <body>
      <div className="section1">
        <img className="backgroundimg" src={background} alt="background" />
      </div>

      <div className="section2">
        <div className="navigation">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p>home</p>
          </Link>

          <Link to="/verify" style={{ textDecoration: 'none' }}>
            <p>verify</p>
          </Link>
        </div>

        <h1>Verify a Certificate</h1>

        <form className="boxform" onSubmit={handleVerify}>
          <div className="form1">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter the name" value={form.name} onChange={handleChange} />
          </div>

          <div className="form1">
            <label htmlFor="year">Year Passed</label>
            <input type="text" id="year" placeholder="Enter the year" value={form.year} onChange={handleChange} />
          </div>

          <div className="form1">
            <label htmlFor="degree">Degree</label>
            <input type="text" id="degree" placeholder="Enter the degree" value={form.degree} onChange={handleChange} />
          </div>

          <div className="form1">
            <label htmlFor="issuer">Issuer</label>
            <input type="text" id="issuer" placeholder="Enter issuer" value={form.issuer} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-save">Verify</button>
        </form>

        {verificationResult !== null && (
          <div className="verification-result">
            <p>{verificationResult ? "The certificate is valid." : "The certificate is invalid."}</p>
          </div>
        )}
      </div>
    </body>
  );
};

export default Verify;
