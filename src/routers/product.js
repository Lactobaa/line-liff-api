import * as _ from 'lodash';
import express from 'express';
import { mongodb } from '../mongodb.js';
import moment from 'moment';
import multer from 'multer';
import fs from 'fs';
import mkdirp from 'mkdirp';
import { resp } from '../utils/resp.js';

export const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/upload')
  },
  filename: (req, file, cb) => {
    cb(null, `img-${moment().format('YYYYMMDDHHmmss')}-${file.originalname}`)
  }
});
const upload = multer({ storage: storage });

export async function uploadFile(img) {
  try {
    const image = img || ''
    const base64Image = image.split(';base64,').pop();

    const path = 'public/images/uploads';
    const name = moment().format('YYMMDDHHis');
    const type = 'png';

    await mkdirp(`${path}`, (err) => {
      if (err) console.log('----> mkdirp', err);
    });

    const file = `${path}/${name}.${type}`;
    await fs.writeFile(file, base64Image, { encoding: 'base64' }, (err) => {
      if (err) console.log('----> writeFile', err);
    });
    return file
  } catch (err) {
    console.log(err);
  }
}

export async function getAllProducts(req, res, next) {
  try {
    const connection = await mongodb.connect();
    const db = connection.db('line');
    const data = await db.collection('products').find({}).toArray();
    connection.close();
    next(resp({ data }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function getProductById(req, res, next) {
  try {
    const connection = await mongodb.connect();
    const db = connection.db('line');
    const data = await db.collection('products').findOne({ _id: mongodb.ObjectId(req.param.id) });
    connection.close();
    next(resp({ data }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { body } = req;
    const optionData = {
      name: body.name,
      price: body.price,
    };
    if (body.img) {
      const fileName = uploadFile(body.img);
      optionData.img = fileName;
    }
    const connection = await mongodb.connect();
    const db = connection.db('line');
    await db.collection('products').updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: optionData });
    const data = await db.collection('products').findOne({ _id: mongodb.ObjectId(req.params.id) });
    connection.close();
    next(resp({ data }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function insertProduct(req, res, next) {
  try {
    const { body } = req;
    let fileName = '';
    if (body.img) {
      fileName = await uploadFile(body.img);
    }
    const optionData = {
      name: body.name,
      price: body.price,
      img: fileName,
    };
    const connection = await mongodb.connect();
    const db = connection.db('line');
    const data = await db.collection('products').insertOne(optionData);
    connection.close();
    next(resp({ data: data.ops[0] }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const connection = await mongodb.connect();
    const db = connection.db('line');
    await db.collection('products').deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    connection.close();
    next(resp({ message: 'success' }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/add', insertProduct);
router.put('/:id', updateProduct);
router.delete('/:id/delete', deleteProduct);