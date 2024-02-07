import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarAluno from '../Components/NavbarAluno';

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

function ListAluno() {
  const [countItems, setCountItems] = useState<Aluno[]>([]);

  useEffect(() => {
    async function fetchCount() {
        try {
            const response = await fetch('http://localhost:8000/api/Alunos');
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
      <NavbarAluno />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Todos os Alunos Cadastrados (Total: {countItems.length})</h1>
        <div>
          {countItems.map((Aluno) => (
            <div key={Aluno.id} className="card mt-3">
              <div className="card-body">
                <h3 className="card-title">{Aluno.nome}</h3>
                <p className="card-text">{Aluno.nif}</p>
                <p className="card-text">{Aluno.data_nascimento}</p>
                <p className="card-text">{Aluno.email}</p>
                <p className="card-text">{Aluno.cod_aluno}</p>
                <p className="card-text">{Aluno.curso_id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListAluno;