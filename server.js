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

app.get('/', (req, res) =>
{
  res.send('Yay! Server is working.');
});

app.post('/api/signup', async (req, res) =>
{
  var error = '';
  var ret1, ret2;
  
  const {username, email, password} = req.body;
  const newUser = {Username:username, Email:email, Password:password};
  
  try
  {
    const db = client.db();
    
    ret1 = await db.collection('Users').findOne({Username:username});
    ret2 = await db.collection('Users').findOne({Email:email});
    
    if (ret1 != null)
    {
      res.status(403).json({Error:'Username already exists.'});
    }
    if (ret2 != null)
    {
      res.status(403).json({Error:'Email address already exists.'});
    }
  }
  catch(e)
  {
    error = e.toString();
  }
  
  if (!res.headersSent)
  {
    res.status(200).json({Error:error, ret1:ret1, ret2:ret2});
  }
});

app.listen(process.env.PORT);
