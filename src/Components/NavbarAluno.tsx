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

const NavbarAluno = () => {
    
    return (
            <StyledNav>
                <div>
                    <ul style={{ display: 'flex', justifyContent: 'space-around', listStyle: 'none' }}>
                        <li>
                            <StyledLink to="/">Home</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/CreateAluno">Criar Aluno</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/RemoveAluno">Apagar Aluno</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/UpdateAluno">Atualizar Aluno</StyledLink>
                        </li>
                        <li>
                            <StyledLink to="/ListAlunos">Listar Alunos</StyledLink>
                        </li>
                    </ul>
                </div>
            </StyledNav>
    );
};

export default NavbarAluno;