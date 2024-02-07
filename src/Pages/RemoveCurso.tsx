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

function RemoveCurso() {
  const [curso, setCurso] = useState<Curso[]>([]);
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

  async function handleRemove(id: string) {

    if (!window.confirm('Tem certeza que deseja apagar esse curso?')) {
      return;
    }

    try {
      await fetch(`http://localhost:8000/api/Cursos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setCurso(curso.filter(curso => curso.id !== id));
      navigate('/');
    } catch (error) {
      console.error('Error removing curso:', error);
    }
  }

  return (
    <div>
      <NavbarCurso />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="mt-5">Apagar Curso</h1>
      <div className="row">
        {curso.map(curso => (
          <div className="col-sm-4 mb-4" key={curso.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{curso.nome_curso}</h5>
                <button className="btn btn-danger" onClick={() => handleRemove(curso.id)}>Apagar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default RemoveCurso;