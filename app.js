require("dotenv").config();
require("express-async-errors");

//Here i am doing for server side renderig
const path = require("path");

/// Extra Securites packages.
const helmet = require("helmet");

const xss = require("xss-clean");

const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");

const authRouter = require("./Routes/auth");
const jobsRouter = require("./Routes/jobs");
const authenticateUser = require("./middleware/authentication");


//for api rate limiter
app.set('trust proxy', 1)

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(helmet());

app.use(xss());

// app.get('/', (req, res) => {
//   res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
// });
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
//* will serve the index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is Listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
