import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import { router as product } from './src/routers/product.js';
import { router as order } from './src/routers/order.js';
import { router as webhook } from './src/routers/webhook.js';
import { router as linebot } from './src/routers/linebot.js';
const app = express();
const PORT = 9002;
const __dirname = path.resolve();

http.createServer(app).listen(PORT, () => {
  console.log("server status : running");
  console.log(`run on port : ${PORT}`);
});

app.use(bodyParser());
app.use(bodyParser.json({ limit: '280mb' }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/api/v1/bot', linebot);
app.use('/api/v1/product', product);
app.use('/api/v1/order', order);
app.use('/api/v1/webhook', webhook);

app.get("/", (req, res) => {
  res.send("Welcome to a basic express App");
});

app.use(([body, status], req, res, next) => {
  res.status(status).json(body);
  next();
});