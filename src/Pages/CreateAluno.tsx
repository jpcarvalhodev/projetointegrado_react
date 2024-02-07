import { FormEvent, useState } from 'react';
import { AuthContextProvider } from '../Context/AuthContext';
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

interface ApiResponse {
  status: boolean;
  data: any;
}

function CreateAluno() {
    const [id, setId] = useState('');
    const [nif, setNif] = useState('');
    const [nome, setNome] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [cod_aluno, setCodAluno] = useState('');
    const [curso_id, setCursoId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleProductFormSubmit(event: FormEvent) {
      event.preventDefault();

      const data: Aluno = {
        id,
        nif,
        nome,
        data_nascimento,
        email,
        cod_aluno,
        curso_id,
        password
      };
    
      console.log('Data to be sent:', data);
    
      try {
        const response = await fetch('http://localhost:8000/api/Alunos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setId('');
        setNif('');
        setNome('');
        setDataNascimento('');
        setEmail('');
        setCodAluno('');
        setCursoId('');
        setPassword('');
    
        const responseJson: ApiResponse = await response.json();
        console.log('Response from the API:', responseJson);
        if (window.confirm('Sucesso! Redirecionando para a página principal...')) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error processing JSON response:', error);
      }
    }

    
    return (
      <AuthContextProvider>
      <div>
        <NavbarAluno />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="mt-5">Novo Aluno</h1>
        <form onSubmit={handleProductFormSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">NIF</label>
            <input type="text" className="form-control" id="nif" value={nif} onChange={(e) => setNif(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Data de Nascimento</label>
            <input type="text" className="form-control" id="data_nascimento" value={data_nascimento} onChange={(e) => setDataNascimento(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Email</label>
            <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="img_url" className="form-label">Código do Aluno</label>
            <input type="text" className="form-control" id="cod_aluno" value={cod_aluno} onChange={(e) => setCodAluno(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="img_url" className="form-label">ID do Curso</label>
            <input type="text" className="form-control" id="curso_id" value={curso_id} onChange={(e) => setCursoId(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="img_url" className="form-label">Senha</label>
            <input type="text" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Criar</button>
        </form>
        </div>
      </div>
      </AuthContextProvider>
    );
}

export default CreateAluno;