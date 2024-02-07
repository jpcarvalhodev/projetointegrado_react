import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarAvaliacao from '../Components/NavbarAvaliacao';

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


function ListAvaliacao() {
  const [countItems, setCountItems] = useState<Avaliacao[]>([]);

  useEffect(() => {
    async function fetchCount() {
        try {
            const response = await fetch('http://localhost:8000/api/Avaliacoes');
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
      <NavbarAvaliacao />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Todas as Avaliações Cadastradas (Total: {countItems.length})</h1>
        <div>
          {countItems.map((Avaliacao) => (
            <div key={Avaliacao.id} className="card mt-3">
              <div className="card-body">
                <p className="card-text">{Avaliacao.data_avaliacao}</p>
                <p className="card-text">{Avaliacao.comentario}</p>
                <p className="card-text">{Avaliacao.nota}</p>
                <p className="card-text">{Avaliacao.aluno_id}</p>
                <p className="card-text">{Avaliacao.professor_id}</p>
                <p className="card-text">{Avaliacao.curso_id}</p>
                <p className="card-text">{Avaliacao.uc_id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListAvaliacao;