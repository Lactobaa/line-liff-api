import express from 'express';
// import { ObjectId } from 'mongodb';
import { mongodb } from '../mongodb.js';
// import { di } from '../di';
import { resp } from '../utils/resp.js';

export const router = express.Router();

export async function insertOrder(req, res, next) {
  try {
    const { body } = req;
    const connection = await mongodb.connect();
    const db = connection.db('line');
    const data = await db.collection('orders').insertOne(body);
    connection.close();
    next(resp({ data: data.ops[0] }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function getAllOrders(req, res, next) {
  try {
    const connection = await mongodb.connect();
    const db = connection.db('line');
    const data = await db.collection('orders').find({}).toArray();
    connection.close();
    next(resp({ data }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function updateOrder(req, res, next) {
  try {
    const { body } = req;
    const connection = await mongodb.connect();
    const db = connection.db('line');
    const id = mongodb.ObjectId(req.params.id);
    await db.collection('orders').updateOne({ _id: id }, { $set: body });
    const data = await db.collection('orders').findOne({ _id: id });
    connection.close();
    next(resp({ data }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

router.get('/', getAllOrders);
router.post('/add', insertOrder);
router.put('/:id', updateOrder);
