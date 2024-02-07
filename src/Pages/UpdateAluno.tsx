import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarAluno from '../Components/NavbarAluno';
import { useNavigate } from 'react-router-dom';

interface Aluno {
  id: string;
  nif: string;
  nome: string;
  data_nascimento: string;
  email: string;
  cod_aluno: string;
  curso_id: string;
  password: string;
}

function UpdateAluno() {
  const [aluno, setAluno] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [nif, setNif] = useState('');
  const [nome, setNome] = useState('');
  const [data_nascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [cod_aluno, setCodAluno] = useState('');
  const [curso_id, setCursoId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAluno() {
      try {
        const response = await fetch('http://localhost:8000/api/Alunos', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setAluno(data);
        } else {
          console.error('API response does not contain an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    }

    fetchAluno();
  }, []);

  async function handleUpdate(id: string) {
    try {
      await fetch(`http://localhost:8000/api/Alunos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          nif,
          nome,
          email
        }),
      });

      setAluno(aluno.map(aluno => aluno.id === id ? { ...aluno, nif, nome, email } : aluno));
      setSelectedAluno(null)
      if (window.confirm('Sucesso! Redirecionando para a página principal...')) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating aluno:', error);
    }
  }

  function handleSelectAluno(aluno: Aluno) {
    setSelectedAluno(aluno);
    setNif(aluno.nif);
    setNome(aluno.nome);
    setEmail(aluno.email);
  }

  return (
    <div>
      <NavbarAluno />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="mt-5">Atualizar Dados do Aluno</h1>
      <div className="row">
        {aluno.map(aluno => (
          <div className="col-sm-4 mb-4" key={aluno.id}>
            <div className="card">
              <div className="card-body">
              <h5 className="card-title">{aluno.nome}</h5>
                <button className="btn btn-primary" onClick={() => handleSelectAluno(aluno)}>Atualizar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedAluno && (
        <div className="mt-5">
          <h2>Atualizar {selectedAluno.nome}</h2>
          <input type="text" value={nif} onChange={e => setNif(e.target.value)} placeholder="Nif" />
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <button className="btn btn-success" onClick={() => handleUpdate(selectedAluno.id)}>Atualizar</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default UpdateAluno;