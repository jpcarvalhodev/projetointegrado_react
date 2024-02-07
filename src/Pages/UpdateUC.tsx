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

function UpdateUC() {
  const [uc, setUC] = useState<UC[]>([]);
  const [selectedUC, setSelectedUC] = useState<UC | null>(null);
  const [nome_uc, setNome_uc] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ects, setEcts] = useState(0);
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

  async function handleUpdate(id: string) {
    try {
      await fetch(`http://localhost:8000/api/UCs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          nome_uc,
          descricao,
          ects,                                           
        }),
      });

      setUC(uc.map(uc => uc.id === id ? { ...uc, nome_uc, descricao, ects } : uc));
      setSelectedUC(null)
      if (window.confirm('Sucesso! Redirecionando para a página principal...')) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating unidade curricular:', error);
    }
  }

  function handleSelectUC(uc: UC) {
    setSelectedUC(uc);
    setNome_uc(uc.nome_uc);
    setDescricao(uc.descricao);
    setEcts(uc.ects);
  }

  return (
    <div>
      <NavbarUC />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="mt-5">Atualizar Dados da Unidade Curricular</h1>
      <div className="row">
        {uc.map(uc => (
          <div className="col-sm-4 mb-4" key={uc.id}>
            <div className="card">
              <div className="card-body">
              <h5 className="card-title">{uc.nome_uc}</h5>
                <button className="btn btn-primary" onClick={() => handleSelectUC(uc)}>Atualizar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedUC && (
        <div className="mt-5">
          <h2>Atualizar {selectedUC.nome_uc}</h2>
          <input type="text" value={nome_uc} onChange={e => setNome_uc(e.target.value)} placeholder="NomeUC" />
          <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descricao" />
          <input type="text" value={ects} onChange={e => setEcts(Number(e.target.value))} placeholder="ECTS" />
          <button className="btn btn-success" onClick={() => handleUpdate(selectedUC.id)}>Atualizar</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default UpdateUC;