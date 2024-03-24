import {MongoClient, ServerApiVersion} from 'mongodb';

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
    const {name} = req.body;

    try {
      await client.connect();
      const database = client.db('db');
      const blogs = await database
        .collection('collection')
        .find({})
        .sort({})
        .toArray();

      res.json(blogs);
      await client.close();
    } catch (error) {}
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}