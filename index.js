const express = require('express');
const cors = require('cors');
 const app = express();
 const port = process.env.PORT || 5000;
 const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
//API to get all colleges
app.get('/collegeList',async(req,res) =>{
    const query = {};
    const lists = await collegeListCollection.find(query).toArray();
    res.send(lists);
});
//API to get Specific college details
  app.get('/details/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id:new ObjectId(id)};
    const cursor = collegeListCollection.find(query);
    const details = await cursor.toArray();
    res.send(details)
  })
    }finally{

    }

}
run().catch(console.log);


 app.get('/', async(req,res) =>{
    res.send('College Pods server is running')
 })

 app.listen(port,()=> console.log(`Pods Server is running at ${port}`))