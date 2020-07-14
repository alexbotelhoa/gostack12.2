import { Router } from 'express';

import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: "Rotas ativas!" });
})

routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);

export default routes;
