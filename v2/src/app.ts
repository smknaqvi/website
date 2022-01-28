import "cross-fetch/polyfill";
import express from "express";
import { engine } from "express-handlebars";
import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const port = process.env.PORT;
const cmsAuthToken = process.env.CMS_AUTH_TOKEN;
const cmsUri = process.env.CMS_URI;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

const app = express();

const httpLink = createHttpLink({
  uri: cmsUri,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${cmsAuthToken}`,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

app.use("/styles", express.static("styles"));
app.use("/media", express.static("media"));

app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "../views/layouts"),
    partialsDir: path.join(__dirname, "../views/partials"),
  })
);

app.set("view engine", "hbs");
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  client
    .query({
      query: gql`
        {
          personalBio(where: { name: "Kazim Naqvi" }) {
            name
            careerStatus
            about
            gitUrl
            linkedinUrl
            email
          }
          educations(orderBy: startDate_DESC) {
            school
            fieldOfStudy
            timeline
            description
          }
          experiences(orderBy: startDate_DESC) {
            title
            org
            location
            skills
            details {
              html
            }
          }
          projects(orderBy: createdAt_DESC) {
            name
            repoUrl
            skills
            description {
              html
            }
          }
        }
      `,
    })
    .then((result) => {
      const {
        data: { personalBio, educations, experiences, projects },
      } = result;
      res.render("resume", {
        personalBio,
        title: personalBio.name,
        educations,
        experiences,
        projects,
      });
    })
    .catch((result) => console.error(result));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
