import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";

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

/** Routes for tasks */
router.post("/:projectId/tasks", TaskController.createTask);



export default router;
