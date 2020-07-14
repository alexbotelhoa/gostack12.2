import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', (request, response) => {
    try {

        return response.send();
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default usersRouter;
