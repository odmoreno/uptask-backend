import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
	static createTask = async (req: Request, res: Response) => {
		const { projectId } = req.params;
		const { name, description } = req.body;
		try {
			const task = await Task.create({ name, description, project: projectId });
		} catch (error) {
			console.log(error);
		}
	};
}
