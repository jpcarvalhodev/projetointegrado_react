import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarProfessor from '../Components/NavbarProfessor';

interface Professor {
  id: string;
  nome: string;
}

function ListProfessor() {
  const [countItems, setCountItems] = useState<Professor[]>([]);

  useEffect(() => {
    async function fetchCount() {
        try {
            const response = await fetch('http://localhost:8000/api/Professores');
            const data = await response.json();
            setCountItems(data);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    }

    fetchCount();
 }, []);

  return (
    <div>
      <NavbarProfessor />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Todos os Professores Cadastrados (Total: {countItems.length})</h1>
        <div>
          {countItems.map((Professor) => (
            <div key={Professor.id} className="card mt-3">
              <div className="card-body">
                <h3 className="card-title">{Professor.nome}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListProfessor;