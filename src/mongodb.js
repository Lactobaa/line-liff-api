import mongodb1 from 'mongodb';

class MongoDB {
  async connect() {
    const uri = 'mongodb+srv://admin:admin12345@project1-jhxit.gcp.mongodb.net/line?retryWrites=true&w=majority';

    const promise = new Promise((resolve, reject) => {
      mongodb1.MongoClient.connect(uri, { useUnifiedTopology: true }, (err, connection) => {
        if (err) reject(err);
        resolve(connection);
      });
    });

    return promise;
  }

  ObjectId(param) {
    return mongodb1.ObjectId(param);
  }
}

export const mongodb = new MongoDB();
export default mongodb;
