import { useState, useEffect } from 'react';
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

function UpdateCurso() {
  const [curso, setCurso] = useState<Curso[]>([]);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);
  const [codigo, setCodigo] = useState('');
  const [nome_curso, setNome_curso] = useState('');
  const [descricao, setDescricao] = useState('');
  const [acronimo, setAcronimo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCurso() {
      try {
        const response = await fetch('http://localhost:8000/api/Cursos', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setCurso(data);
        } else {
          console.error('API response does not contain an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    }

    fetchCurso();
  }, []);

  async function handleUpdate(id: string) {
    try {
      await fetch(`http://localhost:8000/api/Cursos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          codigo,
          nome_curso,
          descricao,
          acronimo,                     
        }),
      });

      setCurso(curso.map(curso => curso.id === id ? { ...curso, codigo, nome_curso, descricao, acronimo } : curso));
      setSelectedCurso(null)
      if (window.confirm('Sucesso! Redirecionando para a página principal...')) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating curso:', error);
    }
  }

  function handleSelectCurso(curso: Curso) {
    setSelectedCurso(curso);
    setCodigo(curso.codigo);
    setNome_curso(curso.nome_curso);
    setDescricao(curso.descricao);
    setAcronimo(curso.acronimo);
  }

  return (
    <div>
      <NavbarCurso />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="mt-5">Atualizar Dados do Curso</h1>
      <div className="row">
        {curso.map(curso => (
          <div className="col-sm-4 mb-4" key={curso.id}>
            <div className="card">
              <div className="card-body">
              <h5 className="card-title">{curso.nome_curso}</h5>
                <button className="btn btn-primary" onClick={() => handleSelectCurso(curso)}>Atualizar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedCurso && (
        <div className="mt-5">
          <h2>Atualizar {selectedCurso.nome_curso}</h2>
          <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Codigo" />
          <input type="text" value={nome_curso} onChange={e => setNome_curso(e.target.value)} placeholder="NomeCurso" />
          <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descricao" />
          <input type="text" value={acronimo} onChange={e => setAcronimo(e.target.value)} placeholder="Acronimo" />
          <button className="btn btn-success" onClick={() => handleUpdate(selectedCurso.id)}>Atualizar</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default UpdateCurso;
