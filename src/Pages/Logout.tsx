import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextProvider } from "../Context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Logout() {

    const navigate = useNavigate();
    const [user, setUser] = useState<{ email: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
      
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <AuthContextProvider>
            <div className="container">
                <h1 className="mt-5">Logout</h1>
                <p>Deseja fazer o logout?</p>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </AuthContextProvider>
    );
}

export default Logout;