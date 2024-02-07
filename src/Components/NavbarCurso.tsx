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

const NavbarCurso = () => {
    
    return (
            <StyledNav>
                <div>
                    <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none' }}>
                        <li>
                            <StyledLink to="/">Home</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/CreateCurso">Criar Curso</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/RemoveCurso">Apagar Curso</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/UpdateCurso">Atualizar Curso</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/ListCursos">Listar Cursos</StyledLink>
                        </li>
                    </ul>
                </div>
            </StyledNav>
    );
};

export default NavbarCurso;