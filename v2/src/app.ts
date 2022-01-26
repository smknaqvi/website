import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import dotenv from "dotenv";
import aboutMe from "./data/aboutMe";

dotenv.config();
const port = process.env.PORT;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

const app = express();

app.use("/styles", express.static("styles"));
app.use("/media", express.static("media"));

app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials",
  })
);

app.set("view engine", "hbs");
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.render("resume", { aboutMe, title: aboutMe.title });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
