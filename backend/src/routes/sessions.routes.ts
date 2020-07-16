import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const createSessionService = new CreateSessionService;

        const { user, token } = await createSessionService.execute({
            email,
            password
        })

        delete user.password;

        return response.json({ user, token });
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default sessionsRouter;
