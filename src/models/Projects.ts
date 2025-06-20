import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { ITask } from "./Task";

//export type ProjectType = Document & {
export interface IProject extends Document {
	projectName: string;
	clientName: string;
	description: string;
	tasks: PopulatedDoc<ITask & Document>[];
}

//https://mongoosejs.com/docs/schematypes.html enlaces de los tipos de datos
const ProjectSchema: Schema = new Schema(
	{
		projectName: {
			type: String,
			required: true,
			trim: true,
		},
		clientName: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			require: true,
			trim: true,
		},
		tasks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Task",
			},
		],
	},
	{ timestamps: true }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
