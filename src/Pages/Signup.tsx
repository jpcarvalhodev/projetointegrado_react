import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

type User = {
    id: string;
    name: string;
    email: string;
    password: number;
};

interface Error {
    [key: string]: string[];
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Error>({});

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');  

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const user = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:3333/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            const data = await response.json();
    
            if (data.status === false) {
                setMessage(data.message);
            } else {
                setMessage('Usuário cadastrado com sucesso!');
                navigate('/Login');
            }
        } catch (error) {
            console.error('Erro no fetch:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="mt-5">Criar conta</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='name' className="form-label">Nome:</label>
                    <input className="form-control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor='email' className="form-label">Email:</label>
                    <input className="form-control" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
    );
};

export default Signup;