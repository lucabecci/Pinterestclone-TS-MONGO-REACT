import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import config from "./config/config";
import path from "path";
//initializations
const app: Application = express();
//routes imp
import indexRoutes from "./routes/index.routes";
import imageRoutes from "./routes/image.routes";
//configs
app.set("port", config.PORT);
//middlewares
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api", indexRoutes);
app.use("/api/images", imageRoutes);

// this folder for this app will be used for store public files.
app.use("/uploads", express.static(path.resolve("uploads")));
export default app;
