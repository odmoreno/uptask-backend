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
			const { taskId } = req.params;
			const task = await Task.findById(taskId).populate("project");
			if (!task) {
				const error = new Error("Tarea no encontrada");
				res.status(404).json({ error: error.message });
				return;
			}

			if (task.project.toString() !== req.project.id.toString()) {
				const error = new Error("Tarea no pertenece al proyecto");
				res.status(400).json({ error: error.message });
				return;
			}

			res.send(task);
		} catch (error) {
			res.status(500).json({ error: "Error al obtener la tarea" });
		}
	};

	static updateTask = async (req: Request, res: Response) => {
		try {
			const { taskId } = req.params;
			const task = await Task.findById(taskId)
			if (!task) {
				const error = new Error("Tarea no encontrada");
				res.status(404).json({ error: error.message });
				return;
			}

			if (task.project.toString() !== req.project.id.toString()) {
				const error = new Error("Tarea no pertenece al proyecto");
				res.status(400).json({ error: error.message });
				return;
			}

			task.name = req.body.name;
			task.description = req.body.description;
			await task.save();

			res.status(200).json({
				message: "Tarea actualizada correctamente",
				task,
			});
		} catch (error) {
			res.status(500).json({ error: "Error al actualizar la tarea" });
		}
	};


	static deleteTask = async (req: Request, res: Response) => {
		try {
			const { taskId } = req.params;
			const task = await Task.findById(taskId);
			if (!task) {
				const error = new Error("Tarea no encontrada");
				res.status(404).json({ error: error.message });
				return;
			}

			await task.deleteOne();
			req.project.tasks = req.project.tasks.filter(
				(task) => task.toString() !== taskId
			);

			await Promise.allSettled([task.deleteOne(), req.project.save()]);

			res.status(200).json({
				message: "Tarea eliminada correctamente",
			});

		} catch (error) {
			res.status(500).json({ error: "Error al eliminar la tarea" });
		}
	}


	static updateTaskStatus = async (req: Request, res: Response) => {
		try {
			const { taskId } = req.params;


			const task = await Task.findById(taskId);
			if (!task) {
				const error = new Error("Tarea no encontrada");
				res.status(404).json({ error: error.message });
				return;
			}

			if (task.project.toString() !== req.project.id.toString()) {
				const error = new Error("Tarea no pertenece al proyecto");
				res.status(400).json({ error: error.message });
				return;
			}

			const { status } = req.body;
			task.status = status;
			await task.save();
			res.status(200).json({
				message: "Estado de la tarea actualizado correctamente",
				task,
			});
		} catch (error) {
			res
				.status(500)
				.json({ error: "Error al actualizar el estado de la tarea" });
		}
	}


}
