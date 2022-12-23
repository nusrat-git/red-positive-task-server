const express = require('express');
const app = express();
var cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.User_Name}:${process.env.User_Password}@cluster0.uft9um0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const hobbiesCollection = client.db('redPositiveTask').collection('hobbies');

        app.get('/hobbies', async (req, res) => {
            const query = {};
            const result = await hobbiesCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/hobbies', async (req, res) => {
            const hobby = req.body;
            const result = await hobbiesCollection.insertOne(hobby);
            hobby.id = result.insertedId;
            res.send(result);
        })

        app.delete('/hobbies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await hobbiesCollection.deleteOne(query);
            res.send(result);
        })

        app.get('/hobbies/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await hobbiesCollection.findOne(query);
            res.send(result);
          })


    } finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Red positive running on ${port}`)
}) 