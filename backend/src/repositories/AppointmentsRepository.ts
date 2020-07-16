import { EntityRepository, Repository } from 'typeorm';

import Appointments from '../models/Appointment';

@EntityRepository(Appointments)
class AppointmentsRepository extends Repository<Appointments> {
    public async findByDate(date: Date): Promise<Appointments | null> {
        const findAppointment = await this.findOne({
            where: { date }
        })

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
