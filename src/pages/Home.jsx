import React, { useEffect, useState } from 'react';
import background from '../assets/background.png';
import '../css/body-section1.css';
import { Link } from 'react-router-dom';
import { getContract } from '../blockchain'; // Import fungsi blockchain

const Home = () => {
  const [years, setYears] = useState([]);
  const [form, setForm] = useState({
    name: "",
    year: "",
    degree: "",
    issuer: "",
  });

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = 2000; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ambil kontrak
    const contract = await getContract();
    if (!contract) return;

    try {
      // Panggil fungsi issueCertificate
      const tx = await contract.issueCertificate(
        form.name,
        form.degree,
        parseInt(form.year),
        form.issuer
      );
      await tx.wait(); // Tunggu transaksi selesai
      alert("Certificate issued successfully!");
    } catch (error) {
      console.error("Error issuing certificate:", error);
      alert("Failed to issue certificate.");
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
            <p>make</p>
          </Link>

          <Link to="/verify" style={{ textDecoration: 'none' }}>
            <p>verified</p>
          </Link>
        </div>

        <h1>Make a Certificate</h1>

        <form className="boxform" onSubmit={handleSubmit}>
          <div className="form1">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" value={form.name} onChange={handleChange} />
          </div>

          <div className="form1">
            <label htmlFor="year">Year Passed</label>
            <select id="year" value={form.year} onChange={handleChange}>
              <option value="">Select year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="form1">
            <label htmlFor="degree">Degree</label>
            <input type="text" id="degree" placeholder="Enter your degree" value={form.degree} onChange={handleChange} />
          </div>

          <div className="form1">
            <label htmlFor="issuer">Issuer</label>
            <input type="text" id="issuer" placeholder="Enter issuer" value={form.issuer} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-save">Save</button>
        </form>
      </div>
    </body>
  );
};

export default Home;
