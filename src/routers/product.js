import * as _ from 'lodash';
import express from 'express';
import { ObjectId } from 'mongodb';
import { di } from '../di';
import moment from 'moment';
import multer from 'multer';
import fs from 'fs';
import mkdirp from 'mkdirp';
import { resp } from '../utils/resp';

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

// export function getFile(req, res, next) {
//   try {
//     next(resp({ data: '' }));
//   } catch (err) {
//     next(resp({ message: err.message }, 400));
//   }
// }

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
    // const data = file;
    return file
    // next(resp({ data }));
  } catch (err) {
    console.log(err);
    // next(resp({ message: err.message }, 400));
  }
}

export async function getAllProducts(req, res, next) {
  try {
    const db = di.get('db');
    const data = await db.collection('products').find({}).toArray();
    next(resp({ data }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function getProductById(req, res, next) {
  try {
    const db = di.get('db');
    const data = await db.collection('products').findOne({ _id: ObjectId(req.param.id) });
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
    const db = di.get('db');
    await db.collection('products').updateOne({ _id: ObjectId(req.params.id) }, { $set: optionData });
    const data = await db.collection('products').findOne({ _id: ObjectId(req.params.id) });
    next(resp({ data }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function insertProduct(req, res, next) {
  try {
    const { body } = req;
    const fileName = await uploadFile(body.img);
    const optionData = {
      name: body.name,
      price: body.price,
      img: fileName,
    };
    const db = di.get('db');
    const data = await db.collection('products').insertOne(optionData);
    console.log('data.ops[0]', data.ops[0]);
    next(resp({ data: data.ops[0] }));
  } catch (err) {
    next(resp({ message: err.message }, 400));
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const db = di.get('db');
    console.log('delete', req.params.id);
    await db.collection('products').deleteOne({ _id: ObjectId(req.params.id) });
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
// router.post('/upload', upload.array('images'), uploadFile);