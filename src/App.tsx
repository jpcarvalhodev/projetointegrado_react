import Navbar from './Components/Navbar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const StyledSection = styled.section`
    margin: 20px;
    padding: 20px;
    background-color: #f5f5f5;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
    text-align: center;
`;

const StyledH1 = styled.h1`
    color: #333;
    text-align: center;
`;

const StyledH2 = styled.h2`
    color: #666;
    text-align: center;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
  color: #666;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  padding-bottom: 20px;
`;

const StyledButton = styled(Link)`
  background-color: #0d6efd;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  margin-left: 20px;
`;

const ScrollButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #0d6efd;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
`;

export function App() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    return (
        <div>
            <Navbar/>
            <StyledSection>
                <StyledH1>Sistema de Gerenciamento de Avaliações</StyledH1>
            </StyledSection>
            <StyledSection>
                <StyledH2>Escolha Abaixo o que Deseja:</StyledH2>
            </StyledSection>
            <StyledDiv>
            <StyledSection>
                <StyledH2>Alunos</StyledH2>
                <StyledList>
                    <ListItem>
                        Criar Aluno
                        <StyledButton to="/CreateAluno">Criar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Apagar Aluno
                        <StyledButton to="/RemoveAluno">Apagar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Atualizar Dados de Aluno
                        <StyledButton to="/UpdateAluno">Atualizar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Listar Alunos
                        <StyledButton to="/ListAlunos">Listar</StyledButton>
                    </ListItem>
                </StyledList>
            </StyledSection>
            <StyledSection>
                <StyledH2>Professores</StyledH2>
                <StyledList>
                    <ListItem>
                        Criar Professor
                        <StyledButton to="/CreateProfessor">Criar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Apagar Professor
                        <StyledButton to="/RemoveProfessor">Apagar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Listar Professores
                        <StyledButton to="/ListProfessor">Listar</StyledButton>
                    </ListItem>
                </StyledList>
            </StyledSection>
            <StyledSection>
                <StyledH2>Cursos</StyledH2>
                <StyledList>
                    <ListItem>
                        Criar Curso
                        <StyledButton to="/CreateCurso">Criar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Apagar Curso
                        <StyledButton to="/RemoveCurso">Apagar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Atualizar Dados de Curso
                        <StyledButton to="/UpdateCurso">Atualizar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Listar Cursos
                        <StyledButton to="/ListCursos">Listar</StyledButton>
                    </ListItem>
                </StyledList>
            </StyledSection>
            <StyledSection>
                <StyledH2>Unidades Curriculares</StyledH2>
                <StyledList>
                    <ListItem>
                        Criar Unidade Curricular
                        <StyledButton to="/CreateUC">Criar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Apagar Unidade Curricular
                        <StyledButton to="/RemoveUC">Apagar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Atualizar Dados de Unidade Curricular
                        <StyledButton to="/UpdateUC">Atualizar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Listar Unidades Curriculares
                        <StyledButton to="/ListUC">Listar</StyledButton>
                    </ListItem>
                </StyledList>
            </StyledSection>
            <StyledSection>
                <StyledH2>Avaliações</StyledH2>
                <StyledList>
                    <ListItem>
                        Criar Avaliação
                        <StyledButton to="/CreateAvaliacao">Criar</StyledButton>
                    </ListItem>
                    <ListItem>
                        Listar Avaliações
                        <StyledButton to="/ListAvailacoes">Listar</StyledButton>
                    </ListItem>
                </StyledList>
            </StyledSection>
            </StyledDiv>
            {isVisible && (
                <ScrollButton onClick={scrollToTop}>
                    <FaArrowUp />
                </ScrollButton>
            )}
        </div>
    );
}

export default App;