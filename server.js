const app = require("./backend/app");
const dbConnect = require('./backend/config/db_config')
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./backend/config/config.env" });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

process.on("uncaughtException", (err) => {
  console.log(err.message),
    console.log(`Shutting down due to uncaught exception`);
  process.exit(1);
});

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

dbConnect();

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${MODE} mode`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Server ERR: ${err.message}`),
    console.log(`Shutting down server due to unhandled error rejections`),
    server.close(() => process.exit(1));
});
