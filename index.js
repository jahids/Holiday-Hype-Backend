
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 5000;

// middleware
// middleware wdkhfas

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.doqon.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {

    try {
        await client.connect();
        const database = client.db("torist");
        const servicesCollection = database.collection("services");
        const orderCollection = database.collection("order");



        //get my order by gmail
      app.post('/services/xyz', async (req, res) => {
        const email = req.body.key;
        console.log(email);

        const query = {"email": email};

        const result = await orderCollection.find({}).toArray();

        res.json(result);
         })

    //delete order item by _id
    app.get("/order/deleteOrder/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = {_id: ObjectId(id)}

        const result = await orderCollection.deleteOne(query);

        console.log('delete successfully', result);
        res.json(result);
    })
        
   


        app.post('/services/order', async (req, res) => {
            const data = req.body;
            const result = await orderCollection.insertOne(data);
            console.log('data insert successfully', result);
            res.json(result);
        })



        //Get api
        
        app.get('/services', async (req, res) => {

            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
            console.log('database hitted services');

        });


        // 

   

        //    get single service 

        app.get('/services/jahid/:id', async (req, res) => {
          
            const id = req.params.id;
              console.log('getting specific id',id);
            const query = {_id: ObjectId(id)};
            const service = await servicesCollection.findOne(query); 
            res.json(service);
            console.log(service);

        })



        // post api

        app.post('/services', async (req, res) => {

             const service = req.body;
              
            // console.log('hit the post api',service);
            console.log('hit the post api',service);
     
              
            const result = await servicesCollection.insertOne(service);
            res.json(result);

        })
        
    } finally  {
        
    }


}

run().catch(console.dir);



app.get('/',(req, res) => {

    res.send('runnig assignment11 server');

});

app.listen(port , () => {

    console.log('runnig assignment-11 server', port);
})