import React, { useContext, useEffect, useState } from 'react';
import { CartContext, CartProvider } from '../Context/CartContext';
import Navbar from '../Components/Navbar';
import { Product } from './Products';
import styled from 'styled-components';

const StyledDiv = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #f5f5f5;
`;

const StyledH2 = styled.h2`
    color: #333;
`;

const StyledP = styled.p`
    color: #999;
`;

const StyledButton = styled.button`
    margin: 5px;
`;

const Cart: React.FC = () => {
    const { handleOrder } = useContext(CartContext);
    const [cart, setCart] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const items = localStorage.getItem('cart');
        if (items) {
            const cartWithCount = JSON.parse(items).map((product: Product) => ({
                ...product,
                count: product.count || 1,
            }));
            setCart(cartWithCount);
        }
    }, []);

    const removeFromCart = (productToRemove: Product) => {
        const updatedCart = cart.filter(product => product.id !== productToRemove.id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const updateItemCount = (productId: number, newCount: number) => {
        if (newCount < 1) return;
    
        const updatedCart = cart.map(product =>
            product.id === productId
                ? { ...product, count: newCount }
                : product
        );
    
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    
        const newTotalPrice = updatedCart.reduce((sum, product) => sum + product.price * product.count, 0);
        setTotalPrice(newTotalPrice);
    }
    
    if (!cart) {
        return <p>Carregando...</p>;
    }

    return (
        <CartProvider>
            <StyledDiv>
                <StyledH2>Carrinho da Lojinha</StyledH2>
                <Navbar cart={cart} />
                <StyledP>Total: ${totalPrice.toFixed(2)}</StyledP>
                <ul>
                    {cart.length === 0 ? (
                        <StyledP>Seu carrinho está vazio!</StyledP>
                    ) : (
                        cart.map((product, index) => (
                            <li key={index}>
                                <StyledH2>{product.title}</StyledH2>
                                <StyledP>${product.price}</StyledP>
                                <div>
                                <StyledButton onClick={() => updateItemCount(product.id, product.count - 1)}>-</StyledButton>
                                <StyledP>{product.count}</StyledP>
                                <StyledButton onClick={() => updateItemCount(product.id, product.count + 1)}>+</StyledButton>
                                </div>
                                <StyledButton onClick={() => removeFromCart(product)}>Remover do Carrinho</StyledButton>
                                <StyledButton onClick={() => handleOrder(product)}>Comprar Produto</StyledButton>
                            </li>
                        ))
                    )}
                </ul>
            </StyledDiv>
        </CartProvider>
    );
};

export default Cart;