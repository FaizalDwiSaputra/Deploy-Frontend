"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

import { useEffect, useState } from "react";

export default function Home() {
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
    <div className=''>
      {data ? (
        <div className=''>
          <div className='main-konten konten-1'>
            <div className='deskripsi-konten d-flex justify-content-center align-items-center'>
              <div className='judul text-center'>
                <h4 className='nama'>{data.name}</h4>
                <h1>BEST RESTAURANT</h1>
                <Link href="/profile" className='text-decoration-none more my-2'>
                 Selengkapnya
                </Link>
              </div>  
            </div>
          </div>
        </div>
        
      ) : (
        <p>Data tidak ditemukan</p>
      )}
    </div>
  );
}

