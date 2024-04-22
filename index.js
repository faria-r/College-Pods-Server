const express = require('express');
const cors = require('cors');
 const app = express();
 require('dotenv').config();
 
 const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
 
 //middleware
 app.use(cors());
 app.use(express.json());
 app.options('*', cors());


 const port = process.env.PORT || 5000;
 
//  {
//   origin:[
//     'https://collegepods-d1b1e.web.app/',
//     'https://collegepods-d1b1e.firebaseapp.com/'
//   ],
//   credentials:true
//  }

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

      await client.connect();
const collegeListCollection = client.db('College-Pods').collection('collegeList');
const admissionInfoCollection = client.db('College-Pods').collection('admissionInfo');
const reviewInfoCollection = client.db('College-Pods').collection('reviewInfo');
//API to get all colleges
app.get('/collegeList',async(req,res) =>{
    const query = {};
    const lists = await collegeListCollection.find(query).toArray();
    res.send(lists);
});
//API to get Popular Colleges for admission 
app.get('/admission',async(req,res) =>{
    const query = {age:5};
    const lists = await collegeListCollection.find(query).toArray();
    res.send(lists);
});
app.get('/admission/:id',async(req,res) =>{
    const id = req.params.id;
    const query = {_id:new ObjectId(id)};
    const cursor = collegeListCollection.find(query);
    const lists = await cursor.toArray();
    res.send(lists);
});
//API to get Specific college details
  app.get('/details/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id:new ObjectId(id)};
    const cursor = collegeListCollection.find(query);
    const details = await cursor.toArray();
    res.send(details)
  });
//   API to post admission info in server 
  app.post('/admissionInfo',async(req,res)=>{
    const admissionInfo= req.body;
    const result = await admissionInfoCollection.insertOne(admissionInfo);
    res.send(result);
    console.log(admissionInfo,'data')
  
  });
  //API to get my colleges
  app.get('/myCollege',async(req,res) =>{
const query = {};
const cursor = admissionInfoCollection.find(query);
const myColleges = await cursor.toArray();
res.send(myColleges)
  });

  //API for college Review
  app.get('/myCollege/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id:new ObjectId(id)};
    const cursor = admissionInfoCollection.find(query);
    const college = await cursor.toArray();
    res.send(college)
  });

  //   API to post Review info in server 
  app.post('/reviewInfo',async(req,res)=>{
    const reviewInfo= req.body;
    const result = await reviewInfoCollection.insertOne(reviewInfo);
    res.send(result);
    console.log(reviewInfo,'data')
  
  });
  //API to get all the reviews
  app.get('/reviews',async(req,res)=>{
    const query={};
    const cursor = reviewInfoCollection.find(query);
    const allReviews= await cursor.toArray();
    res.send(allReviews)
  })


    }finally{

    }

}
run().catch(console.log);


 app.get('/', async(req,res) =>{
    res.send('College Pods server is running')
 })

 app.listen(port,()=> console.log(`Pods Server is running at ${port}`))