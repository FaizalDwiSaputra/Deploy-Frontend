"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

export default function Menu() {
  const [faqs, setMenufaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('backend-deploy-production-155f.up.railway.app/api/faq/');
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const data = await response.json();
        setMenufaqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <p className="text-center py-5">Loading menu...</p>;
  }

  if (error) {
    return <p className="text-center text-danger py-5">Error: {error}</p>;
  }

  return (
    <div className="container py-5">
      <h1 className="nama text-center mb-4">Pertanyaan</h1>
      <div className="row">
        {faqs.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="nama card-title">{item.question}</h5>
                <p className="text-secondary card-title">Jawab : {item.question}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}