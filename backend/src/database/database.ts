import mongoose, { ConnectionOptions } from "mongoose";
import config from "../config/config";

const userDB: string = config.DB.USER;
const uriDB: string = config.DB.URI;
const passwordDB: String = config.DB.PASSWORD;

const DBconfiguration: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(uriDB, DBconfiguration);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});

connection.once("error", (e) => {
  console.log("DB is not connected", e);
  process.exit(0);
});
