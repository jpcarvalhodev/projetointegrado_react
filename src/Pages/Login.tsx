import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from '../Context/AuthContext';
import Navbar from '../Components/Navbar';

type Aluno = {
    email: string;
    password: number;
};

interface Error {
    [key: string]: string[];
}

const Login = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Error>({});

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');  

    const handleLoginFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const aluno = {
          email,
          password,
        };
    
        try {
          const response = await fetch('http://localhost:8000/api/Alunos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(aluno),
          });
    
          if (response.status === 401) {
            setMessage('Email ou senha incorretos. Por favor, tente novamente.');
          } else if (!response.ok) {
            console.error('Error:', response.status, response.statusText);
          } else {
            const data = await response.json();
    
            localStorage.setItem('token', data.token);
    
            localStorage.setItem('aluno', JSON.stringify({ name: data.name, email: data.email }));
    
            toast.success('Usuário logado com sucesso!');
            navigate('/');
    
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Email ou senha incorretos. Por favor, tente novamente.');
        }
      };

      return (
        <AuthContextProvider>
        <div>
          <Navbar />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 className="mt-5">Login</h1>
            <form className="form" onSubmit={handleLoginFormSubmit}>
                <div className="mb-3">
                    <label htmlFor='email' className="form-label">Email:</label>
                    <input className="form-control" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <div className="alert alert-danger">{errors.email[0]}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Senha:</label>
                    <input className="form-control" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <div className="alert alert-danger">{errors.password[0]}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
          </div>
        </div>
        </AuthContextProvider>
    );
};

export default Login;