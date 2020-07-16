import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointment = await appointmentsRepository.find();

    return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);      

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({ 
            provider_id, 
            date: parsedDate 
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

export default appointmentsRouter;
