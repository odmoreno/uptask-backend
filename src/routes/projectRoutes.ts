import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { projectExists, taskBelongsToProject, taskExists } from "../middleware";
import { ProjectController, TaskController } from "../controllers";

const router = Router();

// Validation arrays for reusability
const projectValidations = [
	body("projectName")
		.notEmpty()
		.withMessage("El nombre del proyecto es obligatorio"),
	body("clientName")
		.notEmpty()
		.withMessage("El nombre del Cliente es obligatorio"),
	body("description")
		.notEmpty()
		.withMessage("La descripcion del proyecto es obligatorio"),
];

const taskValidations = [
	body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
	body("description")
		.notEmpty()
		.withMessage("La descripcion de la tarea es obligatorio"),
];

const mongoIdValidation = [param("id").isMongoId().withMessage("ID no válida")];

const taskIdValidation = [
	param("taskId").isMongoId().withMessage("ID no válida"),
];

// Project routes
router.post(
	"/",
	projectValidations,
	handleInputErrors,
	ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
	"/:id",
	mongoIdValidation,
	handleInputErrors,
	ProjectController.getProjectById
);

router.put(
	"/:id",
	mongoIdValidation,
	projectValidations,
	handleInputErrors,
	ProjectController.updateProject
);

router.delete(
	"/:id",
	mongoIdValidation,
	handleInputErrors,
	ProjectController.deleteProject
);

/** Routes for tasks - nested resource routing*/
router.param("projectId", projectExists);

router.post(
	"/:projectId/tasks",
	taskValidations,
	handleInputErrors,
	TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);

router.get("/:projectId/tasks/:taskId", taskIdValidation, handleInputErrors, TaskController.getTaskById);

router.put("/:projectId/tasks/:taskId", taskIdValidation, taskValidations, handleInputErrors, TaskController.updateTask);

router.delete("/:projectId/tasks/:taskId", taskIdValidation, handleInputErrors, TaskController.deleteTask);

router.post("/:projectId/tasks/:taskId/status",
	taskIdValidation,
	body("status").notEmpty().withMessage("El estado de la tarea es obligatorio"),
	handleInputErrors,
	TaskController.updateTaskStatus
)

export default router;
