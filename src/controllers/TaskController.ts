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
			res.status(500).json({ error: "Error al crear la tarea" });
		}
	};

	static getProjectTasks = async (req: Request, res: Response) => {
		try {
			const tasks = await Task.find({ project: req.project.id }).populate("project");
			res.json(tasks);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener las tareas" });
		}
	}

	static getTaskById = async (req: Request, res: Response) => {
		try {
			const { taskId } = req.params;
			const task = await Task.findById(taskId).populate("project");
			if (!task) {
				const error = new Error("Tarea no encontrada");
				res.status(404).json({ error: error.message });
				return;
			}

			if(task.project.toString() !== req.project.id.toString()) {
				const error = new Error("Tarea no pertenece al proyecto");
				res.status(400).json({ error: error.message });
				return;
			}
			
			res.json(task);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener la tarea" });
		}
	}

}
