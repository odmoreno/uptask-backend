import type { Request, Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";

import Task, { ITask } from "../models/Task";

declare global {
	namespace Express {
		interface Request {
			task: ITask;
		}
	}
}

export async function taskExists(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { taskId } = req.params;
		const task: ITask | null = await Task.findById(taskId);
		if (!task) {
			const error = new Error("Tarea no encontrado");
			res.status(404).json({ error: error.message });
			return;
		}
		req.task = task;
		next();
	} catch (error) {
		res.status(500).json({ error: "hubo un error" });
	}
}

export function taskBelongsToProject(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.task.project.toString() !== req.project.id.toString()) {
		const error = new Error("Tarea no pertenece al proyecto");
		res.status(400).json({ error: error.message });
		return;
	}
	next();
}