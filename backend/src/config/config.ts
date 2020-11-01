import { ProcessEnvOptions } from "child_process";
import dotenv from "dotenv";
dotenv.config();

export default {
  DB: {
    URI: process.env.MONGODB_URI || <string>"mongodb://localhost/pinterest",
    USER: process.env.MONGODB_USER || <string>"",
    PASSWORD: process.env.MONGODB_PASSWORD || <string>"",
  },
  PORT: process.env.PORT || <number>4000,
};
