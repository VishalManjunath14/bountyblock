import {MongoClient, ObjectId, ServerApiVersion} from 'mongodb';

const uri = process.env.URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function handler(req, res) {
  if (req.method === 'POST' || req.method === 'GET') {
    const {slug} = req.query;
    
    try {
      await client.connect();
      const database = client.db('db');
      let blogs = database.collection('collection');
      await blogs.deleteOne({
        _id: new ObjectId(slug)
      });
      res.json({"STATUS": "SUCCESSFUL"});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({message: 'Internal Server Error'});
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}