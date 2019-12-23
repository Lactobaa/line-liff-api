import express from 'express';
import request from 'request';
import { resp } from '../utils/resp.js';

export function sendText (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text
      }
    ]
  };
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer etD/Op2JSsZCMiR2BdnbU8mXu5tV7yM5z8mh++viAxlWJf9TXMz+3MxEoX91SC2QRdLEwIkkLOQeRq21kdX8406dtBG+2mXDizy+LCqpOc1/lfBczbLbDDDzEVgqNRAiH6mFsJRLAc02UT5G4t4lVFGUYhWQfeY8sLGRXgo3xvw='
    },
    url: 'https://api.line.me/v2/bot/message/push',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error', err);
    if (res) console.log('success');
    if (body) console.log(body);
  });
}

export async function getMessage(req, res, next) {
  const text = req.body.events[0].message.text;
  const sender = req.body.events[0].source.userId;
  const replyToken = req.body.events[0].replyToken;
  if (text === 'liff') {
    sendText(sender, 'line://app/1612608147-PpL6wdqr');
  }
  next(resp({ message: 'Success' }));
}

export const router = express.Router();
router.post('/', getMessage);
