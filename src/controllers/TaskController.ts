import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
	static createTask = async (req: Request, res: Response) => {
		const { name, description } = req.body;
		try {
			const task = new Task({ name, description, project: req.project.id });
			req.project.tasks.push(task.id);
			// AllSettled es una promesa que se resuelve cuando todas las promesas se resuelven
			// Optimiza el tiempo de respuesta, paraleliza las operaciones
			await Promise.allSettled([task.save(), req.project.save()]);
			res.send(task);
		} catch (error) {
			console.log(error);
		}
	};
}
