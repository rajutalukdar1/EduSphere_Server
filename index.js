const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d64dkmr.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('EduSphere').collection('services');
        const reviewCollection = client.db('EduSphere').collection('reviews');

        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const service = await cursor.limit(3).toArray();
            res.send(service);
        });
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query)
            res.send(service);
        })

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        app.get('/reviews', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        });
    }
    finally {

    }
}

run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('assignment 11 server is running')
})

app.listen(port, () => {
    console.log(`Assignment 11 server running on ${port}`);
})