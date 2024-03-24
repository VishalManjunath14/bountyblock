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
    if(slug.length == 9) {
      try {
        await client.connect();
        const database = client.db('db');
        let blogs = database.collection('collection');
        await blogs.insertOne({
          _id: new ObjectId(),
          title: slug[0],
          company: slug[1],
          description: slug[2],
          tokens: parseInt(slug[3]),
          retainer: slug[4],
          payout: slug[5],
          deadline:slug[6],
          ownerAddress:slug[8],
          uploadDate: (new Date()).toLocaleDateString(),
          email:slug[7],
          update: []
        });
        res.json({slugs:slug});
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message: 'Internal Server Error'});
      } finally {
        await client.close();
      }
    }
    else res.json({"STATUS": "FAILED"})
    
  } else {
    res.status(405).json({message: 'Method not allowed'});
  }
}