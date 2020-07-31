import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage } from '../../hooks/toast';
import { Container, Toast } from './styles';

interface ToastProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
    return (
        <Container>
            {messages.map(message => (
                <Toast 
                    key={message.id}
                    type={message.type}
                    hasDescription={!!message.description}
                >
                        <FiAlertCircle size={20} />

                        <div>
                            <strong>{message.title}</strong>
                            {message.description && <p>{message.description}</p>}
                        </div>

                        <button type="button">
                            <FiXCircle size={18} />
                        </button>
                </Toast>
            ))}
        </Container>
    )
};

export default ToastContainer;
