import { MongoClient } from 'mongodb';

class MongoDB {
  async connect() {
    const uri = 'mongodb+srv://admin:admin12345@project1-jhxit.gcp.mongodb.net/line?retryWrites=true&w=majority';

    const promise = new Promise((resolve, reject) => {
      MongoClient.connect(uri, { useUnifiedTopology: true }, (err, connection) => {
        if (err) reject(err);
        resolve(connection);
      });
    });

    return promise;
  }
}

export const mongodb = new MongoDB();
export default mongodb;
