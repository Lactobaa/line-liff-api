import express from 'express';
import { ObjectId } from 'mongodb';
import { di } from '../di';
import { resp } from '../utils/resp';

export const router = express.Router();

export async function insertOrder(req, res, next) {
  try {
    const { body } = req;
    const db = di.get('db');
    const data = await db.collection('orders').insertOne(body);
    console.log('data.ops[0]', data.ops[0]);
    next(resp({ data: data.ops[0] }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

router.post('/add', insertOrder);
