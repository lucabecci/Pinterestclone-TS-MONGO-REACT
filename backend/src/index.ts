import app from "./app";
import "./database/database";

const PORT: number = app.get("port");

async function main() {
  await app.listen(PORT);
  console.log("Server on port", PORT);
}

main();
