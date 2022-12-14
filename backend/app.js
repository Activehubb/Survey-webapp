const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/errors");
const cors = require("cors");

const app = express();
const userRoute = require("./routes/userRoute");
const surveyRoute = require("./routes/surveyRoute");
const reportRoute = require("./routes/reportRoute");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/", userRoute);
app.use("/api/v1/", surveyRoute);
app.use("/api/v1/", reportRoute);

app.use(errorMiddleware);
module.exports = app;
