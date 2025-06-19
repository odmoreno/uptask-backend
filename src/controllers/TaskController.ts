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
			const tasks = await Task.find({ project: req.project.id }).populate(
				"project"
			);
			res.send(tasks);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener las tareas" });
		}
	};

	static getTaskById = async (req: Request, res: Response) => {
		try {
			res.send(req.task);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener la tarea" });
		}
	};

	static updateTask = async (req: Request, res: Response) => {
		try {
			req.task.name = req.body.name;
			req.task.description = req.body.description;
			await req.task.save();

			res.status(200).json({
				message: "Tarea actualizada correctamente",
				task: req.task,
			});
		} catch (error) {
			res.status(500).json({ error: "Error al actualizar la tarea" });
		}
	};


	static deleteTask = async (req: Request, res: Response) => {
		try {
			req.project.tasks = req.project.tasks.filter(
				(task) => task.toString() !== req.task.id.toString()
			);

			await Promise.allSettled([req.task.deleteOne(), req.project.save()]);

			res.status(200).json({
				message: "Tarea eliminada correctamente",
			});

		} catch (error) {
			res.status(500).json({ error: "Error al eliminar la tarea" });
		}
	}


	static updateTaskStatus = async (req: Request, res: Response) => {
		try {
			const { status } = req.body;
			req.task.status = status;
			await req.task.save();
			res.status(200).json({
				message: "Estado de la tarea actualizado correctamente",
				task: req.task,
			});
		} catch (error) {
			res
				.status(500)
				.json({ error: "Error al actualizar el estado de la tarea" });
		}
	}


}
