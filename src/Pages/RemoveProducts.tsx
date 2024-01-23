import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
}

function RemoveProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3333/products', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API response does not contain an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    }

    fetchProducts();
  }, []);

  async function handleRemove(id: string) {
    try {
      await fetch(`http://localhost:3333/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  }

  return (
    <div className="container mt-5">
      <h1>Remover Produto</h1>
      <div className="row">
        {products.map(product => (
          <div className="col-sm-4 mb-4" key={product.id}>
            <div className="card">
              <img src={product.image_url} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-danger" onClick={() => handleRemove(product.id)}>Remover</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RemoveProduct;