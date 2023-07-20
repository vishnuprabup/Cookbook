import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";

import authRouter from "./router/authRouter.js";
import "./setup/mongooseConnection.js";
import { corsOptions, sessionOptions } from "./setup/authSetup.js";

const app = express();
const port = process.env.COOKBOOK_APP_SERVER_PORT || 3100;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(cors(corsOptions));

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
          