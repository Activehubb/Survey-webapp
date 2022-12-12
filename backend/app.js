const express = require("express");
const logger = require("morgan");
const userRoute = require('./routes/user')

const app = express();

app.use(express.json());
app.use(logger('dev'));


app.use('/api/v1', userRoute)


module.exports = app;
