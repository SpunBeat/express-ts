import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';
import { allowOrigins } from './util/cors';

import { db } from './db';
import { ElementRoutes } from './api/element/element.model';
import { CounterRoutes } from './api/counter/counter.model';
import { ProductRoutes } from './api/product/product.model';
import { Ball } from './api/ball/ball';
import { Hero } from './api/hero/hero';

db.connectTo()

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  allowOrigins({ allowedOrigins: [ 'http://localhost:4200' ]})
)
app.use(methodOverride())
app.use(compression())

CounterRoutes(app);
ElementRoutes(app);
ProductRoutes(app);
Ball(app);
Hero(app);


app.route('/api').get((req, res) => {
  res.status(200).json({
    success: true,
    version: '0.0.1',
    notes: 'API Starter'
  })
})

export default app
