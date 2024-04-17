const express = require('express');
const cors = require('cors');
 const app = express();
 const port = process.env.PORT || 5000;
 const { MongoClient, ServerApiVersion } = require('mongodb');
 require('dotenv').config();
 
 //middleware
 app.use(cors());
 app.use(express.json());

 //connect MongoDB
 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wxeycza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run(){
    try{
const collegeListCollection = client.db('College-Pods').collection('collegeList');

app.get('/collegeList',async(req,res) =>{
    const query = {};
    const lists = await collegeListCollection.find(query).toArray();
    res.send(lists);
})
    }finally{

    }

}
run().catch(console.log);


 app.get('/', async(req,res) =>{
    res.send('College Pods server is running')
 })

 app.listen(port,()=> console.log(`Pods Server is running at ${port}`))