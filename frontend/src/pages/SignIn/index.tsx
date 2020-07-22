import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Background, Container, Content } from './styles';

import logo from '../../assets/logo.svg';

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logo} alt="GoBarber" />

            <form>
                <h1>Faça seu login</h1>

                <input placeholder="E-mail" />

                <input type="password" placeholder="Senha" />

                <button type="submit">Entrar</button>

                <a href="forgot">Esqueci minha senha</a>
            </form>

            <a href="#">
                <FiLogIn />
                Criar conta            
            </a>
        </Content>
        <Background />
    </Container>
);

export default SignIn;
