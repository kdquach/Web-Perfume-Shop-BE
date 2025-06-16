import { Request, Response } from 'express';
import Course from '../models/Course';

class SiteController {
    async index(req: Request, res: Response): Promise<void> {
        try {
            const courses = await Course.find({});
            console.log(courses);
            res.json(courses);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new SiteController();