import express from 'express';
import 'babel-polyfill';
import { mongodb } from './mongodb';
import { di } from './di';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import { router as product } from './routers/product';
const app = express();
const PORT = 9002;

http.createServer(app).listen(PORT, () => {
  console.log("server status : running");
  console.log(`run on port : ${PORT}`);
});

const start = async () => {
  const connection = await mongodb.connect();
  const db = connection.db('line');
  di.set('db', db);

  app.use(bodyParser.json({ limit: '280mb' }));
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

  // test --> http://localhost:9002/public/home.html
  app.use('/public', express.static(path.join(__dirname, '/../public')));
  app.use('/api/v1/product', product);

  app.use(([body, status], req, res, next) => {
    res.status(status).json(body);
    next();
  });

};

start();