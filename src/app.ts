import 'cross-fetch/polyfill';
import './initDotenv';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import { client } from './apollo';
import { verifyWebhookSignature } from '@graphcms/utils';
import { getResumeQuery } from './queries/getResumeQuery';
import { GetResume } from './queries/types/GetResume';

const port = process.env.PORT as string;
const cmsWebhookSecreteKey = process.env.CMS_WEBHOOK_SECRET_KEY as string;

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
    })
    .catch(() => res.status(500).send('internal server error'));
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.post('/update', (req, res) => {
  const signature =
    (Array.isArray(req.headers['gcms-signature'])
      ? req.headers['gcms-signature'][0]
      : req.headers['gcms-signature']) ?? '';

  const isValid = verifyWebhookSignature({
    body: req.body,
    signature,
    secret: cmsWebhookSecreteKey,
  });

  if (!isValid) {
    return res.status(403);
  }

  client
    .resetStore()
    .then(() => res.status(200).send('success'))
    .catch(() => res.status(500).send('internal server error'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
