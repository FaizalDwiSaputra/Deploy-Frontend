'use client';
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function Navbar() {
    const [data, setData] = useState(null); // Untuk menyimpan data dari backend
    const [loading, setLoading] = useState(true); // Indikator loading
    const [error, setError] = useState(null); // Untuk menangkap error
  
    useEffect(() => {
      fetch("http://localhost:8000/api/profile/") // URL endpoint Django
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            setData(data[0]); // Ambil elemen pertama dari array
          } else {
            throw new Error("Data tidak tersedia");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light z-2">
      <div className="container">
        <Link className="navbar-brand" href="/">
            <img src={data.logo} alt="Logo Restoran" className='logo' />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/menus">
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/faqs">
                FaQs
              </Link>
            </li>
            <li className="nav-item mx-2 d-flex align-items-center">
              <Link className="login" href="">
                Login
              </Link>
            </li>
            <li className="nav-item  d-flex align-items-center">
              <Link className="register" href="">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
