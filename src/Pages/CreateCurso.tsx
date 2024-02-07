import { FormEvent, useState } from 'react';
import { AuthContextProvider } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarCurso from '../Components/NavbarCurso';
import { useNavigate } from 'react-router-dom';

interface Curso {
    id: string;
    codigo: string;
    nome_curso: string;
    descricao: string;
    acronimo: string;
}

interface ApiResponse {
  status: boolean;
  data: any;
}

function CreateUC() {
    const [id, setId] = useState('');
    const [codigo, setCodigo] = useState('');
    const [nome_curso, setNome_curso] = useState('');
    const [descricao, setDescricao] = useState('');
    const [acronimo, setAcronimo] = useState('');
    const navigate = useNavigate();

    async function handleProductFormSubmit(event: FormEvent) {
      event.preventDefault();

      const data: Curso = {
        id,
        codigo,
        nome_curso,
        descricao,
        acronimo,
      };
    
      console.log('Data to be sent:', data);
    
      try {
        const response = await fetch('http://localhost:8000/api/Cursos', {
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
        setCodigo('');
        setNome_curso('');
        setDescricao('');
        setAcronimo('');
    
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
      <NavbarCurso />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Criar Novo Curso</h1>
        <form onSubmit={handleProductFormSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Nome do Curso</label>
            <input type="text" className="form-control" id="nome_curso" value={nome_curso} onChange={(e) => setNome_curso(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Código do Curso</label>
            <input type="text" className="form-control" id="codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descrição</label>
            <input type="text" className="form-control" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Acrónimo</label>
            <input type="text" className="form-control" id="acronimo" value={acronimo} onChange={(e) => setAcronimo(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Criar</button>
        </form>
        </div>
      </div>
      </AuthContextProvider>
    );
}

export default CreateUC;