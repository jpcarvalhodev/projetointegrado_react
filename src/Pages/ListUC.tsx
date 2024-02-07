import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarUC from '../Components/NavbarUC';

interface UC {
    id: string;
    nome_uc: string;
    descricao: string;
    ects: number;
}

function ListUC() {
  const [countItems, setCountItems] = useState<UC[]>([]);

  useEffect(() => {
    async function fetchCount() {
        try {
            const response = await fetch('http://localhost:8000/api/UCs');
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
      <NavbarUC />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Todas as Unidades Curriculares Cadastradas (Total: {countItems.length})</h1>
        <div>
          {countItems.map((UC) => (
            <div key={UC.id} className="card mt-3">
              <div className="card-body">
                <h3 className="card-title">{UC.nome_uc}</h3>
                <p className="card-text">{UC.descricao}</p>
                <p className="card-text">ECTS: {UC.ects}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListUC;