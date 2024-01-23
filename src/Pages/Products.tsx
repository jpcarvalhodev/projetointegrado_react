import React, { useState } from 'react';
import ProductsTable from '../Context/ProductsContext';
import Navbar from '../Components/Navbar';
import { CartProvider } from '../Context/CartContext';
import styled from 'styled-components';

export interface Product {
    id: number;
    title: string;
    price: number;
    image_url: string;
    count: number;
}

const StyledDiv = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #f5f5f5;
`;

const StyledH1 = styled.h1`
    color: #333;
`;

const StyledH2 = styled.h2`
    color: #333;
`;

const StyledP = styled.p`
    color: #999;
`;

export const Products: React.FC = () => {
    const [cart, setCart] = useState<Product[]>([]);

    return (
        <CartProvider>
            <StyledDiv>
                <StyledH2>Produtos da Lojinha</StyledH2>
                <Navbar cart={cart} />
                <header>
                    <StyledH1>Produtos</StyledH1>
                    <StyledP>Veja abaixo nossos produtos</StyledP>
                    <ProductsTable/>
                </header>
            </StyledDiv>
        </CartProvider>
    );
};

export default Products;