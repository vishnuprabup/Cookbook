import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

const store = MongoStore.create({
  mongoUrl: process.env.COOKBOOK_APP_MONGO_URL,
});

const defaultCookie = {
  path: "/",
  httpOnly: true,
  secure: false,
  maxAge: 6.048e8,
  sameSite: "lax",
};

export const sessionOptions = {
  secret: "secret key",
  saveUninitialized: false,
  resave: false,
  store,
  cookie: defaultCookie,
};

export const corsOptions = {
  origin: process.env.COOKBOOK_APP_CLIENT_DOMAIN,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
};
