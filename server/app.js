import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import swaggerui from 'swagger-ui-express';

import database from './database/database';
import swaggerfile from './swagger.json';
import routes from './routes/routes';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000; 


app.listen(port, () =>{ 
  console.log('API running now');
  });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(express.static(__dirname + '/public'));
app.use('/swaggerui', swaggerui.serve, swaggerui.setup(swaggerfile));
app.use('/api/v1', routes);
app.use('/auth', userRoutes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

export default app;
