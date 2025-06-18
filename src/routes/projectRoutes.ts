import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { validateProjectExists } from "../middleware/project";
import { ProjectController, TaskController } from "../controllers";

const router = Router();

router.post(
	"/",
	body("projectName")
		.notEmpty()
		.withMessage("El nombre del proyecto es obligatorio"),
	body("clientName")
		.notEmpty()
		.withMessage("El nombre del Cliente es obligatorio"),
	body("description")
		.notEmpty()
		.withMessage("La descripcion del proyecto es obligatorio"),
	handleInputErrors,
	ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
	"/:id",
	param("id").isMongoId().withMessage("ID no válida"),
	handleInputErrors,
	ProjectController.getProjectById
);

router.put(
	"/:id",
	param("id").isMongoId().withMessage("ID no válida"),
	body("projectName")
		.notEmpty()
		.withMessage("El nombre del proyecto es obligatorio"),
	body("clientName")
		.notEmpty()
		.withMessage("El nombre del Cliente es obligatorio"),
	body("description")
		.notEmpty()
		.withMessage("La descripcion del proyecto es obligatorio"),
	handleInputErrors,
	ProjectController.updateProject
);

router.delete(
	"/:id",
	param("id").isMongoId().withMessage("ID no válida"),
	handleInputErrors,
	ProjectController.deleteProject
);

/** Routes for tasks - nested resource routing*/
router.post(
	"/:projectId/tasks",
	validateProjectExists,
	body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
	body("description")
		.notEmpty()
		.withMessage("La descripcion de la tarea es obligatorio"),
	handleInputErrors,
	TaskController.createTask
);

router.get(
	"/:projectId/tasks",
	validateProjectExists,
	TaskController.getProjectTasks
);

router.get(
	"/:projectId/tasks/:taskId",
	validateProjectExists,
	TaskController.getTaskById
);


export default router;
