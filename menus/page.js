"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [opening, setOpening] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, openingResponse] = await Promise.all([
          axios.get("https://backend-deploy-production-155f.up.railway.app/api/menus/"),
          axios.get("https://backend-deploy-production-155f.up.railway.app/api/opening-hour/"),
        ]);

        setProducts(productsResponse.data);
        setOpening(openingResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="nama text-center mb-4">Menu Kami</h1>
      <div className="row">
        {products.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              {item.image && (
                <img 
                  src={item.image} 
                  className="card-img-top" 
                  alt={item.name} 
                />
              )}
              <div className="card-body">
                <h5 className="nama text-secondary card-title">{item.name}</h5>
                <p className='harga'>Rp. {item.price} ribu rupiah</p>
                <p className='text-muted'>{item.description.substring(0, 100)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1 className='nama text-center'>Jam Buka</h1>
      <div className='row  rounded-2 text-dark '>
        {opening.map((item1) => (
          <div key={item1.id} className='col-3'>
            <div className='jambuka my-3 shadow-sm p-3'>
              <h4 className='nama'>{item1.day}</h4>
              <p className='text-muted'>{item1.opening_time} - {item1.closing_time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
