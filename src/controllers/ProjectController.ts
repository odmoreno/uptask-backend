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
		res.send("todos los proyectos");
	};
}
