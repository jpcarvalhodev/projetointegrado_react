import { ReactNode, createContext, useState } from "react";

type AuthContextProviderProps = {
    children: ReactNode;
};

interface SignInProps {
    email: string;
    password: string;
}

type AuthContextType = {
    email: string;
    signIn(props: SignInProps): Promise<void>;
    signOut(): void
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [email, setEmail] = useState('');

    async function signIn(props: SignInProps) {

        const email = props.email;
        const password = props.password;

        const data = {
            email,
            password
        }

        const response = await fetch('http://localhost:8000/api/Alunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();

        localStorage.setItem('token', responseJson.token);

        setEmail(email);
    }

    async function signOut() {
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ email, signIn, signOut }} >
            {children}
        </AuthContext.Provider>
    )

}