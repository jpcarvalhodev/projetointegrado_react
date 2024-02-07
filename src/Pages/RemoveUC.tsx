import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarUC from '../Components/NavbarUC';
import { useNavigate } from 'react-router-dom';

interface UC {
    id: string;
    nome_uc: string;
    descricao: string;
    ects: number;
}

function RemoveUC() {
  const [uc, setUC] = useState<UC[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUC() {
      try {
        const response = await fetch('http://localhost:8000/api/UCs', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          setUC(data);
        } else {
          console.error('API response does not contain an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    }

    fetchUC();
  }, []);

  async function handleRemove(id: string) {

    if (!window.confirm('Tem certeza que deseja apagar essa Unidade Curricular?')) {
      return;
    }

    try {
      await fetch(`http://localhost:8000/api/UCs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      });

      setUC(uc.filter(uc => uc.id !== id));
      navigate('/')
    } catch (error) {
      console.error('Error removing curso:', error);
    }
  }

  return (
    <div>
      <NavbarUC />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="mt-5">Apagar Unidade Curricular</h1>
      <div className="row">
        {uc.map(uc => (
          <div className="col-sm-4 mb-4" key={uc.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{uc.nome_uc}</h5>
                <button className="btn btn-danger" onClick={() => handleRemove(uc.id)}>Apagar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default RemoveUC;