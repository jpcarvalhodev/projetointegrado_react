import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarCurso from '../Components/NavbarCurso';

interface Curso {
  id: string;
  codigo: string;
  nome_curso: string;
  descricao: string;
  acronimo: string;
}

function ListCurso() {
  const [countItems, setCountItems] = useState<Curso[]>([]);

  useEffect(() => {
    async function fetchCount() {
        try {
            const response = await fetch('http://localhost:8000/api/Cursos');
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
      <NavbarCurso />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Todos os Cursos Cadastrados (Total: {countItems.length})</h1>
        <div>
          {countItems.map((Curso) => (
            <div key={Curso.id} className="card mt-3">
              <div className="card-body">
                <h3 className="card-title">{Curso.nome_curso}</h3>
                <p className="card-text">{Curso.codigo}</p>
                <p className="card-text">{Curso.descricao}</p>
                <p className="card-text">{Curso.acronimo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListCurso;