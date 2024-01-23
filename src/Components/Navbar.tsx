import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { CartProvider } from '../Context/CartContext';
import styled from 'styled-components';
import { Product } from '../Pages/Products';

const StyledNav = styled.nav`
    background-color: #415987;
    color: #333;
    padding: 5px;
`;

const StyledLink = styled(Link)`
    color: #fff;
    margin-right: 10px;
    text-decoration: none;

    &:hover {
        color: #ddd;
    }
`;

export interface NavbarProps {
    cart: Product[];
}

const Navbar: React.FC<NavbarProps> = () => {
    const { cart } = useContext(CartContext);

    return (
        <CartProvider>
            <StyledNav>
                <div>
                    <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none' }}>
                        <li>
                            <StyledLink to="/">Home</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/products">Produtos</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/cart">
                                Carrinho ({cart.length})
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/signup">Criar Conta</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/login">Login</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/logout">Logout</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/OrderHistory">Histórico de Produtos</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/createproducts">Criar Novo Produto</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/removeproducts">Remover Produto</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/updateproducts">Atualizar Produto</StyledLink>
                        </li>
                    </ul>
                </div>
            </StyledNav>
        </CartProvider>
    );
};

export default Navbar;
