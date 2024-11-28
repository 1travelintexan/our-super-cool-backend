require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");

//new
const path = require("path");
const fs = require("fs");
const server = jsonServer.create();
const db = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 5005;

server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running at port...${PORT}`);
});
