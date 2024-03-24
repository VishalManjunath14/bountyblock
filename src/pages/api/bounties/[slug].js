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
      const blog = await database
        .collection('collection')
        .find({
            _id: new ObjectId(slug)
        })
        .sort({views: -1})
        .toArray();

      res.json({"bounty": blog[0]});
      await client.close();
    } catch (error) {}
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}