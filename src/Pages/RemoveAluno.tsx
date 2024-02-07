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

function RemoveAluno() {
  const [aluno, setAluno] = useState<Aluno[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAluno() {
      try {
        const response = await fetch('http://localhost:8000/api/Aluno', {
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

  async function handleRemove(id: string) {

    if (!window.confirm('Tem certeza que deseja apagar esse aluno?')) {
      return;
    }

    try {
      await fetch(`http://localhost:8000/api/Aluno/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setAluno(aluno.filter(aluno => aluno.id !== id));
      navigate('/')
    } catch (error) {
      console.error('Error removing aluno:', error);
    }
  }

  return (
    <div>
      <NavbarAluno />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="mt-5">Apagar Aluno</h1>
      <div className="row">
        {aluno.map(aluno => (
          <div className="col-sm-4 mb-4" key={aluno.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{aluno.nome}</h5>
                <p className="card-text">{aluno.nif}</p>
                <p className="card-text">{aluno.email}</p>
                <button className="btn btn-danger" onClick={() => handleRemove(aluno.id)}>Apagar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default RemoveAluno;