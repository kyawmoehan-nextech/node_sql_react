import React, { useState, useEffect } from 'react';
import './App.css';
import AddProducts from './Components/AddProduct/AddProduct';
import ProductCard from './Components/ProductCard/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const resp = await fetch('http://localhost:8000/products');
      const result = await resp.json();
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const addProduct = async (e) => {
    try {
      const name = e.target.name.value;
      const price = +e.target.price.value;
      const description = e.target.description.value;
      await fetch(`http://localhost:8000/product/add?name=${name}&price=${price}&description=${description}`);
      e.target.reset();
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProduct = async (id) => {
    try {
      const res = window.confirm('Are you sure?');
      if (res) {
        await fetch(`http://localhost:8000/product/delete?id=${id}`);
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>Products</h1>
      <AddProducts addProduct={addProduct} />
      {products && products.map(product => <ProductCard key={product.id} product={product} deleteProduct={deleteProduct} />)}
    </div>
  );
}

export default App;
