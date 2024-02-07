import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarProfessor from '../Components/NavbarProfessor';
import { useNavigate } from 'react-router-dom';

interface Professor {
  id: string;
  nome: string;
}

function RemoveProfessor() {
  const [professor, setProfessor] = useState<Professor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfessor() {
      try {
        const response = await fetch('http://localhost:8000/api/Professores', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setProfessor(data);
        } else {
          console.error('API response does not contain an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    }

    fetchProfessor();
  }, []);

  async function handleRemove(id: string) {

    if (!window.confirm('Tem certeza que deseja apagar esse professor?')) {
      return;
    }

    try {
      await fetch(`http://localhost:8000/api/Professores/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setProfessor(professor.filter(professor => professor.id !== id));
      navigate('/')
    } catch (error) {
      console.error('Error removing professor:', error);
    }
  }

  return (
    <div>
      <NavbarProfessor />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="mt-5">Apagar Professor</h1>
      <div className="row">
        {professor.map(professor => (
          <div className="col-sm-4 mb-4" key={professor.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{professor.nome}</h5>
                <button className="btn btn-danger" onClick={() => handleRemove(professor.id)}>Apagar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default RemoveProfessor;