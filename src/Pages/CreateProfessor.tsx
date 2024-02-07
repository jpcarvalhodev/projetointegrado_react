import { FormEvent, useState } from 'react';
import { AuthContextProvider } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarProfessor from '../Components/NavbarProfessor';
import { useNavigate } from 'react-router-dom';

interface Professor {
    id: string;
    nome: string;
}

interface ApiResponse {
  status: boolean;
  data: any;
}

function CreateProfessor() {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    async function handleProductFormSubmit(event: FormEvent) {
      event.preventDefault();

      const data: Professor = {
        id,
        nome,
      };
    
      console.log('Data to be sent:', data);
    
      try {
        const response = await fetch('http://localhost:8000/api/Professores', {
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

        setId('');
        setNome('');
    
        const responseJson: ApiResponse = await response.json();
        console.log('Response from the API:', responseJson);
        if (window.confirm('Sucesso! Redirecionando para a página principal...')) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error processing JSON response:', error);
      }
    }

    
    return (
      <AuthContextProvider>
      <div>
        <NavbarProfessor />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Novo Professor</h1>
        <form onSubmit={handleProductFormSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Criar</button>
        </form>
        </div>
      </div>
      </AuthContextProvider>
    );
}

export default CreateProfessor;