import express from 'express';
import { resp } from '../utils/resp.js';

export const router = express.Router();

export async function getMessage(req, res, next) {
  next(resp({ message: 'Success' }));
}

router.post('/', getMessage);