import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from "../Context/AuthContext";
import Navbar from "../Components/Navbar";

function Logout() {

    const navigate = useNavigate();
    const [user, setUser] = useState<{ email: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('aluno');
      
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('aluno');
        navigate('/');
    };

    return (
        <AuthContextProvider>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <h1 className="mt-5">Logout</h1>
                    <p>Deseja fazer o logout?</p>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </AuthContextProvider>
    );
}

export default Logout;