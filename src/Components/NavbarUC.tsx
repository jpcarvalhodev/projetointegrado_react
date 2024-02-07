import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const NavbarUC = () => {
    
    return (
            <StyledNav>
                <div>
                    <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none' }}>
                        <li>
                            <StyledLink to="/">Home</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/CreateUC">Criar Unidade Curricular</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/RemoveUC">Apagar Unidade Curricular</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/UpdateUC">Atualizar Unidade Curricular</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/ListUC">Listar Unidades Curriculares</StyledLink>
                        </li>
                    </ul>
                </div>
            </StyledNav>
    );
};

export default NavbarUC;