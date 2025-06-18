import type { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";

import Task from "../models/Task";

declare global {
	namespace Express {
		interface Request {
			task: Document;
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
		const task = await Task.findById(taskId);
		if (!task) {
			const error = new Error("Tarea no encontrado");
			res.status(404).json({ error: error.message });
			return;
		}
		req.task = task as Document;
		next();
	} catch (error) {
		res.status(500).json({ error: "hubo un error" });
	}
}
