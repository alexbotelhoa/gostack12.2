import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Background, Container, Content } from './styles';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface signInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();

    const handleSubmit = useCallback( async (data: signInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail é obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('Senha é obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });            

            signIn({
                email: data.email,
                password: data.password,
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
        }
    }, [signIn])

    return (
        <Container>
            <Content>
                <img src={logo} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu login</h1>

                    <Input 
                        name="email" 
                        icon={FiMail} 
                        placeholder="E-mail" 
                    />

                    <Input 
                        name="password" 
                        icon={FiLock} 
                        type="password" 
                        placeholder="Senha" 
                    />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="">
                    <FiLogIn />
                    Criar conta            
                </a>
            </Content>
            <Background />
        </Container>
    );
}

export default SignIn;
