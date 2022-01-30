import 'cross-fetch/polyfill';
import './initDotenv';
import express from 'express';
import { engine } from 'express-handlebars';
import { client } from './apollo';
import { getResumeQuery } from './queries/getResumeQuery';
import cors from 'cors';
import path from 'path';
import { GetResume } from './queries/types/GetResume';

const port = process.env.PORT;

const corsOptions = {
  methods: 'GET',
  preflightContinue: false,
};

const app = express();

app.use('/styles', express.static('styles'));
app.use('/media', express.static('media'));

app.engine(
  'hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    partialsDir: path.join(__dirname, '../views/partials'),
  })
);

app.set('view engine', 'hbs');
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  client
    .query({
      query: getResumeQuery,
    })
    .then(({ data }: { data: GetResume }) => {
      const { personalBio, educations, experiences, projects } = data;

      res.render('resume', {
        personalBio,
        title: personalBio?.name || '',
        educations,
        experiences,
        projects,
      });
    });
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
