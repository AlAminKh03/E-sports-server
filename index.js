const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.szixq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const productCollection = client.db('sports-gear').collection('products')

        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query)
            const products = await cursor.toArray()
            res.send(products)
        })
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            console.log(id)
            const result = await productCollection.findOne(query)
            res.send(result)
        })

        app.get('/product', async (req, res) => {

            const email = req.query.email

            console.log(email)
            const query = { email: email }
            const cursor = orderCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        // update ---------------------
        app.put('/update/:id', async (req, res) => {
            const id = req.params;
            const updatedQuantity = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    quantity: updatedQuantity.newQuantityTotal
                }
            }

            const result = await productCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })



        app.post('/products', async (req, res) => {
            const newProduct = req.body
            const result = await productCollection.insertOne(newProduct)
            res.send(result)
        })

        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectID(id) }
            console.log(id)
            const result = await productCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log('listening to port', port)
})