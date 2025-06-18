import type { Request, Response } from "express";
import Project from "../models/Projects";

export class ProjectController {
	static createProject = async (req: Request, res: Response) => {
		const project = new Project(req.body);

		try {
			await project.save();
			res.status(201).json({
				message: "Proyecto creado correctamente",
				project,
			});
		} catch (error) {
			res.status(500).json({
				message: "Error al crear el proyecto",
				error,
			});
		}
	};

	static getAllProjects = async (req: Request, res: Response) => {
		try {
			const projects = await Project.find();
			res.json(projects);
		} catch (error) {
			console.log(error);
		}
	};

	static getProjectById = async (req: Request, res: Response) => {
		const { id } = req.params;
		try {
			const project = await Project.findById(id).populate("tasks");
			res.json(project);
		} catch (error) {
			console.log(error);
		}
	};

	static updateProject = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const { projectName, clientName, description } = req.body;
		try {
			const project = await Project.findByIdAndUpdate(
				id,
				{ projectName, clientName, description },
				{ new: true }
			);

			if (!project) {
				const error = new Error("Proyecto no encontrado");
				res.status(404).json({ error: error.message });
				return;
			}
			res.json(project);
		} catch (error) {
			console.log(error);
		}
	};

	static deleteProject = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		try {
			const project = await Project.findById(id);
			if (!project) {
				const error = new Error("Proyecto no encontrado");
				res.status(404).json({ error: error.message });
				return;
			}
			//await Project.findByIdAndDelete(id);
			await project.deleteOne(),
			res.json({ message: "Proyecto eliminado correctamente" });
		} catch (error) {
			console.log(error);
		}
	};
}
