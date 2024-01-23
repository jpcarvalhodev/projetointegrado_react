import { useState } from 'react';
import Navbar from './Components/Navbar';
import { CartProvider } from './Context/CartContext';
import { Product } from './Pages/Products';
import { AuthContextProvider } from './Context/AuthContext';
import styled from 'styled-components';

const StyledSection = styled.section`
    margin: 20px;
    padding: 20px;
    background-color: #f5f5f5;
`;

const StyledH1 = styled.h1`
    color: #333;
`;

const StyledH2 = styled.h2`
    color: #666;
`;

const StyledP = styled.p`
    color: #999;
`;

export function App() {
    const [cart, setCart] = useState<Product[]>([]);

    return (
        <AuthContextProvider>
        <CartProvider>
            <Navbar cart={cart} />
            <StyledSection>
                <StyledH1>Bem Vindo a nossa Lojinha</StyledH1>
                <StyledP>Aqui você encontrará tudo que necessita para sua casa!</StyledP>
            </StyledSection>
            <StyledSection>
                <StyledH2>Sobre Nós</StyledH2>
                <StyledP>
                    Somos uma loja dedicada a oferecer os melhores produtos para você e sua casa.
                    Navegue por nossa vasta seleção e faça suas compras com confiança!
                </StyledP>
            </StyledSection>
        </CartProvider>
        </AuthContextProvider>
    );
}

export default App;