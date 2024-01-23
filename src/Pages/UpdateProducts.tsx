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

interface CategoryProducts {
  id: string;
  name: string;
};

function UpdateProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image_url, setImage_Url] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [category, setCategory] = useState<CategoryProducts[]>([]);

  useEffect(() => {
    async function Category() {
        try {
            const response = await fetch('http://localhost:3333/categories', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setCategory(data);
            } else {
                console.error('API response does not contain an array:', data);
            }
        } catch (error) {
            console.error('Error fetching data from the API:', error);
        }
    }

    Category();
}, []);

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

  async function handleUpdate(id: string) {
    try {
      await fetch(`http://localhost:3333/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          title,
          description,
          price,
          image_url,
          category_id,
        }),
      });

      setProducts(products.map(product => product.id === id ? { ...product, title, description, price, image_url, category_id } : product));
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  function handleSelectProduct(product: Product) {
    setSelectedProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setImage_Url(product.image_url);
    setCategory_id(product.category_id);
  }

  return (
    <div className="container mt-5">
      <h1>Atualizar Produto</h1>
      <div className="row">
        {products.map(product => (
          <div className="col-sm-4 mb-4" key={product.id}>
            <div className="card">
              <img src={product.image_url} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">R$ {product.price}</p>
                <p className="card-text">{product.category_id}</p>
                <button className="btn btn-primary" onClick={() => handleSelectProduct(product)}>Atualizar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="mt-5">
          <h2>Atualizar {selectedProduct.title}</h2>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Price" />
          <input type="text" value={image_url} onChange={e => setImage_Url(e.target.value)} placeholder="Image URL" />
          <select className="form-control" id="categoryId" value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
            <option value="" disabled>Selecione uma categoria</option>
            {category.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          </select>
          <button className="btn btn-success" onClick={() => handleUpdate(selectedProduct.id)}>Atualizar</button>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;