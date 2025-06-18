import type { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

interface ErrorResponse {
	errors: ValidationError[];
}

export const handleInputErrors = (
	req: Request,
	res: Response<ErrorResponse>,
	next: NextFunction
): void => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array() });
		return;
	}
	next();
};
