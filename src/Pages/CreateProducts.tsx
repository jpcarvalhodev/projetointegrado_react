import { FormEvent, useEffect, useState } from 'react';
import { AuthContextProvider } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
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

interface ApiResponse {
  status: boolean;
  data: any;
}

function CreateProduct() {
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

    async function handleProductFormSubmit(event: FormEvent) {
      event.preventDefault();

      const data: Product = {
        title,
        description,
        price,
        image_url,
        category_id,
      };
    
      console.log('Data to be sent:', data);
    
      try {
        const response = await fetch('http://localhost:3333/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setTitle('');
        setDescription('');
        setPrice(0);
        setImage_Url('');
    
        const responseJson: ApiResponse = await response.json();
        console.log('Response from the API:', responseJson);
      } catch (error) {
        console.error('Error processing JSON response:', error);
      }
    }

    
    return (
      <AuthContextProvider>
      <div className="container">
        <h1 className="mt-5">Criar Produto</h1>
        <form onSubmit={handleProductFormSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descrição</label>
            <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Preço</label>
            <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <div className="mb-3">
            <label htmlFor="img_url" className="form-label">URL da Imagem</label>
            <input type="text" className="form-control" id="img_url" value={image_url} onChange={(e) => setImage_Url(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Category</label>
            <select className="form-control" id="categoryId" value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
            <option value="" disabled>Selecione uma categoria</option>
            {category.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          </select>
          </div>
          <button type="submit" className="btn btn-primary">Criar</button>
        </form>
      </div>
      </AuthContextProvider>
    );
}

export default CreateProduct;