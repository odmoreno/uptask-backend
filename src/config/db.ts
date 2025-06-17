import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

const connectToMongoDB = async (url: string, isLocal: boolean = false) => {
	try {
		const { connection } = await mongoose.connect(url);
		const connectionUrl = `${connection.host}:${connection.port}`;
		console.log(
			colors.magenta.bold(
				`MongoDB ${isLocal ? "Local" : "Atlas"} Conectado en : ${connectionUrl}`
			)
		);
		return true;
	} catch (error) {
		if (!isLocal) {
			console.log(
				colors.yellow.bold(
					"Error conectando a MongoDB Atlas, intentando con base de datos local..."
				)
			);
		}
		return false;
	}
};

export const connectDB = async () => {
	// Intentar primero con Atlas
	const atlasConnected = await connectToMongoDB(process.env.DATABASE_URL);

	// Si Atlas falla, intentar con local
	if (!atlasConnected) {
		const localConnected = await connectToMongoDB(
			process.env.LOCAL_DATABASE_URL,
			true
		);
		if (!localConnected) {
			console.log(
				colors.red.bold("Error: No se pudo conectar a ninguna base de datos")
			);
			exit(1);
		}
	}
};
