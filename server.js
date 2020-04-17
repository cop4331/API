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
  var rand = Math.floor((Math.random() * 100) + 54);
  
  const {username, email, password} = req.body;
  const newUser = {Username:username, Email:email, Password:password, isVerified:0, rand:rand};
  
  try
  {
    const db = client.db();
    
    ret1 = await db.collection('Users').findOne({Username:username});
    ret2 = await db.collection('Users').findOne({Email:email});
    
    if (ret1 != null)
    {
      res.status(403).json({Error:'Username already exists.'});
    }
    else if (ret2 != null)
    {
      res.status(403).json({Error:'Email address already exists.'});
    }
    else
    {
      const result = db.collection('Users').insertOne(newUser);
    
      var transporter = nodemailer.createTransport(
      {
        service: "gmail",
        auth: {user: "mygymproapp@gmail.com", pass: "Exceptions123?"}
      });
    
      var link = "http://my-gym-pro.herokuapp.com/api/verifyemail/?id=" + rand + "&username=" + username;
    
      mailOptions = 
      {
        from: "mygymproapp@gmail.com",
        to: email.toString(),
        subject: "Please confirm your MyGymPro account.",
        html: "<br>Click the link to verify your email.<br><a href=" + link + ">CLICK HERE</a>"
      }
    
      transporter.sendMail(mailOptions);
    }
  }
  catch(e)
  {
    error = e.toString();
  }
  
  if (!res.headersSent)
  {
    res.status(200).json({Error:error});
  }
});

app.get('/api/verifyemail', async (req, res) =>
{
  var error = '';
  
  try
  {
    const db = client.db();
    const result = await db.collection('Users').findOne({Username:req.query.username});
    
    if (req.query.id == result.rand)
    {
      res.send('Your email has been verified. You can now log in.');
    }
    else
    {
      res.send('Email could not be verified.');
    }
  }
  catch(e)
  {
    error = e.toString();
  }
  
  if (!res.headersSent)
  {
    res.status(200).json({Error:error});
  }
});

app.listen(process.env.PORT);
