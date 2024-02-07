import { FormEvent, useState } from 'react';
import { AuthContextProvider } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarAvaliacao from '../Components/NavbarAvaliacao';
import { useNavigate } from 'react-router-dom';

interface Avaliacao {
    id: string;
    data_avaliacao: string;
    comentario: string;
    nota: number;
    aluno_id: number;
    professor_id: string;
    curso_id: string;
    uc_id: string;
}

interface ApiResponse {
  status: boolean;
  data: any;
}

function CreateAvaliacao() {
    const [id, setId] = useState('');
    const [data_avaliacao, setDataAvaliacao] = useState('');
    const [comentario, setComentario] = useState('');
    const [nota, setNota] = useState(0);
    const [aluno_id, setAlunoId] = useState(0);
    const [professor_id, setProfessorId] = useState('');
    const [curso_id, setCursoId] = useState('');
    const [uc_id, setUcId] = useState('');
    const navigate = useNavigate();

    async function handleProductFormSubmit(event: FormEvent) {
      event.preventDefault();

      const data: Avaliacao = {
        id,
        data_avaliacao,
        comentario,
        nota,
        aluno_id,
        professor_id,
        curso_id,
        uc_id,
      };
    
      console.log('Data to be sent:', data);
    
      try {
        const response = await fetch('http://localhost:8000/api/Avaliacoes', {
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
        setDataAvaliacao('');
        setComentario('');
        setNota(0);
        setAlunoId(0);
        setProfessorId('');
        setCursoId('');
        setUcId('');
    
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
      <NavbarAvaliacao />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Criar Nova Avaliação</h1>
        <form onSubmit={handleProductFormSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Data de Avaliação</label>
            <input type="text" className="form-control" id="data_avaliacao" value={data_avaliacao} onChange={(e) => setDataAvaliacao(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Comentário</label>
            <input type="text" className="form-control" id="comentario" value={comentario} onChange={(e) => setComentario(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Nota</label>
            <input type="number" className="form-control" id="nota" value={nota} onChange={(e) => setNota(Number(e.target.value))} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Aluno ID</label>
            <input type="text" className="form-control" id="aluno_id" value={aluno_id} onChange={(e) => setAlunoId(Number(e.target.value))} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Professor ID</label>
            <input type="text" className="form-control" id="professor_id" value={professor_id} onChange={(e) => setProfessorId(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Curso ID</label>
            <input type="text" className="form-control" id="curso_id" value={curso_id} onChange={(e) => setCursoId(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">UC ID</label>
            <input type="text" className="form-control" id="uc_id" value={uc_id} onChange={(e) => setUcId(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Criar</button>
        </form>
        </div>
      </div>
      </AuthContextProvider>
    );
}

export default CreateAvaliacao;