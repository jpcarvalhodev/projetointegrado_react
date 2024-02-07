import { FormEvent, useState } from 'react';
import { AuthContextProvider } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarUC from '../Components/NavbarUC';
import { useNavigate } from 'react-router-dom';

interface UC {
    id: string;
    nome_uc: string;
    descricao: string;
    ects: number;
}

interface ApiResponse {
  status: boolean;
  data: any;
}

function CreateUC() {
    const [id, setId] = useState('');
    const [nome_uc, setNome_uc] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ects, setEcts] = useState(0);
    const navigate = useNavigate();

    async function handleProductFormSubmit(event: FormEvent) {
      event.preventDefault();

      const data: UC = {
        id,
        nome_uc,
        descricao,
        ects,
      };
    
      console.log('Data to be sent:', data);
    
      try {
        const response = await fetch('http://localhost:8000/api/UCs', {
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
        setNome_uc('');
        setDescricao('');
        setEcts(0);
    
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
        <NavbarUC />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Criar Nova Unidade Curricular</h1>
        <form onSubmit={handleProductFormSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Nome da Unidade Curricular</label>
            <input type="text" className="form-control" id="nome_uc" value={nome_uc} onChange={(e) => setNome_uc(e.target.value)} />
          </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Descrição</label>
            <input type="text" className="form-control" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">ECTS</label>
            <input type="number" className="form-control" id="ects" value={ects} onChange={(e) => setEcts(Number(e.target.value))} />
          </div>
          <button type="submit" className="btn btn-primary">Criar</button>
        </form>
        </div>
      </div>
      </AuthContextProvider>
    );
}

export default CreateUC;