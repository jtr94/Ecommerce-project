import axios from 'axios'
import {React, useState, useEffect} from 'react'
import './HomePage.css'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid'

export const HomePage = ({cart}) => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await axios("http://localhost:3000/api/products");
      setProducts(response.data);
    };
    fetchProductsData();
  }, []); 
  return (
    <>
      <Header cart={cart}/>
      <div className="home-page">
        <ProductsGrid products= {products} />
      </div>
    </>
  );
}