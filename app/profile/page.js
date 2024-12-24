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
           <div className='d-flex justify-content-between align-items-center'>
            <img src='chef.jpg' className='chef' width={450}></img>
            <div className='deskripsi-profile text-start w-50'>
                <h1 className='nama'>Tentang Restoran</h1>
                <p className='text-muted my-2'>{data.about_us.substring(0,400)}</p>
                <p>📍<i>{data.address}</i></p>
                <div className='sosmed d-flex flex-column my-2'>
                    <a href=''>- {data.facebook}</a>
                    <a href='' className='py-1'>- {data.instagram}</a>
                    <a href=''>- {data.twitter}</a>
                </div>
                <a href='' className='text-text-decoration-none btn btn-warning'>Selengkapnya</a>
            </div>
           </div>
          </div>
        ) : (
          <p>Data tidak ditemukan</p>
        )}
      </div>
    );
  }
  