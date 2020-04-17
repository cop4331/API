var express = require('express');

var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var bcrypt = require('bcrypt');

var nodemailer = require('nodemailer');

var jwt = require('jsonwebtoken');

var app = express();

var conn = 'mongodb+srv://mainaccess:securepassword@cop4331-large-project-l2dqk.mongodb.net/MyGymPro?retryWrites=true&w=majority';

var client = new MongoClient(conn, {useUnifiedTopology:true, useNewUrlParser:true});
client.connect();

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) =>
{
  var error = '';
  var ret1, ret2;
  
  const {username, email, password} = req.body;
  const newUser = {Username:username, Email:email, Password:password};
  
  try
  {
    const db = client.db();
    
    ret1 = await db.collection('Users').find({Username:username}).toArray();
    ret2 = await db.collection('Users').find({Email:email}).toArray();
  }
  catch(e)
  {
    error = e.toString();
  }
  
  res.status(200).json({ret1:ret1, ret2:ret2});
});

app.listen(process.env.PORT);
